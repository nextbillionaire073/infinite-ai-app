import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'INFINITE AI — Think Beyond. Create Without Limits.',
  description:
    'INFINITE AI is a premium AI workspace powered by INFINO. Think beyond, create without limits.',
  openGraph: {
    title: 'INFINITE AI — Think Beyond. Create Without Limits.',
    description:
      'A premium AI workspace powered by INFINO. Think beyond, create without limits.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
