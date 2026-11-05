'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Layers,
  Zap,
  Infinity as InfinityIcon,
  Check,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg radial-fade opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute right-[-5%] top-[30%] h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] h-[320px] w-[320px] rounded-full bg-amber-300/[0.06] blur-[120px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#experience" className="transition-colors hover:text-foreground">
            Experience
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/chat">Sign in</Link>
          </Button>
          <Button
            asChild
            className="gap-2 rounded-full bg-cyan-400 text-cyan-950 hover:bg-cyan-300"
          >
            <Link href="/chat">
              Launch INFINO
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 text-center sm:pt-24">
        <div className="animate-fade-up">
          <Badge className="mb-6 gap-2 rounded-full border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by INFINO
          </Badge>
        </div>

        <h1 className="animate-fade-up font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl [animation-delay:60ms]">
          <span className="block">Think Beyond.</span>
          <span className="block bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-300 bg-clip-text text-transparent text-glow">
            Create Without Limits.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground sm:text-lg [animation-delay:120ms]">
          INFINITE AI is a premium AI workspace where ideas take shape. Chat
          with INFINO, organize your thinking, and create without friction —
          all in a focused, futuristic interface.
        </p>

        <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:180ms]">
          <Button
            asChild
            size="lg"
            className="gap-2 rounded-full bg-cyan-400 px-7 text-cyan-950 hover:bg-cyan-300 animate-pulse-glow"
          >
            <Link href="/chat">
              Start chatting free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 rounded-full border-white/10 bg-white/[0.03] px-7 text-foreground hover:bg-white/[0.06]"
          >
            <Link href="#features">
              Explore features
            </Link>
          </Button>
        </div>

        {/* Floating preview card */}
        <div className="relative mx-auto mt-16 max-w-4xl animate-fade-up [animation-delay:240ms]">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-400/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl glass-strong p-2 shadow-2xl">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-3 text-xs text-muted-foreground">
                INFINO · Workspace
              </span>
            </div>
            <div className="grid gap-3 rounded-xl bg-background/60 p-5 text-left sm:grid-cols-3">
              <div className="sm:col-span-2 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-cyan-400/15 px-4 py-2.5 text-sm text-cyan-50 ring-1 ring-cyan-400/20">
                    Give me ten futuristic names for an AI assistant.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] gap-3">
                    <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-400/15 ring-1 ring-cyan-400/30">
                      <InfinityIcon className="h-4 w-4 text-cyan-300" />
                    </div>
                    <div className="space-y-2 rounded-2xl rounded-bl-md bg-white/[0.04] px-4 py-2.5 text-sm text-foreground/90 ring-1 ring-white/5">
                      <p>Sure — here are a few directions:</p>
                      <div className="animate-shimmer h-3 w-40 rounded-full" />
                      <div className="animate-shimmer h-3 w-56 rounded-full" />
                      <div className="animate-shimmer h-3 w-32 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden flex-col gap-2 sm:flex">
                {['Brand naming', 'Launch plan', 'Headline rewrite'].map(
                  (t, i) => (
                    <div
                      key={t}
                      className={`rounded-lg px-3 py-2 text-xs ${
                        i === 0
                          ? 'bg-cyan-400/10 text-cyan-50 ring-1 ring-cyan-400/20'
                          : 'bg-white/[0.03] text-muted-foreground'
                      }`}
                    >
                      {t}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-300">
            Capabilities
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to think out loud
          </h2>
          <p className="mt-4 text-muted-foreground">
            A focused workspace built around conversation, context, and flow.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative animate-fade-up rounded-2xl glass p-6 transition-all hover:ring-cyan-400/30"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20 transition-colors group-hover:bg-cyan-400/20">
                <f.icon className="h-5 w-5 text-cyan-300" />
              </div>
              <h3 className="font-display text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience strip */}
      <section
        id="experience"
        className="relative z-10 mx-auto max-w-7xl px-6 py-20"
      >
        <div className="overflow-hidden rounded-3xl glass-strong p-8 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Meet INFINO — your infinite thinking partner
              </h2>
              <p className="mt-4 text-muted-foreground">
                A clean, distraction-free chat surface with suggested prompts,
                chat history, and quick actions. Built for momentum.
              </p>
              <ul className="mt-6 space-y-3">
                {['Suggested prompts to get started', 'Organized chat history', 'Copy & regenerate in one click', 'Responsive on every device'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-400/15 ring-1 ring-cyan-400/30">
                        <Check className="h-3 w-3 text-cyan-300" />
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Button
                asChild
                className="mt-8 gap-2 rounded-full bg-cyan-400 text-cyan-950 hover:bg-cyan-300"
              >
                <Link href="/chat">
                  Open the workspace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-400/15 to-transparent blur-2xl" />
              <div className="relative rounded-2xl glass p-5">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-cyan-400/15 px-4 py-2.5 text-sm text-cyan-50 ring-1 ring-cyan-400/20">
                      Help me plan a focused workday.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] gap-3">
                      <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-400/15 ring-1 ring-cyan-400/30">
                        <InfinityIcon className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="rounded-2xl rounded-bl-sm bg-white/[0.04] px-4 py-2.5 text-sm text-foreground/90 ring-1 ring-white/5">
                        Here&apos;s a deep-work block structure with breaks
                        spaced every 90 minutes.
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[60%] rounded-2xl rounded-br-sm bg-cyan-400/15 px-4 py-2.5 text-sm text-cyan-50 ring-1 ring-cyan-400/20">
                      Perfect. Make it feel premium.
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                  <input
                    disabled
                    placeholder="Message INFINO…"
                    className="flex-1 bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400/15 text-cyan-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl glass-strong p-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest gold-text">
            Premium
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to think beyond?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            This is a frontend prototype. AI integration arrives soon — explore
            the full interface today.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 gap-2 rounded-full bg-cyan-400 text-cyan-950 hover:bg-cyan-300"
          >
            <Link href="/chat">
              Launch the prototype
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            INFINITE AI · Think Beyond. Create Without Limits.
          </p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link href="/chat" className="hover:text-foreground">Chat</Link>
            <Link href="/settings" className="hover:text-foreground">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: MessageSquare,
    title: 'AI chat interface',
    desc: 'A fluid, focused chat surface designed for long conversations and quick wins alike.',
  },
  {
    icon: Layers,
    title: 'Sidebar navigation',
    desc: 'Pinned and recent conversations, searchable history, and a one-click new chat.',
  },
  {
    icon: Sparkles,
    title: 'Suggested prompts',
    desc: 'Curated starting points so you never face a blank screen. Pick one and go.',
  },
  {
    icon: Zap,
    title: 'Copy & regenerate',
    desc: 'Reuse any answer instantly or ask INFINO to try again with a single click.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean & private',
    desc: 'No API keys exposed, no fake responses. A prototype built to be extended safely.',
  },
  {
    icon: InfinityIcon,
    title: 'Built to scale',
    desc: 'Reusable components and a responsive layout that adapts from mobile to desktop.',
  },
];
