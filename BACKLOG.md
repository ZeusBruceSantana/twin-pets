# Twin Pets backlog

## Done

### Stage 1: the core
- [x] Leah and Livvie (snow leopard) on the left, Avery and Avery Peach (puppy) on the right
- [x] Original, simple, cute pet drawings with big eyes
- [x] Each girl picks her own color on first launch (they must be different)
- [x] Big Eat / Play / Sleep buttons along each girl's outer edge, with pictures on every button
- [x] Both girls can tap at the same time (multi-touch)
- [x] Eat: food appears, the pet munches and is happy. Play: ball, jumping, a sound. Sleep: the pet curls up, Zzz, her half of the sky turns to night
- [x] Together: both tap Play within about 4 seconds and the pets chase each other
- [x] Together: toss a treat to your sister's pet, who says "Thank you, *name*!"
- [x] Together: both pets asleep, so they curl up side by side with a moon, stars, a lullaby and "Goodnight!"
- [x] Remembers colors and pet state between sessions (local storage)
- [x] Hidden grown-up corner (hold top-left for 3 seconds): sound on/off, volume, change colors, full screen, start over
- [x] Full screen from the home screen (iPad) and as an installed app or full screen (Surface)
- [x] No scrolling, no zooming, no text selection, no long-press menus; asks you to turn the tablet sideways

### Stage 2: twin power
- [x] One shared friendship jar. Every together moment adds a heart in both girls' colors
- [x] Full jar: a gift that both girls untie together, then a surprise (picnic, dance party, balloon party), then the jar starts over
- [x] Ball toss: take turns throwing
- [x] Seesaw: push off when your side is down
- [x] High five: both press at once

### Stage 3: first reading
- [x] Thought bubbles: a pet asks for something with a picture and one word (apple, fish, bone, ball, nap, hug)
- [x] Tap any word to hear it read aloud (built-in browser voice)
- [x] Memory book: one short sentence a day about what the pets did together, shared by both girls

### Throughout
- [x] Gradual unlocking, one new thing at a time: treat, jar, ball toss, seesaw, high five, thought bubbles, memory book
- [x] Never compares the girls: no scores, no winner, no happier pet
- [x] Pets never get sick, sad or die. Ignored wishes simply fade away
- [x] Gentle sounds made in code, with small variations so repeats stay pleasant
- [x] One self-contained `index.html`, no build step, works on GitHub Pages
- [x] Pet art organized so drawings or photos can be swapped in (`art/README.md`)

### The pets' house
- [x] A house with five rooms: playroom, kitchen, bathroom, backyard, bedroom. The game opens in the playroom
- [x] Doors in the shared middle; both pets always stay in the same room
- [x] Moving takes both girls tapping the same door within a few seconds. The door glows and the sister's pet face blinks to invite her
- [x] Each room shows only its own buttons; a gentle hint (room name + glowing buttons) the first time each room is visited
- [x] Kitchen: apple, fish, bone and Treat. A tummy that rounds out as the pet eats (a picture, shown only in the kitchen, never a number). "No thanks, I'm full!" The tummy empties over about an hour of real time; a hungry pet asks for food. Never sick or sad
- [x] Bathroom: bath (fill the tub, bubbles, rubber duck, scrub, towel dry) and brushing, which makes the fur fluffy and sparkly for 15 minutes
- [x] Backyard: trampolines (tap to bounce, both at once to bounce higher), rainbow climb (each girl climbs her own side, they meet at the top and slide down together, never a race), ball toss and seesaw. Playing outside gets the pets muddy; a bath cleans them
- [x] Playroom: Play and chase, high five, trick word cards (sit, spin, roll over, wave, dance) that read aloud, learned after 3 tries, with a picture list of each pet's tricks
- [x] Presents: a full jar brings two wrapped presents and each girl gives one to her sister's pet. Things to wear (bow, hat, crown, flower, scarf) stay on; toys go on the pet's shelf. **Dress** tries on different hats. Then a party
- [x] Bedroom: bedtime, the shared goodnight ending, and the memory book
- [x] Thought bubbles and tap-to-hear words work in every room, with new wishes (bath, brush, bounce, learned tricks)
- [x] Memory book sentences mention the rooms ("Livvie and Avery Peach bounced on the trampoline.")
- [x] Saved progress from before the house (colors, jar, memory book, unlocks, sound) loads unchanged

## Later ideas

- [ ] **Real pet art from photos or drawings**: swap in the girls' own drawings or photos of their real toys (the `art` folder is ready; see `art/README.md`)
- [ ] **School word lists**: load the words the girls are learning at school into the thought bubbles, trick cards and memory book
- [ ] **Recorded voices**: record Mom, Dad or the girls reading the words, instead of the browser voice
- [ ] **Decorating the house**: the girls decorate the rooms together (wallpaper, rugs, where the toys go)
- [ ] **Swap day**: each girl looks after her sister's pet for a day
- [ ] **Real bedtime dimming**: the game gets darker and calmer near real bedtime, and gently suggests going to the bedroom

## Ideas noticed while building

- [ ] Let grown-ups choose the unlock speed and tummy speed from the grown-up corner, without editing the file
- [ ] More surprises and presents (bubbles party, a rainbow party, a kite, a cape)
- [ ] An optional "both tap to start" step for the two-player games, if one girl starting a game while her sister is busy causes squabbles
- [ ] A closet in the playroom to take off a scarf or choose between all the clothes
