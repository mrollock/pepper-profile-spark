export interface QuizItem {
  id: number;
  text: string;
  condition: number;
  type: 'likert' | 'fire';
  scoring?: 'standard' | 'reverse' | 'scoville';
  options?: { val: string; text: string }[];
  isChronic?: boolean;
}

export const ITEMS: QuizItem[] = [
  // Condition 1: The Pepper Is Real (Validation)
  { id:1, text:"The people closest to me understand what I\u2019m really going through \u2014 not just the version I show them.", condition:1, type:"likert", scoring:"standard" },
  { id:2, text:"Someone in my life can tell when I\u2019m hurting even when I haven\u2019t said a word.", condition:1, type:"likert", scoring:"standard" },
  { id:3, text:"When I share what I\u2019m going through, the people around me treat it like it\u2019s real and it matters \u2014 they don\u2019t compare it to someone else\u2019s pain or tell me it\u2019s not that bad.", condition:1, type:"likert", scoring:"standard" },
  { id:4, text:"Most days, I put energy into making sure the people around me think I\u2019m doing better than I am.", condition:1, type:"likert", scoring:"reverse" },
  { id:5, text:"I trust my own sense of what I\u2019m feeling, even when other people see it differently.", condition:1, type:"likert", scoring:"standard" },
  { id:6, text:"My pain feels so heavy right now that I\u2019m not sure I can keep carrying it.", condition:0, type:"likert", scoring:"scoville" },
  // Condition 2: Choose Your Recipe (Agency)
  { id:7, text:"The way I handle hard things now is something I chose, not something I\u2019m doing on autopilot.", condition:2, type:"likert", scoring:"standard" },
  { id:8, text:"When I\u2019m in pain, I feel more like someone moving through it than someone pinned under it.", condition:2, type:"likert", scoring:"standard" },
  { id:9, text:"Asking for help with my pain feels like a smart move, not a sign of weakness.", condition:2, type:"likert", scoring:"standard" },
  { id:10, text:"Even when I can\u2019t change the situation causing my pain, I still find ways to live on my own terms.", condition:2, type:"likert", scoring:"standard" },
  { id:11, text:"I have looked at how I was raised to deal with pain and decided for myself what to keep and what to let go.", condition:2, type:"likert", scoring:"standard" },
  // Condition 3: Come to the Table (Community)
  { id:12, text:"I have people I can sit with when I\u2019m hurting \u2014 without having to perform or pretend.", condition:3, type:"likert", scoring:"standard" },
  { id:13, text:"In my closest relationships, the holding goes both ways \u2014 I carry their pain sometimes, and they carry mine.", condition:3, type:"likert", scoring:"standard" },
  { id:14, text:"I hold back from sharing my pain with others because I don\u2019t want to be a burden.", condition:3, type:"likert", scoring:"reverse" },
  { id:15, text:"With my people, I can get straight to what hurts without having to translate my experience first.", condition:3, type:"likert", scoring:"standard" },
  { id:16, text:"There is someone in my life whose physical presence \u2014 just being near them \u2014 makes hard things easier to bear.", condition:3, type:"likert", scoring:"standard" },
  { id:17, text:"Right now, I am in a situation where I do not feel safe.", condition:0, type:"likert", scoring:"scoville" },
  // Condition 4: Build Your Heat Tolerance (Capacity)
  { id:18, text:"When something painful comes up, I can feel it without shutting down or being swallowed by it.", condition:4, type:"likert", scoring:"standard" },
  { id:19, text:"Even on days when I\u2019m hurting, I still move toward the things and people that matter most to me.", condition:4, type:"likert", scoring:"standard" },
  { id:20, text:"When I\u2019m in pain, I can recognize that my darkest thoughts are the pain talking \u2014 not the whole truth.", condition:4, type:"likert", scoring:"standard" },
  { id:21, text:"Looking back over the past few years, I can hold more hard things at once than I used to \u2014 and it\u2019s not because I got tougher. It\u2019s because I grew.", condition:4, type:"likert", scoring:"standard" },
  { id:22, text:"I can handle more when I have people around me than when I\u2019m carrying it alone.", condition:4, type:"likert", scoring:"standard" },
  // Condition 5: Pass the Sauce (Generativity)
  { id:23, text:"Something I learned from going through pain has helped someone else go through theirs.", condition:5, type:"likert", scoring:"standard" },
  { id:24, text:"Sometimes I think the people in my life would be better off without me.", condition:0, type:"likert", scoring:"scoville" },
  { id:25, text:"When I see someone younger going through something I\u2019ve been through, I feel a responsibility to share what I\u2019ve learned.", condition:5, type:"likert", scoring:"standard" },
  { id:26, text:"I know the difference between telling someone my story to help them and telling it because I still need someone to hold it.", condition:5, type:"likert", scoring:"standard" },
  { id:27, text:"The way I\u2019ve learned to hold pain is something I\u2019m passing to the next generation \u2014 a child, a student, a young person in my life.", condition:5, type:"likert", scoring:"standard" },
  { id:28, text:"When I help others with their pain, it comes from a place of fullness \u2014 not from running on empty.", condition:5, type:"likert", scoring:"standard" },
  // Fire Type
  { id:29, type:"fire", condition:0, text:"Think about the pain that\u2019s most present in your life right now. Which of these sounds most like the pepper you\u2019re carrying?", options:[
    {val:"A",text:"A burn that\u2019s mine alone \u2014 something I\u2019m going through personally, like loss, illness, failure, or a weight inside me that nobody gave me."},
    {val:"B",text:"A burn between me and someone else \u2014 a relationship that\u2019s broken, strained, or hurting, where the pain lives in the space between us."},
    {val:"C",text:"A burn my whole community carries \u2014 pain from systems, injustice, or collective harm that isn\u2019t just mine but belongs to all of us."},
    {val:"D",text:"A burn that was here before I was \u2014 pain passed down through my family or my people, grief I inherited from a generation I may never have met."},
    {val:"E",text:"A burn I chose to walk into \u2014 the ache of growing, stretching, becoming something new, knowing the discomfort is part of the recipe."}
  ]},
  { id:30, type:"fire", condition:0, text:"When you picture where your pain lives, which of these fits best?", options:[
    {val:"A",text:"It lives inside me \u2014 in my body, my mind, my spirit. It\u2019s personal."},
    {val:"B",text:"It lives between me and another person \u2014 in a conversation we can\u2019t have, a trust that broke, a distance that won\u2019t close."},
    {val:"C",text:"It lives in the air around my community \u2014 in the news, in the systems, in what happens to people who look like me or live where I live."},
    {val:"D",text:"It lives in my family line \u2014 in the stories that were never told, the grief that was never named, the weight I feel but can\u2019t fully explain."},
    {val:"E",text:"It lives at the edge of who I\u2019m becoming \u2014 in the stretch between who I\u2019ve been and who I\u2019m trying to be."}
  ]},
  { id:31, type:"fire", condition:0, text:"What is most likely to make your pain flare up?", options:[
    {val:"A",text:"A bad day with my health, my mood, or a private struggle that nobody else can see."},
    {val:"B",text:"A moment with the person who hurt me \u2014 or the absence of someone I need who isn\u2019t there."},
    {val:"C",text:"Watching something unjust happen to my community \u2014 or being reminded that the systems around me weren\u2019t built for people like me."},
    {val:"D",text:"A family gathering, a holiday, or a quiet moment when I feel the weight of something that started long before me."},
    {val:"E",text:"Stepping outside my comfort zone \u2014 taking on something hard because it matters to who I\u2019m becoming, even though it burns."}
  ]},
  { id:32, type:"fire", condition:0, text:"When your pain is at its worst, what do you need most?", options:[
    {val:"A",text:"Someone to see what I\u2019m going through without me having to explain it \u2014 because this one is mine to carry, and I just need to be seen."},
    {val:"B",text:"A way to repair, release, or make peace with the person connected to my pain \u2014 or the strength to walk away."},
    {val:"C",text:"To know that my people are standing together \u2014 that I\u2019m not carrying this alone because none of us should have to."},
    {val:"D",text:"To understand where this pain came from \u2014 to name the thing my family never named, so I can decide what to carry forward and what to set down."},
    {val:"E",text:"To be reminded that this discomfort is part of the recipe \u2014 that the heat means something is cooking, not that something is wrong."}
  ]},
  { id:33, type:"fire", condition:0, isChronic:true, text:"This last question is different. Think about all the kinds of fire above. Which burn have you been carrying the longest without making anything with it \u2014 the one that\u2019s been sitting in the jar, uncooked?", options:[
    {val:"A",text:"A personal pain I\u2019ve never fully dealt with \u2014 something private that I\u2019ve pushed down or worked around instead of facing."},
    {val:"B",text:"A relational wound that never healed \u2014 someone who hurt me, or a bond that broke, and I never made peace with it."},
    {val:"C",text:"A collective pain I\u2019ve carried for my community for so long it feels like background noise \u2014 always there, never addressed."},
    {val:"D",text:"An inherited pain I\u2019ve always felt but never understood \u2014 something from my family or my people\u2019s history that lives in me without a name."},
    {val:"E",text:"A growth edge I\u2019ve been avoiding \u2014 something I know I need to do or become, but the heat of starting has kept me standing still."}
  ]}
];

