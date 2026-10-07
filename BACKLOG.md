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
- [x] No build step, works on GitHub Pages (one `index.html` at first; now a few plain files)
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

### Filling out the house
- [x] The game is split into a few plain files (still no build step, still works on GitHub Pages)
- [x] With seven rooms there were too many doors for the middle, so the doors became a **house map**: both girls tap the same room to travel together
- [x] New things introduce themselves gently: up to three each time the game is opened, one at a time, with a star on the map if they're in another room
- [x] Saved progress from before (colors, jar, memory book, unlocks, tricks, presents, sound) loads unchanged

**Stage A: kitchen and bathroom**
- [x] Fridge with pictures and words: fruit, veggies, pancakes, pizza, ice cream (and fish and bone)
- [x] Favorite foods with a happy dance: Livvie loves fish, Avery Peach loves peaches
- [x] Cooking together, one adds and the other stirs: smoothie, pizza, birthday cake
- [x] Picnic table where both pets eat together
- [x] Bath toys: boat, squirty fish, fizzies that change the water color
- [x] Brushing teeth for a sparkly smile
- [x] Blow dryer: the fur poofs up big and funny, then settles
- [x] Spa day: each girl pampers her sister's pet (paw polish, a bow, sparkle spray)
- [x] Mirror with funny faces

**Stage B: garden, closet, front yard, photos, grown-up corner**
- [x] Garden in the backyard: plant, water, grows over real time; the harvest goes into the fridge
- [x] Dress-up closet in the bedroom with everything each pet can wear, any time
- [x] New front yard with a mailbox for letters from the grown-up corner; every word can be tapped to hear it
- [x] Photo booth: the camera in the middle takes a picture of the game (not the tablet's camera) for the memory book
- [x] Grown-up corner: write a letter, this week's school words, kindness hearts for the jar, a play timer, the pets' birthday. Easy to use on a tablet, stays on the device, never in the code
- [x] Play timer: the pets yawn, go to bed, and stay asleep until a grown-up wakes them

**Stage C: pretend play**
- [x] Pet school (a new room): the pets practice school words with tap-to-hear; starter words if none are set
- [x] Vet check-up: silly heartbeat, knee tap that makes the leg kick, a sticker. Never sick
- [x] Tea party: set the table, pour pretend tea, invite stuffed friends (an elephant, a giraffe, an octopus, all made up for this game)
- [x] Puppet stage: props the girls pick plus the tricks the pets have learned
- [x] Art easel: one canvas, half each; finger-paint and hang it on a wall in any room
- [x] Block building: doghouse, cozy den, blanket fort

**Stage D: places, visitors, seasons**
- [x] Trips: both tap the car in the front yard and go to the beach, the park or the ice cream shop
- [x] Visitors: Clover the bunny and Hoot the owl knock at the front door
- [x] Sleepover: blanket fort and flashlight stories
- [x] Decorating: wallpaper, rugs and furniture come as presents and are placed room by room
- [x] Weather: rain puddles make the pets muddy; snow in winter, with a snowman
- [x] Holidays: cute Halloween costumes in October; a birthday party on the pets' birthday
- [x] About once a play session, a pet asks for something from its real stuffed animal ("Give Livvie a real hug!")
- [x] Peekaboo button for a little brother: an animal peeks out with a sound, no reading

### After the first play-tests
- [x] The closet appears as soon as a pet is given something to wear (a pet could be stuck wearing a scarf with no way to take it off)

### Protect and polish
**Stage 1: cleanup and tests**
- [x] Tidied the code (old door leftovers, unused bits, clearer comments) with no change in how the game plays
- [x] Automatic tests: saving and loading (including saves from every earlier version), moving between rooms, the friendship jar, the grown-up corner. They run on every pull request, or anytime at `tests/`

**Stage 2: protect their progress**
- [x] Backup and restore in the grown-up corner (everything: colors, jar, memory book, paintings, letters, tricks, decorations, school words...), with the date of the last backup, a check before replacing, and undo
- [x] A damaged save is set aside instead of lost; a full device lets go of old camera pictures first
- [x] Works offline once opened, and installs to the home screen as an app
- [x] README: how to undo a merge on GitHub

**Stage 3: polish**
- [x] Springy buttons, confetti on happy moments, consistent button layout in every room and place
- [x] Livvie's new colors: very light honey fur, black and brown rosettes, pink in her eyes

**Stage 4: music and sound**
- [x] An original background tune for each room, the start screen and each trip, made in code
- [x] Warmer, gentler sound effects; separate Sounds and Music switches

**Stage 5: speed**
- [x] Measured on a tablet-size touch screen with a slowed processor; trimmed the costly glows, weather and saving

**Stage 6: finishing touches**
- [x] Start screen with the name, Twin Pets
- [x] Home-screen icon with both pets together (remake it from new art with `icons/make-icons.html`)
- [x] Dedication page from the ♥ on the start screen: "Made by Dad for Leah and Avery, 2026."

## Later ideas

- [ ] **Real pet art from photos or drawings**: swap in the real pictures from Dad's photos or drawings (the `art` folder is ready; see `art/README.md`, and remake the icon with `icons/make-icons.html`)
- [ ] **Recorded voices**: record Mom, Dad or the girls reading the words, instead of the browser voice
- [ ] **Swap day**: each girl looks after her sister's pet for a day
- [ ] **Real bedtime dimming**: the game gets darker and calmer near real bedtime, and gently suggests going to the bedroom

## Ideas noticed while building

- [ ] Let grown-ups choose the unlock speed and tummy speed from the grown-up corner, without editing the file
- [ ] More surprises and presents (bubbles party, a rainbow party, a kite, a cape)
- [ ] An optional "both tap to start" step for the two-player games, if one girl starting a game while her sister is busy causes squabbles
- [ ] Let grown-ups move or remove a decoration or a painting
- [ ] Use the school words in thought bubbles and the memory book too, not just at pet school
- [ ] More places to drive to (a farm, a library, the snow) and more visitors
- [ ] A way to look at the memory book's pictures bigger, or delete one
- [ ] Let grown-ups choose how often backups are suggested, or remind them on the start screen
- [ ] A volume slider just for the music
