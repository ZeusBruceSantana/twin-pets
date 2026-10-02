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

Open the `js` folder on GitHub, click `settings.js`, and click the ✏️ pencil
to edit. Find the section called **2. PET ART** (use your browser's Find,
Ctrl+F or ⌘F, and search for `PET_ART`). Change `null` to the file names, in
quotes, and leave the rest of each line as it is:

```js
const PET_ART = {
  left:  { awake: 'art/livvie.png',      asleep: 'art/livvie-sleeping.png', drawing: 'art-livvie', face: '30 20 140 125' },
  right: { awake: 'art/avery-peach.png', asleep: null,                      drawing: 'art-peach',  face: '18 26 164 118' },
};
```

Click **Commit changes**. After a few minutes, refresh the game.

If a file name is misspelled, nothing breaks. The game just keeps using the
built-in drawing, so check the spelling (capital letters matter) if your
picture doesn't show up.

Note: some things only work with the built-in drawings: the happy and sleepy
faces, wagging tails, the rounder tummy in the kitchen, fluffy fur tufts, and
the funny faces in the bathroom mirror. Your pictures still do the rest: they
bounce, munch, dance, curl up, get muddy, sparkle, poof up under the dryer, and
wear their clothes. Clothes, costumes, glasses, the spa bow and paw polish, and
the vet sticker are placed for a pet whose head is at the top middle of the
picture and whose paws are at the bottom.

When your pictures are in use, the little pet faces on the house map, in the
closet and in the mirror show your whole picture.

## 5. A new home-screen icon (optional)

The home-screen icon shows both pets together. To make it from your new
pictures, open the game's address with `icons/make-icons.html` at the end
(for example `https://zeusbrucesantana.github.io/twin-pets/icons/make-icons.html`).
Tap **Save** under each of the four pictures, then upload them into the
`icons` folder on GitHub, replacing the old ones (keep the same names). On the
iPad, you may need to remove the game from the home screen and add it again to
see the new icon.
