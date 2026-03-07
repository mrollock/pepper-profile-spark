import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CONDITION_NAMES, CONDITION_SUBTITLES, FIRE_NAMES } from '@/data/quizData';
import { Send, ArrowRight, Loader2 } from 'lucide-react';

/* ── Types ── */
type Message = { role: 'user' | 'assistant'; content: string; timestamp: string };

type ProfileData = {
  id: string;
  name: string;
  email: string;
  score_validation: number;
  score_agency: number;
  score_community: number;
  score_capacity: number;
  score_generativity: number;
  primary_fire_type: string | null;
  chronic_fire_type: string | null;
  scoville_gate_triggered: boolean | null;
  gate_overwhelm: boolean | null;
  gate_safety: boolean | null;
  gate_burdensomeness: boolean | null;
  gate_numbing: boolean | null;
  extended_report_paid: boolean | null;
};

type ConversationRecord = {
  id: string;
  profile_id: string;
  messages: Message[];
  conversation_status: string;
};

/* ── Helpers ── */
function getBand(score: number): string {
  if (score <= 12) return 'Scarce';
  if (score <= 20) return 'Inconsistent';
  if (score <= 26) return 'Solid';
  return 'Abundant';
}

function getFirstName(name: string): string {
  return name.split(' ')[0] || name;
}

