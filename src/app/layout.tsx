import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Date Planner',
  description: 'AIがあなたの完璧なデートを計画します',
  openGraph: {
    title: 'Date Planner',
    description: 'AIがあなたの完璧なデートを計画します',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Planner',
    description: 'AIがあなたの完璧なデートを計画します',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
