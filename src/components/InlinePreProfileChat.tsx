import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Send, Loader2 } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

type Message = { role: 'user' | 'assistant'; content: string };

interface InlinePreProfileChatProps {
  onComplete: () => void;
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

/* Analytics tracking helper */
async function trackChatEvent(
  sessionId: string,
  eventType: string,
  eventData?: Record<string, Json>
) {
  try {
    await supabase.from('quiz_analytics').insert([{
      session_id: sessionId,
      event_type: eventType,
      event_data: eventData || {},
    }]);
  } catch {
    // Non-critical - don't block chat flow
  }
}

export default function InlinePreProfileChat({ onComplete }: InlinePreProfileChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [conversationDone, setConversationDone] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [error, setError] = useState('');

  const conversationIdRef = useRef(crypto.randomUUID());
  const analyticsSessionRef = useRef(crypto.randomUUID());
  const chatStartTimeRef = useRef(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNearBottomRef = useRef(true);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }, []);

  useEffect(() => {
    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showCTA]);

  useEffect(() => {
    if (!sending && !conversationDone) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [sending, conversationDone]);

  // Fetch opening message
  useEffect(() => {
    async function getOpening() {
      setSending(true);
      // Track chat start
      trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_start', {
        conversation_id: conversationIdRef.current,
      });
      
      try {
        const { data, error: fnError } = await supabase.functions.invoke('pre-profile-chat', {
          body: {
            messages: [{ role: 'user', content: '[System: The user has just arrived. Generate your opening welcome message for Phase 1.]' }],
            quadrantExplored: null,
            conversationId: conversationIdRef.current,
            isNewConversation: true,
          },
        });

        // Handle rate limiting or any function error gracefully
        if (fnError) {
          // Check multiple signals for rate limiting
          const errStr = String(fnError?.message || fnError || '');
          const isRateLimited = errStr.includes('429') || errStr.includes('rate_limit');
          
          // Also try parsing error context body
          let contextRateLimited = false;
          try {
            const ctx = (fnError as any)?.context;
            if (ctx && typeof ctx.json === 'function') {
              const errorBody = await ctx.json();
              contextRateLimited = errorBody?.error === 'rate_limited';
            }
          } catch {
            // ignore parse failures
          }

          if (isRateLimited || contextRateLimited) {
            setShowCTA(true);
            setConversationDone(true);
            trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_rate_limited');
            setSending(false);
            return;
          }
          
          // For any other error, show CTA gracefully instead of crashing
          console.error('Pre-profile chat function error:', fnError);
          setShowCTA(true);
          setConversationDone(true);
          trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_error', { phase: 'opening' });
          setSending(false);
          return;
        }

        if (data?.error === 'rate_limited') {
          setShowCTA(true);
          setConversationDone(true);
          trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_rate_limited');
          setSending(false);
          return;
        }

        const opening: Message = { role: 'assistant', content: data.content };
        setMessages([opening]);
      } catch (err) {
        console.error('Opening message error:', err);
        setError("Something went sideways. Let's jump straight into the Profile.");
        setShowCTA(true);
        setConversationDone(true);
        trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_error', { phase: 'opening' });
      }
      setSending(false);
    }

    getOpening();
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || sending || conversationDone) return;

    const userText = inputValue.trim();
    setInputValue('');
    setSending(true);
    setError('');

    const userMsg: Message = { role: 'user', content: userText };
    const updated = [...messages, userMsg];
    setMessages(updated);

    const userCount = updated.filter(m => m.role === 'user').length;
    
