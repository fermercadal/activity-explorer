/**
 * Regenerates board JSON: max 10 authors per board.
 * Run: node scripts/generate-all-board-data.mjs
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "../src/app/api/notes/data");

/** Exactly 10 “headline” characters for the filter UI */
const STAR_WARS_TEN = [
  "Yoda",
  "Darth Vader",
  "Luke Skywalker",
  "Leia Organa",
  "Han Solo",
  "Obi-Wan Kenobi",
  "Anakin Skywalker",
  "Emperor Palpatine",
  "C-3PO",
  "Rey",
];

function remapStarWarsAuthor(author) {
  if (STAR_WARS_TEN.includes(author)) return author;
  const map = {
    Various: "Obi-Wan Kenobi",
    "Admiral Ackbar": "Leia Organa",
    "Mace Windu": "Yoda",
    "Ahsoka Tano": "Anakin Skywalker",
    Finn: "Rey",
    "Poe Dameron": "Han Solo",
    "Kylo Ren": "Darth Vader",
    "Maz Kanata": "Rey",
    "General Hux": "Emperor Palpatine",
    "Captain Phasma": "Leia Organa",
    "The Mandalorian": "Han Solo",
    Kuiil: "Yoda",
    "Greef Karga": "Han Solo",
    "BB-8": "Rey",
    "R2-D2": "C-3PO",
    "Resistance officer": "Leia Organa",
    "Resistance fighter": "Rey",
  };
  return map[author] ?? "Han Solo";
}

