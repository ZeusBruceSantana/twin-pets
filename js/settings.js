'use strict';
/* Twin Pets: The parts of the game that are safe to change: names, settings and pet pictures. */

/* =====================================================================
   1. SETTINGS — safe to change
   ===================================================================== */
const SETTINGS = {
  players: {
    left:  { girl: 'Leah',  pet: 'Livvie' },
    right: { girl: 'Avery', pet: 'Avery Peach' },
  },
  // Both girls tap Play within this many milliseconds -> the pets chase each other.
  togetherWindowMs: 4000,
  // How many together moments it takes before each new thing appears.
  // They appear one at a time, in this order.
  unlockAt: { treat: 1, jar: 3, ball: 5, seesaw: 7, highfive: 9, bubbles: 11, book: 13 },
  // How many hearts fill the friendship jar (3 to 12 look best).
  jarSize: 10,
  // Words a pet can ask for in a thought bubble. Each one has a picture.
  // apple, fish, bone -> kitchen.  ball -> Play or Ball.  nap -> Sleep.  hug -> tap the pet.
  // bath, brush -> bathroom.  bounce -> backyard.  tricks -> any trick the pet has learned.
  wishes: ['apple', 'fish', 'bone', 'ball', 'nap', 'hug', 'bath', 'brush', 'bounce', 'tricks'],
  // Both girls tap the same door within this many milliseconds to change rooms.
  doorWindowMs: 5000,
  // How many hours a full tummy takes to get empty again.
  tummyHours: 1,
  // How many minutes the fur stays fluffy and sparkly after brushing.
  fluffyMinutes: 15,
  // How many tries it takes a pet to learn a trick.
  triesToLearn: 3,
};

/* =====================================================================
   2. PET ART — swap in your own drawings or photos here
   ---------------------------------------------------------------------
   1. Put your picture files in the "art" folder next to index.html.
      (PNG files with a see-through background look best.)
   2. Change null to the file name, in quotes. For example:
        awake:  'art/livvie.png',
        asleep: 'art/livvie-sleeping.png',
   "asleep" is optional. Leave it null and the awake picture will curl up.
   If a file can't be found, the game quietly uses the built-in drawing.
   ===================================================================== */
const PET_ART = {
  left:  { awake: null, asleep: null, drawing: 'art-livvie', face: '30 20 140 125' },   // Livvie, on Leah's side
  right: { awake: null, asleep: null, drawing: 'art-peach',  face: '18 26 164 118' },   // Avery Peach, on Avery's side
};   // ("drawing" and "face" are for the built-in pictures. Leave them as they are.)

/* The colors the girls can choose from. */
const COLORS = [
  { id: 'pink',   main: '#ff7eb6', light: '#ffe3ef', dark: '#c2367a' },
  { id: 'purple', main: '#a77bff', light: '#efe6ff', dark: '#6a3fc7' },
  { id: 'blue',   main: '#5aa9ff', light: '#dfeeff', dark: '#2266b8' },
  { id: 'teal',   main: '#2ec4b6', light: '#d6f5f2', dark: '#14806f' },
  { id: 'green',  main: '#6cc551', light: '#e4f6dd', dark: '#3a8a27' },
  { id: 'yellow', main: '#ffc93c', light: '#fff4cf', dark: '#a87a00' },
  { id: 'orange', main: '#ff9a4d', light: '#ffe9d6', dark: '#c25e10' },
  { id: 'red',    main: '#ff6b6b', light: '#ffe2e2', dark: '#c23b3b' },
];
