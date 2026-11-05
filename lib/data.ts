import {
  Sparkles,
  Code2,
  PenLine,
  Lightbulb,
  GraduationCap,
  Compass,
} from 'lucide-react';

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  pending?: boolean;
  error?: boolean;
}

export interface ChatThread {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  pinned?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  icon: typeof Sparkles;
  label: string;
  prompt: string;
}

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'p1',
    icon: Sparkles,
    label: 'Draft a launch plan',
    prompt: 'Help me draft a product launch plan for a new AI-powered design tool.',
  },
  {
    id: 'p2',
    icon: Code2,
    label: 'Explain a code concept',
    prompt: 'Explain how React Server Components differ from Client Components.',
  },
  {
    id: 'p3',
    icon: PenLine,
    label: 'Rewrite my copy',
    prompt: 'Rewrite this landing page headline to sound more premium and futuristic.',
  },
  {
    id: 'p4',
    icon: Lightbulb,
    label: 'Brainstorm ideas',
    prompt: 'Give me ten creative names for a futuristic AI assistant product.',
  },
  {
    id: 'p5',
    icon: GraduationCap,
    label: 'Teach me something',
    prompt: 'Teach me the fundamentals of vector embeddings in simple terms.',
  },
  {
    id: 'p6',
    icon: Compass,
    label: 'Plan my day',
    prompt: 'Help me structure a focused workday with deep-work blocks and breaks.',
  },
];

export const chatHistory: ChatThread[] = [
  {
    id: 't1',
    title: 'Brand naming brainstorm',
    preview: 'Ten futuristic names for an AI assistant...',
    updatedAt: '2m ago',
    pinned: true,
  },
  {
    id: 't2',
    title: 'React Server Components',
    preview: 'How RSC differs from client components...',
    updatedAt: '1h ago',
  },
  {
    id: 't3',
    title: 'Launch plan draft',
    preview: 'Product launch plan for a design tool...',
    updatedAt: 'Yesterday',
  },
  {
    id: 't4',
    title: 'Vector embeddings 101',
    preview: 'Fundamentals of vector embeddings...',
    updatedAt: '2 days ago',
  },
  {
    id: 't5',
    title: 'Headline rewrite',
    preview: 'Premium, futuristic landing copy...',
    updatedAt: '3 days ago',
  },
  {
    id: 't6',
    title: 'Weekly schedule',
    preview: 'Deep-work blocks and breaks...',
    updatedAt: 'Last week',
  },
];

export const navItems = [
  { label: 'Chat', href: '/chat', iconKey: 'chat' },
  { label: 'Settings', href: '/settings', iconKey: 'settings' },
] as const;
