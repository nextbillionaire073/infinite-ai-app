'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowUp,
  Copy,
  Check,
  RefreshCw,
  Infinity as InfinityIcon,
  AlertTriangle,
  Paperclip,
  Mic,
  Square,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { suggestedPrompts, type ChatMessage } from '@/lib/data';
import { streamReply } from '@/lib/streaming';
import { AppShell } from '@/components/app-shell';

let idCounter = 0;
const uid = () => `m${++idCounter}`;

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isStreaming]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const streamResponse = useCallback(
    async (pendingId: string, userText: string) => {
      const controller = new AbortController();
      abortRef.current = controller;
      setIsStreaming(true);

      try {
        let acc = '';
        for await (const { chunk, done } of streamReply(
          userText,
          controller.signal
        )) {
          if (chunk) {
            acc += chunk;
            setMessages((m) =>
              m.map((msg) =>
                msg.id === pendingId
                  ? { ...msg, content: acc, pending: !done }
                  : msg
              )
            );
          }
          if (done) break;
        }
        setMessages((m) =>
          m.map((msg) =>
            msg.id === pendingId ? { ...msg, pending: false } : msg
          )
        );
      } catch {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === pendingId
              ? {
                  ...msg,
                  pending: false,
                  error: true,
                  content:
                    msg.content ||
                    'The response was interrupted. Try regenerating.',
                }
              : msg
          )
        );
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    []
  );

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const pendingId = uid();
    const pendingMsg: ChatMessage = {
      id: pendingId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setMessages((m) => [...m, userMsg, pendingMsg]);
    setInput('');
    streamResponse(pendingId, trimmed);
  }

  function stopStreaming() {
    abortRef.current?.abort();
  }

  function regenerate(id: string) {
    if (isStreaming) return;
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    const userText = lastUser?.content ?? '';

    setMessages((m) =>
      m.map((msg) =>
        msg.id === id
          ? { ...msg, pending: true, content: '', error: false }
          : msg
      )
    );
    streamResponse(id, userText);
  }

  async function copyMessage(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            {isEmpty ? (
              <EmptyState onPick={send} />
            ) : (
              <div className="space-y-8">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isStreaming={isStreaming}
                    copied={copiedId === msg.id}
                    onCopy={() => copyMessage(msg.id, msg.content)}
                    onRegenerate={() => regenerate(msg.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-white/5 bg-background/70 px-4 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-2 rounded-2xl glass-strong p-2 focus-within:ring-1 focus-within:ring-cyan-400/40">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 text-muted-foreground"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Message INFINO…"
                className="max-h-40 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 text-muted-foreground"
                aria-label="Voice input"
              >
                <Mic className="h-4 w-4" />
              </Button>
              {isStreaming ? (
                <Button
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-xl bg-white/10 text-foreground hover:bg-white/15"
                  aria-label="Stop"
                  onClick={stopStreaming}
                >
                  <Square className="h-3.5 w-3.5" fill="currentColor" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-xl bg-cyan-400 text-cyan-950 hover:bg-cyan-300 disabled:opacity-30"
                  aria-label="Send message"
                  disabled={!input.trim()}
                  onClick={() => send(input)}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground/70">
              Prototype with simulated streaming — no real AI backend. Press
              Enter to send, Shift+Enter for a new line.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex flex-col items-center pt-10 text-center sm:pt-20">
      <div className="animate-fade-up grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 ring-1 ring-cyan-400/30 animate-pulse-glow">
        <InfinityIcon className="h-8 w-8 text-cyan-300 text-glow" strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 animate-fade-up font-display text-3xl font-semibold tracking-tight [animation-delay:60ms]">
        Meet <span className="text-cyan-300 text-glow">INFINO</span>
      </h1>
      <p className="mt-3 max-w-md animate-fade-up text-muted-foreground [animation-delay:120ms]">
        Think beyond. Create without limits. Pick a starting point or type your
        own message below.
      </p>

      <div className="mt-10 grid w-full max-w-2xl animate-fade-up gap-3 sm:grid-cols-2 [animation-delay:180ms]">
        {suggestedPrompts.map((p) => (
          <button
            key={p.id}
            onClick={() => onPick(p.prompt)}
            className="group flex items-start gap-3 rounded-xl glass p-4 text-left transition-all hover:ring-1 hover:ring-cyan-400/40 hover:bg-white/[0.05]"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-400/10 ring-1 ring-cyan-400/20 transition-colors group-hover:bg-cyan-400/20">
              <p.icon className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">
                {p.label}
              </div>
              <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {p.prompt}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isStreaming,
  copied,
  onCopy,
  onRegenerate,
}: {
  message: ChatMessage;
  isStreaming: boolean;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}) {
  const isUser = message.role === 'user';
  const isCurrentStream = message.pending && message.content.length > 0;

  if (isUser) {
    return (
      <div className="flex animate-fade-up justify-end gap-3">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-cyan-400/15 px-4 py-3 text-sm leading-relaxed text-cyan-50 ring-1 ring-cyan-400/20">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex animate-fade-up justify-start gap-3">
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 ring-1 ring-cyan-400/30">
        <InfinityIcon className="h-4 w-4 text-cyan-300" strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        {message.pending && message.content.length === 0 ? (
          <div className="rounded-2xl rounded-bl-sm bg-white/[0.04] px-4 py-3 ring-1 ring-white/5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-dot" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-dot [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-dot [animation-delay:0.4s]" />
              </span>
              INFINO is thinking…
            </div>
          </div>
        ) : (
          <>
            <div
              className={cn(
                'whitespace-pre-wrap rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed ring-1',
                message.error
                  ? 'bg-destructive/10 text-destructive-foreground ring-destructive/30'
                  : 'bg-white/[0.04] text-foreground/90 ring-white/5'
              )}
            >
              {message.error && (
                <div className="mb-1 flex items-center gap-2 font-medium text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Something went wrong
                </div>
              )}
              {message.content}
              {isCurrentStream && (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-cyan-300 align-middle" />
              )}
            </div>
            {!message.pending && (
              <div className="mt-2 flex items-center gap-1">
                <ActionButton onClick={onCopy} label="Copy">
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-cyan-300" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </ActionButton>
                <ActionButton
                  onClick={onRegenerate}
                  label="Regenerate"
                  disabled={isStreaming}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Regenerate</span>
                </ActionButton>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
