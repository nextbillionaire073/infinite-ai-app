// Simulated streaming response generator for the INFINO prototype.
// No real AI backend — produces contextual, on-topic demo replies
// based on keywords in the user's message, then yields them word-by-word.

export interface StreamChunk {
  chunk: string;
  done: boolean;
}

const responses: { match: RegExp; reply: string }[] = [
  {
    match: /launch|product|go-to-market|release/i,
    reply: `Here's a focused launch plan for your AI-powered design tool:

1. Positioning — Define the one sentence that explains who it's for and why it's different. Lead with the outcome, not the technology.
2. Teaser phase (2 weeks) — Ship a landing page with an email capture, post a 30-second demo, and seed three communities where your early users already hang out.
3. Beta cohort (4 weeks) — Invite 50–100 hand-picked users. Give them a private channel, weekly office hours, and a visible feedback board.
4. Launch day — Coordinated post on Product Hunt, X, and your community. Have a founder-written essay ready, not just a feature list.
5. Follow-through — Publish a "what we learned in week one" update. It compounds trust and brings back lurkers.

Want me to turn any of these into a detailed checklist?`,
  },
  {
    match: /react server|rsc|server component|client component/i,
    reply: `React Server Components (RSC) vs Client Components in short:

• Server Components render on the server and never ship their code to the browser. They can read databases, fetch internal APIs, and stay securely server-side. They cannot use hooks like useState or event handlers.
• Client Components (marked with "use client") render in the browser. They own interactivity — state, effects, event listeners — but their JavaScript is sent to the client.

The key shift: you compose a tree where server components fetch data and pass it down to small, interactive client leaves. That keeps the bundle small and the initial render fast.

A simple rule of thumb — if it needs onClick or useState, it's a client component. Everything else can stay on the server.`,
  },
  {
    match: /headline|copy|rewrite|landing|tagline/i,
    reply: `Here are a few headline directions, from bold to refined:

1. "Think Beyond. Create Without Limits."
2. "The AI workspace that keeps up with your imagination."
3. "Design faster. Ship bolder. Let INFINO handle the thinking."
4. "Where ideas become infinite."

A good premium headline pairs a short emotional promise with a concrete payoff. Want me to adapt one of these to your exact product name?`,
  },
  {
    match: /name|brainstorm|naming|brand name/i,
    reply: `Ten futuristic names for an AI assistant:

1. INFINO
2. Aether
3. Nova Mind
4. Lumen
5. Synapse
6. Orbit
7. Vertex
8. Halcyon
9. Pulse
10. Zenith

If you tell me the product's personality — playful, clinical, premium — I can narrow these and draft taglines for the top three.`,
  },
  {
    match: /vector|embedding|embeddings/i,
    reply: `Vector embeddings, simply:

An embedding is a list of numbers that captures the meaning of a piece of data — usually text. Similar meanings land close together in that number-space; different meanings land far apart.

Why it matters: once meaning is numeric, you can search by concept instead of by keyword. "happy" and "joyful" match even if they share no letters.

A typical flow: text goes into a model, the model outputs a vector (say 1536 numbers), and you store it in a vector database. To find similar items, you compare vectors using distance (cosine similarity is common) and return the nearest neighbors.

That's the whole foundation behind semantic search and retrieval-augmented generation (RAG).`,
  },
  {
    match: /schedule|plan my day|deep.?work|focus|productiv/i,
    reply: `Here's a focus-first day structure:

• 09:00–09:30 — Planning block: review goals, pick the one thing that matters most.
• 09:30–11:00 — Deep work block 1 (90 min): no notifications, single task.
• 11:00–11:15 — Break: walk, water, no screens.
• 11:15–12:45 — Deep work block 2 (90 min).
• 12:45–13:45 — Lunch + a real break.
• 13:45–15:00 — Shallow work: email, messages, small reviews.
• 15:00–16:30 — Deep work block 3 (90 min).
• 16:30–17:00 — Wind-down: capture open loops for tomorrow.

Three 90-minute deep blocks beat one long stretch. Want a version tuned to a specific timezone or meeting load?`,
  },
  {
    match: /hello|hi|hey|greeting/i,
    reply: `Hey — I'm INFINO. I can help you draft plans, brainstorm names, explain concepts, rewrite copy, and structure your day. What are you working on right now?`,
  },
];

const fallback = `Here's how I'd approach that:

1. Clarify the goal — what does a great outcome look like for you here?
2. Break it into the smallest next step you can take today.
3. Identify what you already know versus what you need to find out.

Tell me a little more about the specifics and I'll go deeper on any of these. (This is a simulated response — INFINO's real backend connects later.)`;

export function generateReply(userText: string): string {
  for (const r of responses) {
    if (r.match.test(userText)) return r.reply;
  }
  return fallback;
}

// Yields the reply word-by-word with a small delay, mimicking token streaming.
// The AbortSignal lets the caller cancel mid-stream.
export async function* streamReply(
  userText: string,
  signal: AbortSignal
): AsyncGenerator<StreamChunk> {
  const reply = generateReply(userText);
  const tokens = tokenize(reply);

  for (let i = 0; i < tokens.length; i++) {
    if (signal.aborted) {
      yield { chunk: '', done: true };
      return;
    }
    await delay(i === 0 ? 480 : 18 + Math.random() * 28);
    if (signal.aborted) {
      yield { chunk: '', done: true };
      return;
    }
    yield { chunk: tokens[i], done: i === tokens.length - 1 };
  }
}

function tokenize(text: string): string[] {
  return text.match(/(\s+|\S+)/g) ?? [text];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
