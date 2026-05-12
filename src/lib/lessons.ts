import type { Slide } from "@/components/SlideDeck";
import type { QuizQ } from "@/components/Quiz";

export type Lesson = {
  slug: "lego-car" | "arduino-traffic-light";
  title: string;
  subtitle: string;
  emoji: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate";
  embed: { kind: "wokwi" | "tinkercad"; url: string; label: string };
  videoUrl: string;
  worksheetUrl: string;
  slides: Slide[];
  quiz: QuizQ[];
  badge: string;
};

const legoBgs = [
  "bg-gradient-to-br from-[#003366] to-[#1F5BA8]",
  "bg-gradient-to-br from-[#1F5BA8] to-[#FF8C00]",
  "bg-gradient-to-br from-[#FF8C00] to-[#FFB347]",
  "bg-gradient-to-br from-[#0E2A47] to-[#FF8C00]",
  "bg-gradient-to-br from-[#003366] to-[#00A3A3]",
  "bg-gradient-to-br from-[#FF8C00] to-[#C2410C]",
  "bg-gradient-to-br from-[#1A2B6B] to-[#003366]",
  "bg-gradient-to-br from-[#FF8C00] to-[#003366]",
];

export const LESSONS: Lesson[] = [
  {
    slug: "lego-car",
    title: "Build Your First LEGO Car",
    subtitle: "Mechanics, axles & wheels — make it roll!",
    emoji: "🚗",
    duration: "30 min",
    difficulty: "Beginner",
    embed: {
      kind: "tinkercad",
      url: "https://www.tinkercad.com/embed/3ZpqRS6Wb6S?editbtn=1",
      label: "Tinkercad — Teacher Template",
    },
    videoUrl: "https://cdn.coverr.co/videos/coverr-toy-car-on-the-floor-9220/1080p.mp4",
    worksheetUrl: "/worksheets/lego-car.pdf",
    badge: "🚗",
    slides: [
      { emoji: "🧰", title: "Gather Your Bricks",       body: "Open your kit. You'll need 1 chassis plate, 4 wheels, 2 axles, and connector pegs.", bg: legoBgs[0] },
      { emoji: "🔧", title: "Snap the Chassis",          body: "Click the long flat plate together — this is the body of your car.", bg: legoBgs[1] },
      { emoji: "⚙️", title: "Add the Axles",             body: "Push the axles through the holes under the chassis. They should spin freely.", bg: legoBgs[2] },
      { emoji: "🛞", title: "Mount the Wheels",          body: "Press a wheel onto each end of both axles. Make sure they're tight!", bg: legoBgs[3] },
      { emoji: "🪛", title: "Reinforce the Frame",       body: "Add side bricks for strength. A wobbly car loses races!", bg: legoBgs[4] },
      { emoji: "🎨", title: "Decorate Your Driver",      body: "Add your driver brick on top. Engineers love personality.", bg: legoBgs[5] },
      { emoji: "📏", title: "Test Roll Distance",        body: "Roll it on a flat surface. Measure how far it goes — record it!", bg: legoBgs[6] },
      { emoji: "📸", title: "Snap & Submit",             body: "Take a front and side photo for the Assessment Hub. You're ready, Engineer!", bg: legoBgs[7] },
    ],
    quiz: [
      { q: "What part lets the wheels spin?",        options: ["Chassis", "Axle", "Connector peg", "Driver"], answer: 1 },
      { q: "Why reinforce the frame?",                options: ["Looks cool", "Adds strength so it doesn't fall apart", "Makes it heavier on purpose", "Required by LEGO"], answer: 1 },
      { q: "What do you submit for assessment?",      options: ["A drawing", "A short song", "Front + side photos of the build", "Just the score"], answer: 2 },
      { q: "Which surface is best to test the roll?", options: ["Carpet", "Sand", "Flat smooth floor", "Grass"], answer: 2 },
      { q: "How many wheels does the basic car need?", options: ["2", "3", "4", "6"], answer: 2 },
    ],
  },
  {
    slug: "arduino-traffic-light",
    title: "Arduino Traffic Light",
    subtitle: "Code red → yellow → green with delays.",
    emoji: "🚦",
    duration: "45 min",
    difficulty: "Intermediate",
    embed: {
      kind: "wokwi",
      url: "https://wokwi.com/projects/348363808577356371",
      label: "Wokwi — Teacher Template",
    },
    videoUrl: "https://cdn.coverr.co/videos/coverr-traffic-lights-at-night-7723/1080p.mp4",
    worksheetUrl: "/worksheets/arduino-traffic-light.pdf",
    badge: "🚦",
    slides: [
      { emoji: "🧠", title: "Meet the Arduino",          body: "The Arduino UNO is a tiny computer. It runs the code you write.", bg: legoBgs[0] },
      { emoji: "🔴", title: "Wire the Red LED",          body: "Connect Red LED long leg to pin 8 via a 220Ω resistor, short leg to GND.", bg: legoBgs[3] },
      { emoji: "🟡", title: "Wire the Yellow LED",       body: "Yellow LED to pin 9, same resistor pattern. Mind the polarity!", bg: legoBgs[2] },
      { emoji: "🟢", title: "Wire the Green LED",        body: "Green LED to pin 10. Three lights, three pins — like a real traffic light.", bg: legoBgs[1] },
      { emoji: "⌨️", title: "Set Up pinMode()",          body: "In setup() declare each pin as OUTPUT so the Arduino can drive them.", bg: legoBgs[4] },
      { emoji: "⏱️", title: "Use delay() Wisely",        body: "Red 3s → Green 3s → Yellow 1s. Drivers need time to react.", bg: legoBgs[5] },
      { emoji: "🔁", title: "Loop Forever",              body: "loop() repeats forever — perfect for a traffic light.", bg: legoBgs[6] },
      { emoji: "🚀", title: "Run & Submit",              body: "Hit Run in Wokwi, watch the cycle, then submit to the Assessment Hub.", bg: legoBgs[7] },
    ],
    quiz: [
      { q: "Which pin order matches the slides?", options: ["Red 10, Yellow 9, Green 8", "Red 8, Yellow 9, Green 10", "All on pin 13", "Random"], answer: 1 },
      { q: "What does pinMode(pin, OUTPUT) do?",   options: ["Reads voltage", "Sets the pin to send signal out", "Disables the pin", "Renames the pin"], answer: 1 },
      { q: "Why use a 220Ω resistor with an LED?", options: ["For decoration", "To limit current and protect the LED", "To make it brighter", "Not needed"], answer: 1 },
      { q: "How long should yellow stay on?",      options: ["Same as red", "Longer than green", "Briefly — about 1 second", "Skip yellow"], answer: 2 },
      { q: "Where do repeating actions go?",       options: ["setup()", "loop()", "main()", "init()"], answer: 1 },
      { q: "delay(1000) waits how long?",          options: ["1 ms", "1 s", "10 s", "1 min"], answer: 1 },
    ],
  },
];

export const STARTER_CODE = `// ASIST Foundation — Traffic Light Starter
const int RED = 8, YELLOW = 9, GREEN = 10;

void setup() {
  pinMode(RED, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
}

void loop() {
  digitalWrite(RED, HIGH);  delay(3000); digitalWrite(RED, LOW);
  digitalWrite(GREEN, HIGH); delay(3000); digitalWrite(GREEN, LOW);
  digitalWrite(YELLOW, HIGH); delay(1000); digitalWrite(YELLOW, LOW);
}
`;
