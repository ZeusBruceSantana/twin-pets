# Your own pet pictures

The game comes with built-in drawings of Livvie and Avery Peach. You can swap
in your own drawings or photos, for example the girls' own artwork or photos
of their real stuffed animals.

## 1. Make the pictures

For each pet you need **one picture of the pet sitting up**. A second picture
**asleep** is optional. Without it, the awake picture squishes down and
"curls up", with floating Zzz.

What works best:
- **PNG files with a see-through background**, so the pet stands on the
  game's grass instead of in a box.
- The pet **facing forward**, filling most of a **square** picture, with its
  feet at the bottom edge.

**Removing the background on an iPad or iPhone:** open the photo in the Photos
app, then press and hold on the pet until it glows. Tap **Share** → **Save
Image**, or tap **Copy** and paste it somewhere you can save it as a PNG. The
new picture has no background.

## 2. Name the files

Use simple names with no spaces, for example:

| Pet | Awake | Asleep (optional) |
|---|---|---|
| Livvie | `livvie.png` | `livvie-sleeping.png` |
| Avery Peach | `avery-peach.png` | `avery-peach-sleeping.png` |

## 3. Upload them to this `art` folder

On GitHub, open the repository, click the **art** folder, then
**Add file → Upload files**. Drag the pictures in and click
**Commit changes**.

## 4. Tell the game to use them

Open `index.html` on GitHub and click the ✏️ pencil to edit. Find the section
called **2. PET ART** (use your browser's Find, Ctrl+F or ⌘F, and search for
`PET_ART`). Change `null` to the file names, in quotes:

```js
const PET_ART = {
  left:  { awake: 'art/livvie.png',      asleep: 'art/livvie-sleeping.png', drawing: 'art-livvie' },
  right: { awake: 'art/avery-peach.png', asleep: null,                      drawing: 'art-peach' },
};
```

Click **Commit changes**. After a few minutes, refresh the game.

If a file name is misspelled, nothing breaks. The game just keeps using the
built-in drawing, so check the spelling (capital letters matter) if your
picture doesn't show up.

Note: some things only work with the built-in drawings: the happy and sleepy
faces, wagging tails, the rounder tummy in the kitchen, and fluffy fur tufts.
Your pictures still do the rest: they bounce, munch, dance, curl up, get
muddy, sparkle after brushing, and wear their presents. Presents are placed for
a pet whose head is at the top middle of the picture.
