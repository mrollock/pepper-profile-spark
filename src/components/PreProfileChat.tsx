import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Send, X, Loader2 } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };
type QuadrantKey = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

interface PreProfileChatProps {
  quadrantExplored: QuadrantKey | null;
  onClose: () => void;
  onProfileCTA: () => void;
}

/* Completion detection */
function isClosingMessage(content: string, assistantCount: number): boolean {
  const lower = content.toLowerCase();
  const primarySignals = ['pepper sauce profile', 'five minutes', 'reads your whole recipe'];
  const broadSignals = ['reads your whole recipe', 'full picture', 'see the whole map', 'picks up right where'];
  const hasPrimary = primarySignals.filter(s => lower.includes(s)).length >= 2;
  const hasBroad = assistantCount >= 3 && broadSignals.some(s => lower.includes(s));
  return hasPrimary || hasBroad;
}

function isCrisisMessage(content: string): boolean {
  return content.includes('988') && (content.toLowerCase().includes('crisis') || content.toLowerCase().includes('safety'));
}

function isDeclineMessage(content: string): boolean {
  const lower = content.toLowerCase();
  return lower.includes('no problem') && lower.includes('whenever you\'re ready');
}

export default function PreProfileChat({ quadrantExplored, onClose, onProfileCTA }: PreProfileChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [conversationDone, setConversationDone] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [error, setError] = useState('');

  const conversationIdRef = useRef(crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNearBottomRef = useRef(true);

  // Auto-scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }, []);

  useEffect(() => {
    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showCTA]);

  // Focus input when conversation starts
  useEffect(() => {
    if (!sending && !conversationDone) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [sending, conversationDone]);

  // Fetch opening message on mount
  useEffect(() => {
    async function getOpening() {
      setSending(true);
      try {
        const { data, error: fnError } = await supabase.functions.invoke('pre-profile-chat', {
          body: {
            messages: [{ role: 'user', content: '[System: The user has just arrived. Generate your opening welcome message for Phase 1.]' }],
            quadrantExplored: quadrantExplored,
            conversationId: conversationIdRef.current,
            isNewConversation: true,
          },
        });

        if (fnError) throw fnError;

        if (data?.error === 'rate_limited') {
          setError(data.content || "You've been exploring. The Profile is the best next step.");
          setShowCTA(true);
          setConversationDone(true);
          setSending(false);
          return;
        }

        const opening: Message = { role: 'assistant', content: data.content };
        setMessages([opening]);
      } catch (err) {
        console.error('Opening message error:', err);
        setError("Something went sideways on my end. The Profile is right on the site if you want to jump straight in.");
        setShowCTA(true);
        setConversationDone(true);
      }
      setSending(false);
    }

    getOpening();
  }, [quadrantExplored]);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || sending || conversationDone) return;

    const userText = inputValue.trim();
    setInputValue('');
    setSending(true);
    setError('');

    const userMsg: Message = { role: 'user', content: userText };
    const updated = [...messages, userMsg];
    setMessages(updated);

    // Hard cap: 4 user messages
    const userCount = updated.filter(m => m.role === 'user').length;
    if (userCount >= 4) {
      const capMsg: Message = {
        role: 'assistant',
        content: "The Pepper Sauce Profile picks up right where we left off. Free, five minutes, and it reads your whole recipe.",
      };
      setMessages([...updated, capMsg]);
      setConversationDone(true);
      setTimeout(() => setShowCTA(true), 1000);
      setSending(false);

      // Update analytics
      updateConversationAnalytics([...updated, capMsg], true);
      return;
    }

    try {
      const apiMessages = updated.map(m => ({ role: m.role, content: m.content }));

      const { data, error: fnError } = await supabase.functions.invoke('pre-profile-chat', {
        body: {
          messages: apiMessages,
          quadrantExplored: quadrantExplored,
          conversationId: conversationIdRef.current,
          isNewConversation: false,
        },
      });

      if (fnError) throw fnError;

      if (data?.error === 'rate_limited') {
        const retryMsg: Message = { role: 'assistant', content: data.content || "I need a brief pause. Try again in a few seconds." };
        setMessages([...updated, retryMsg]);
        setSending(false);
        return;
      }

      const assistantMsg: Message = { role: 'assistant', content: data.content };
      const withResponse = [...updated, assistantMsg];
      setMessages(withResponse);

      const assistantCount = withResponse.filter(m => m.role === 'assistant').length;

      // Check for crisis
      if (isCrisisMessage(data.content)) {
        setCrisisDetected(true);
        setConversationDone(true);
        // No CTA after crisis
        updateConversationAnalytics(withResponse, false, true);
        setSending(false);
        return;
      }

      // Check for decline (user said no)
      if (isDeclineMessage(data.content)) {
        setConversationDone(true);
        setTimeout(() => setShowCTA(true), 1000);
        updateConversationAnalytics(withResponse, true);
        setSending(false);
        return;
      }

      // Check for closing message
      if (isClosingMessage(data.content, assistantCount)) {
        setConversationDone(true);
        setTimeout(() => setShowCTA(true), 1000);
        updateConversationAnalytics(withResponse, true);
        setSending(false);
        return;
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError("Something went sideways on my end. The Profile is right on the site if you want to jump straight in.");
      setShowCTA(true);
      setConversationDone(true);
    }

    setSending(false);
  }, [inputValue, sending, messages, conversationDone, quadrantExplored]);

  const updateConversationAnalytics = async (
    msgs: Message[],
    completed: boolean,
    crisis: boolean = false
  ) => {
    try {
      await supabase.from('pre_profile_conversations' as any).update({
        messages: msgs,
        message_count: msgs.length,
        completed_at: completed ? new Date().toISOString() : null,
        crisis_detected: crisis,
      } as any).eq('conversation_id', conversationIdRef.current);
    } catch {
      // Non-critical
    }
  };

  const handleProfileClick = async () => {
    // Mark conversion
    try {
      await supabase.from('pre_profile_conversations' as any).update({
        converted_to_profile: true,
      } as any).eq('conversation_id', conversationIdRef.current);
    } catch {
      // Non-critical
    }
    onProfileCTA();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 flex h-[min(85vh,640px)] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl"
        style={{ background: '#0E0C07' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-gold/10 px-5 py-3">
          <span className="font-display text-[0.55rem] tracking-[0.18em] text-gold/60 uppercase">
            The Pepper Sauce Principle
          </span>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-cream-soft/40 transition-colors hover:bg-cream-soft/10 hover:text-cream-soft/70"
            aria-label="Close conversation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5" onScroll={handleScroll}>
          <div className="space-y-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`animate-fade-in flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${i === messages.length - 1 ? 200 : 0}ms` }}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-cream-soft/[0.08] text-cream-soft'
                      : 'border-l border-gold/20 bg-transparent text-cream-soft/90'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-body text-[0.9rem] leading-[1.65]">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {sending && messages.length > 0 && (
              <div className="flex justify-start animate-fade-in">
                <div className="border-l border-gold/20 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/50" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/50" style={{ animationDelay: '200ms' }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/50" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Initial loading */}
            {sending && messages.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-gold/50" />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="animate-fade-in text-center">
                <p className="font-body text-[0.88rem] leading-[1.6] text-cream-soft/70">{error}</p>
              </div>
            )}

            {/* Profile CTA */}
            {showCTA && !crisisDetected && (
              <div className="animate-fade-in pt-3 text-center">
                <button
                  onClick={handleProfileClick}
                  className="inline-block rounded-md bg-gold px-7 py-3 font-body text-[0.92rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
                >
                  Take the Pepper Sauce Profile
                </button>
                <p className="mt-2.5 font-accent text-[0.78rem] italic text-cream-soft/40">
                  Free. Five minutes. See your whole recipe.
                </p>
              </div>
            )}

            {/* Crisis resources display */}
            {crisisDetected && (
              <div className="animate-fade-in mt-4 rounded-lg border border-ember/30 bg-ember/10 px-5 py-4">
                <p className="mb-2 font-body text-[0.88rem] font-semibold text-cream-soft/90">Crisis Resources</p>
                <p className="font-body text-[0.85rem] leading-[1.6] text-cream-soft/80">
                  988 Suicide & Crisis Lifeline: call or text 988 (24/7)
                </p>
                <p className="font-body text-[0.85rem] leading-[1.6] text-cream-soft/80">
                  Crisis Text Line: text HOME to 741741
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        {!conversationDone && (
          <div className="flex-shrink-0 border-t border-gold/10 px-5 py-3">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what comes to mind..."
                disabled={sending}
                className="flex-1 border-0 border-b border-gold/25 bg-transparent px-0 py-2 font-body text-[0.9rem] text-cream-soft placeholder:text-cream-soft/25 focus:border-gold/50 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={sending || !inputValue.trim()}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gold/60 transition-colors hover:bg-gold/10 hover:text-gold disabled:opacity-30"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 200ms ease-out both;
        }
      `}</style>
    </div>
  );
}
