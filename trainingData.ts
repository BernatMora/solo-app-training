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
              "3. Tria una escala o patró pentatònic",
              "4. Practica alternate picking: down-up-down-up",
              "5. Comença a 80 BPM i augmenta 10 BPM cada dia",
              "6. Fes strings de 16 notes ascendents i descendents",
              "7. Focus en precisió de mà dreta"
            ],
            practice: "Velocitat progressiva amb alternate picking. Claritat de notes",
            progression: "Augmenta 10 BPM cada dia fins a 180 BPM",
            duration: "20 min/dia",
          },
          {
            id: "3.1b",
            title: "Legato: Hammer-Ons i Pull-Offs",
            emoji: "🎸",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Scale Trainer' > Major Scale",
              "3. Toca només amb mà esquerra: hammer-ons amunt",
              "4. Baixa amb pull-offs sense picar",
              "5. Practica 4 notes per corda",
              "6. Augmenta velocitat gradualment",
              "7. Combina hammer-ons i pull-offs en frases"
            ],
            practice: "Legato fluid sense dependre de la púa. Control de velocitat",
            progression: "Afegeix slides entre hammer-ons",
            duration: "18 min/dia",
          },
          {
            id: "3.1c",
            title: "Slides i Bends",
            emoji: "🛝",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer'",
              "3. Toca una nota i fes slide suau a la següent (half step, whole step)",
              "4. Practica bends: 1 semitò, 2 semitono (un to complet)",
              "5. Retorna a la nota original (release bend)",
              "6. Combina bends amb notes regulars en frases",
              "7. Fes quarter-tone bends (1/4 to)"
            ],
            practice: "Intonació de bends. Expresió amb tècnica avançada",
            progression: "Unison bends (dos cordes): toca 2 notes alhora i fes bend a una",
            duration: "15 min/dia",
          },
          {
            id: "3.1d",
            title: "Tècnica híbrida: pick + dits",
            emoji: "👆",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer' > pentatònic menor",
              "3. Toca amb púa: notas greus (cordes 6, 5)",
              "4. Toca amb dits: notes agudes (cordes 3, 2, 1)",
              "5. Alterna ràpidament",
              "6. Practica frases que combinin pick i dits",
              "7. Aplica a patterns de funk o rock"
            ],
            practice: "Versatilitat en picking. Velocitat híbrida",
            progression: "Fes-ho a tempo ràpid (140+ BPM)",
            duration: "12 min/dia",
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
              "3. Toca una escala diatònica (ex: C major)",
              "4. 'Side-step': transposiciona la mateixa escala 1 trast amunt",
              "5. Alterna entre C major i C# major per 2-4 compàsos",
              "6. Retorna a C major (resolució)",
              "7. Practica amb altres escalas i intervals"
            ],
            practice: "Outside playing controlat. Retorn a la tonalitat",
            progression: "Fes side-stepping a intervals més llargs (half-step, whole-step)",
            duration: "20 min/dia",
          },
          {
            id: "3.4b",
            title: "Cromatisme: scalar approach",
            emoji: "🔤",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer'",
              "3. Toca escales cromàtiques: C-C#-D-D#-E...",
              "4. Limita a 2-3 trastis de moviment",
              "5. Practica approach cromàtic a intervals específics",
              "6. Ex: C → B → Bb (approach a Bb des de dalt i baix)",
              "7. Combina cromatisme amb notas diatòniques"
            ],
            practice: "Precisió cromàtica. Retorn a referents harmònics",
            progression: "Cromatisme aleatori sense perdre direcció melòdica",
            duration: "18 min/dia",
          },
          {
            id: "3.4c",
            title: "Obertura de Tritó (aug5 / dim5)",
            emoji: "⭕",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Interval Trainer' > tritó",
              "3. Toca un interval de tritó (C - F#)",
              "4. Usa aquest interval com 'outside reference'",
              "5. Rodeja-ho amb notas diatòniques que resolen",
              "6. Aplica sobre acordes dominants",
              "7. Crea melodies que passen per tritó"
            ],
            practice: "Tensió i resolució amb tritó. Color atrevit",
            progression: "Encadena múltiples tritones",
            duration: "15 min/dia",
          },
        ],
      },
      {
        weeks: "Setmanes 23-24",
        title: "Ritme i Groove Fusion",
        exercises: [
          {
            id: "3.7",
            title: "Rhythm Trainer: Sincopes i Ghost Notes",
            emoji: "🥁",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Rhythm Trainer' (si està disponible)",
              "3. Configura metrònom a 90 BPM",
              "4. Practica sincopes: toca anticipant l'última part del beat",
              "5. Afegeix ghost notes (notes apagades entre notas normals)",
              "6. Pattern: regular note → ghost note → regular note",
              "7. Alterna mà dreta: down-up-down-up amb dinàmica variable"
            ],
            practice: "Ritme sincopat amb grooves funk. Ghost notes efectives",
            progression: "Augmenta tempo a 120 BPM. Afegeix polirítmies simples",
            duration: "15 min/dia",
          },
          {
            id: "3.7b",
            title: "Metrònom Trainer: Polirítmies (3:4 sobre 4/4)",
            emoji: "⏸️",
            soloSteps: [
              "1. Obre Solo App",
              "2. Configura Metrònom Trainer (o usa metrònom extern)",
              "3. Metrònom a 90 BPM en 4/4",
              "4. Toca triplets (3 notes) mentre metrònom és 4/4",
              "5. Practica accents: 1a nota del triplet sempre acentuada",
              "6. Pattern: accent-soft-soft-accent-soft-soft...",
              "7. Accelera gradualment sense perdre sincronització"
            ],
            practice: "Independència rítmica. Polirítmia natural",
            progression: "Afegeix 5:4, 2:3 polirítmies. Combina amb Scale Trainer",
            duration: "10-12 min/dia",
          },
          {
            id: "3.7c",
            title: "Alternate Picking amb Sincopes: mà dreta independent",
            emoji: "🎯",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Scale Trainer' > Major Scale",
              "3. Toca 16enes suaus en alternate picking",
              "4. Accentua cada 3a nota (3:4 sobre pulse)",
              "5. Fes-ho amb hybrid picking (pick + dits)",
              "6. Mantén volum uniforme en notes no-acentuades",
              "7. Cangia de posició sense perdre sincronització"
            ],
            practice: "Cervell + mà dreta: fusió total entre tècnica i ritme",
            progression: "Accentua cada 5a nota. Afegeix polirítmies més complexes",
            duration: "12 min/dia",
          },
          {
            id: "3.7d",
            title: "Groove Pattern: 16enes funk amb Notes Trainer",
            emoji: "🎸",
            soloSteps: [
              "1. Obre Solo App",
              "2. Entra a 'Note Trainer'",
              "3. Configura metrònom a 90 BPM",
              "4. Toca pentatònic menor amb groove funk:",
              "5. Pattern típic: root → octava → root (amb anticipacions)",
              "6. Usa picking híbrid per groove net",
              "7. Varia el patró cada compàs mantenint feel"
            ],
            practice: "Groove funk amb notes específiques. Feel i precisió",
            progression: "Augmenta a 120 BPM. Afegeix color harmònic (intervals)",
            duration: "18 min/dia",
          },
        ],
      },
    ],
  },
];
