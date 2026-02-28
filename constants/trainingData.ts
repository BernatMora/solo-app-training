export interface Exercise {
  id: string;
  title: string;
  emoji?: string;
  soloSteps?: string[];
  practice: string;
  progression: string;
  duration: string;
}

export interface WeekSection {
  weeks: string;
  title: string;
  exercises: Exercise[];
}

export interface Phase {
  id: number;
  title: string;
  emoji: string;
  weeks: string;
  objectives: string[];
  sections: WeekSection[];
}

export const phases: Phase[] = [
  {
    id: 1,
    title: "Fonaments i Visualització del Mànec",
    emoji: "🎸",
    weeks: "Setmanes 1-8",
    objectives: [
      "Dominar la visualització de totes les notes al mànec",
      "Internalitzar les formes CAGED i el sistema 3NPS",
      "Establir una base sòlida de tècnica d'ambdues mans",
    ],
    sections: [
      {
        weeks: "Setmanes 1-2",
        title: "Coneixement del Mànec",
        exercises: [
          {
            id: "1.1",
            title: "Notes individuals",
            emoji: "🎯",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca el botó 'Note Trainer' al menú principal",
              "3. Selecciona 'Settings' (icona d'engranatge)",
              "4. A 'Strings', desactiva totes les cordes excepte la 6a (Mi greu)",
              "5. A 'Notes', deixa totes les notes activades",
              "6. Torna enrere i prem 'Start'",
              "7. L'app et mostrarà una nota - toca-la al mànec",
              "8. Després de dominar la 6a corda, canvia a la 5a, després 4a, etc."
            ],
            practice: "Identifica totes les notes a cada corda (5 min/corda)",
            progression: "Augmenta la velocitat de reconeixement",
            duration: "30 min/dia",
          },
          {
            id: "1.2",
            title: "Intervals des d'una nota root",
            emoji: "📏",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Interval Trainer' al menú principal",
              "3. Prem 'Settings'",
              "4. A 'Root Note', selecciona 'Fixed' i tria una nota (ex: C)",
              "5. A 'Intervals', activa només '3rd (Major)'",
              "6. Prem 'Start' - l'app et demanarà tocar la 3a des de la tònica",
              "7. Després de dominar la 3a, activa també '5th (Perfect)' i '7th (Major)'",
              "8. Gradualment combina més intervals"
            ],
            practice: "Troba 3es, 5es, 7es des de qualsevol nota (10 min/interval)",
            progression: "Combina múltiples intervals",
            duration: "30 min/dia",
          },
          {
            id: "1.2b",
            title: "Notes aleatòries en tot el mànec",
            emoji: "🎲",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Note Trainer'",
              "3. A 'Settings', activa TOTES les cordes",
              "4. Deixa totes les notes activades",
              "5. Prem 'Start'",
              "6. L'app et mostrarà notes aleatòries en qualsevol corda",
              "7. Objectiu: trobar la nota en menys de 2 segons"
            ],
            practice: "Reconeixement ràpid de notes en tot el mànec",
            progression: "Redueix el temps de resposta",
            duration: "15 min/dia",
          },
          {
            id: "1.2c",
            title: "Limitació per zones del mànec",
            emoji: "🗺️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Note Trainer'",
              "3. A 'Settings' > 'Fret Range', limita a trastis 0-5",
              "4. Practica només aquesta zona",
              "5. Dia següent: trastis 5-9",
              "6. Dia següent: trastis 9-12",
              "7. Després practica tot el mànec sense limitacions"
            ],
            practice: "Domina cada zona del mànec per separat",
            progression: "Integra totes les zones",
            duration: "20 min/dia",
          },
          {
            id: "1.2d",
            title: "Una nota, 3 llocs",
            emoji: "🧠",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Note Trainer'",
              "3. A 'Settings', posa 'Fixed Note' (ex: G)",
              "4. Activa totes les cordes",
              "5. Objectiu: toca la mateixa nota en 3 posicions diferents",
              "6. Exemple G: 6a corda trast 3, 5a corda trast 10, 4a corda trast 5",
              "7. Canvia la nota i repeteix"
            ],
            practice: "Per cada nota, troba 3 posicions diferents sense mirar massa.",
            progression: "Augmenta a 4-5 posicions per nota",
            duration: "12 min/dia",
          },
          {
            id: "1.2e",
            title: "Cadena de roots (CAGED) sense tocar acord",
            emoji: "🧭",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Chord Trainer'",
              "3. Tria un acord major (ex: A)",
              "4. No facis l'acord: només busca i toca tots els ROOTS dins de cada forma CAGED",
              "5. Mou-te forma per forma (C → A → G → E → D)",
              "6. Digue-ho en veu alta: 'root, root, root'",
              "7. Canvia la tonalitat i repeteix"
            ],
            practice: "Localitza roots de manera automàtica a cada forma.",
            progression: "Afegeix 3a i 5a (triad) sense perdre els roots",
            duration: "15 min/dia",
          },
          {
            id: "1.2f",
            title: "Dues cordes: notes i intervals",
            emoji: "✌️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Note Trainer'",
              "3. A 'Settings', deixa actives només dues cordes adjacents (ex: D i G)",
              "4. Practica notes 2 minuts",
              "5. Canvia a 'Interval Trainer'",
              "6. Root: 'Fixed' (ex: C). Activa només 3a i 5a",
              "7. Mantén les mateixes dues cordes i practica intervals"
            ],
            practice: "Concentració per parelles de cordes (zones febles).",
            progression: "Canvia parella de cordes cada dia",
            duration: "18 min/dia",
          },
          {
            id: "1.2g",
            title: "Mini repte: 60 segons per corda",
            emoji: "⏱️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Note Trainer'",
              "3. A 'Settings', activa només 1 corda",
              "4. Posa't un temporitzador de 60 segons",
              "5. Objectiu: màxim notes correctes en 60 segons",
              "6. Passa a la següent corda",
              "7. Anota el resultat i intenta superar-lo demà"
            ],
            practice: "Velocitat + precisió a cada corda.",
            progression: "Redueix a 45s / 30s",
            duration: "10 min/dia",
          },
          {
            id: "1.2h",
            title: "Mapa cec: digues la nota abans de tocar",
            emoji: "🙈",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Note Trainer'",
              "3. Activa totes les cordes",
              "4. Prem 'Start'",
              "5. Abans de tocar: digues en veu alta on la trobaràs (corda + trast)",
              "6. Toca-la",
              "7. Si falles: troba-la en 2 llocs diferents i torna a la ronda"
            ],
            practice: "Obliga el cervell a decidir abans del dit.",
            progression: "Redueix el temps de decisió a < 2s",
            duration: "8 min/dia",
          },
          {
            id: "1.2i",
            title: "Sprint 20/10: 20s a tope, 10s reset",
            emoji: "🏃‍♂️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Note Trainer'",
              "3. Configura un 'Fret Range' (ex: 5-9)",
              "4. Fes 20 segons resposta màxima",
              "5. Descansa 10 segons (mans relax)",
              "6. Repeteix 6 rondes",
              "7. Canvia de zona i repeteix un altre dia"
            ],
            practice: "Velocitat sense cremar-te.",
            progression: "Més zones / menys errors",
            duration: "6-8 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 3-4",
        title: "Sistema CAGED",
        exercises: [
          {
            id: "1.3",
            title: "Formes d'acords CAGED",
            emoji: "🔤",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Chord Trainer'",
              "3. A 'Settings', selecciona 'Chord Types': Major i Minor",
              "4. Activa 'CAGED System' per veure les 5 formes",
              "5. Selecciona una tonalitat (comença per C)",
              "6. L'app mostrarà la forma C, després A, G, E, D",
              "7. Visualitza i toca cada forma",
              "8. Canvia de tonalitat quan dominis les 5 formes"
            ],
            practice: "Visualitza i toca les 5 formes en totes les tonalitats",
            progression: "Connecta formes adjacents",
            duration: "15 min/dia",
          },
          {
            id: "1.3b",
            title: "Connexió CAGED vertical",
            emoji: "🔗",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Chord Trainer'",
              "3. Tria una tonalitat (ex: G major)",
              "4. Comença amb forma C al trast 7",
              "5. Mou-te a la forma adjacent A sense perdre visualització",
              "6. Continua: A → G → E → D → C",
              "7. Practica el cicle complet amunt i avall del mànec"
            ],
            practice: "Connecta les 5 formes sense pauses. Cicle complet pel mànec",
            progression: "Fluïdesa en transicions",
            duration: "20 min/dia",
          },
          {
            id: "1.4",
            title: "Arpegis CAGED",
            emoji: "🎼",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Arpeggio Trainer'",
              "3. A 'Settings', activa 'Maj7', 'Min7', 'Dom7'",
              "4. Selecciona sistema CAGED",
              "5. Comença amb una tonalitat (ex: C)",
              "6. Practica ascendent i descendent",
              "7. Afegeix extensions (9, 11, 13) gradualment"
            ],
            practice: "Toca arpegis en cada forma CAGED",
            progression: "Alterna ascendent/descendent, afegeix extensions",
            duration: "20 min/dia",
          },
          {
            id: "1.4b",
            title: "Intervals dins de CAGED",
            emoji: "🔍",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer'",
              "3. Activa Root, 3rd, 5th, 7th",
              "4. Tria una forma CAGED (ex: forma E)",
              "5. Troba tots els intervals dins d'aquesta forma",
              "6. Repeteix per cada una de les 5 formes",
              "7. Combina intervals aleatòriament"
            ],
            practice: "Troba intervals en cada forma CAGED. Visualització completa",
            progression: "Intervals complexos (9, 11, 13)",
            duration: "25 min/dia",
          },
          {
            id: "1.4c",
            title: "Arpegi 'GPS': només 3a i 7a",
            emoji: "🧭",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Arpeggio Trainer'",
              "3. Tria Maj7, Min7, Dom7",
              "4. Regla: només toques la 3a i la 7a (pujant i baixant)",
              "5. Canvia d'inversió sense parar",
              "6. Canvia de tonalitat",
              "7. Després afegeix la tònica"
            ],
            practice: "Aprendre l'harmonia amb 2 notes (super útil).",
            progression: "Afegeix 9a o 13a quan sigui fàcil",
            duration: "10-12 min/dia",
          },
          {
            id: "1.4d",
            title: "Triades CAGED (3 cordes) + salts",
            emoji: "🔺",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Triad Trainer'",
              "3. Limita't a un joc de 3 cordes (ex: G-B-e)",
              "4. Toca la triada i salta a un altre joc (ex: D-G-B)",
              "5. Mantén la mateixa tonalitat",
              "6. Canvia Major/Minor",
              "7. Objectiu: zero dubtes al canvi de joc"
            ],
            practice: "Triades petites = màxim control del mànec.",
            progression: "Fes-ho amb metrònom lent i puja",
            duration: "12 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 5-8",
        title: "Escales Fonamentals",
        exercises: [
          {
            id: "1.5",
            title: "Escala Major (Sistema 3NPS)",
            emoji: "⚡",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. A 'Settings', tria 'Major Scale'",
              "4. Activa '3NPS' (3 Notes Per String)",
              "5. Selecciona una tonalitat",
              "6. Practica les 7 posicions",
              "7. Canvia de tonalitat quan dominis les posicions",
              "8. Practica seqüències: 3rds, 4ths, triads"
            ],
            practice: "7 posicions, totes les tonalitats",
            progression: "Seqüències (3rds, 4ths, triads)",
            duration: "25 min/dia",
          },
          {
            id: "1.5b",
            title: "Seqüències d'escala Major",
            emoji: "🔄",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer' > 'Major Scale'",
              "3. Practica en terceres: C-E-D-F-E-G-F-A...",
              "4. Practica en quartes: C-F-D-G-E-A-F-B...",
              "5. Practica en sisenes: C-A-D-B-E-C-F-D...",
              "6. Visualitza els patrons amb l'app mentre toques",
              "7. Alterna ascendent i descendent"
            ],
            practice: "Terceres, quartes, sisenes. Patrons melòdics avançats",
            progression: "Combinacions complexes",
            duration: "20 min/dia",
          },
          {
            id: "1.6",
            title: "Modes de l'escala major",
            emoji: "🌈",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Mode Trainer'",
              "3. Comença amb 'Ionian' (setmana 1)",
              "4. Practica sobre backing tracks",
              "5. Setmana 2: canvia a 'Dorian'",
              "6. Setmana 3: 'Phrygian', després 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'",
              "7. Visualitza cada mode en diferents posicions"
            ],
            practice: "Ionian → Dorian → Phrygian → Lydian → Mixolydian → Aeolian → Locrian. Visualitza sobre backing tracks",
            progression: "Progressió modal setmanal",
            duration: "20 min/dia",
          },
          {
            id: "1.6b",
            title: "Comparació modal",
            emoji: "⚖️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Mode Trainer'",
              "3. Tria C Ionian i visualitza les notes",
              "4. Canvia a C Dorian - observa les diferències (3a i 7a bemoll)",
              "5. Continua: C Phrygian (2a bemoll addicional)",
              "6. Practica canviar entre modes amb la mateixa tònica",
              "7. Escolta les diferències de color harmònic"
            ],
            practice: "Compara modes amb mateixa tònica. Identificació de notes característiques",
            progression: "Fluïdesa en canvis modals",
            duration: "25 min/dia",
          },
          {
            id: "1.6c",
            title: "Intervals en modes",
            emoji: "🎪",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer'",
              "3. Tria un mode (ex: Dorian)",
              "4. Activa intervals: Root, 2nd, 3rd, 4th, 5th, 6th, 7th",
              "5. Practica trobar intervals dins del context modal",
              "6. Repeteix per cada mode",
              "7. Focus en notes característiques de cada mode"
            ],
            practice: "Intervals modalitzats. Notes característiques per mode",
            progression: "Domini d'identitat modal",
            duration: "30 min/dia",
          },
          {
            id: "1.6d",
            title: "Tríades dins de modes",
            emoji: "🔺",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Triad Trainer'",
              "3. Tria un mode (ex: Mixolydian)",
              "4. Practica tríades diatòniques: I, II, III, IV, V, VI, VII",
              "5. Identifica Major, Minor i Diminished triads en el mode",
              "6. Visualitza on es troben en el mànec",
              "7. Canvia de mode i repeteix"
            ],
            practice: "Tríades diatòniques en cada mode. Localització al mànec",
            progression: "Visualització ràpida de tríades",
            duration: "25 min/dia",
          },
          {
            id: "1.6e",
            title: "Two-String Scales",
            emoji: "✌️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer' > Major Scale",
              "3. A 'Settings', limita a només 2 cordes adjacents (ex: G i B)",
              "4. Practica l'escala només en aquestes dues cordes",
              "5. Canvia a altres parelles: E-A, A-D, D-G, B-e",
              "6. Això millora zones febles del mànec",
              "7. Aplica també a modes i altres escales"
            ],
            practice: "Escales en dues cordes. Fortifica zones febles",
            progression: "Domini complet de totes les parelles de cordes",
            duration: "20 min/dia",
          },
          {
            id: "1.6f",
            title: "Intervals aleatoris amb Root fixa",
            emoji: "🎰",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer'",
              "3. A 'Settings', tria 'Fixed Root' (ex: C)",
              "4. Activa tots els intervals: 2nd, 3rd, 4th, 5th, 6th, 7th",
              "5. Activa 'Random' per intervals aleatoris",
              "6. L'app et demanarà intervals aleatoris des de C",
              "7. Practica fins que puguis trobar qualsevol interval ràpidament"
            ],
            practice: "Intervals aleatoris des de tònica fixa. Velocitat de resposta",
            progression: "Menys de 2 segons per interval",
            duration: "20 min/dia",
          },
          {
            id: "1.6g",
            title: "Mode del dia: 3 notes característiques",
            emoji: "🎯",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Mode Trainer'",
              "3. Tria un mode (ex: Dorian)",
              "4. Busca i toca només: 1, b3, 6 (Dorian)",
              "5. Crea mini frases de 4 notes",
              "6. Després afegeix la 5a",
              "7. Canvia a un altre mode i repeteix"
            ],
            practice: "Menys notes = més cervell (i més música).",
            progression: "Canvia de mode cada 2 minuts",
            duration: "8-10 min/dia",
          },
          {
            id: "1.6h",
            title: "Micro-connexió 3NPS: 2 posicions + slide",
            emoji: "🛝",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer' > Major Scale (3NPS)",
              "3. Tria 2 posicions adjacents",
              "4. Regla: només 1 slide per canviar de posició",
              "5. Fes 4 notes, slide, 4 notes",
              "6. Torna enrere",
              "7. Canvia de tonalitat"
            ],
            practice: "Connectar posicions sense perdre't.",
            progression: "Fes-ho amb metrònom i puja 5 BPM",
            duration: "10-12 min/dia",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Harmonia i Colors Jazz",
    emoji: "🎵",
    weeks: "Setmanes 9-16",
    objectives: [
      "Dominar escales i modes jazz essencials",
      "Desenvolupar vocabulari harmònic avançat",
      "Integrar substitucions i tensions",
    ],
    sections: [
      {
        weeks: "Setmanes 9-11",
        title: "Escales Jazz Essencials",
        exercises: [
          {
            id: "2.1",
            title: "Escala Melòdica Menor",
            emoji: "🌙",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. A 'Settings', tria 'Melodic Minor'",
              "4. Practica les 7 posicions",
              "5. Focus especial en mode 'Altered' (7è mode)",
              "6. Focus en 'Lydian Dominant' (4t mode)",
              "7. Aplica sobre acords V7alt i IVmaj7#11"
            ],
            practice: "7 posicions, focus en Altered i Lydian Dominant. Aplicació sobre acords V7alt i IVmaj7#11",
            progression: "Integració harmònica",
            duration: "30 min/dia",
          },
          {
            id: "2.1b",
            title: "Modes de Melòdica Menor",
            emoji: "✨",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Mode Trainer' > 'Melodic Minor Modes'",
              "3. Practica cada mode: Melodic Minor, Dorian b2, Lydian Augmented",
              "4. Lydian Dominant (4t mode) - sobre V7 amb #11",
              "5. Mixolydian b6 (5è mode) - sobre acordes dominants",
              "6. Locrian #2 (6è mode) - sobre m7b5",
              "7. Altered (7è mode) - sobre V7alt"
            ],
            practice: "Domina els 7 modes de melòdica menor. Aplicació contextual",
            progression: "Identificació auditiva de cada mode",
            duration: "35 min/dia",
          },
          {
            id: "2.1c",
            title: "Notes guia (3a i 7a) en II-V-I",
            emoji: "🧷",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Changes Trainer'",
              "3. Selecciona una progressió II-V-I (ex: Dm7 → G7 → Cmaj7)",
              "4. No pensis en escales: només troba 3a i 7a de cada acord",
              "5. Mou-te amb veu guia: 7a del II baixa a 3a del V, etc.",
              "6. Fes-ho en 2 posicions diferents del mànec",
              "7. Canvia de tonalitat"
            ],
            practice: "Guia tones per entendre la harmonia sense 'llargues escales'.",
            progression: "Afegeix 9a o 13a al V7",
            duration: "18 min/dia",
          },
          {
            id: "2.1d",
            title: "Altered: només 3 tensions",
            emoji: "🦂",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Scale Trainer' > 'Melodic Minor' i tria el mode 'Altered'",
              "3. Tria un V7alt (ex: G7alt)",
              "4. Objectiu: memoritza 3 tensions: b9, #9, b13",
              "5. Improvisa 2 minuts només amb aquestes tensions + 3a i 7a",
              "6. Després afegeix #11",
              "7. Resol sempre a Cmaj7"
            ],
            practice: "Outside controlat: poques notes, molt de color.",
            progression: "Canvia a diferents dominants (A7alt, D7alt, etc.)",
            duration: "15 min/dia",
          },
          {
            id: "2.1e",
            title: "Diminished per blocs de 4 notes",
            emoji: "🧊",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Scale Trainer' > 'Diminished' (Half-Whole)",
              "3. Tria un V7b9 (ex: G7b9)",
              "4. Practica el patró en blocs: 4 notes amunt, 4 notes avall",
              "5. Mou el mateix bloc cada 3 trastis",
              "6. Fes 3 posicions seguides",
              "7. Resol a C minor o C major"
            ],
            practice: "Construcció de licks ràpids amb simetria.",
            progression: "Afegeix cromatisme (approach tones) a cada bloc",
            duration: "16 min/dia",
          },
          {
            id: "2.1f",
            title: "Triad Pair del dia (2 minuts)",
            emoji: "🎲",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Triad Trainer'",
              "3. Tria una parella (ex: D + E sobre Amaj7)",
              "4. Posa't 2 minuts",
              "5. Objectiu: només notes de les dues tríades",
              "6. Després 1 minut: només canvia de tríada cada 2 notes",
              "7. Canvia parella i repeteix"
            ],
            practice: "Micro-lliçó curta per construir vocabulari modern.",
            progression: "Fes-ho en 2 zones del mànec",
            duration: "10 min/dia",
          },
          {
            id: "2.1g",
            title: "II-V-I: només 2 notes per acord",
            emoji: "🧠",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer'",
              "3. Tria II-V-I (ex: Dm7 → G7 → Cmaj7)",
              "4. Regla: per cada acord, només 2 notes (3a i 7a)",
              "5. Fes 10 rondes sense parar",
              "6. Canvia de posició (mànec alt/baix)",
              "7. Canvia de tonalitat"
            ],
            practice: "Entendre changes amb màxima simplicitat.",
            progression: "Afegeix 9a al V7",
            duration: "8-12 min/dia",
          },
          {
            id: "2.1h",
            title: "Dominant del dia: 1 tensió, 1 resolució",
            emoji: "⚡",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer' o 'Arpeggio Trainer'",
              "3. Tria un V7 (ex: G7)",
              "4. Tria UNA tensió (b9 o #9 o b13)",
              "5. Improvisa 60s només amb: 3a, 7a, tensió",
              "6. Resol a I (Cmaj7) 20s",
              "7. Canvia de dominant"
            ],
            practice: "Color controlat sense embolics.",
            progression: "Afegir una segona tensió",
            duration: "6-8 min/dia",
          },
          {
            id: "2.2",
            title: "Escala Harmònica Menor",
            emoji: "🎭",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. A 'Settings', tria 'Harmonic Minor'",
              "4. Focus en 'Phrygian Dominant' (5è mode)",
              "5. Practica sobre progressions amb acords dominants exòtics",
              "6. Visualitza en diferents posicions"
            ],
            practice: "Focus en Phrygian Dominant (mode 5). Aplicació sobre progressions amb acords dominants exòtics",
            progression: "Aplicació contextual",
            duration: "20 min/dia",
          },
          {
            id: "2.2b",
            title: "Arpegis sobre Harmònica Menor",
            emoji: "💫",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Arpeggio Trainer'",
              "3. Tria arpegis derivats d'harmònica menor",
              "4. Practica mMaj7 (acord I)",
              "5. Practica m7b5 (acord II)",
              "6. Practica maj7#5 (acord III augmented)",
              "7. Connecta arpegis en progressions"
            ],
            practice: "Arpegis característics d'harmònica menor. Vocabulari exòtic",
            progression: "Fraseig sobre progressions amb harmònica menor",
            duration: "25 min/dia",
          },
          {
            id: "2.3",
            title: "Diminished Scales",
            emoji: "⭕",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. A 'Settings', tria 'Diminished'",
              "4. Practica 'Whole-Half' (per acords dim7)",
              "5. Practica 'Half-Whole' (per acords V7b9)",
              "6. Patrons simètrics en totes les posicions"
            ],
            practice: "Patrons simètrics en totes les posicions. Aplicació sobre acords dim7 i V7b9",
            progression: "Simetria i aplicació",
            duration: "25 min/dia",
          },
          {
            id: "2.3b",
            title: "Simetria Diminished",
            emoji: "🔁",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer' > 'Diminished'",
              "3. Nota que l'escala es repeteix cada 3 trastis",
              "4. Practica el mateix lick en 3 posicions diferents",
              "5. Exemple: pattern al trast 5 = mateix pattern trast 8 = mateix trast 11",
              "6. Aplica aquesta simetria per moure't ràpidament pel mànec",
              "7. Combina amb approach tones cromàtics"
            ],
            practice: "Explota la simetria de l'escala. Moviment ràpid pel mànec",
            progression: "Licks que es desplacen simètricament",
            duration: "20 min/dia",
          },
          {
            id: "2.3c",
            title: "Arpegis Diminished 7",
            emoji: "🎪",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Arpeggio Trainer'",
              "3. Tria 'Diminished 7' (dim7)",
              "4. Nota que l'arpegi es repeteix cada 3 trastis (simètric)",
              "5. Practica les 4 inversions",
              "6. Aplica sobre acords V7b9 i dim7",
              "7. Combina amb escala diminished"
            ],
            practice: "Arpegis dim7 simètrics. Aplicació sobre V7b9",
            progression: "Fluïdesa en les 4 inversions",
            duration: "20 min/dia",
          },
          {
            id: "2.3d",
            title: "Intervals en Diminished",
            emoji: "🌀",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer'",
              "3. Configura per escala Diminished",
              "4. Activa intervals: Root, b2, 2, 3, #4, 5, 6, 7",
              "5. Practica trobar intervals dins de l'escala",
              "6. Focus en tensions b9, #9, #11, 13",
              "7. Aplica sobre acords V7alt"
            ],
            practice: "Intervals específics de diminished. Tensions avançades",
            progression: "Navegació ràpida per tensions",
            duration: "25 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 12-14",
        title: "Superposicions i Triad Pairs",
        exercises: [
          {
            id: "2.4",
            title: "Superposicions de tríades",
            emoji: "🎨",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Triad Trainer'",
              "3. Tria dues tríades adjacents",
              "4. Exemple: G major + A major sobre Cmaj7",
              "5. Exemple: Eb major + F major sobre Cm7",
              "6. Connecta-les en tot el mànec"
            ],
            practice: "G major + A major sobre Cmaj7, Eb major + F major sobre Cm7. Connecta en tot el mànec",
            progression: "Combinacions avançades",
            duration: "20 min/dia",
          },
          {
            id: "2.4b",
            title: "Triad Pairs en moviment",
            emoji: "🎪",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Triad Trainer'",
              "3. Tria dos tríades (ex: D major + E major)",
              "4. Practica alternar entre les dues tríades",
              "5. Crea melodies combinant notes de les dues",
              "6. Aplica sobre acord Amaj7 (D i E són graus 4 i 5)",
              "7. Practica en totes les posicions del mànec"
            ],
            practice: "Alterna tríades creant melodies. Aplicació sobre diferents acords",
            progression: "Fraseig modern amb triad pairs",
            duration: "25 min/dia",
          },
          {
            id: "2.4c",
            title: "Upper Structure Triads",
            emoji: "🏗️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Chord Trainer'",
              "3. Visualitza acord base (ex: G7)",
              "4. Superposa tríada lluny (ex: Db major sobre G7)",
              "5. Resultat: tensions b9, #11, b13",
              "6. Practica amb diferents combinacions",
              "7. Aplica a progressions II-V-I"
            ],
            practice: "Tríades superiors sobre dominants. Tensions complexes",
            progression: "Voicings moderns",
            duration: "30 min/dia",
          },
          {
            id: "2.5",
            title: "Quartal Harmony",
            emoji: "🔲",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer'",
              "3. A 'Settings', activa intervals de 4a",
              "4. Construeix voicings apilant 4es",
              "5. Practica en tot el mànec",
              "6. Aplica a comping modern i melodies angulars"
            ],
            practice: "Construeix voicings de quartes en tot el mànec. Comping modern i melodies angulars",
            progression: "Aplicació compositiva",
            duration: "15 min/dia",
          },
          {
            id: "2.5b",
            title: "Stacked Fourths Melodies",
            emoji: "📊",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer' amb 4tes",
              "3. Practica salts de 4a en melodies (C-F-Bb-Eb...)",
              "4. Crea línies melòdiques amb aquest interval",
              "5. Aplica sobre modes (especialment Lydian i Dorian)",
              "6. Combina amb altres intervals per varietat",
              "7. Escolta el so modern i angular"
            ],
            practice: "Melodies basades en quartes. So contemporani",
            progression: "Vocabulari angular fusion",
            duration: "20 min/dia",
          },
          {
            id: "2.5c",
            title: "Quartal micro-voicings (2 formes) + canvi ràpid",
            emoji: "🧱",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Interval Trainer' (4tes) o 'Chord Trainer'",
              "3. Aprèn 2 formes de quartes (mateixa tonalitat)",
              "4. Alterna-les cada 2 compassos",
              "5. Canvia de cordes (2-5, 3-6, 1-4)",
              "6. Aplica sobre Dorian o Lydian",
              "7. Tanca amb 30s de comping lliure"
            ],
            practice: "Comping modern amb poques formes.",
            progression: "Afegir una 3a forma",
            duration: "10-12 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 15-16",
        title: "Substitucions Harmòniques",
        exercises: [
          {
            id: "2.6",
            title: "Tritone Substitutions",
            emoji: "🔄",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Changes Trainer'",
              "3. Visualitza un acord V7",
              "4. Visualitza el seu substitut bII7 (tritò de distància)",
              "5. Practica resolucions sobre turnarounds",
              "6. Aplica a progressions II-V-I"
            ],
            practice: "Resol tensions sobre substitucions. Aplicació en turnarounds i progressions II-V-I",
            progression: "Reharmonització avançada",
            duration: "20 min/dia",
          },
          {
            id: "2.7",
            title: "Approach Notes i Chromatisme",
            emoji: "🎯",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona una escala diatònica",
              "3. Practica approach notes cromàtics (1/2 to amunt/avall)",
              "4. Combina notes diatòniques amb cromàtiques",
              "5. Aplica a fraseig melòdic"
            ],
            practice: "Diatònic + cromàtic approach d'1/2 to",
            progression: "Fraseig cromàtic",
            duration: "25 min/dia",
          },
          {
            id: "2.7b",
            title: "Enclosures (2 notes) cap a la nota target",
            emoji: "🧲",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer' (II-V-I) o tria un acord",
              "3. Escull una nota target (3a o 7a)",
              "4. Fes enclosure: 1 nota a dalt + 1 nota a baix → target",
              "5. Repeteix el mateix target 8 cops",
              "6. Canvia de target",
              "7. Canvia de posició"
            ],
            practice: "Cromatisme que sona jazz sense pensar massa.",
            progression: "Enclosures dobles (3 notes)",
            duration: "8-10 min/dia",
          },
          {
            id: "2.7c",
            title: "V7alt en 20 segons: tria 1 nota 'bruta' i resol",
            emoji: "🧨",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer' i tria un II-V-I (ex: Dm7 → G7 → Cmaj7)",
              "3. Al V7 (G7), escull UNA tensió (b9 o #9 o b13)",
              "4. Regla: al V7 toca només 3a, 7a i la tensió escollida",
              "5. Al I (Cmaj7) resol sempre a 3a o 7a",
              "6. 20s: repeteix només aquesta idea",
              "7. Canvia la tensió i torna-hi"
            ],
            practice: "Outside molt controlat, zero fum.",
            progression: "Afegeix una 2a tensió (b9 + #9, etc.)",
            duration: "6-8 min/dia",
          },
          {
            id: "2.7d",
            title: "Família diminished d'un dominant (4 dominants = mateix material)",
            emoji: "🧬",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer' > 'Diminished (Half-Whole)'",
              "3. Tria un dominant b9 (ex: G7b9)",
              "4. Mou el mateix lick a +3 trastis: G7 → Bb7 → Db7 → E7",
              "5. Escolta: és el mateix color perquè comparteixen el dim7",
              "6. Resol sempre a C (major o minor)",
              "7. Repeteix amb A7b9 (A → C → Eb → F#)"
            ],
            practice: "Entendre simetria i substitucions 'gratis'.",
            progression: "Aplica-ho en un turnaround real",
            duration: "10-12 min/dia",
          },
          {
            id: "2.7e",
            title: "Tritone + 2 notes guia (3a/7a) sense perdre't",
            emoji: "🪞",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer' amb II-V-I",
              "3. Al V7 (G7), toca només 3a i 7a",
              "4. Substitueix mentalment per Db7 (tritò)",
              "5. Torna a tocar només 3a i 7a (ara són F i Cb/B)",
              "6. Alterna 1 compàs G7 → 1 compàs Db7",
              "7. Resol sempre a Cmaj7"
            ],
            practice: "Fer substitucions sense caos: només guia tones.",
            progression: "Afegeix UNA tensió a cada dominant",
            duration: "12-15 min/dia",
          },
          {
            id: "2.7f",
            title: "Backdoor II-V (ivm7 → bVII7 → I) en micro-frases",
            emoji: "🚪",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer'",
              "3. Pensa en C major: Fm7 → Bb7 → Cmaj7",
              "4. Regla: 2 notes per acord (3a i 7a)",
              "5. Després fes 1 nota cromàtica d'enllaç entre acords",
              "6. Canvia de tonalitat (G: Cm7 → F7 → Gmaj7)",
              "7. 3 rondes ràpides"
            ],
            practice: "Substitució que sona super 'jazz' amb poques notes.",
            progression: "Afegeix b9 a Bb7 o #11 a F7 (segons gust)",
            duration: "10-12 min/dia",
          },
          {
            id: "2.7g",
            title: "Dominant sus → dominant alt (mateix root)",
            emoji: "🧲",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Chord Trainer' o 'Arpeggio Trainer'",
              "3. Tria G7sus4 (o G9sus) i toca 30s només notes 'sus'",
              "4. Sense canviar root, passa a G7alt",
              "5. Tria UNA tensió (b9 o #9 o b13) i toca 30s",
              "6. Resol a Cmaj7",
              "7. Repeteix amb D7sus → D7alt → Gmaj7"
            ],
            practice: "Contrastos dins del mateix dominant (molt fusion).",
            progression: "Fes-ho en 2 zones del mànec",
            duration: "8-10 min/dia",
          },
          {
            id: "2.7h",
            title: "Acord disminuït de pas (dim7) cap a I",
            emoji: "🧩",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Chord Trainer'",
              "3. En C: toca Cmaj7 → C#dim7 → Dm7 (o Cmaj7 → Bdim7 → Cmaj7)",
              "4. Visualitza el dim7 com a 'pujada cromàtica'",
              "5. Ara improvisa 60s només amb l'arpegi dim7 en el compàs de pas",
              "6. Resol a una nota guia del següent acord",
              "7. Canvia de tonalitat"
            ],
            practice: "Diminished com a cola harmònica (super pràctic).",
            progression: "Afegeix enclosures cap a les notes guia",
            duration: "10-12 min/dia",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Tècniques Avançades i Fusion",
    emoji: "🔥",
    weeks: "Setmanes 17-24",
    objectives: [
      "Desenvolupar tècnica de mà dreta i legato",
      "Dominar outside playing i politonalitat",
      "Integrar elements de rock, funk i música contemporània",
    ],
    sections: [
      {
        weeks: "Setmanes 17-19",
        title: "Tècnica de Picking i Legato",
        exercises: [
          {
            id: "3.1",
            title: "Alternate Picking a alta velocitat",
            emoji: "⚡",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. Tria qualsevol escala (recom: Major o Pentatònica)",
              "4. Practica patterns a 16th notes",
              "5. Comença a 80 BPM amb metrònom",
              "6. Augmenta gradualment fins a 160+ BPM",
              "7. Focus en economia de moviment"
            ],
            practice: "Patterns a 16th notes. Metrònom: 80 BPM → 160+ BPM",
            progression: "Augment gradual de tempo",
            duration: "30 min/dia",
          },
          {
            id: "3.1b",
            title: "String Skipping amb Solo App",
            emoji: "🦘",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Arpeggio Trainer'",
              "3. Tria arpegis amplis (maj7, min7)",
              "4. Practica saltant cordes amb alternate picking",
              "5. Focus: sincronització mà dreta-esquerra",
              "6. Augmenta tempo gradualment",
              "7. Aplica a totes les posicions CAGED"
            ],
            practice: "String skipping controlat. Sincronització perfecta",
            progression: "Velocitat i precisió",
            duration: "25 min/dia",
          },
          {
            id: "3.1c",
            title: "Burst Picking (explosions curtes)",
            emoji: "💥",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Scale Trainer' (Major o Pentatònica)",
              "3. Posa metrònom a 90 BPM",
              "4. Fes 2 compassos tranquils (8enes)",
              "5. Després 1 compàs burst (16enes ràpides)",
              "6. Torna a relaxar 2 compassos",
              "7. Repeteix 10 cops"
            ],
            practice: "Velocitat real sense tensió constant.",
            progression: "Augmenta BPM o allarga el burst a 2 compassos",
            duration: "12 min/dia",
          },
          {
            id: "3.1d",
            title: "Accents (4 notes) a 16enes",
            emoji: "🔊",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Scale Trainer'",
              "3. Tria un patró de 4 notes (ex: 1-2-3-4)",
              "4. Toca 16enes i accentua cada 4a nota",
              "5. Després accentua cada 3a (polirítmia 3 sobre 4)",
              "6. Mantén la mà dreta relaxada",
              "7. Canvia de posició"
            ],
            practice: "Control rítmic (molt fusion) sense canviar notes.",
            progression: "Accents cada 5a nota (si aguantes el groove)",
            duration: "14 min/dia",
          },
          {
            id: "3.1e",
            title: "Legato '1 pick per corda'",
            emoji: "🪶",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Scale Trainer' > 3NPS",
              "3. Regla: només 1 atac amb púa per corda",
              "4. La resta hammer-ons / pull-offs",
              "5. Posa't un tempo baix (70-90 BPM)",
              "6. Fes 3 passades lentes i perfectes",
              "7. Puja 5 BPM"
            ],
            practice: "So fluid i control de mà esquerra.",
            progression: "Afegeix slides per connectar posicions",
            duration: "16 min/dia",
          },
          {
            id: "3.1f",
            title: "Palm-mute + release (dinàmica)",
            emoji: "🎚️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Toca 'Scale Trainer' o un lick curt",
              "3. 4 compassos amb palm-mute",
              "4. 4 compassos sense palm-mute (obert)",
              "5. Mantén el mateix tempo",
              "6. Escolta com canvia el groove",
              "7. Aplica a un backing track"
            ],
            practice: "Tècnica + musicalitat (no només velocitat).",
            progression: "Combina amb accents (3.1d)",
            duration: "10 min/dia",
          },
          {
            id: "3.2",
            title: "Legato Extensions",
            emoji: "🌊",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. Tria patterns amplis pel mànec",
              "4. Practica 3-4 notes per corda",
              "5. Focus en hammer-ons i pull-offs",
              "6. Dinàmica i articulació clara"
            ],
            practice: "Hammer-ons i pull-offs, 3-4 notes per corda. Focus: dinàmica i articulació",
            progression: "Claredat i velocitat",
            duration: "25 min/dia",
          },
          {
            id: "3.2b",
            title: "Legato diagonal",
            emoji: "↗️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer' > escales 3NPS",
              "3. Practica legato diagonal pel mànec",
              "4. Exemple: ascendent de trast 3 a trast 15",
              "5. Només 1 nota amb púa per corda, resta legato",
              "6. Descendent: mateix patró a l'inrevés",
              "7. Visualitza amb Solo App mentre toques"
            ],
            practice: "Legato diagonal. Cobreix tot el mànec amb fluïdesa",
            progression: "Velocitat sense perdre claredat",
            duration: "30 min/dia",
          },
          {
            id: "3.3",
            title: "Hybrid Picking",
            emoji: "🤏",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. Tria patrons amb salts de corda",
              "4. Practica púa (p) + dits (m, a)",
              "5. Combina cordes no adjacents",
              "6. Augmenta complexitat gradualment"
            ],
            practice: "Púa + dits (m, a) per salts de corda",
            progression: "Combinacions complexes",
            duration: "20 min/dia",
          },
          {
            id: "3.3b",
            title: "Hybrid Picking amb Arpegis",
            emoji: "💎",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Arpeggio Trainer'",
              "3. Tria maj7, min7, dom7 extensions",
              "4. Practica: púa en cordes greus, dits en agudes",
              "5. Pattern típic: p-p-m-a o p-m-a-m",
              "6. Aplica a progressions II-V-I",
              "7. Focus en so uniforme entre púa i dits"
            ],
            practice: "Hybrid picking en arpegis. So consistent",
            progression: "Aplicació musical",
            duration: "25 min/dia",
          },
          {
            id: "3.3c",
            title: "Hybrid + accents (3 sobre 4)",
            emoji: "🥁",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer' (qualsevol escala)",
              "3. Toca 16enes suaus",
              "4. Accentua cada 3a nota (3:4)",
              "5. Fes-ho amb hybrid (p + dits)",
              "6. Mantén el volum uniforme",
              "7. Canvia de posició"
            ],
            practice: "Cervell + mà dreta (fusion total).",
            progression: "Accentua cada 5a nota",
            duration: "8-12 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 20-22",
        title: "Outside Playing",
        exercises: [
          {
            id: "3.4",
            title: "Side-Stepping",
            emoji: "↔️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. Tria una escala (ex: C Major)",
              "4. Visualitza la mateixa escala 1/2 to amunt (Db Major)",
              "5. Alterna between inside (C) i outside (Db)",
              "6. Crea tensió i resolució"
            ],
            practice: "Alterna inside/outside. Crea tensió i resolució",
            progression: "Tensió controlada",
            duration: "20 min/dia",
          },
          {
            id: "3.5",
            title: "Superimposició d'acords",
            emoji: "🎨",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Chord Trainer'",
              "3. Exemple: Visualitza Gmaj7#11 sobre Cmaj7",
              "4. Exemple: Visualitza Dbmaj7 sobre G7",
              "5. Canvia entre centres tonals",
              "6. Practica politonalitat"
            ],
            practice: "Gmaj7#11 sobre Cmaj7, Dbmaj7 sobre G7. Canvia entre centros",
            progression: "Politonalitat",
            duration: "25 min/dia",
          },
          {
            id: "3.6",
            title: "Whole Tone i Augmented Scales",
            emoji: "🌟",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. Tria 'Whole Tone' scale",
              "4. Practica patrons simètrics",
              "5. Canvia a 'Augmented' scale",
              "6. Explora sonoritats dissonants i resolucions"
            ],
            practice: "Patrons simètrics, exploració sonora. Dissonància i resolució",
            progression: "Moments dramàtics",
            duration: "20 min/dia",
          },
          {
            id: "3.6b",
            title: "Arpegis Augmented",
            emoji: "➕",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Arpeggio Trainer'",
              "3. Tria 'Augmented' triads",
              "4. Nota la simetria: es repeteix cada 4 trastis",
              "5. Practica les 3 inversions",
              "6. Aplica sobre acords maj7#5",
              "7. Combina amb whole tone scale"
            ],
            practice: "Arpegis augmented simètrics. Inversions",
            progression: "Sonoritat exòtica",
            duration: "20 min/dia",
          },
          {
            id: "3.6c",
            title: "Intervals amb Random Root",
            emoji: "🎲",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer'",
              "3. A 'Settings', tria 'Random Root'",
              "4. Activa tots els intervals",
              "5. L'app et demanarà intervals amb tòniques aleatòries",
              "6. Exemple: '7th from F#', després '3rd from Bb'",
              "7. Màxima dificultat - domini complet del mànec"
            ],
            practice: "Intervals amb tòniques aleatòries. Màxima dificultat",
            progression: "Domini absolut del mànec",
            duration: "25 min/dia",
          },
          {
            id: "3.6d",
            title: "Outside 1 compàs: entra fora, resol dins",
            emoji: "🚪",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer'",
              "3. Tria una escala inside (ex: C major)",
              "4. Tria una escala outside (ex: Db major)",
              "5. Fes 1 compàs outside, 1 compàs inside",
              "6. Repeteix 8 vegades",
              "7. Canvia d'escala i tonalitat"
            ],
            practice: "Outside amb control (no random).",
            progression: "Outside 2 compassos",
            duration: "10-12 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 23-24",
        title: "Integració Fusion",
        exercises: [
          {
            id: "3.7",
            title: "Pentatòniques Modals",
            emoji: "🎸",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer'",
              "3. Tria pentatònica menor (ex: E minor pent.)",
              "4. Superposa sobre Cmaj7",
              "5. Tria F# minor pent. i superposa sobre Dmaj7",
              "6. Practica totes les combinacions possibles"
            ],
            practice: "E minor pent. sobre Cmaj7, F# minor pent. sobre Dmaj7. Totes les combinacions",
            progression: "Totes les superposicions",
            duration: "30 min/dia",
          },
          {
            id: "3.8",
            title: "Riffs i Grooves Funk",
            emoji: "🕺",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Mode Trainer'",
              "3. Tria 'Mixolydian'",
              "4. Afegeix blue notes",
              "5. Desenvolupa vocabulari rítmic",
              "6. Practica sincopes, ghost notes, muted strings"
            ],
            practice: "Desenvolupa vocabulari rítmic. Sincopes, ghost notes, muted strings",
            progression: "Groove i pocket",
            duration: "25 min/dia",
          },
          {
            id: "3.8b",
            title: "Pentatòniques amb Blues Notes",
            emoji: "🎵",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer' > Pentatonic",
              "3. Tria pentatònica menor (ex: A minor pentatonic)",
              "4. Afegeix blue note (b5)",
              "5. Practica en totes les posicions del mànec",
              "6. Aplica bends i vibrato",
              "7. Combina amb licks de rock i blues"
            ],
            practice: "Pentatòniques amb blue notes. Bends i vibrato",
            progression: "Fusió de blues i jazz",
            duration: "25 min/dia",
          },
          {
            id: "3.8c",
            title: "Changes Trainer: II-V-I",
            emoji: "🔢",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Changes Trainer'",
              "3. Tria progressió 'II-V-I' en Major",
              "4. Practica intervals sobre cada acord",
              "5. Comença amb Root, 3rd, 7th",
              "6. Afegeix tensions: 9, 11, 13",
              "7. Activa 'Random Transposition' per diferents tonalitats"
            ],
            practice: "II-V-I en totes les tonalitats. Intervals i tensions",
            progression: "Fluïdesa en canvis d'acords",
            duration: "30 min/dia",
          },
          {
            id: "3.8d",
            title: "Changes Trainer: Jazz Standards",
            emoji: "🎺",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Changes Trainer'",
              "3. Tria un standard (ex: 'Autumn Leaves')",
              "4. Practica intervals sobre la progressió completa",
              "5. Focus en chord tones primer",
              "6. Després afegeix approach notes i tensions",
              "7. Practica a diferents tempos"
            ],
            practice: "Standards amb Solo App. Chord tones i tensions",
            progression: "Navegació sobre changes",
            duration: "35 min/dia",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Repertori i Aplicació Musical",
    emoji: "🎼",
    weeks: "Setmanes 25+",
    objectives: [
      "Aplicar tots els conceptes en contextos musicals reals",
      "Desenvolupar veu personal i fraseig",
      "Transcriure i analitzar mestres del gènere",
    ],
    sections: [
      {
        weeks: "Continu",
        title: "Transcripcions i Anàlisi",
        exercises: [
          {
            id: "4.1",
            title: "Transcripcions de mestres (amb Changes Trainer)",
            emoji: "👨‍🎓",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Changes Trainer'",
              "3. Tria un standard que ja coneguis (ex: 'Autumn Leaves')",
              "4. A 'Settings', activa 'Random Transposition' (si vols evitar memoritzar posicions)",
              "5. A 'Intervals', comença només amb Root, 3rd i 7th",
              "6. Prem 'Start' i toca només chord tones sobre cada acord",
              "7. Després activa tensions (9, 11, 13) i repeteix",
              "8. Quan ja surt fluid, prova 'Approach Notes' (si l'opció existeix) o afegeix cromatismes manualment"
            ],
            practice: "Tria 4-8 compassos d'un solo real. Identifica el que passa sobre cada acord (chord tones → tensions → cromatismes).",
            progression: "Augmenta el nombre d'acords/compassos i la velocitat de resposta",
            duration: "20-40 min",
          },
          {
            id: "4.2",
            title: "Revisió de zones febles (Fret Range)",
            emoji: "🧱",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Note Trainer'",
              "3. A 'Settings' > 'Fret Range', limita a una franja (ex: 0-5)",
              "4. Activa totes les cordes",
              "5. Deixa totes les notes actives",
              "6. Prem 'Start' i respon ràpid",
              "7. Canvia la franja a 5-9 i 9-12 en dies diferents",
              "8. Final: treu la limitació i comprova si la zona ja està equilibrada"
            ],
            practice: "10 minuts per franja. Objectiu: trobar la nota en < 2 segons.",
            progression: "Fes el mateix amb 'Interval Trainer' (root fixed) dins la mateixa franja",
            duration: "20-30 min",
          },
          {
            id: "4.3",
            title: "Jam sessions (Inside/Outside amb Side-Stepping)",
            emoji: "🎤",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Scale Trainer'",
              "3. Tria una escala que estiguis treballant (ex: Dorian)",
              "4. Practica-la 'inside' 1 minut",
              "5. Canvia la tonalitat +1 semitò (side-step) i toca 1 minut",
              "6. Torna a la tonalitat original i resol",
              "7. Repeteix (inside 2 compassos / outside 2 compassos)",
              "8. Si tens backing track, fes el mateix mentre sona l'acompanyament"
            ],
            practice: "Alterna inside/outside sense perdre el 'target' (3a i 7a de l'acord).",
            progression: "Redueix el temps outside i fes resolucions més ràpides",
            duration: "15-30 min/dia",
          },
          {
            id: "4.4",
            title: "Playing Over Changes (Chord Tones → Tensions)",
            emoji: "🎼",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Changes Trainer'",
              "3. Tria un II-V-I o un standard",
              "4. A 'Intervals', activa només Root, 3rd, 7th",
              "5. Prem 'Start' i toca només aquests intervals",
              "6. Afegeix 9 i 13",
              "7. Afegeix 11 (o #11 si estàs a Lydian/Maj7#11)",
              "8. Repeteix fins que sigui automàtic"
            ],
            practice: "Mapeig de chord tones i tensions sobre progressions completes.",
            progression: "Passa de 'Fixed root' a 'Random root/Random transposition'",
            duration: "20-35 min",
          },
          {
            id: "4.5",
            title: "Intervals: mode 'Reverse' (si disponible)",
            emoji: "🔁",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Interval Trainer'",
              "3. A 'Root Note', comença 'Fixed' (ex: C)",
              "4. A 'Intervals', activa Root, 3rd, 5th, 7th",
              "5. Si hi ha opció 'Reverse', activa-la (ordre invers)",
              "6. Prem 'Start' i respon sense mirar patrons",
              "7. Canvia a 'Random root'",
              "8. Objectiu: zero dubtes en qualsevol corda"
            ],
            practice: "Treballar la resposta mental a intervals, no a shapes.",
            progression: "Afegeix 9, 11, 13 i b9/#9",
            duration: "15-25 min",
          },
          {
            id: "4.6",
            title: "Triad Pairs (entrenament de colors)"
            ,
            emoji: "🧩",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Triads' (o el mòdul de triades que tinguis)",
              "3. Tria un acord base (ex: Cmaj7)",
              "4. Configura un parell de triades (ex: G major + A major)",
              "5. Practica connectant les dues triades per tot el mànec",
              "6. Evita repetir la mateixa posició: força't a moure't",
              "7. Canvia d'acord base (Fmaj7, Dm7, G7)",
              "8. Si no hi ha 'Triad Pairs', fes-ho manualment amb 'Chord/Arpeggio/Scale Trainer'"
            ],
            practice: "Connectar triades per obtenir tensions (9, #11, 13) sense pensar en escales.",
            progression: "Augmenta la velocitat i canvia de parells cada 2 minuts",
            duration: "20-30 min",
          },
          {
            id: "4.7",
            title: "Arpeggio Trainer: 7th chords + extensions",
            emoji: "🪜",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Arpeggio Trainer'",
              "3. A 'Chord Types', activa Maj7, Min7, Dom7",
              "4. Afegeix extensions si existeix: 9, 11, 13",
              "5. Practica en una tonalitat (ex: C) en tot el mànec",
              "6. Activa 'Random' (arpegi aleatori) si hi és",
              "7. Objectiu: trobar 3a i 7a al moment",
              "8. Després, canta el grau mentre el toques (si vols reforçar oïda)"
            ],
            practice: "Arpegis com a 'GPS' sobre changes: 3a/7a primer, extensions després.",
            progression: "Fes-ho dins 'Changes Trainer' amb arpegis en lloc d'escales",
            duration: "20-30 min",
          },
          {
            id: "4.8",
            title: "Chord Trainer: Drop-2 / inversions (si disponible)",
            emoji: "🧠",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Chord Trainer'",
              "3. Selecciona Maj7, Min7, Dom7",
              "4. Si hi ha 'Inversions' o 'Drop-2', activa-ho",
              "5. Limita a 2-3 jocs de cordes (ex: 1-4 o 2-5) si tens aquesta opció",
              "6. Prem 'Start' i toca la inversió indicada",
              "7. Canvia de tonalitat",
              "8. Objectiu: comping net i ràpid"
            ],
            practice: "Voicings i inversions per comping modern (fusion).",
            progression: "Afegeix tensions (9, 13) quan sigui estable",
            duration: "15-25 min",
          },
          {
            id: "4.9",
            title: "Changes Trainer: tempos + randomització",
            emoji: "⏱️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Training' > 'Changes Trainer'",
              "3. Tria II-V-I o un standard",
              "4. A 'Settings', activa 'Random Transposition'",
              "5. Comença amb intervals simples (Root/3rd/7th)",
              "6. Puja el tempo o redueix el temps per resposta (si hi ha opció)",
              "7. Quan fallis 3 cops seguit, baixa una mica i consolida",
              "8. Tanca la sessió amb 2 minuts 'perfect run' (sense errors)"
            ],
            practice: "Consistència: menys errors, més velocitat sense perdre claredat.",
            progression: "Passa a tensions i substitucions (tritone/altered)"
            ,
            duration: "15-30 min",
          },
          {
            id: "4.10",
            title: "Repàs setmanal (cicle de 6 mòduls)",
            emoji: "🗓️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Prepara un cicle de 6 dies (o 6 sessions): Note → Interval → Chord → Arpeggio → Scale → Changes",
              "3. Cada sessió: 10-15 min només un mòdul",
              "4. Mantén el mateix 'Root' 2-3 minuts, després canvia a 'Random'",
              "5. Activa limitacions: fret range / strings / intervals",
              "6. Darrer dia: repeteix el mòdul que t'ha costat més",
              "7. Si tens 'Progress' dins de Solo, fes captura de pantalla del resultat",
              "8. Ajusta la setmana següent segons on falles"
            ],
            practice: "Mantenir tot el sistema de Solo 'viu' sense estancar-se.",
            progression: "Augmenta dificultat cada 2 setmanes (més intervals, més randomització)",
            duration: "60-90 min/setmana (repartit)",
          },
          {
            id: "4.11",
            title: "Micro-transcripció: 30 segons de frase",
            emoji: "🎧",
            soloSteps: [
              "1. Tria un solo (YouTube/Spotify)",
              "2. Agafa només 30 segons",
              "3. Treu 1 frase curteta (2-4 compassos)",
              "4. Porta-la a 2 posicions del mànec",
              "5. Canvia-la: 1 nota diferent (tensió)",
              "6. Toca-la 10 vegades seguides",
              "7. Guarda-la com a 'lick del dia'"
            ],
            practice: "Vocabulari real, en format micro.",
            progression: "Canvia de tonalitat i mantén el shape",
            duration: "10-15 min",
          },
          {
            id: "4.12",
            title: "3 licks, 3 combinacions (barreja i enganxa)",
            emoji: "🧩",
            soloSteps: [
              "1. Tria 3 licks que JA tinguis",
              "2. Toca: lick A → B → C",
              "3. Després: B → C → A",
              "4. Després: C → A → B",
              "5. Entre licks: connecta amb 1 nota (approach)",
              "6. Fes-ho en 2 tonalitats",
              "7. Grava 1 take curta"
            ],
            practice: "Fer ballar el cap amb combinacions noves.",
            progression: "Afegeix un 4t lick",
            duration: "12-18 min",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Harmonia Avançada: Alterats, Diminuïts i Substitucions",
    emoji: "🔥",
    weeks: "Setmanes 33-40",
    objectives: [
      "Aplicar dominant alterada amb intenció melòdica real",
      "Dominar la lògica dels disminuïts simètrics sobre dominants",
      "Fer substitucions de tritó i backdoor amb resolució neta",
    ],
    sections: [
      {
        weeks: "Setmanes 33-36",
        title: "Color alterat i resolució",
        exercises: [
          {
            id: "5.1",
            title: "Dominant alterada 1 acord, 3 resolucions",
            emoji: "🌶️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer'",
              "3. Configura un únic acord dominant (ex: G7)",
              "4. Activa tensions alterades: b9, #9, b5, #5",
              "5. Fes 4 compassos sobre G7alt",
              "6. Resol en Cmaj7, després CmMaj7, després C7",
              "7. Mantén la mateixa frase i canvia només la resolució"
            ],
            practice: "Sentir com la mateixa tensió canvia de funció segons on resol.",
            progression: "Canvia root cada 2 minuts en mode random",
            duration: "12-18 min",
          },
          {
            id: "5.2",
            title: "Línia guia 3a-7a + una alteració",
            emoji: "🧬",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Interval Trainer' o 'Changes Trainer'",
              "3. Practica només 3a i 7a de cada dominant",
              "4. Afegeix UNA sola tensió alterada (b9 o #9)",
              "5. Toca frases de 4 notes: 3a → alteració → 7a → resolució",
              "6. Mou-te per II-V-I en 3 tonalitats"
            ],
            practice: "Control funcional: guia + color, sense sobrecarregar.",
            progression: "Afegeix una segona alteració sense perdre la guia",
            duration: "15 min",
          },
          {
            id: "5.3",
            title: "Diminuït sobre dominant (7b9)",
            emoji: "🕸️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Arpeggio Trainer'",
              "3. Tria acord dominant 7b9 (ex: G7b9)",
              "4. Practica arpegi disminuït des de 3a, 5a, b7 i b9",
              "5. Mou el patró cada 3 semitons (simetria)",
              "6. Resol sempre a Cmaj7 o Cm7",
              "7. Objectiu: que soni musical, no mecànic"
            ],
            practice: "Veure el disminuït com a eina de tensió dirigida.",
            progression: "Afegeix cromatismes d'entrada/sortida",
            duration: "15-20 min",
          },
          {
            id: "5.4",
            title: "Substitució de tritó en II-V-I",
            emoji: "🔄",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer'",
              "3. Configura II-V-I major (Dm7-G7-Cmaj7)",
              "4. Substitueix G7 per Db7",
              "5. Practica 8 voltes alternant V original i tritó",
              "6. Marca al fraseig les notes guia (F/B vs F/Cb)",
              "7. Acaba amb 2 voltes lliures improvisant"
            ],
            practice: "Escoltar i controlar la fricció del tritó abans de resoldre.",
            progression: "Passa-ho a tonalitats amb més alteracions",
            duration: "18-22 min",
          },
        ],
      },
      {
        weeks: "Setmanes 37-40",
        title: "Combinacions avançades i aplicació real",
        exercises: [
          {
            id: "5.5",
            title: "Cadena de dominants alterades",
            emoji: "⛓️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Changes Trainer'",
              "3. Crea cadena: E7alt → A7alt → D7alt → G7alt → Cmaj7",
              "4. Mantén un motiu curt i adapta'l a cada acord",
              "5. Prioritza resolució de semitò cap al següent acord",
              "6. Grava 2 takes i compara"
            ],
            practice: "Continuïtat melòdica dins molta tensió harmònica.",
            progression: "Augmenta tempo mantenint claredat",
            duration: "20 min",
          },
          {
            id: "5.6",
            title: "Backdoor dominant + color bluesy",
            emoji: "🚪",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Chord/Changes Trainer'",
              "3. Practica seqüència: Imaj7 ← bVII7 (backdoor)",
              "4. Ex: Cmaj7 amb Bb7 com a dominant de porta del darrere",
              "5. Combina mixolidi b7 amb cromatismes de blues",
              "6. Tanca sempre amb frase curta de resolució clara"
            ],
            practice: "Afegir sofisticació sense perdre groove.",
            progression: "Barreja backdoor + tritó en una sola roda",
            duration: "12-16 min",
          },
          {
            id: "5.7",
            title: "Micro-licks d'alterats: 4 shapes, 4 tons",
            emoji: "🧠",
            soloSteps: [
              "1. Obre Solo App",
              "2. Tria 4 mini licks sobre dominant alterada (2-4 notes)",
              "3. Toca cada lick en 4 tonalitats",
              "4. Canvia entrada rítmica (a temps, contratemps, anticipat)",
              "5. Connecta 2 licks en una frase de 1 compàs",
              "6. Repeteix fins sonar natural"
            ],
            practice: "Vocabulari curt, reutilitzable i molt pràctic.",
            progression: "Afegeix nota objectiu de resolució a cada lick",
            duration: "10-14 min",
          },
          {
            id: "5.8",
            title: "Challenge final: 3 versions del mateix solo curt",
            emoji: "🏁",
            soloSteps: [
              "1. Obre Solo App o backing track extern",
              "2. Tria una progressió de 8 compassos",
              "3. Fes versió A: sense alteracions",
              "4. Fes versió B: amb una alteració per dominant",
              "5. Fes versió C: alteracions + tritó/substitució",
              "6. Grava les 3 i escolta quina comunica millor",
              "7. Queda't la millor i repeteix-la 5 cops"
            ],
            practice: "Aplicació real i comparativa del teu llenguatge harmònic.",
            progression: "Porta el challenge a una cançó real",
            duration: "20-25 min",
          },
          {
            id: "5.9",
            title: "Triad pair sobre V7alt (major + menor a 1 to)",
            emoji: "🧱",
            soloSteps: [
              "1. Obre Solo App i posa un dominant estàtic (ex: G7alt)",
              "2. Tria dues tríades separades per 1 to (exemple orientatiu)",
              "3. Toca només notes de les dues tríades alternant-les",
              "4. Fes frases de 4 i 6 notes, no escales llargues",
              "5. Resol cada frase a 3a o 9a de Cmaj7",
              "6. Repetició en 3 tonalitats"
            ],
            practice: "Color modern d'alterada amb material petit i controlable.",
            progression: "Canvia el punt d'entrada rítmica i mantén claredat",
            duration: "12-16 min",
          },
          {
            id: "5.10",
            title: "Enclosures dobles cap a 3a i 7a",
            emoji: "🎯",
            soloSteps: [
              "1. Obre Solo App a 'Changes Trainer' (II-V-I)",
              "2. Marca com a objectiu només 3a i 7a del V i del I",
              "3. Per cada target, toca enclosure superior+inferior",
              "4. Fes 8 compassos sense passar de corxeres",
              "5. Quan sigui net, puja tempo 5 bpm",
              "6. Repeteix en 2 tonalitats més"
            ],
            practice: "Precisió melòdica: tensió curta que resol amb intenció.",
            progression: "Afegeix anticipacions en contratemps",
            duration: "10-14 min",
          },
          {
            id: "5.11",
            title: "Diminuït + tritó en una sola volta",
            emoji: "⚡",
            soloSteps: [
              "1. Configura II-V-I (ex: Dm7-G7-Cmaj7)",
              "2. 1a volta: V7b9 amb llenguatge disminuït",
              "3. 2a volta: substitueix V per tritó (Db7)",
              "4. 3a volta: combina 2 compassos de cada enfoc",
              "5. Mantén una nota comuna entre enfocs",
              "6. Grava 1 minut i escolta la coherència"
            ],
            practice: "Canvi de sistema sense perdre línia narrativa.",
            progression: "Mateix exercici en mode menor",
            duration: "16-20 min",
          },
          {
            id: "5.12",
            title: "3 resolucions obligades per cada alteració",
            emoji: "🧪",
            soloSteps: [
              "1. Tria una alteració concreta (b9, #9, b5 o #5)",
              "2. Improvisa 2 compassos sobre dominant",
              "3. Resol obligatòriament a: 3a, 5a i 9a de l'acord destí",
              "4. Canvia alteració i repeteix",
              "5. No canviïs el ritme: només canvia la resolució",
              "6. Fes 4 rondes"
            ],
            practice: "Convertir tensió en resolució conscient i repetible.",
            progression: "Afegeix una nota cromàtica abans de la resolució",
            duration: "12-15 min",
          },
          {
            id: "5.13",
            title: "Backdoor + side-slip d'1 semitò",
            emoji: "🛝",
            soloSteps: [
              "1. Practica seqüència Imaj7 ← bVII7 (backdoor)",
              "2. Cada 2 compassos, desplaça la frase 1 semitò amunt (side-slip)",
              "3. Torna al centre tonal al compàs següent",
              "4. Mantén mateix motiu rítmic durant tota la roda",
              "5. Tanca sempre amb una nota guia clara",
              "6. Fes-ho en tempos lent i mig"
            ],
            practice: "Fricció moderna amb retorn net al centre harmònic.",
            progression: "Combina side-slip + enclosure a la mateixa frase",
            duration: "14-18 min",
          },
          {
            id: "5.14",
            title: "Micro test 5 minuts: alterat, disminuït, tritó",
            emoji: "🧠",
            soloSteps: [
              "1. Posa temporitzador de 5:00",
              "2. Minut 1-2: només dominant alterada",
              "3. Minut 2-3: només disminuït sobre 7b9",
              "4. Minut 3-4: només substitució de tritó",
              "5. Minut 4-5: combinació lliure dels 3",
              "6. Anota quina part et fa fallar més",
              "7. Aquesta part serà el focus de la següent sessió"
            ],
            practice: "Diagnòstic ràpid i ultra pràctic del teu control harmònic.",
            progression: "Repeteix setmanalment i compara resultats",
            duration: "5-8 min",
          },
        ],
      },
    ],
  },
];

