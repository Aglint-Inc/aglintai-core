import type { Metadata } from 'next';

type Props = {
  params: {
    title: string;
    site_name?: string;
    description?: string;
    url?: string;
    icon?: string;
    image?: string;
    type?: string;
    robots?: string;
    jsonLd?: any;
  };
};

const defaultMeta: Metadata & { [key: string]: string } = {
  title: 'Aglint AI – Accelerate Your Recruitment Process with Advanced AI',
  siteName: 'Aglint AI',
  description:
    'Discover Aglint AI, the intelligent solution designed to enhance recruitment efficiency. Source, screen, rank, and schedule interviews with candidates faster than ever. Transform your hiring strategy with our AI-driven tools.',
  url: process.env.NEXT_PUBLIC_HOST_NAME,
  icon: '/images/favicon.png', // Make sure the icon file is in the public folder
  images:
    'https://ftyioiysswsjxamofooi.supabase.co/storage/v1/object/public/images/aglinthq.jpg',

  type: 'website',
  robots: 'follow, index',
  jsonLd: null,
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params

  const meta = {
    ...defaultMeta,
    ...params,
  };

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: meta.title,
    description: meta.description,
    icons: {
      icon: {
        url: meta.icon,
        type: 'image/png',
        sizes: '32x32',
      },
    },
    robots: meta.robots,
    themeColor: '#ffffff',
    openGraph: {
      images: [
        {
          url: meta.image,
          alt: 'Aglint Inc',
          type: 'image/png',
          width: '1200',
          height: '600',
        },
      ],
      type: 'website',
      siteName: meta.site_name,
      description: meta.description,
      url: meta.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: meta.image,
          alt: 'Aglint Inc',
          type: 'image/png',
          width: '1200',
          height: '600',
        },
      ],
    },
  };
}
