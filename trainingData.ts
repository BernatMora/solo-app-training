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
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Repertori i Aplicació Musical",
    emoji: "🎼",
    weeks: "Setmanes 25-28",
    objectives: [
      "Aplicar tots els conceptes en contextos musicals reals",
      "Desenvolupar veu personal i fraseig",
      "Transcriure i analitzar mestres del gènere",
    ],
    sections: [
      {
        weeks: "Setmanes 25-26",
        title: "Changes i Standards",
        exercises: [
          {
            id: "4.1",
            title: "Changes Trainer amb Backing Tracks",
            emoji: "🎺",
            soloSteps: [
              "1. Obre Solo App",
              "2. Selecciona 'Changes Trainer'",
              "3. Tria un standard (ex: 'Autumn Leaves', 'All The Things You Are', 'Spain')",
              "4. Activa backing track (si està disponible dins Solo)",
              "5. Practica intervals sobre cada canvi d'acord",
              "6. Comença amb Root, 3rd, 7th",
              "7. Afegeix tensions graduals (9, 11, 13)",
              "8. Improvisa 2 minuts sobre la progressió completa"
            ],
            practice: "Navegació segura sobre changes reals. Tensió i resolució",
            progression: "Passa a standards més complexos. Velocitat més ràpida",
            duration: "30-40 min",
          },
          {
            id: "4.1b",
            title: "Transcripció de solo real (com a referència)",
            emoji: "👨‍🎓",
            soloSteps: [
              "1. Tria un solo de master (ex: John Coltrane, Pat Metheny, etc.)",
              "2. Escull només 8 compassos",
              "3. Canta la melodia primero (entrenament d'oïda)",
              "4. Toca-la lentament al mànec",
              "5. Enregistra la teva versió",
              "6. Compara amb l'original",
              "7. Identifica intervals clau i tensions usades"
            ],
            practice: "Aprendre vocabulari real de mestres. Intonació i timing",
            progression: "Augmenta a 16 compassos. Adapta el solo a altres tonalitats",
            duration: "20-30 min",
          },
          {
            id: "4.1c",
            title: "Jam session enfocada: una progressió, 10 minuts continus",
            emoji: "🎤",
            soloSteps: [
              "1. Configura una progressió ii-V-I o un standard",
              "2. Poseu backing track (o metrònom)",
              "3. Objetu: improvisar contínuament 10 minuts",
              "4. Focus en: 1) harmonia clara, 2) licks musicals, 3) respiració",
              "5. Enregistra els primers 2 minuts (referència)",
              "6. Repeteix 2-3 vegades aquesta sessió",
              "7. Compara gravacions per escoltar progrés"
            ],
            practice: "Stamina mental i musical. Construcció de solos coherents",
            progression: "Passar a 15-20 minuts. Afegir comping opcional",
            duration: "15-25 min",
          },
        ],
      },
      {
        weeks: "Setmanes 27-28",
        title: "Aplicació lliure i assaigs",
        exercises: [
          {
            id: "4.2",
            title: "Mock Recording Session",
            emoji: "🎙️",
            soloSteps: [
              "1. Prepara backing track (iReal Pro, YouTube, o app)",
              "2. Setmana 1: grava 2-3 takes d'una progressió",
              "3. Escolta i nota: claredat, groove, creativitat",
              "4. Setmana 2: repeteix la mateixa progressió",
              "5. Compara takes setmana 1 vs setmana 2",
              "6. Documenta: BPM, durada, quants licks nous heu creat",
              "7. Celebra les millores (mesmo si petites)"
            ],
            practice: "Tracking de progrés real. Documentació de creixement",
            progression: "Augmentar nombre de takes. Provar progressions noves",
            duration: "25-40 min",
          },
          {
            id: "4.2b",
            title: "Comping Session enfocada",
            emoji: "🧾",
            soloSteps: [
              "1. Tria una progressió (ii-V-I, jazz standard, o blues)",
              "2. Practica comping net i respirat (no overplay)",
              "3. 5 minuts només shell voicings",
              "4. 5 minuts amb tensions afegides",
              "5. 5 minuts comping lliure",
              "6. Enregistra la darrera ronda",
              "7. Escolta timing, dinàmica, netedat"
            ],
            practice: "Developing professional comping. Musical touch",
            progression: "Afegir slash chords i substitucions",
            duration: "15-25 min",
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Mini-Bootcamps: Integració Ràpida (5-8 minuts)",
    emoji: "⚡",
    weeks: "Continu (opcionals)",
    objectives: [
      "Síntesi diària de conceptes aprenents",
      "Warm-up o recap ràpid",
      "Mentalitat de 'performance under pressure'",
    ],
    sections: [
      {
        weeks: "Daily Quick Wins",
        title: "Bootcamps diaris",
        exercises: [
          {
            id: "15.1",
            title: "5-Min Harmonic Sprint",
            emoji: "🔥",
            soloSteps: [
              "1. Temporitzador: 5 minuts",
              "2. Minut 1: ii-V-I amb notes guia (3a/7a)",
              "3. Minut 2: Tensions suaus (9, 13) al V",
              "4. Minut 3: Tensions fortes (b9, #9, b5) al V",
              "5. Minut 4: Disminuït o tritó substitució",
              "6. Minut 5: Comping lliure (tot integrat)"
            ],
            practice: "Síntesi de todos els colors harmònics en 5 minuts",
            progression: "Pujar tempo o afegir substitucions",
            duration: "5 min",
          },
          {
            id: "15.2",
            title: "5-Min Technique Blitz",
            emoji: "⚡",
            soloSteps: [
              "1. Minut 1-2: Alternate picking (16enes a 120 BPM)",
              "2. Minut 2-3: Legato (hammer-ons/pull-offs)",
              "3. Minut 3-4: Hybrid picking + accents",
              "4. Minut 4-5: Combing tot (picking freedom)"
            ],
            practice: "Tècnica accelerada. Velocitat + claredat",
            progression: "Augmentar BPM o netedat",
            duration: "5 min",
          },
          {
            id: "15.3",
            title: "8-Min Groove Fusion Bootcamp",
            emoji: "🎤",
            soloSteps: [
              "1. Minut 1-2: Rhythm Trainer (sincopes) a 90 BPM",
              "2. Minut 2-3: Polirítmies 3:4 (triplets sobre 4/4)",
              "3. Minut 3-4: Ghost notes + picking híbrid",
              "4. Minut 4-5: Pentatònic menor amb groove",
              "5. Minut 5-6: Comping amb dinàmica (fort/piano)",
              "6. Minut 6-7: Improvisa lliure amb backup",
              "7. Minut 7-8: Grava 1 take final"
            ],
            practice: "Fusion completa: ritme + harmonia + groove",
            progression: "Pujar tempo. Afegir polirítmies més complexes",
            duration: "8 min",
          },
          {
            id: "15.4",
            title: "6-Min Jazz Standard Blitz",
            emoji: "🎺",
            soloSteps: [
              "1. Minut 1: Warm-up amb notes guia",
              "2. Minut 2: Backup track comença",
              "3. Minut 2-4: Improvisa sobre first A (8 bars)",
              "4. Minut 4-5: Segundo A (8 bars més)",
              "5. Minut 5-6: Bridge i final (8 bars)",
              "6. Enregistra els últims 2 minuts"
            ],
            practice: "Real-time improvisation. Form awareness",
            progression: "Passar a standards més complexos",
            duration: "6 min",
          },
          {
            id: "15.5",
            title: "7-Min Full Integration Test",
            emoji: "🏆",
            soloSteps: [
              "1. Minut 1-2: Escales + modes",
              "2. Minut 2-3: Alterats + disminuït",
              "3. Minut 3-4: Outside playing (side-stepping)",
              "4. Minut 4-5: Ritme + sincopes",
              "5. Minut 5-6: Changes + comping",
              "6. Minut 6-7: Improvisa lliure all integrated"
            ],
            practice: "Todo integrat en 7 minuts. Síntesi final",
            progression: "Auto-evaluate cada element. Focus on weak areas",
            duration: "7 min",
          },
        ],
      },
    ],
  },
  {
    id: 16,
    title: "Recording Sessions & Progress Tracking",
    emoji: "🎙️",
    weeks: "Setmanal (opcional)",
    objectives: [
      "Documentar progrés setmanal",
      "Comparar takes per veure millora",
      "Mantenir motivació amb evidència visual",
    ],
    sections: [
      {
        weeks: "Setmanal",
        title: "Recording Protocol",
        exercises: [
          {
            id: "16.1",
            title: "Weekly Recording Session",
            emoji: "📱",
            soloSteps: [
              "1. Cada divendres (o tria dia fixa)",
              "2. Tria una progressió estàndard (ii-V-I, blues, standard)",
              "3. Warm-up 5 minuts (no enregistres)",
              "4. Enregistra 3 takes de 2-3 minuts cadascun",
              "5. Etiqueta: SETMANA-X_TAKE-1, SETMANA-X_TAKE-2, etc",
              "6. Nota: tempo, tonalitat, focus del dia",
              "7. Guarda les gravacions en carpeta del telèfon o cloud"
            ],
            practice: "Documentació sistemàtica. Referència de progrés",
            progression: "Comparar setmanes alterna (setmana 1 vs 4 vs 8)",
            duration: "30-40 min",
          },
          {
            id: "16.2",
            title: "Monthly Playback & Reflection",
            emoji: "🔍",
            soloSteps: [
              "1. Final de mes: escolta takes de la setmana 1",
              "2. Anota: BPM, claredat de notes, groove, creativitat (1-10)",
              "3. Escolta takes de la setmana 4",
              "4. Compara: millores en velocitat? Harmonia? Feel?",
              "5. Escriu 3 coses que has millor",
              "6. Identifica 2 àrees per treballar al mes següent",
              "7. Celebra visiblement (even small wins matter)"
            ],
            practice: "Metacognició. Auto-assessment. Motivació",
            progression: "Empieza a veure patterns a través de mesos",
            duration: "15-20 min",
          },
          {
            id: "16.3",
            title: "Metrics Tracker (opcional)",
            emoji: "📊",
            soloSteps: [
              "1. Crea una taula: Setmana | Tempo | Claredat (1-10) | Groove (1-10) | Licks Nous",
              "2. Cada setmana actualitza metriques",
              "3. Tempo: BPM més ràpid aconseguit sense errors",
              "4. Claredat: notes sense imprecisions (1=molts errors, 10=perfecte)",
              "5. Groove: feel i timing (1=rígid, 10=fluït)",
              "6. Licks Nous: quants conceptes nous vau aplicar",
              "7. Gràfica: veure tendència positiva mensual"
            ],
            practice: "Data-driven learning. Visualització de progrés",
            progression: "Comparar gràfiques mensualment. Celebrar àreas de creixement",
            duration: "5 min",
          },
        ],
      },
    ],
  },
  {
    id: 17,
    title: "Polirítmies Avançades: Ritme No-Lineal",
    emoji: "🥁",
    weeks: "Setmanes 19-24 (expandit)",
    objectives: [
      "Domini de polirítmies: 3:4, 5:4, 7:8",
      "Aplicació en fraseig jazz i fusion contemporani",
      "Independència rítmica completa",
    ],
    sections: [
      {
        weeks: "Setmanes 19-21",
        title: "Micro Polirítmies i Fundamentals",
        exercises: [
          {
            id: "17.1",
            title: "5:4 Polyrythm: Quintolets al metrònom 4/4",
            emoji: "🎵",
            soloSteps: [
              "1. Obre Solo App",
              "2. Configura Metrònom a 80 BPM en 4/4",
              "3. Toca 5 notes equidistants en 1 compàs 4/4",
              "4. Pattern: 1-2-3-4-5-1-2-3-4-5... (contínuament)",
              "5. Accentua la 1a nota de cada grup de 5",
              "6. Augmenta tempo gradualment (5 BPM cada dia)",
              "7. Aplica a escales: C D E F G (5 notes) dins cada pulsació"
            ],
            practice: "Ment separada de pulsació. 5:4 independence",
            progression: "Fes-ho amb alternate picking. Combina amb legato",
            duration: "10-12 min",
          },
          {
            id: "17.2",
            title: "7:8 Polyrythm: Septillos al metrònom",
            emoji: "⚡",
            soloSteps: [
              "1. Configura metrònom a 70 BPM",
              "2. Toca 7 notes equidistants en 2 pulsacions de 4/4",
              "3. Pattern: 1-2-3-4-5-6-7-1-2-3-4-5-6-7...",
              "4. Accentua sempre primer i sisè nota",
              "5. Mantén 2 minuts sense perdre sincronització",
              "6. Aplica a patterns de notes o riffs"
            ],
            practice: "7:8 fluidity. Complex count independence",
            progression: "Augmentar BPM. Aplicar a changes",
            duration: "8-10 min",
          },
          {
            id: "17.3",
            title: "3:2 Polyrythm (Hemiola): Ritme triplet",
            emoji: "🎪",
            soloSteps: [
              "1. Configura 4/4 metrònom",
              "2. Fes triplets durant 2 compassos normals",
              "3. Pattern: trip-let-trip-let durante 8 pulsacions normals",
              "4. Escolta la fricció: 3 vs 4",
              "5. Afegeix melodia dins els triplets",
              "6. Alterna triplets/rectes alternant compassos"
            ],
            practice: "Hemiola feel. Swing vs straight.",
            progression: "Afegir picking híbrid. Dinàmica variable",
            duration: "8 min",
          },
        ],
      },
      {
        weeks: "Setmanes 22-24",
        title: "Aplicació Musical de Polirítmies",
        exercises: [
          {
            id: "17.4",
            title: "Pentatònic menor en 5:4 sobre ii-V-I",
            emoji: "🎸",
            soloSteps: [
              "1. Configura ii-V-I amb backup",
              "2. Toca pentatònic menor en quintolets",
              "3. Mantén quintolets durant 8 compassos",
              "4. Alterna: 2 compassos quintes, 1 compàs regular",
              "5. Resol al I amb frase regular (sense polirítmia)",
              "6. Grava 2 minuts"
            ],
            practice: "Polirítmia en context harmònic real. Tensió i resolució",
            progression: "Afegir 7:8 dins V7 alt",
            duration: "12 min",
          },
          {
            id: "17.5",
            title: "Comping amb Polirítmies: Backup amb 3:2 hemiola",
            emoji: "🧾",
            soloSteps: [
              "1. Toca comping net (shell voicings)",
              "2. Mantén 4/4 sobre la meitat del temps",
              "3. Outras cordes: toca en triplets (3:2)",
              "4. Resultat: tensió rítmica interessant",
              "5. Resol a compàs: ambdós parts alineats",
              "6. Practica 8 compassos contínuament"
            ],
            practice: "Polyrrhythmic comping. Modern jazz feel",
            progression: "Afegir bass walking en quarta nota",
            duration: "10 min",
          },
          {
            id: "17.6",
            title: "Polyrithm Challenge: 5+7 simultàn",
            emoji: "🏆",
            soloSteps: [
              "1. Mà dreta: toca quintolets (5:4)",
              "2. Mà esquerra: practica septillos (7:8)",
              "3. Sincronitza ambdues mans",
              "4. Durada: només 30 segons",
              "5. Repeteix 3 vegades amb descans",
              "6. El cerebro s'acostuma gradualment"
            ],
            practice: "Extreme polyrrhythmia. Cervell total",
            progression: "Augmentar durada. Combinar amb picking",
            duration: "8-10 min",
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