/** Same curated lines as before; authors remapped to STAR_WARS_TEN */
const curated = [
  ["Do or do not. There is no try.", "Yoda"],
  ["May the Force be with you.", "Various"],
  ["I am your father.", "Darth Vader"],
  ["It's a trap!", "Admiral Ackbar"],
  ["I have a bad feeling about this.", "Han Solo"],
  ["Never tell me the odds.", "Han Solo"],
  ["I've got a bad feeling about this.", "Luke Skywalker"],
  ["These aren't the droids you're looking for.", "Obi-Wan Kenobi"],
  ["That's no moon.", "Obi-Wan Kenobi"],
  ["Help me, Obi-Wan Kenobi. You're my only hope.", "Leia Organa"],
  ["Aren't you a little short for a stormtrooper?", "Leia Organa"],
  ["Why, you stuck-up, half-witted, scruffy-looking nerf herder!", "Leia Organa"],
  ["I love you.", "Han Solo"],
  ["I know.", "Leia Organa"],
  ["Somebody has to save our skins.", "Leia Organa"],
  ["Will someone get this big walking carpet out of my way?", "Leia Organa"],
  ["I find your lack of faith disturbing.", "Darth Vader"],
  ["The Force is strong with this one.", "Darth Vader"],
  ["I sense something. A presence I have not felt since…", "Darth Vader"],
  ["Be careful not to choke on your aspirations.", "Darth Vader"],
  ["Apology accepted, Captain Needa.", "Darth Vader"],
  ["The circle is now complete.", "Darth Vader"],
  ["Impressive. Most impressive.", "Darth Vader"],
  ["I am altering the deal. Pray I don't alter it any further.", "Darth Vader"],
  ["The Emperor is not as forgiving as I am.", "Darth Vader"],
  ["You may dispense with the pleasantries.", "Darth Vader"],
  ["He is as clumsy as he is stupid.", "Darth Vader"],
  ["You have failed me for the last time.", "Darth Vader"],
  ["Search your feelings. You know it to be true.", "Darth Vader"],
  ["No, there is another.", "Yoda"],
  ["Size matters not.", "Yoda"],
  ["Fear is the path to the dark side.", "Yoda"],
  ["Wars not make one great.", "Yoda"],
  ["Truly wonderful, the mind of a child is.", "Yoda"],
  ["Pass on what you have learned.", "Yoda"],
  ["The greatest teacher, failure is.", "Yoda"],
  ["Patience you must have, my young padawan.", "Yoda"],
  ["When nine hundred years old you reach, look as good you will not.", "Yoda"],
  ["Judge me by my size, do you?", "Yoda"],
  ["That is why you fail.", "Yoda"],
  ["Luminous beings are we, not this crude matter.", "Yoda"],
  ["Difficult to see. Always in motion is the future.", "Yoda"],
  ["Much to learn, you still have.", "Yoda"],
  ["Adventure. Excitement. A Jedi craves not these things.", "Yoda"],
  ["A Jedi uses the Force for knowledge and defense, never for attack.", "Yoda"],
  ["The dark side clouds everything.", "Yoda"],
  ["Ready are you? What know you of ready?", "Yoda"],
  ["You must unlearn what you have learned.", "Yoda"],
  [
    "If you end your training now, if you choose the quick and easy path, you will become an agent of evil.",
    "Yoda",
  ],
  ["Control, control, you must learn control!", "Yoda"],
  ["Try not. Do.", "Yoda"],
  ["Your weapons, you will not need them.", "Yoda"],
  ["The cave is strong with the dark side.", "Yoda"],
  ["I cannot teach him. The boy has no patience.", "Yoda"],
  ["Will he finish what he begins?", "Yoda"],
  ["That is the way of the dark side.", "Yoda"],
  ["The shroud of the dark side has fallen.", "Yoda"],
  ["Twisted by the dark side, young Skywalker has become.", "Yoda"],
  ["Into exile I must go. Failed I have.", "Yoda"],
  ["Lost a planet, Master Obi-Wan has. How embarrassing.", "Yoda"],
  ["Around the survivors a perimeter create.", "Yoda"],
  ["Good relations with the Wookiees, I have.", "Yoda"],
  ["Begun, the Clone War has.", "Yoda"],
  ["The boy you trained, gone he is.", "Yoda"],
  ["Kill you I cannot.", "Yoda"],
  ["There is another Skywalker.", "Yoda"],
  ["No. There is no try.", "Yoda"],
  ["Your father he is.", "Yoda"],
  ["Confer on you the level of Jedi Knight, the Council does.", "Yoda"],
  ["Reckless he is.", "Yoda"],
  ["The chosen one, the boy may be.", "Yoda"],
  ["Clouded, this boy's future is.", "Yoda"],
  ["Always two there are, no more, no less.", "Yoda"],
  ["The dark side I sense in you.", "Yoda"],
  ["A prophecy that misread could have been.", "Yoda"],
  ["To be Jedi is to face the truth, and choose.", "Yoda"],
  ["The Force runs strong in your family.", "Yoda"],
  ["We are what they grow beyond. That is the true burden of all masters.", "Yoda"],
  [
    "We are the spark that will light the fire that will burn the First Order down.",
    "Leia Organa",
  ],
  [
    "Hope is like the sun. If you only believe in it when you can see it, you'll never make it through the night.",
    "Leia Organa",
  ],
  ["Someone has to save our skins.", "Leia Organa"],
  ["I'd just as soon kiss a Wookiee.", "Leia Organa"],
  ["You came in that thing? You're braver than I thought.", "Leia Organa"],
  [
    "Governor Tarkin, I should have expected to find you holding Vader's leash.",
    "Leia Organa",
  ],
  [
    "The more you tighten your grip, Tarkin, the more star systems will slip through your fingers.",
    "Leia Organa",
  ],
  ["I don't know where you get your delusions, laser brain.", "Leia Organa"],
  ["I hope you know what you're doing.", "Leia Organa"],
  ["Luke, don't give in to hate.", "Leia Organa"],
  ["Ben!", "Leia Organa"],
  ["There is still good in him.", "Leia Organa"],
  ["Hold me.", "Leia Organa"],
  ["I know what you're going to say. I changed my hair.", "Leia Organa"],
  ["Same jacket.", "Leia Organa"],
  ["Chewie, get us out of here!", "Han Solo"],
  ["Great, kid. Don't get cocky.", "Han Solo"],
  ["Traveling through hyperspace ain't like dusting crops, boy.", "Han Solo"],
  [
    "Hokey religions and ancient weapons are no match for a good blaster at your side, kid.",
    "Han Solo",
  ],
  ["Look, Your Worshipfulness, let's get one thing straight.", "Han Solo"],
  ["Boring conversation anyway.", "Han Solo"],
  ["Sorry about the mess.", "Han Solo"],
  ["Sometimes I amaze even myself.", "Han Solo"],
  ["Laugh it up, fuzzball.", "Han Solo"],
  ["Don't everyone thank me at once.", "Han Solo"],
  ["You like me because I'm a scoundrel.", "Han Solo"],
  ["You know, sometimes I amaze myself.", "Han Solo"],
  ["That's not how the Force works!", "Han Solo"],
  ["Women always figure out the truth. Always.", "Han Solo"],
  ["Chewie, we're home.", "Han Solo"],
  [
    "How ya feeling, kid? You don't look so bad to me. In fact, you look strong enough to pull the ears off a gundark.",
    "Han Solo",
  ],
  ["I've outrun Imperial starships. Not the local bulk cruisers, mind you.", "Han Solo"],
  ["She's fast enough for you, old man.", "Han Solo"],
  ["Punch it!", "Han Solo"],
  ["Then I'll see you in hell!", "Han Solo"],
  ["You're all clear, kid. Let's blow this thing and go home!", "Han Solo"],
  ["I used to be.", "Han Solo"],
  ["That's not true. That's impossible!", "Luke Skywalker"],
  ["But I was going into Tosche Station to pick up some power converters!", "Luke Skywalker"],
  ["There's nothing for me here now.", "Luke Skywalker"],
  ["I'm Luke Skywalker. I'm here to rescue you.", "Luke Skywalker"],
  ["I'm not afraid.", "Luke Skywalker"],
  ["You'll find I'm full of surprises.", "Luke Skywalker"],
  ["I won't fail you. I'm not afraid.", "Luke Skywalker"],
  ["Ben?", "Luke Skywalker"],
  ["Father.", "Luke Skywalker"],
  ["I am a Jedi, like my father before me.", "Luke Skywalker"],
  ["Your overconfidence is your weakness.", "Luke Skywalker"],
  ["I will not fight you.", "Luke Skywalker"],
  ["Then my father is truly dead.", "Luke Skywalker"],
  ["No. You're coming with me.", "Luke Skywalker"],
  ["I see you have constructed a new lightsaber.", "Luke Skywalker"],
  ["Obi-Wan. Why didn't you tell me?", "Luke Skywalker"],
  ["You told me Vader betrayed and murdered my father.", "Luke Skywalker"],
  ["There's nothing you could have done, Luke.", "Obi-Wan Kenobi"],
  ["You will go to the Dagobah system.", "Obi-Wan Kenobi"],
  ["Use the Force, Luke.", "Obi-Wan Kenobi"],
  ["Remember, the Force will be with you, always.", "Obi-Wan Kenobi"],
  [
    "If you strike me down, I shall become more powerful than you can possibly imagine.",
    "Obi-Wan Kenobi",
  ],
  ["You can't win, Darth.", "Obi-Wan Kenobi"],
  ["Only a master of evil, Darth.", "Obi-Wan Kenobi"],
  [
    "You can't win, Vader. If you strike me down, I shall become more powerful than you can possibly imagine.",
    "Obi-Wan Kenobi",
  ],
  ["Hello there!", "Obi-Wan Kenobi"],
  ["So uncivilized.", "Obi-Wan Kenobi"],
  ["I have the high ground.", "Obi-Wan Kenobi"],
  ["It's over, Anakin. I have the high ground.", "Obi-Wan Kenobi"],
  ["You were my brother, Anakin.", "Obi-Wan Kenobi"],
  ["I loved you.", "Obi-Wan Kenobi"],
  ["You were the chosen one!", "Obi-Wan Kenobi"],
  ["From my point of view, the Jedi are evil!", "Anakin Skywalker"],
  ["This is where the fun begins.", "Anakin Skywalker"],
  ["Now this is podracing!", "Anakin Skywalker"],
  ["I don't like sand.", "Anakin Skywalker"],
  ["I'm a person, and my name is Anakin.", "Anakin Skywalker"],
  ["I don't need your help.", "Anakin Skywalker"],
  ["What have I done?", "Anakin Skywalker"],
  ["You underestimate my power!", "Anakin Skywalker"],
  ["I hate you!", "Anakin Skywalker"],
  ["You turned her against me!", "Anakin Skywalker"],
  ["You will not take her from me!", "Anakin Skywalker"],
  ["I have brought peace to my new empire.", "Anakin Skywalker"],
  ["If you're not with me, then you're my enemy.", "Anakin Skywalker"],
  ["This is outrageous! It's unfair!", "Anakin Skywalker"],
  ["I want more, and I know I shouldn't.", "Anakin Skywalker"],
  ["I'm going to be a Jedi.", "Anakin Skywalker"],
  ["Jedi business. Go back to your drinks.", "Anakin Skywalker"],
  ["I see through the lies of the Jedi.", "Anakin Skywalker"],
  ["The Force is strong with you. A powerful Sith you will become.", "Emperor Palpatine"],
  ["Execute Order 66.", "Emperor Palpatine"],
  ["Good. Good!", "Emperor Palpatine"],
  ["Power! Unlimited power!", "Emperor Palpatine"],
  ["Did you ever hear the tragedy of Darth Plagueis the Wise?", "Emperor Palpatine"],
  ["I am the Senate.", "Emperor Palpatine"],
  ["Not yet.", "Mace Windu"],
  ["It's treason, then.", "Emperor Palpatine"],
  ["Your feeble skills are no match for the power of the dark side.", "Emperor Palpatine"],
  ["So be it, Jedi.", "Emperor Palpatine"],
  [
    "Now witness the firepower of this fully armed and operational battle station.",
    "Emperor Palpatine",
  ],
  ["Your faith in your friends is yours.", "Emperor Palpatine"],
  ["Everything that has transpired has done so according to my design.", "Emperor Palpatine"],
  ["Strike me down with all of your hatred.", "Emperor Palpatine"],
  ["Your journey toward the dark side is almost complete.", "Emperor Palpatine"],
  ["I am all the Sith.", "Emperor Palpatine"],
  ["I am inevitable.", "Emperor Palpatine"],
  ["Long have I waited.", "Emperor Palpatine"],
  [
    "The dark side of the Force is a pathway to many abilities some consider to be unnatural.",
    "Emperor Palpatine",
  ],
  ["I have died before.", "Emperor Palpatine"],
  ["The Force is female.", "Various"],
  ["I like firsts. Good or bad, they're always memorable.", "Ahsoka Tano"],
  ["Snips.", "Anakin Skywalker"],
  ["Sky guy.", "Ahsoka Tano"],
  ["I am no Jedi.", "Ahsoka Tano"],
  ["In my life, when you find people who need your help, you help them.", "Ahsoka Tano"],
  ["This is a new day. A new beginning.", "Ahsoka Tano"],
  ["I won't leave you. Not this time.", "Luke Skywalker"],
  ["Rey.", "Luke Skywalker"],
  ["Where's Han?", "Finn"],
  ["Why does everyone want to go back to Jakku?", "Finn"],
  ["Droid, please!", "Finn"],
  ["I'm a big deal in the Resistance.", "Finn"],
  ["Solo, we'll figure it out. We'll use the Force.", "Finn"],
  ["I'm Rey.", "Rey"],
  ["I didn't know there was this much green in the whole galaxy.", "Rey"],
  ["The belonging you seek is not behind you. It is ahead.", "Maz Kanata"],
  ["Dear child, I see your eyes.", "Maz Kanata"],
  ["We'll always have each other.", "Kylo Ren"],
  ["I will finish what you started.", "Kylo Ren"],
  ["Show me again, grandfather.", "Kylo Ren"],
  ["The Force. It's calling to you.", "Maz Kanata"],
  ["I need someone to show me my place in all this.", "Rey"],
  ["Something inside me has always been there.", "Rey"],
  ["Be with me.", "Kylo Ren"],
  ["I know what I have to do.", "Kylo Ren"],
  ["I'm being torn apart.", "Kylo Ren"],
  ["The legacy of the Jedi is failure.", "Luke Skywalker"],
  ["This is not going to go the way you think.", "Luke Skywalker"],
  ["Amazing. Every word of what you just said was wrong.", "Luke Skywalker"],
  ["It's time for the Jedi to end.", "Luke Skywalker"],
  ["No one's ever really gone.", "Luke Skywalker"],
  ["See you around, kid.", "Luke Skywalker"],
  ["I will not be the last Jedi.", "Luke Skywalker"],
  ["Breathe. Just breathe.", "Luke Skywalker"],
  ["Reach out with your feelings.", "Luke Skywalker"],
  ["That's a lightsaber.", "Luke Skywalker"],
  ["This is not going to go the way you think!", "Luke Skywalker"],
  ["I came to this island to die.", "Luke Skywalker"],
  ["The Resistance is dead.", "Kylo Ren"],
  ["Let the past die. Kill it if you have to.", "Kylo Ren"],
  ["You're still holding on. Let go!", "Kylo Ren"],
  ["Do you know the truth about your parents?", "Kylo Ren"],
  ["You're no one.", "Kylo Ren"],
  ["I know who you are.", "Kylo Ren"],
  ["The Supreme Leader is dead.", "Kylo Ren"],
  ["Long live the Supreme Leader.", "Kylo Ren"],
  ["I am the Supreme Leader.", "Kylo Ren"],
  ["Bow to the First Order.", "General Hux"],
  ["Fire!", "General Hux"],
  ["Today is the end of the Republic!", "General Hux"],
  ["We will not fail.", "Captain Phasma"],
  ["I'm in charge. Not you.", "Poe Dameron"],
  ["So who talks first?", "Poe Dameron"],
  ["I can fly anything.", "Poe Dameron"],
  ["We are the spark that'll light the fire.", "Poe Dameron"],
  ["Somehow Palpatine returned.", "Poe Dameron"],
  ["They fly now?!", "Finn"],
  ["They fly now.", "Poe Dameron"],
  ["Nice flying.", "Poe Dameron"],
  ["Hold for General Leia.", "Resistance officer"],
  ["For Skywalker!", "Resistance fighter"],
  ["This is the way.", "The Mandalorian"],
  ["I can bring you in warm, or I can bring you in cold.", "The Mandalorian"],
  ["Weapons are part of my religion.", "The Mandalorian"],
  ["I'm a Mandalorian. Weapons are part of my religion.", "The Mandalorian"],
  ["Yeah? Good.", "The Mandalorian"],
  ["I have spoken.", "Kuiil"],
  ["Stop touching things.", "The Mandalorian"],
  ["Come on, baby. Do the magic hand thing.", "Greef Karga"],
  ["Wherever I go, he goes.", "The Mandalorian"],
  ["He is my son.", "The Mandalorian"],
  ["May the Force be with you.", "The Mandalorian"],
  ["I am C-3PO, human-cyborg relations.", "C-3PO"],
  ["We're doomed.", "C-3PO"],
  ["There'll be no escape for the Princess this time.", "C-3PO"],
  ["I suggest a new strategy, R2: let the Wookiee win.", "C-3PO"],
  ["Don't call me a mindless philosopher, you overweight glob of grease.", "C-3PO"],
  ["The odds of successfully navigating an asteroid field are approximately 3,720 to 1.", "C-3PO"],
  ["I'm terribly sorry. I'm afraid I can't do that.", "C-3PO"],
  ["He made a fair move. Screaming about it can't help you.", "C-3PO"],
  ["R2-D2, you know better than to trust a strange computer.", "C-3PO"],
  ["It's against my programming to impersonate a deity.", "C-3PO"],
  ["I'm backwards. You're acting like we're in trouble.", "C-3PO"],
  ["I thought that hairless dog was going to end our adventures before they began.", "C-3PO"],
];

