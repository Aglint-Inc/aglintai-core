import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loading',
  description: 'AI for People Products',
};

export default function LoadingLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
