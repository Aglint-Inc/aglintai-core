import React from 'react';

export const metadata = {
  title: 'Aglint AI – Accelerate Your Recruitment Process with Advanced AI',
  site_name: 'Aglint Inc',
  description:
    'Discover Aglint AI, the intelligent solution designed to enhance recruitment efficiency. Source, screen, rank, and schedule interviews with candidates faster than ever. Transform your hiring strategy with our AI-driven tools.',
  icon: '/images/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