export const CONDITION_NAMES: Record<number, string> = {
  1: "The Pepper Is Real",
  2: "Choose Your Recipe",
  3: "Come to the Table",
  4: "Build Your Heat Tolerance",
  5: "Pass the Sauce"
};

export const CONDITION_SUBTITLES: Record<number, string> = {
  1: "Validation",
  2: "Agency",
  3: "Community",
  4: "Capacity",
  5: "Generativity"
};

export const LIKERT_LABELS = [
  "Strongly\nDisagree",
  "Disagree",
  "Slightly\nDisagree",
  "Slightly\nAgree",
  "Agree",
  "Strongly\nAgree"
];

export const FIRE_NAMES: Record<string, string> = {
  A: "Personal Fire",
  B: "Relational Fire",
  C: "Communal Fire",
  D: "Ancestral Fire",
  E: "Growth Fire"
};

export const FIRE_DESC: Record<string, string> = {
  A: "Pain rooted in your own body, mind, or history. This is the pepper you\u2019re grinding alone. Your recipe needs people who can see the burn without you having to show it.",
  B: "Pain that lives between you and someone you love. This is a pepper you can\u2019t cook alone, because the other person is part of the ingredient.",
  C: "Pain you carry because your community carries it. This pepper doesn\u2019t go in an individual jar. Your recipe needs a bigger table.",
  D: "Pain passed down through generations \u2014 not chosen, but inherited. This is a pepper someone else planted. Your recipe includes deciding what to carry forward and what to set down.",
  E: "The burn of becoming \u2014 stretching beyond who you\u2019ve been. This burn is part of the recipe, not a sign something\u2019s wrong. But growth fire still needs the other conditions: you can\u2019t season yourself alone."
};