function buildStarWars() {
  const seen = new Set();
  const rows = [];
  for (const [text, author] of curated) {
    const a = remapStarWarsAuthor(author);
    if (seen.has(text)) continue;
    seen.add(text);
    rows.push({ text, author: a });
  }
  const min = 220;
  let i = 0;
  while (rows.length < min) {
    const author = STAR_WARS_TEN[i % STAR_WARS_TEN.length];
    const text = `Fleet comms ${rows.length + 1}: channel check, over.`;
    if (!seen.has(text)) {
      seen.add(text);
      rows.push({ text, author });
    }
    i++;
  }
  return rows;
}

const ELECTRONIC_BRANDS = [
  "Moog",
  "Roland",
  "Korg",
  "Sequential",
  "Elektron",
  "Yamaha",
  "Nord",
  "Arturia",
  "Teenage Engineering",
  "Akai",
];

const electronicProducts = {
  Moog: [
    "Moog Minimoog Model D",
    "Moog Subsequent 37",
    "Moog Grandmother",
    "Moog Matriarch",
    "Moog Mother-32",
    "Moog DFAM",
    "Moog Sub Phatty",
    "Moog One",
  ],
  Roland: [
    "Roland Jupiter-8",
    "Roland Juno-106",
    "Roland Juno-60",
    "Roland SH-101",
    "Roland TB-303",
    "Roland TR-808",
    "Roland TR-909",
    "Roland SYSTEM-8",
  ],
  Korg: [
    "Korg MS-20",
    "Korg Minilogue XD",
    "Korg Monologue",
    "Korg Wavestate",
    "Korg Opsix",
    "Korg microKORG",
    "Korg Nautilus",
    "Korg Electribe SX",
  ],
  Sequential: [
    "Sequential Prophet-5",
    "Sequential Prophet-6",
    "Sequential Prophet Rev2",
    "Sequential OB-6",
    "Sequential Take 5",
    "Sequential Trigon-6",
  ],
  Elektron: [
    "Elektron Analog Rytm MKII",
    "Elektron Analog Four MKII",
    "Elektron Digitakt",
    "Elektron Digitone",
    "Elektron Syntakt",
    "Elektron Octatrack MKII",
    "Elektron Model:Samples",
    "Elektron Model:Cycles",
  ],
  Yamaha: [
    "Yamaha DX7",
    "Yamaha Reface DX",
    "Yamaha Montage M8",
    "Yamaha MODX+",
    "Yamaha CP88",
    "Yamaha SEQTRAK",
    "Yamaha Reface CS",
  ],
  Nord: [
    "Nord Stage 4",
    "Nord Piano 5",
    "Nord Lead A1",
    "Nord Wave 2",
    "Nord Electro 6D",
    "Nord Grand 2",
  ],
  Arturia: [
    "Arturia MicroFreak",
    "Arturia MiniFreak",
    "Arturia PolyBrute",
    "Arturia MatrixBrute",
    "Arturia MiniBrute 2",
    "Arturia DrumBrute Impact",
  ],
  "Teenage Engineering": [
    "Teenage Engineering OP-1",
    "Teenage Engineering OP-Z",
    "Teenage Engineering OP-XY",
    "Teenage Engineering EP-133 K.O. II",
    "Teenage Engineering PO-33 K.O!",
    "Teenage Engineering CM-15",
  ],
  Akai: [
    "Akai MPC Live II",
    "Akai MPC One+",
    "Akai MPC X",
    "Akai Force",
    "Akai MPC 2000XL",
    "Akai MPK Mini MK3",
    "Akai S3000XL",
  ],
};