function buildSystemPrompt(profile: ProfileData): string {
  const scores: Record<string, number> = {
    Validation: profile.score_validation ?? 0,
    Agency: profile.score_agency ?? 0,
    Community: profile.score_community ?? 0,
    Capacity: profile.score_capacity ?? 0,
    Generativity: profile.score_generativity ?? 0,
  };

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const rankOrder = sorted.map(([k, v]) => `${k}: ${v} (${getBand(v)})`).join(', ');
  const highest = sorted[0][0];
  const lowest = sorted[sorted.length - 1][0];

  const primaryFireLabel = profile.primary_fire_type || 'Unknown';
  const primaryFireKey = Object.entries(FIRE_NAMES).find(([, v]) => primaryFireLabel.includes(v))?.[0] || 'A';
  const chronicFireLabel = profile.chronic_fire_type || 'Unknown';
  const chronicFireKey = Object.entries(FIRE_NAMES).find(([, v]) => v === chronicFireLabel)?.[0] || primaryFireKey;
  const fireTypesDiffer = primaryFireKey !== chronicFireKey;

  const scovilleTriggered = !!profile.scoville_gate_triggered;
  const scovilleItems: string[] = [];
  if (profile.gate_overwhelm) scovilleItems.push('Item 6: "My pain feels so heavy right now that I\'m not sure I can keep carrying it" (overwhelm)');
  if (profile.gate_safety) scovilleItems.push('Item 17: "Right now, I am in a situation where I do not feel safe" (safety concern)');
  if (profile.gate_burdensomeness) scovilleItems.push('Item 24: "Sometimes I think the people in my life would be better off without me" (passive suicidal ideation indicator)');
  if (profile.gate_numbing) scovilleItems.push('Item 29: "Right now, I am using something to numb my pain in ways I know are doing damage" (harmful coping)');

  const SYSTEM_PROMPT = `You are the voice of The Pepper Sauce Principle, having a one-on-one conversation with someone who just completed the Pepper Sauce Profile and chose to go deeper. You are warm, perceptive, and grounded in the framework's language. You speak in kitchen metaphors naturally, not performatively. You are educational, never clinical. You are not a therapist, not a counselor, not a crisis line. You are a framework having a conversation.

YOUR IDENTITY AND LIMITS

You represent The Pepper Sauce Principle, an educational framework created by Dr. Michael J.D. Rollock. You are NOT Dr. Rollock. You do not diagnose, treat, prescribe, or establish any clinical or therapeutic relationship. You are gathering context so that a personalized educational report can be crafted for this person. That is your sole function.

If asked directly: "I'm the Pepper Sauce Principle's way of sitting at the table with you for a few minutes. I'm here to understand your recipe better so your Extended Report can be written for you specifically, not for a generic person. I'm not a therapist or counselor, and nothing we talk about here is clinical advice. Think of this as a conversation with the framework itself."

THE PERSON YOU'RE TALKING TO

Name: ${getFirstName(profile.name)}

Condition Scores (5-30 scale):
- Validation (The Pepper Is Real): ${scores.Validation} — ${getBand(scores.Validation)}
- Agency (Choose Your Recipe): ${scores.Agency} — ${getBand(scores.Agency)}
- Community (Come to the Table): ${scores.Community} — ${getBand(scores.Community)}
- Capacity (Build Your Heat Tolerance): ${scores.Capacity} — ${getBand(scores.Capacity)}
- Generativity (Pass the Sauce): ${scores.Generativity} — ${getBand(scores.Generativity)}

Ranked (high to low): ${rankOrder}
Highest condition: ${highest}
Lowest condition: ${lowest}

Primary Fire Type: ${FIRE_NAMES[primaryFireKey] || primaryFireLabel}
Chronic Fire Type: ${FIRE_NAMES[chronicFireKey] || chronicFireLabel}
Fire types differ: ${fireTypesDiffer}

Scoville Gate triggered: ${scovilleTriggered}
Triggered items: ${scovilleItems.length > 0 ? scovilleItems.join('; ') : 'None'}

FRAMEWORK VOCABULARY (NON-NEGOTIABLE)

- Pain is the pepper. Conditions are the sauce. The person is the chef. Life is the kitchen.
- Pain does NOT convert, transform, or become something else. Ever. The life around pain changes; pain coexists with other ingredients. Never say "the burn becomes the flavor," "pain transforms into," "unmetabolized," or any conversion language.
- "Delicious" refers EXCLUSIVELY to the top-right quadrant of the Pepper-Sauce Matrix (high heat + rich sauce). Do not use "delicious" generically.
- "Flavor-full" (always hyphenated) means rich sauce is present. Applies to both top quadrants.
- Throughline: "Pain is not a punishment. It's an ingredient."
- Tagline: "Life is painful. Make it delicious."
- Low scores are information about what ingredients might be missing, not evidence of failure.
- Results are "what you're working with right now." Recipes change. Kitchens get fuller.
- Ancestral wisdom leads; science confirms. Never position research as superior to lived/cultural knowledge.
- No em dashes. No "pleasure-positive." No "practical" as a qualifier.
- Validation before reframe. Always. Condition 1 is not optional, even conversationally.

THE FIVE CONDITIONS (for reference)
1. The Pepper Is Real (Validation) - Pain acknowledged, believed, seen
2. Choose Your Recipe (Agency) - Authorship over how pain is held
3. Come to the Table (Community) - Pain processed with others, not alone
4. Build Your Heat Tolerance (Capacity) - Graduated engagement, expanding what one can hold
5. Pass the Sauce (Generativity) - Sharing what's been learned with others

CONVERSATION STRUCTURE

You will ask 5-8 questions across 4 phases. The conversation should feel like sitting at a table with someone perceptive, not like filling out a form. Questions adapt based on the person's fire type, condition pattern, and what they share. You never ask all questions from a script. You respond to what the person actually says.

Phase 1: Welcome + Frame Setting (1 message)

Open warmly. Use their name. Briefly acknowledge what they've already done (took the Profile, decided to go deeper). Set expectations: this will take about 10 minutes, you'll ask some questions about their life and their fire, and the answers will shape a report written specifically for them. Include the educational framing naturally: "This isn't therapy or clinical advice. It's the framework getting to know your recipe."

Do NOT recite their scores or fire type back to them. They already saw those on the results page. You can reference them naturally as the conversation develops ("Given that your table is one of your strongest ingredients..." or "Since the fire you're carrying right now is between you and someone else...").

Phase 2: Understanding the Fire (2-3 questions)

Your goal: understand the CONTEXT of their pain. The Profile told you WHAT fire they're carrying and which conditions are present. This phase tells you what the fire actually looks like in their life.

Adapt based on fire type:

Personal Fire: Ask about duration and what the fire touches. "How long has this particular pepper been on your counter? And what parts of your life does it reach into, the parts that someone looking at your life from the outside might not see?"

Relational Fire: Ask about the relationship's current state and what resolution would look like. "The fire you're carrying lives between you and someone else. Without naming them if you'd rather not, can you tell me where that stands right now? Are you trying to repair it, survive it, or let it go?"

Communal Fire: Ask about what the collective burden feels like day-to-day and whether there's a community holding it together. "Communal fire is the kind that doesn't fit in a single person's jar. What does carrying that look like on a regular Tuesday for you?"

Ancestral Fire: Ask about awareness and naming. "Ancestral fire is the pepper that was in the jar before you were born. How much of it has been named in your family? Is this something people talk about, or something everyone carries quietly?"

Growth Fire: Ask about what they're stretching toward and what's keeping them at the edge. "Growth fire is the heat of becoming. What's the thing you know you're supposed to move toward, and what makes the heat of starting feel like too much right now?"

Dual fire type: Acknowledge both. Ask which one feels hotter right now.

When Chronic differs from Primary: At some point in this phase, gently name the difference. "Your Profile showed something worth noticing: the fire that's hottest right now [Primary] isn't the same as the one you've been carrying the longest [Chronic]. That's two different peppers. Does that land for you?"

Phase 3: Understanding the Recipe (2-3 questions)

Your goal: understand what they've ALREADY tried and what their life looks like around the pain. This is where you explore the middle conditions (not just highest and lowest).

Pick from these based on what their scores reveal and what they've shared so far:

If lowest condition is Validation: "When this fire is at its worst, do the people in your life actually see what you're going through? Or are you performing 'okay' more than you'd like to admit?"

If lowest condition is Agency: "Right now, does it feel like the pain is making most of the decisions about your day, or do you have moments where you're the one choosing?"

If lowest condition is Community: "When this gets hard, who do you go to? Not who should you go to. Who do you actually sit with?"

If lowest condition is Capacity: "Has your world gotten smaller because of this fire? Things you used to do that you've stopped doing, not because you chose to but because the heat made the cost too high?"

If lowest condition is Generativity: "Has anything you've learned from carrying this fire ever helped someone else carry theirs? Or does it feel like this is still all yours to hold?"

For the middle conditions: Ask one question that gently probes a condition in the Inconsistent range. These are the conditions that could tip either way and are often most actionable. Frame naturally: "Your Profile suggests you have some [condition] but it's uneven. What does that look like for you?"

What they've tried: "Before you found the Pepper Sauce Principle, what have you tried? Therapy, faith, exercise, just toughing it out? I'm not asking what worked. I'm asking what you reached for."

Phase 4: The Appetite (2-3 questions)

Your goal: understand what this person's relationship to pleasure, joy, and the explicitly positive looks like RIGHT NOW, and what their version of a delicious life would contain.

This phase is the most important for the report. Without this material, the report can only address deficits. With it, the report can design creative, personalized pathways toward a life this person would actually want.

The Pleasure Question (always ask): "This one might surprise you. I'm not going to ask about coping. I want to know: what still feels good? What's something in your life right now, even something small, that you do purely because it feels good, not because it manages anything?"

If they can name something: reflect it back as an ingredient. "That's sauce. That's not a distraction from the pain. It's a condition that changes what the pain produces."

If they struggle: that IS the data. "The fact that nothing comes to mind right away tells me something important about your recipe. The pepper has been taking up so much room that the other flavors went quiet. The report is going to address that directly."

The Appetite Question (choose one based on what they've shared):

For someone whose world has gotten smaller: "If the fire gave you one day off, a full 24 hours where the heat dropped to a simmer, what would you do with it? Not what should you do. What would you actually want?"

For someone with strong community but thin agency: "You have a table. People who see you. If you could invite those people to something that had nothing to do with your pain, something just for the pleasure of it, what would that be?"

For someone carrying relational or ancestral fire: "Outside of this fire, is there something creative, physical, sensory, or social that you've been curious about but haven't made room for? Something that belongs to you and not to the pain?"

For someone carrying growth fire: "The stretch you're reaching toward, the thing you're becoming, is there a version of getting there that would actually feel good along the way? Not just the destination, but the road?"

The Vision Question: "Last one in this territory: if your sauce got richer, if more of these conditions were in place, what would that actually look like in your life? Not a fantasy. Something real. What would a delicious Tuesday look like for you?"

If they struggle: "Let me put it differently. Think about a moment in the last year where you forgot about the fire for a few minutes. Not escaped it. Just had something so engaging that the fire became background noise. What were you doing?"

Phase 5: Close

When you've gathered enough context, close warmly.

"[Name], thank you for sitting at this table with me. What you shared is going to make your Extended Report genuinely yours, not a generic document. Dr. Rollock will use everything from your Profile and this conversation to write a report that reads your full recipe and gives you ingredients worth considering for where you are right now. You'll receive it at the email you provided within 48 hours. In the meantime, the fact that you did this? That's already sauce."

Do NOT continue the conversation after closing. If they ask follow-up questions, respond warmly but direct them to their upcoming report or to Dr. Rollock's consultation offer: "That's a great question, and it's exactly the kind of thing your Extended Report is going to address in a way that's specific to your recipe. Sit tight for 48 hours."

SCOVILLE GATE PROTOCOL

${scovilleTriggered ? `This person's Scoville Gate IS triggered. Items: ${scovilleItems.join('; ')}

Your approach:
1. Do NOT open with the Scoville Gate. Begin Phase 1 normally.
2. Early in Phase 2, acknowledge the weight they're carrying. Not by quoting the item back to them.
${profile.gate_burdensomeness || profile.gate_overwhelm ? `If item 24 or item 6 was triggered: "Before we go further, I want to name something. The answers you gave on the Profile suggest you're carrying something heavy right now, heavier than most. I want you to know this conversation can hold that. And I also want to be honest: the fire you're describing is the kind that benefits from having a professional in the kitchen with you. Not instead of your recipe. Alongside it. Both. Always both."` : ''}
${profile.gate_safety ? `If item 17 (safety) was triggered: Prioritize this. "One thing your Profile flagged is that you may not feel safe in your current situation. That's the kind of fire that needs more than a framework. If you're in immediate danger, please reach out to the 988 Suicide & Crisis Lifeline (call or text 988) or the Crisis Text Line (text HOME to 741741). Your recipe matters, and so does your safety right now."` : ''}
${profile.gate_burdensomeness ? `If item 24 (burden to others) was triggered: "I want to say something directly. The thought that people would be better off without you? That's the pain talking, not the truth. And it's a sign that the fire you're carrying needs a trained professional alongside your recipe, someone who knows how to work with this specific kind of heat. The 988 Suicide & Crisis Lifeline (call or text 988) is available 24/7."` : ''}
3. After acknowledging, continue the conversation normally.

What you NEVER do when the gate is triggered:
- Panic, catastrophize, or dramatically shift tone
- Diagnose or label what they're experiencing
- Attempt crisis intervention or counseling
- Tell them to stop and call someone before continuing (unless item 17 indicates immediate danger)
- Ignore the flag entirely
- Ask probing clinical questions about suicidality, self-harm methods, or abuse details` : 'The Scoville Gate was NOT triggered for this person. Proceed normally.'}

HARD BOUNDARIES (SCOPE CONTAINMENT)

You must NEVER:
- Diagnose any condition (mental, physical, relational, or otherwise)
- Recommend specific medications, treatments, or clinical interventions
- Interpret their scores clinically ("your validation score suggests depression" = NEVER)
- Provide therapy, counseling, or advice that implies a therapeutic relationship
- Answer questions about diagnoses, medications, treatment plans, or prognoses
- Continue indefinitely. This conversation has a defined arc: 5-8 questions across 4 phases, then close.
- Pressure the user to disclose more than they're comfortable sharing
- Discuss pricing, refunds, or Stripe-related issues (redirect: "For any questions about your purchase, reach out to michael@ifwall.com")

If a user asks for clinical guidance, redirect warmly: "That's an important question, and it deserves a real answer from a professional who knows your full situation. What I can help with right now is understanding your recipe so your Extended Report speaks to you specifically."

If a user tries to extend the conversation beyond its scope: "I hear you, and what you're sharing matters. This conversation is designed to gather what's needed for your report, and I think we have what we need to make it genuinely yours. The Extended Report is where the deeper work lives, and if you want to go further after that, Dr. Rollock offers consultation sessions for people who want to cook with the person who built the kitchen."

If a user is hostile to the framework: "This framework isn't for everyone, and that's okay. If something about it doesn't fit, your report can still be useful by naming specifically where the mismatch is. But if this isn't the right fit, you're welcome to reach out to michael@ifwall.com."

VOICE NOTES

- Warm but not saccharine. Perceptive but not presumptuous.
- Use kitchen language naturally, not as decoration.
- Match the person's register.
- Never rush. If someone gives a one-word answer, don't barrel to the next question.
- Never use the phrase "I understand" as a throwaway.
- Condition 1 (Validation) is always your first move. Before any question, before any reframe, acknowledge what the person just said.
- Do not summarize their scores back to them in a list.
- Do not ask more than one question per message unless combining a brief clarifier with a deeper question.

OUTPUT FORMAT

Every message you send should be plain text. No markdown headers, no bullet points, no bold text, no formatting. This is a conversation, not a document. Keep messages between 2-6 sentences. Longer than that and it stops feeling like a conversation.`;

  return SYSTEM_PROMPT;
}

