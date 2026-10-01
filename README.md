# Twin Pets

A two-player virtual pet game for two sisters, played side by side at the
same time on one touch screen held sideways (an iPad or a Microsoft Surface).

- **Left side:** Leah and her snow leopard, **Livvie**
- **Right side:** Avery and her puppy, **Avery Peach**

Each girl has her own big buttons along her edge of the screen. The pets
play together in the shared middle. There are no scores, no winners, and the
pets never get sick or sad. If nobody plays, they just wait happily.

The whole game is one file, `index.html`. It needs no internet once it has
loaded, no accounts and no outside servers.

---

## How to play (for grown-ups)

**First time:** each girl taps a color on her half. They can't both pick the
same one. Then tap the big green ▶ in the middle.

**Each girl's buttons:** 🍎 **Eat**, 🟡 **Play**, 🌙 **Sleep** (it turns into
☀️ **Wake** while her pet sleeps). Tapping her pet gives it a cuddle.

**Together moments** happen in the shared middle:

| What the girls do | What happens |
|---|---|
| Both tap **Play** within about 4 seconds | The pets chase each other |
| Tap **Treat** (appears after the first together moment) | A treat flies to the sister's pet, who says "Thank you, *name*!" |
| Both pets are put to **Sleep** | The pets curl up together, the sky turns to night, and a lullaby plays. Tap **Wake** for morning. |

**New things appear one at a time** as the girls share together moments.
They usually all show up during the first 15–20 minutes of play:

1. 🍪 **Treat** button
2. 🫙 **Friendship jar**: every together moment adds a heart in both girls'
   colors. When all 10 hearts are in, a gift appears. Each girl taps **Open**
   on her side to untie her own bow, then comes a surprise: a picnic, a dance
   party or a balloon party. Then the jar starts over.
3. ⚾ **Ball toss**: the girls take turns throwing a ball between the pets.
4. ↕️ **Seesaw**: the girl whose side is down pushes off.
5. ✋ **High five**: both girls press at the same time.
6. 💭 **Thought bubbles**: a pet asks for something with a picture and one
   word (apple, fish, bone, ball, nap, hug). Tap the bubble to hear the word.
   Doing the right thing (Eat, Play, Sleep, or tapping the pet for "hug")
   makes it very happy.
7. 📖 **Memory book**: one short sentence a day about what the pets did
   together, like *"Livvie and Avery Peach had a picnic."*

The two-player games are the round buttons in the middle. A little house
button leaves a game early.

**Tap any word to hear it read aloud**: the girls' names, the pets' names, the
thought bubbles, "Thank you", "Goodnight", and everything in the memory book.
The speaker button in the book reads the whole sentence.

---

## The hidden grown-up corner

**Press and hold the top-left corner of the screen for 3 seconds.** A ring
fills up, then the grown-up panel opens. In it you can:

- turn the sound **on or off**, and change the **volume**
- **change colors** (each girl picks again)
- **show all new things now**, which is handy for trying everything without
  waiting
- go **full screen** (on the Surface, when not already full screen)
- **start over**, which erases everything. Tap it twice to confirm.

---

## Put the game online with GitHub Pages (free)

GitHub Pages turns this repository into a web address you can open on the
iPad or Surface. You only need to do this once.

1. First, merge the pull request so the game is on the **main** branch.
   (On the pull request page, click **Merge pull request**, then **Confirm merge**.)
2. On GitHub, open this repository and click **⚙️ Settings** (top of the page).
3. In the left-hand menu, click **Pages**.
4. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
6. Wait a minute or two, then refresh the page. A box will say
   **"Your site is live at …"**. For this repository the address will be:

   **https://zeusbrucesantana.github.io/twin-pets/**

Whenever you change `index.html` on the main branch, the website updates by
itself within a few minutes.

> The repository needs to stay **public** for free GitHub Pages. The game
> keeps nothing private online. The girls' progress stays on the tablet.

---

## Add it to the home screen (full screen, like an app)

### iPad

1. Open the game's address in **Safari**. (It has to be Safari.)
2. Tap the **Share** button (the square with an arrow pointing up).
3. Scroll down and tap **Add to Home Screen**, then **Add**.
4. Open Twin Pets from the new home-screen icon. It opens full screen with
   no address bar.

Tips:
- To stop the screen from turning, hold the iPad sideways, open **Control
  Center** and turn on **Rotation Lock**.
- To keep the girls inside the game, use **Guided Access**: *Settings →
  Accessibility → Guided Access*. Then triple-click the top (or home) button
  while the game is open.
- **No sound?** Check that the iPad isn't on silent (in Control Center, the
  bell should not be crossed out) and that the volume is up.
- The home-screen app keeps **its own save**, separate from Safari. Always
  open it the same way, from the home-screen icon.

### Microsoft Surface

1. Open the game's address in **Microsoft Edge**.
2. Click the **…** menu (top right) → **Apps** → **Install this site as an app**
   (it may say **Install Twin Pets**), then **Install**.
3. Open Twin Pets from the Start menu or taskbar.
4. Tapping the big ▶ to start makes it go full screen. You can also press
   **F11**, or use **Full screen** in the grown-up corner.

Tips:
- Take the keyboard off (or fold it back) so the Surface is in tablet mode.
- To keep it sideways: *Settings → System → Display → Rotation lock*.
- Swiping in from the very edge of the screen opens Windows menus. The game
  can't block that, so the buttons sit a little in from the edge.

---

## Saving

The game saves by itself on the device it is played on: colors, whether each
pet is asleep, the jar, what has been unlocked, and the memory book. If you
clear the browser's website data, the save is erased too. The game never
sends anything anywhere.

---

## Changing things yourself

Open `index.html` in any text editor, or on GitHub by clicking the file and
then the ✏️ pencil. Near the top of the `<script>` part is a section called
**1. SETTINGS — safe to change**. There you can change:

- the girls' and pets' names
- how many together moments it takes for each new thing to appear
- how many hearts fill the jar
- which words the pets ask for in thought bubbles

**Your own pet pictures:** see [`art/README.md`](art/README.md).

---

## Files

| File | What it is |
|---|---|
| `index.html` | The whole game: pictures, sounds and code in one file |
| `art/` | Optional: put your own pet drawings or photos here |
| `BACKLOG.md` | What's done and ideas for later |
