#!/usr/bin/env node
/**
 * Envia a ntfy el pla d'exercicis de la setmana.
 *
 * Ús:
 *   node tools/notify-week.mjs                 # setmana calculada des de NOTIFY_START_DATE
 *   node tools/notify-week.mjs --week 12       # setmana concreta
 *   node tools/notify-week.mjs --dry-run       # només imprimeix el missatge
 *   node tools/notify-week.mjs --list          # taula de blocs i setmanes
 *
 * Variables d'entorn (opcionals, tenen prioritat sobre expo/constants/notify.ts):
 *   NTFY_URL, NTFY_TOPIC, NTFY_TOKEN, NOTIFY_START_DATE
 *
 * El format del missatge és el mateix que el de la web (expo/constants/notify.ts).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'expo/constants/trainingData.ts');
const CONFIG_FILE = path.join(ROOT, 'expo/constants/notify.ts');

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

// ---------- configuració ----------
const readConfig = () => {
  const src = fs.existsSync(CONFIG_FILE) ? fs.readFileSync(CONFIG_FILE, 'utf8') : '';
  const fromFile = (name, fallback) => {
    const m = src.match(new RegExp(`export const ${name}\\s*=\\s*"([^"]*)"`));
    return m ? m[1] : fallback;
  };
  return {
    url: process.env.NTFY_URL || fromFile('NTFY_URL', 'https://ntfy.sh'),
    topic: process.env.NTFY_TOPIC || fromFile('NTFY_TOPIC', 'solo'),
    token: process.env.NTFY_TOKEN || '',
    startDate: process.env.NOTIFY_START_DATE || fromFile('NOTIFY_START_DATE', ''),
    siteUrl: fromFile('SITE_URL', ''),
  };
};

// ---------- lectura del pla ----------
const parsePlan = (file) => {
  const src = fs.readFileSync(file, 'utf8');
  const eq = src.indexOf('=', src.indexOf('export const phases'));
  const arrStart = src.indexOf('[', eq);
  let depth = 0;
  let end = -1;
  let inStr = null;
  let esc = false;
  for (let i = arrStart; i < src.length; i += 1) {
    const c = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '[') depth += 1;
    else if (c === ']') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  // eslint-disable-next-line no-eval
  return eval(`(${src.slice(arrStart, end + 1)})`);
};

const parseRange = (label) => {
  const closed = String(label).match(/(\d+)\s*[-\u2013]\s*(\d+)/);
  if (closed) return { from: Number(closed[1]), to: Number(closed[2]) };
  const open = String(label).match(/(\d+)\s*\+/);
  if (open) return { from: Number(open[1]), to: Number.POSITIVE_INFINITY };
  return null;
};

const buildBlocks = (phases) => {
  const blocks = [];
  for (const phase of phases) {
    const phaseRange = parseRange(phase.weeks);
    for (const section of phase.sections) {
      const range = parseRange(section.weeks) || phaseRange;
      if (!range) continue;
      blocks.push({
        phaseId: phase.id,
        phaseTitle: phase.title,
        phaseEmoji: phase.emoji,
        sectionTitle: section.title,
        sectionWeeks: section.weeks,
        from: range.from,
        to: range.to,
        exercises: section.exercises,
      });
    }
  }
  const starts = blocks.map((b) => b.from).sort((a, b) => a - b);
  for (const block of blocks) {
    if (block.to === Number.POSITIVE_INFINITY) {
      const next = starts.find((s) => s > block.from);
      block.to = next ? next - 1 : block.from + 7;
    }
  }

  const sorted = blocks.sort((a, b) => a.from - b.from);

  // el pla ha de quedar continu: els buits són continuació del bloc anterior
  for (let i = 0; i < sorted.length - 1; i += 1) {
    if (sorted[i].to < sorted[i + 1].from - 1) {
      sorted[i].continued = true;
      sorted[i].to = sorted[i + 1].from - 1;
    }
  }

  return sorted;
};

// ---------- missatge ----------
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

const TRAINER_SHORT = {
  note: 'Note',
  interval: 'Interval',
  changes: 'Changes',
  scale: 'Scale',
};

const formatMessage = (week, blocks, today, siteUrl) => {
  const planned = blocks.filter((b) => week >= b.from && week <= b.to);
  const total = planned.reduce((sum, b) => sum + b.exercises.length, 0);

  const lines = [`Setmana **${week}** del pla · ${total} exercici${total === 1 ? '' : 's'}`, ''];

  for (const block of planned) {
    lines.push(`### ${block.phaseEmoji} Mòdul ${block.phaseId} · ${block.sectionTitle}`);
    lines.push(`_${block.sectionWeeks}${block.continued ? ` · continuació fins a la setmana ${block.to}` : ''}_`);
    for (const exercise of block.exercises) {
      const setup = exercise.setup || {};
      const bits = [exercise.duration];
      if (setup.trainer && TRAINER_SHORT[setup.trainer]) bits.push(TRAINER_SHORT[setup.trainer]);
      if (setup.functions) bits.push(setup.functions);
      lines.push(`- **${exercise.id}** ${exercise.title} _(${bits.filter(Boolean).join(' · ')})_`);
    }
    lines.push('');
  }

  if (planned.length === 0) lines.push('Aquesta setmana no hi ha cap bloc definit al pla.', '');

  if (siteUrl) lines.push(`[Obrir el pla a la web](${siteUrl}/setmana)`);

  const date = today.toLocaleDateString('ca-ES', { day: '2-digit', month: 'long' });

  return {
    title: `Setmana ${week} · Jazz Fusion Solo (${date})`,
    body: [`🎸 ${lines[0]}`, ...lines.slice(1)].join('\n'),
    tags: ['musical_note', 'guitar'],
    priority: 3,
    total,
  };
};

// ---------- enviament ----------
const publish = async (config, message) => {
  const headers = {
    Title: message.title,
    Tags: message.tags.join(','),
    Priority: String(message.priority),
    Markdown: 'yes',
  };
  if (config.token) headers.Authorization = `Bearer ${config.token}`;

  const response = await fetch(`${config.url}/${config.topic}`, {
    method: 'POST',
    headers,
    body: message.body,
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`ntfy ha respost ${response.status}: ${text.slice(0, 200)}`);
  }
  return JSON.parse(text);
};

// ---------- principal ----------
const main = async () => {
  const config = readConfig();
  const phases = parsePlan(DATA_FILE);
  const blocks = buildBlocks(phases);
  const maxWeek = blocks.reduce((max, b) => Math.max(max, b.to), 1);

  if (flag('--list')) {
    console.log(`blocs del pla: ${blocks.length} | setmana màxima: ${maxWeek}`);
    for (const b of blocks) {
      console.log(
        `  setmanes ${String(b.from).padStart(3)}-${String(b.to).padStart(3)}  Mòdul ${b.phaseId}  ${b.sectionTitle} (${b.exercises.length} exercicis)`
      );
    }
    return;
  }

  let week = Number(value('--week'));
  const dateArg = value('--date');
  const today = dateArg ? new Date(`${dateArg}T09:00:00`) : new Date();

  if (!Number.isFinite(week) || week <= 0) {
    if (config.startDate) {
      const start = new Date(`${config.startDate}T00:00:00`);
      week = Math.floor((today.getTime() - start.getTime()) / MS_PER_WEEK) + 1;
    } else {
      week = 1;
      console.log('AVIS: no hi ha NOTIFY_START_DATE; s\'envia la setmana 1.');
    }
  }
  week = Math.min(Math.max(week, 1), maxWeek);

  const message = formatMessage(week, blocks, today, config.siteUrl);

  console.log(`setmana ${week} | ${message.total} exercicis | ${message.body.length} caràcters`);
  console.log('---');
  console.log(message.title);
  console.log(message.body);

  if (flag('--dry-run')) {
    console.log('---');
    console.log('[dry-run] no s\'ha enviat res.');
    return;
  }

  const result = await publish(config, message);
  console.log('---');
  console.log(`enviat a ${config.url}/${config.topic} (id ${result.id})`);
};

main().catch((error) => {
  console.error('ERROR:', error.message);
  process.exit(1);
});