function buildElectronicMusic() {
  const rows = [];
  for (const brand of ELECTRONIC_BRANDS) {
    for (const text of electronicProducts[brand]) {
      rows.push({ text, author: brand });
    }
  }
  return rows;
}

const PHOTO_BRANDS = [
  "Nikon",
  "Canon",
  "Sony",
  "Fujifilm",
  "Leica",
  "Panasonic",
  "OM System",
  "Hasselblad",
  "Sigma",
  "Tamron",
];

const photoProducts = {
  Nikon: [
    "Nikon D850",
    "Nikon Z9",
    "Nikon Z8",
    "Nikon Z6 III",
    "Nikon F3",
    "Nikon FM2",
    "Nikon Z 85mm f/1.2 S",
    "Nikon Z 24-120mm f/4 S",
  ],
  Canon: [
    "Canon EOS R5",
    "Canon EOS R6 Mark III",
    "Canon EOS R8",
    "Canon EOS R3",
    "Canon EOS-1V",
    "Canon AE-1 Program",
    "Canon RF 28-70mm f/2L USM",
    "Canon RF 100-500mm f/4.5-7.1L IS USM",
  ],
  Sony: [
    "Sony A7R V",
    "Sony A7 IV",
    "Sony A7C II",
    "Sony FX3",
    "Sony A1",
    "Sony FE 50mm f/1.2 GM",
    "Sony FE 24-70mm f/2.8 GM II",
    "Sony FE 70-200mm f/2.8 GM OSS II",
  ],
  Fujifilm: [
    "Fujifilm X-T5",
    "Fujifilm X-H2S",
    "Fujifilm X100VI",
    "Fujifilm GFX100 II",
    "Fujifilm X-Pro3",
    "Fujifilm GF 80mm f/1.7 R WR",
    "Fujifilm XF 56mm f/1.2 R WR",
  ],
  Leica: [
    "Leica M11",
    "Leica Q3",
    "Leica SL3",
    "Leica MP",
    "Leica Summilux-M 35mm f/1.4 ASPH",
    "Leica APO-Summicron-M 50mm f/2 ASPH",
  ],
  Panasonic: [
    "Panasonic Lumix S5 II",
    "Panasonic Lumix GH6",
    "Panasonic Lumix G9 II",
    "Panasonic Lumix S PRO 50mm f/1.4",
    "Panasonic Lumix S 24-105mm f/4 MACRO O.I.S.",
  ],
  "OM System": [
    "OM System OM-1",
    "OM System OM-5",
    "OM System M.Zuiko 40-150mm f/2.8 PRO",
    "OM System M.Zuiko 90mm f/3.5 Macro IS PRO",
  ],
  Hasselblad: [
    "Hasselblad X2D 100C",
    "Hasselblad 907X & CFV 100C",
    "Hasselblad 500C/M",
  ],
  Sigma: [
    "Sigma fp L",
    "Sigma 35mm f/1.2 DG DN Art",
    "Sigma 85mm f/1.4 DG DN Art",
    "Sigma 18-50mm f/2.8 DC DN",
    "Sigma 150-600mm f/5-6.3 DG DN OS Sports",
  ],
  Tamron: [
    "Tamron 28-75mm f/2.8 Di III VXD G2",
    "Tamron 35-150mm f/2-2.8 Di III VXD",
    "Tamron 50-400mm f/4.5-6.3 Di III VC VXD",
    "Tamron 90mm f/2.8 Di III Macro VXD",
  ],
};

function buildPhotography() {
  const rows = [];
  for (const brand of PHOTO_BRANDS) {
    for (const text of photoProducts[brand]) {
      rows.push({ text, author: brand });
    }
  }
  return rows;
}

const starWars = buildStarWars();
const electronic = buildElectronicMusic();
const photo = buildPhotography();

writeFileSync(join(dataDir, "star-wars.json"), JSON.stringify(starWars, null, 2), "utf8");
writeFileSync(join(dataDir, "electronic-music.json"), JSON.stringify(electronic, null, 2), "utf8");
writeFileSync(join(dataDir, "photography.json"), JSON.stringify(photo, null, 2), "utf8");

function assertMaxAuthors(rows, label, max = 10) {
  const set = new Set(rows.map((r) => r.author));
  if (set.size > max) {
    console.error(`${label}: ${set.size} authors (expected ≤ ${max})`, [...set].sort());
    process.exit(1);
  }
}

assertMaxAuthors(starWars, "star-wars");
assertMaxAuthors(electronic, "electronic-music");
assertMaxAuthors(photo, "photography");

console.log(
  `Wrote star-wars.json (${starWars.length}), electronic-music.json (${electronic.length}), photography.json (${photo.length})`,
);