export const CONDITION_COLORS: Record<number, string> = {
  1: "#C8962E",
  2: "#D4A017",
  3: "#5A6B42",
  4: "#B8451A",
  5: "#A8893E"
};

export function getConditionLabel(itemIndex: number): string {
  const item = ITEMS[itemIndex];
  if (!item || item.type === 'fire') return '';
  const cond = item.condition;
  if (cond === 0) {
    if (item.id === 6) return CONDITION_NAMES[1];
    if (item.id === 17) return CONDITION_NAMES[3];
    if (item.id === 24) return CONDITION_NAMES[5];
  }
  return CONDITION_NAMES[cond] || '';
}

export function scoreCondition(condNum: number, responses: Record<number, number | string>): number {
  const items = ITEMS.filter(i => i.condition === condNum && i.scoring !== 'scoville');
  let total = 0;
  items.forEach(item => {
    let raw = (responses[item.id] as number) || 3;
    if (item.scoring === 'reverse') raw = 7 - raw;
    total += raw;
  });
  return total;
}

export function getPrimaryFireType(responses: Record<number, number | string>): string[] {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  [29, 30, 31, 32].forEach(id => {
    const v = responses[id] as string;
    if (v) counts[v]++;
  });
  let max = 0;
  let winners: string[] = [];
  for (const k in counts) {
    if (counts[k] > max) { max = counts[k]; winners = [k]; }
    else if (counts[k] === max && max > 0) { winners.push(k); }
  }
  return winners;
}

export function getChronicFireType(responses: Record<number, number | string>): string | null {
  return (responses[33] as string) || null;
}

export function getInterpretation(score: number): string {
  if (score <= 12) return "This ingredient is scarce right now. This is a place to start adding \u2014 not a deficit, but where your recipe has room to grow.";
  if (score <= 20) return "This ingredient is present but inconsistent. You\u2019ve got some of this, but the supply is uneven. Strengthening this changes the whole recipe.";
  if (score <= 26) return "This ingredient is solid. Your pantry is well-stocked here. This is a strength to cook from.";
  return "This ingredient is abundant. You\u2019ve got more than enough \u2014 enough to share. This may be where your recipe shines.";
}
