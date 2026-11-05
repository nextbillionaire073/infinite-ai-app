'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Plus,
  MessageSquare,
  Settings,
  Search,
  Pin,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatHistory, type ChatThread } from '@/lib/data';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>('t1');
  const [query, setQuery] = useState('');

  const filtered = chatHistory.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.preview.toLowerCase().includes(query.toLowerCase())
  );
  const pinned = filtered.filter((t) => t.pinned);
  const recent = filtered.filter((t) => !t.pinned);

  return (
    <div className="flex h-full flex-col bg-background-2/60 glass">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/" onClick={onNavigate} className="shrink-0">
          <Logo size="sm" />
        </Link>
      </div>

      <div className="px-3">
        <Button
          asChild
          className="w-full justify-start gap-2 rounded-xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/30 transition-all hover:bg-cyan-400/20 hover:ring-cyan-400/50"
        >
          <Link href="/chat" onClick={onNavigate}>
            <Plus className="h-4 w-4" />
            New Chat
          </Link>
        </Button>
      </div>

      <div className="px-3 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            className="h-9 w-full rounded-lg border border-white/5 bg-white/[0.03] pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-3">
        {pinned.length > 0 && (
          <Section
            label="Pinned"
            threads={pinned}
            activeId={activeId}
            setActiveId={setActiveId}
            onNavigate={onNavigate}
          />
        )}
        <Section
          label="Recent"
          threads={recent}
          activeId={activeId}
          setActiveId={setActiveId}
          onNavigate={onNavigate}
        />
        {filtered.length === 0 && (
          <div className="px-3 py-10 text-center text-sm text-muted-foreground">
            No chats found.
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-white/5 p-3">
        <nav className="flex flex-col gap-1">
          <NavItem
            href="/chat"
            icon={MessageSquare}
            label="Chat"
            active={pathname === '/chat' || pathname.startsWith('/chat')}
            onClick={onNavigate}
          />
          <NavItem
            href="/settings"
            icon={Settings}
            label="Settings"
            active={pathname === '/settings'}
            onClick={onNavigate}
          />
        </nav>
      </div>
    </div>
  );
}

function Section({
  label,
  threads,
  activeId,
  setActiveId,
  onNavigate,
}: {
  label: string;
  threads: ChatThread[];
  activeId: string;
  setActiveId: (id: string) => void;
  onNavigate?: () => void;
}) {
  if (threads.length === 0) return null;
  return (
    <div className="mb-4">
      <div className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-col gap-0.5">
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            active={thread.id === activeId}
            onClick={() => {
              setActiveId(thread.id);
              onNavigate?.();
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ThreadItem({
  thread,
  active,
  onClick,
}: {
  thread: ChatThread;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-cyan-400/10 text-cyan-50 ring-1 ring-inset ring-cyan-400/20'
          : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
      )}
    >
      {thread.pinned && (
        <Pin className="h-3 w-3 shrink-0 text-gold" fill="currentColor" />
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium leading-tight">{thread.title}</div>
        <div className="truncate text-xs text-muted-foreground/70">
          {thread.updatedAt}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
            aria-label="Chat options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="text-xs">
            <Pin className="mr-2 h-3.5 w-3.5" /> Pin
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs text-destructive">
            <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: typeof MessageSquare;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-white/[0.06] text-foreground'
          : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}