    // Track message sent
    trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_message', {
      message_number: userCount,
      conversation_id: conversationIdRef.current,
    });
    
    if (userCount >= 4) {
      const capMsg: Message = {
        role: 'assistant',
        content: "The Pepper Sauce Profile picks up right where we left off. Free, five minutes, and it reads your whole recipe.",
      };
      setMessages([...updated, capMsg]);
      setConversationDone(true);
      setTimeout(() => setShowCTA(true), 1000);
      setSending(false);
      updateConversationAnalytics([...updated, capMsg], true);
      
      // Track chat completion (cap reached)
      const durationSeconds = Math.round((Date.now() - chatStartTimeRef.current) / 1000);
      trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_complete', {
        reason: 'message_cap',
        message_count: userCount,
        duration_seconds: durationSeconds,
        conversation_id: conversationIdRef.current,
      });
      return;
    }

    try {
      const apiMessages = updated.map(m => ({ role: m.role, content: m.content }));

      const { data, error: fnError } = await supabase.functions.invoke('pre-profile-chat', {
        body: {
          messages: apiMessages,
          quadrantExplored: null,
          conversationId: conversationIdRef.current,
          isNewConversation: false,
        },
      });

        // Handle non-2xx responses (e.g. 429 rate limit)
        if (fnError) {
          const errStr = String(fnError?.message || fnError || '');
          const isRateLimited = errStr.includes('429') || errStr.includes('rate_limit');
          
          let contextRateLimited = false;
          let rateLimitContent = '';
          try {
            const ctx = (fnError as any)?.context;
            if (ctx && typeof ctx.json === 'function') {
              const errorBody = await ctx.json();
              contextRateLimited = errorBody?.error === 'rate_limited';
              rateLimitContent = errorBody?.content || '';
            }
          } catch { /* ignore */ }

          if (isRateLimited || contextRateLimited) {
            const retryMsg: Message = { role: 'assistant', content: rateLimitContent || "I need a brief pause. Try again in a few seconds." };
            setMessages([...updated, retryMsg]);
            setSending(false);
            return;
          }
          
          // Any other error - show graceful message
          console.error('Pre-profile chat send error:', fnError);
          const errMsg: Message = { role: 'assistant', content: "Something flickered. The Profile is ready whenever you are." };
          setMessages([...updated, errMsg]);
          setShowCTA(true);
          setConversationDone(true);
          setSending(false);
          return;
        }

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

      if (isCrisisMessage(data.content)) {
        setCrisisDetected(true);
        setConversationDone(true);
        updateConversationAnalytics(withResponse, false, true);
        
        // Track crisis detection
        const durationSeconds = Math.round((Date.now() - chatStartTimeRef.current) / 1000);
        trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_complete', {
          reason: 'crisis_detected',
          message_count: withResponse.filter(m => m.role === 'user').length,
          duration_seconds: durationSeconds,
          conversation_id: conversationIdRef.current,
        });
        setSending(false);
        return;
      }

      if (isDeclineMessage(data.content)) {
        setConversationDone(true);
        setTimeout(() => setShowCTA(true), 1000);
        updateConversationAnalytics(withResponse, true);
        
        // Track decline completion
        const durationSeconds = Math.round((Date.now() - chatStartTimeRef.current) / 1000);
        trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_complete', {
          reason: 'user_declined',
          message_count: withResponse.filter(m => m.role === 'user').length,
          duration_seconds: durationSeconds,
          conversation_id: conversationIdRef.current,
        });
        setSending(false);
        return;
      }

      if (isClosingMessage(data.content, assistantCount)) {
        setConversationDone(true);
        setTimeout(() => setShowCTA(true), 1000);
        updateConversationAnalytics(withResponse, true);
        
        // Track natural completion
        const durationSeconds = Math.round((Date.now() - chatStartTimeRef.current) / 1000);
        trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_complete', {
          reason: 'natural_close',
          message_count: withResponse.filter(m => m.role === 'user').length,
          duration_seconds: durationSeconds,
          conversation_id: conversationIdRef.current,
        });
        setSending(false);
        return;
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError("Something went sideways. Let's jump straight into the Profile.");
      setShowCTA(true);
      setConversationDone(true);
      trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_error', { phase: 'conversation' });
    }

    setSending(false);
  }, [inputValue, sending, messages, conversationDone]);

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
    // Track conversion from chat to profile
    const durationSeconds = Math.round((Date.now() - chatStartTimeRef.current) / 1000);
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_convert', {
      conversation_id: conversationIdRef.current,
      message_count: userMessageCount,
      duration_seconds: durationSeconds,
      source: 'cta_button',
    });
    
    try {
      await supabase.from('pre_profile_conversations' as any).update({
        converted_to_profile: true,
      } as any).eq('conversation_id', conversationIdRef.current);
    } catch {
      // Non-critical
    }
    onComplete();
  };

  const handleSkip = async () => {
    // Track skip action
    const durationSeconds = Math.round((Date.now() - chatStartTimeRef.current) / 1000);
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    trackChatEvent(analyticsSessionRef.current, 'preprofile_chat_skip', {
      conversation_id: conversationIdRef.current,
      message_count: userMessageCount,
      duration_seconds: durationSeconds,
    });
    
    try {
      await supabase.from('pre_profile_conversations' as any).update({
        converted_to_profile: true,
      } as any).eq('conversation_id', conversationIdRef.current);
    } catch {
      // Non-critical
    }
    onComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mx-auto max-w-[600px]">
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
          The Pepper Sauce Principle
        </span>
        <h2 className="mb-2">Pull Up a Chair</h2>
        <p className="text-[0.92rem] text-text-light">
          Before the Profile begins, the framework wants to sit with you for a moment. No signup. No diagnosis. Just a taste of how it sees your recipe.
        </p>
      </div>

      {/* Chat container */}
      <div
        className="rounded-2xl border border-gold/15 bg-dark overflow-hidden"
      >
        {/* Messages */}
        <div className="max-h-[400px] overflow-y-auto px-5 py-5" onScroll={handleScroll}>
          <div className="space-y-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-fade-in flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
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
              <div className="flex justify-start chat-fade-in">
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
              <div className="chat-fade-in text-center">
                <p className="font-body text-[0.88rem] leading-[1.6] text-cream-soft/70">{error}</p>
              </div>
            )}

            {/* Profile CTA */}
            {showCTA && !crisisDetected && (
              <div className="chat-fade-in pt-3 text-center">
                <button
                  onClick={handleProfileClick}
                  className="inline-block rounded-md bg-gold px-7 py-3 font-body text-[0.92rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
                >
                  Begin the Profile
                </button>
                <p className="mt-2.5 font-accent text-[0.78rem] italic text-cream-soft/40">
                  Free. Five minutes. See your whole recipe.
                </p>
              </div>
            )}

            {/* Crisis resources */}
            {crisisDetected && (
              <div className="chat-fade-in mt-4 rounded-lg border border-ember/30 bg-ember/10 px-5 py-4">
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
          <div className="border-t border-gold/10 px-5 py-3">
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

      {/* Skip option */}
      {!conversationDone && messages.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={handleSkip}
            className="font-body text-[0.8rem] text-text-faint underline-offset-2 hover:underline"
          >
            Skip to the Profile
          </button>
        </div>
      )}

      <style>{`
        @keyframes chat-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-fade-in {
          animation: chat-fade-in 200ms ease-out both;
        }
      `}</style>
    </div>
  );
}
