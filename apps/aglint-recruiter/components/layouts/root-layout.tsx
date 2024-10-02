import '@styles/globals.css';

export const metadata = {
  title: 'Aglint AI',
  description: 'AI-powered Applicant Tracking System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
