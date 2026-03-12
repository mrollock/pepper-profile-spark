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
            profileId,
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
            profileId,
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
    // Get conversation ID for reference
    const { data: convRow } = await supabase
      .from('extended_report_conversations')
      .select('id')
      .eq('profile_id', profileId)
      .maybeSingle();

    await supabase.from('extended_report_conversations').update({
      messages: finalMessages,
      conversation_status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq('profile_id', profileId);

    // Send completion emails (non-blocking)
    if (profile) {
      supabase.functions.invoke('send-conversation-complete', {
        body: {
          profile,
          messages: finalMessages,
          conversationId: convRow?.id || null,
        },
      }).then(({ error }) => {
        if (error) console.error('Completion email error:', error);
        else console.log('Completion emails sent');
      });
    }

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
