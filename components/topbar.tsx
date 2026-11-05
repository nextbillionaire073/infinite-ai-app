'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, ChevronDown, Sparkles } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import { Sidebar } from '@/components/sidebar';
export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-white/5 bg-background/70 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-r-0 p-0">
            <Sidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden">
          <Logo size="sm" showWordmark={false} />
        </Link>

        {/* Desktop breadcrumb */}
        <div className="hidden items-center gap-2 lg:flex">
          <span className="text-sm text-muted-foreground">INFINO</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm font-medium text-foreground">Workspace</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-200 sm:flex">
          <Sparkles className="h-3.5 w-3.5" />
          Prototype
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
        </Button>

        <Button
          asChild
          variant="ghost"
          className="gap-2 rounded-full px-1.5 pr-3"
        >
          <Link href="/chat">
            <Avatar className="h-7 w-7 ring-1 ring-cyan-400/30">
              <AvatarFallback className="bg-gradient-to-br from-cyan-400/30 to-cyan-600/10 text-xs font-semibold text-cyan-100">
                IN
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline">
              Guest
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
        </Button>
      </div>
    </header>
  );
}


