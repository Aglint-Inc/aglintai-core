import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loading',
  description: 'AI for People Products',
};

export default function LoadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