export interface DailyRoutine {
  id: string;
  title: string;
  duration: string;
  activities: string[];
}

export const dailyRoutine: DailyRoutine[] = [
  {
    id: "warmup",
    title: "Escalfament",
    duration: "10-15 min",
    activities: [
      "Chromatic exercises",
      "Spider exercises (1-2-3-4 patterns)",
      "String skipping patterns",
    ],
  },
  {
    id: "technique",
    title: "Tècnica",
    duration: "20-30 min",
    activities: [
      "Alternate picking scales",
      "Legato exercises",
      "Arpeggi a tempo controlat",
    ],
  },
  {
    id: "concepts",
    title: "Conceptes Nous",
    duration: "20-30 min",
    activities: [
      "Exercici específic segons fase actual",
      "Utilitzar Solo App per visualització",
      "Practicar lentament amb metrònom",
    ],
  },
  {
    id: "application",
    title: "Aplicació Musical",
    duration: "15-30 min",
    activities: [
      "Backing tracks",
      "Transcripcions",
      "Composició/improvisació",
    ],
  },
  {
    id: "cooldown",
    title: "Cool Down",
    duration: "5-10 min",
    activities: ["Free playing", "Revisió mental del practicat"],
  },
];

export interface Resource {
  id: string;
  type: "course" | "book" | "software" | "video";
  title: string;
  author?: string;
  description: string;
  price?: string;
  url?: string;
}