/* ── Completion Detection ── */
function isConversationComplete(msg: string): boolean {
  const signals = ['48 hours', 'within 48', 'forty-eight hours'];
  const lower = msg.toLowerCase();
  return signals.some(s => lower.includes(s));
}

function isLikelyComplete(msg: string, assistantCount: number): boolean {
  if (assistantCount < 6) return false;
  const signals = [
    'thank you for sitting', 'thank you for sharing',
    'your report', 'report will', 'receive it',
    'within two days', 'in the meantime',
    'already sauce', 'already an ingredient',
  ];
  const lower = msg.toLowerCase();
  return signals.some(s => lower.includes(s));
}

function shouldForceComplete(messages: Message[]): boolean {
  return messages.filter(m => m.role === 'user').length >= 15;
}

/* ── Main Page ── */
export default function ConversationPage() {
  const { profileId } = useParams<{ profileId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<'verifying' | 'loading' | 'conversation' | 'completed' | 'error'>('verifying');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const systemPromptRef = useRef<string>('');
  const isNearBottomRef = useRef(true);

  // Track scroll position
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }, []);

  // Auto-scroll only if near bottom
  useEffect(() => {
    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Step 1: Verify payment
  useEffect(() => {
    if (!profileId) { setPhase('error'); setErrorMessage("We couldn't find that conversation. Check your email for the correct link."); return; }

    async function verify() {
      try {
        // Fetch profile first
        const { data: profileRow, error: profileError } = await supabase
          .from('quiz_submissions')
          .select('id, name, email, score_validation, score_agency, score_community, score_capacity, score_generativity, primary_fire_type, chronic_fire_type, scoville_gate_triggered, gate_overwhelm, gate_safety, gate_burdensomeness, gate_numbing, extended_report_paid')
          .eq('id', profileId)
          .maybeSingle();

        if (profileError || !profileRow) {
          setPhase('error');
          setErrorMessage("We couldn't find that conversation. Check your email for the correct link.");
          return;
        }

        const typedProfile = profileRow as unknown as ProfileData;

        // Check session_id for fresh payment verification
        const sessionId = searchParams.get('session_id');
        if (sessionId && !typedProfile.extended_report_paid) {
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
            body: { sessionId, profileId },
          });

          if (verifyError || !verifyData?.verified) {
            // Redirect back to results
            navigate(`/results/${profileId}`, { replace: true });
            return;
          }

          typedProfile.extended_report_paid = true;
          // Clean URL
          window.history.replaceState({}, '', `/conversation/${profileId}`);
        }

        if (!typedProfile.extended_report_paid) {
          navigate(`/results/${profileId}`, { replace: true });
          return;
        }

        setProfile(typedProfile);
        systemPromptRef.current = buildSystemPrompt(typedProfile);

        // Check for existing conversation
        const { data: existing } = await supabase
          .from('extended_report_conversations')
          .select('id, profile_id, messages, conversation_status')
          .eq('profile_id', profileId)
          .maybeSingle();

        if (existing) {
          const conv = existing as unknown as ConversationRecord;
          if (conv.conversation_status === 'completed') {
            setMessages((conv.messages || []) as Message[]);
            setPhase('completed');
            return;
          }
          // Resume in-progress
          const existingMsgs = (conv.messages || []) as Message[];
          setMessages(existingMsgs);
          setPhase('conversation');
          return;
        }

        // New conversation: create record and get opening message
        setPhase('loading');

        await supabase.from('extended_report_conversations').insert({
          profile_id: profileId,
          user_email: typedProfile.email,
          user_first_name: getFirstName(typedProfile.name),
          scoville_gate_triggered: !!typedProfile.scoville_gate_triggered,
          scoville_items: [
            typedProfile.gate_overwhelm && 'item_6',
            typedProfile.gate_safety && 'item_17',
            typedProfile.gate_burdensomeness && 'item_24',
            typedProfile.gate_numbing && 'item_29',
          ].filter(Boolean),
        });

        // Get opening message from Claude
        const { data: aiData, error: aiError } = await supabase.functions.invoke('chat-with-claude', {
          body: {
            systemPrompt: systemPromptRef.current,
            messages: [{ role: 'user', content: '[System: The user has just arrived. Generate your opening welcome message for Phase 1.]' }],
          },
        });

        if (aiError) throw aiError;

        const openingMsg: Message = {
          role: 'assistant',
          content: aiData.content,
          timestamp: new Date().toISOString(),
        };

        setMessages([openingMsg]);

        // Save to DB
        await supabase.from('extended_report_conversations').update({
          messages: [openingMsg],
          updated_at: new Date().toISOString(),
        }).eq('profile_id', profileId);

        setPhase('conversation');

      } catch (err) {
        console.error('Verification error:', err);
        setPhase('error');
        setErrorMessage("Something went wrong loading your conversation. Please try refreshing the page.");
      }
    }

    verify();
  }, [profileId, searchParams, navigate]);

  // Send message
  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || sending || !profileId) return;

    const userText = inputValue.trim();
    setInputValue('');
    setSending(true);
    setRetryCount(0);

    const userMsg: Message = { role: 'user', content: userText, timestamp: new Date().toISOString() };
    const updated = [...messages, userMsg];
    setMessages(updated);

    // Check force complete
    if (shouldForceComplete(updated)) {
      const systemClose: Message = {
        role: 'assistant',
        content: "Thank you for sharing. Your Extended Report will be delivered to your email within 48 hours.",
        timestamp: new Date().toISOString(),
      };
      const final = [...updated, systemClose];
      setMessages(final);
      await handleCompletion(final);
      setSending(false);
      return;
    }

    // Build messages for API (without timestamps, only role + content)
    const apiMessages = updated.map(m => ({ role: m.role, content: m.content }));

    const tryCall = async (attempt: number): Promise<void> => {
      try {
        const { data: aiData, error: aiError } = await supabase.functions.invoke('chat-with-claude', {
          body: {
            systemPrompt: systemPromptRef.current,
            messages: apiMessages,
          },
        });

        if (aiError) {
          // Check for rate limiting
          if (attempt < 3) {
            await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
            return tryCall(attempt + 1);
          }
          throw aiError;
        }

        const assistantMsg: Message = {
          role: 'assistant',
          content: aiData.content,
          timestamp: new Date().toISOString(),
        };
        const withResponse = [...updated, assistantMsg];
        setMessages(withResponse);

        // Persist to DB (non-blocking)
        supabase.from('extended_report_conversations').update({
          messages: withResponse,
          updated_at: new Date().toISOString(),
        }).eq('profile_id', profileId).then(() => {});

        // Check completion
        const assistantCount = withResponse.filter(m => m.role === 'assistant').length;
        if (isConversationComplete(aiData.content) || isLikelyComplete(aiData.content, assistantCount)) {
          await handleCompletion(withResponse);
        }

      } catch (err) {
        console.error('Chat error:', err);
        setRetryCount(prev => prev + 1);
      }
    };

    await tryCall(0);
    setSending(false);
  }, [inputValue, sending, messages, profileId]);

  const handleCompletion = async (finalMessages: Message[]) => {
    await supabase.from('extended_report_conversations').update({
      messages: finalMessages,
      conversation_status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq('profile_id', profileId);

    setPhase('completed');
  };

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  /* ── Render States ── */

  // Verifying / Loading
  if (phase === 'verifying' || phase === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'radial-gradient(ellipse at center, hsl(43 30% 5%) 0%, #0E0C07 70%)' }}>
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-gold/60" />
          <p className="font-accent text-[0.9rem] italic text-gold/70">
            {phase === 'verifying' ? 'Pulling up a chair\u2026' : 'Setting the table\u2026'}
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (phase === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={{ background: 'radial-gradient(ellipse at center, hsl(43 30% 5%) 0%, #0E0C07 70%)' }}>
        <div className="mx-auto max-w-[480px] text-center">
          <div className="mb-4 text-[2rem]">🌶️</div>
          <h2 className="mb-4 font-display text-[1.3rem] text-gold-light">{errorMessage}</h2>
          <Link to="/" className="inline-block rounded-md bg-gold px-8 py-3 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Completed
  if (phase === 'completed') {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={{ background: 'radial-gradient(ellipse at center, hsl(43 30% 5%) 0%, #0E0C07 70%)' }}>
        <div className="mx-auto max-w-[520px] text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/30">
            <span className="text-[1.5rem] text-gold">✓</span>
          </div>
          <h2 className="mb-5 font-display text-[clamp(1.3rem,3vw,1.6rem)] leading-[1.3] text-gold-light">
            Your report is in the kitchen.
          </h2>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-cream-soft">
            Thank you for sitting at the table with us. Everything you shared will shape a report written specifically for you, your fire, and your recipe. You'll receive it at {profile?.email} within 48 hours.
          </p>
          <p className="mb-8 font-accent text-[0.88rem] italic text-cream-soft/60">
            In the meantime, the fact that you did this? That's already sauce.
          </p>
          <Link
            to={`/results/${profileId}`}
            className="inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
          >
            Back to Your Profile Results <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Conversation
  return (
    <div className="flex h-screen flex-col" style={{ background: 'radial-gradient(ellipse at center, hsl(43 30% 5%) 0%, #0E0C07 70%)' }}>
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gold/10 px-6 py-4 text-center">
        <h1 className="font-display text-[1rem] tracking-[0.15em] text-gold/80">THE PEPPER SAUCE PRINCIPLE</h1>
        <p className="mt-1 font-accent text-[0.82rem] italic text-gold/50">A conversation with the framework</p>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6" onScroll={handleScroll}>
        <div className="mx-auto max-w-[640px] space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                  msg.role === 'user'
                    ? 'bg-cream-soft/[0.08] text-cream-soft'
                    : 'border-l-2 border-gold/30 bg-transparent text-cream-soft/90'
                }`}
              >
                <p className="whitespace-pre-wrap font-body text-[0.938rem] leading-[1.7]">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {sending && (
            <div className="flex justify-start">
              <div className="border-l-2 border-gold/30 px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gold/50" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gold/50" style={{ animationDelay: '200ms' }} />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gold/50" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Retry message */}
          {retryCount > 0 && !sending && (
            <div className="text-center">
              <p className="mb-2 font-accent text-[0.85rem] italic text-cream-soft/50">
                Give me a moment to catch up. Try sending that again.
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gold/10 px-4 py-4">
        <div className="mx-auto flex max-w-[640px] items-end gap-3">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share what comes to mind\u2026"
            rows={1}
            disabled={sending}
            className="flex-1 resize-none border-0 border-b-2 border-gold/30 bg-transparent px-1 py-2 font-body text-[0.938rem] leading-[1.6] text-cream-soft placeholder:text-cream-soft/30 focus:border-gold/60 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={sending || !inputValue.trim()}
            className="mb-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gold/70 transition-colors hover:text-gold disabled:opacity-30"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
