export interface ConditionInsight {
  signatureIngredient: string;
  whatYouMightNeed: string;
  actionableInsight: string;
}

export const CONDITION_INSIGHTS: Record<number, ConditionInsight> = {
  1: {
    signatureIngredient:
      "Your strongest ingredient is validation — the people around you believe your burn is real. That's rarer than most people think. When the pepper is acknowledged, everything else in the recipe has a foundation to build on. This is the fire under the pot — without it, nothing else cooks.",
    whatYouMightNeed:
      "Right now, the people around you may not fully see what you're carrying — or you may not feel safe showing them. That doesn't mean your pain isn't real. It means the recipe is missing its first ingredient. Validation isn't about convincing anyone. It's about finding the people who don't need convincing.",
    actionableInsight:
      "This week, tell one person one true thing about how you're really doing — not the polished version. It doesn't have to be dramatic. Just honest. Validation starts with letting someone see the real pepper.",
  },
  2: {
    signatureIngredient:
      "Your strongest ingredient is agency — you're not just enduring your pain, you're choosing how to carry it. That shift from autopilot to intention changes everything. You've looked at the recipes you inherited and decided which ones to keep. That's not just coping. That's authorship.",
    whatYouMightNeed:
      "Right now, the pain may feel like something happening to you rather than something you're moving through. That's not a character flaw — it's what happens when the burn is intense and the options feel limited. Agency doesn't mean controlling the pain. It means choosing your next move even when the heat is high.",
    actionableInsight:
      "Identify one way you handle pain that you didn't choose — something you inherited or fell into. This week, try one alternative. Not a permanent change. An experiment. Agency starts with one intentional move.",
  },
  3: {
    signatureIngredient:
      "Your strongest ingredient is community — you have people you can sit with when you're hurting without performing or pretending. That's not just comforting. The science confirms it: the presence of someone who cares about you measurably changes how your body processes pain. Your table is full, and that changes how every other ingredient works.",
    whatYouMightNeed:
      "Right now, you may be carrying more alone than you need to. That's not strength — it's a recipe with a missing ingredient. Community doesn't mean having a crowd. It means having people who can hold some of the weight without you having to explain why it's heavy.",
    actionableInsight:
      "Think about who used to be at your table but isn't anymore — not because of conflict, but because life pulled you apart. Reach out to one of them this week. Not with a crisis. Just with the truth that you've been missing them there.",
  },
  4: {
    signatureIngredient:
      "Your strongest ingredient is capacity — you can feel the burn without being consumed by it. That's not numbness. It's the ability to hold pain and still move toward what matters. You've built a kitchen that can handle more heat than most, and that changes what you're able to cook.",
    whatYouMightNeed:
      "Right now, the burn may feel like more than you can hold. That's not weakness — it's information. Capacity isn't about gritting through it. It's built gradually, with the right people and the right ingredients around you. The goal isn't to stop feeling. It's to build a bigger kitchen.",
    actionableInsight:
      "Identify one hard thing you've been avoiding because the heat felt like too much. This week, take one small step toward it — not to fix it, but to prove to yourself that you can stand in the kitchen without getting burned.",
  },
  5: {
    signatureIngredient:
      "Your strongest ingredient is generativity — what you've made from living alongside your pain has become something you can hand to someone else. When you pass the sauce, something unexpected happens: the suffering that went into making it becomes purpose. And purpose is one of the strongest predictors of a life that feels genuinely worth living.",
    whatYouMightNeed:
      "Right now, the pain may still feel too raw to share — or you may not yet see what it's made you capable of offering. That's okay. Generativity isn't about rushing to help others. It's about recognizing that what you've survived has seasoned you in ways that someone else will eventually need.",
    actionableInsight:
      "Think about one thing your pain taught you that you wish someone had told you earlier. Write it down. You don't have to share it yet. But naming it is the first step toward passing the sauce.",
  },
};

export const FRAMEWORK_REMINDER =
  "Your Pepper Sauce Profile is a map, not a diagnosis. It shows you what's in your recipe right now — and what you might want to add.";