export const resources: Resource[] = [
  {
    id: "ufv",
    type: "course",
    title: "Ultimate Fretboard Visualization",
    author: "Tom Quayle & David Beebee",
    description: "5 hores de vídeo, 72 lliçons en 12 seccions. Sistema Two-Point d'intervals. Recurs definitiu per Solo App.",
    price: "~$99 USD",
    url: "https://courses.solotrainer.app/",
  },
  {
    id: "vtf",
    type: "course",
    title: "Visualizing the Fretboard",
    author: "Tom Quayle",
    description: "4 hores. Inclou Autumn Leaves, Spain, Inner Urge amb backing tracks.",
    url: "https://tomquayle.co.uk",
  },
  {
    id: "mlt",
    type: "course",
    title: "Modern Legato Technique",
    author: "Tom Quayle",
    description: "Complementa perfectament l'entrenament de visualització.",
    url: "https://tomquayle.co.uk",
  },
  {
    id: "pathways",
    type: "course",
    title: "Pathways Vol. 1 & 2",
    author: "David Beebee",
    description: "Per guitarristes rock/blues que volen entrar al jazz fusion. Vol 1: Teoria essencial. Vol 2: Harmonia avançada.",
    url: "https://davidbeebee.com/courses",
  },
  {
    id: "ag",
    type: "book",
    title: "The Advancing Guitarist",
    author: "Mick Goodrick",
    description: "Llibre clàssic per desenvolupament guitarrístic avançat.",
  },
  {
    id: "mms",
    type: "book",
    title: "Melodic Minor Scale Jazz Studies",
    author: "Dennis Sandole",
    description: "Estudi profund de l'escala melòdica menor.",
  },
  {
    id: "cc",
    type: "book",
    title: "Chord Chemistry",
    author: "Ted Greene",
    description: "Referència essencial per harmonia de guitarra.",
  },
  {
    id: "mjv",
    type: "book",
    title: "Modern Jazz Voicings",
    author: "Ted Pease & Ken Pullig",
    description: "Voicings moderns de jazz.",
  },
  {
    id: "ireal",
    type: "software",
    title: "iReal Pro",
    description: "Backing tracks per practicar progressions.",
  },
  {
    id: "transcribe",
    type: "software",
    title: "Transcribe!",
    description: "Slow down i loop per transcripcions.",
  },
];

export interface WeeklyChecklist {
  id: string;
  text: string;
}

export const weeklyChecklist: WeeklyChecklist[] = [
  { id: "practice5days", text: "He practicat mínim 5 dies aquesta setmana" },
  { id: "recorded", text: "He gravat almenys una sessió per autoavaluació" },
  { id: "transcribed", text: "He transcrit o analitzat material nou" },
  { id: "applied", text: "He aplicat conceptes nous en improvisació" },
  { id: "reviewed", text: "He revisat exercicis anteriors per manteniment" },
];
