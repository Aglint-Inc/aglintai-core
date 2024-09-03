import { Metadata } from 'next';
import Head from 'next/head';

type Props = {
  title?: string;
  siteName?: string;
  description?: string;
  url?: string;
  icon?: string;
  image?: string;
  type?:
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';
  robots?: string;
  jsonLd?: Record<string, any>;
};

const defaultMeta: Props = {
  title: 'Aglint AI – Accelerate Your Recruitment Process with Advanced AI',
  siteName: 'Aglint AI',
  description:
    'Discover Aglint AI, the intelligent solution designed to enhance recruitment efficiency. Source, screen, rank, and schedule interviews with candidates faster than ever. Transform your hiring strategy with our AI-driven tools.',
  url: process.env.NEXT_PUBLIC_HOST_NAME,
  icon: '/images/favicon.png',
  image:
    'https://ftyioiysswsjxamofooi.supabase.co/storage/v1/object/public/images/aglinthq.jpg',
  type: 'website',
  robots: 'follow, index',
};

export function generateMetadata(params: Props): Metadata {
  const meta = { ...defaultMeta, ...params };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      siteName: meta.siteName,
      images: [
        {
          url: meta.image!,
          width: 1200,
          height: 630,
          alt: 'Aglint Inc',
        },
      ],
      locale: 'en_US',
      type: meta.type,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image!],
    },
    robots: meta.robots,
    icons: {
      icon: meta.icon,
    },
    metadataBase: new URL(meta.url!),
  };
}

export function SeoPro(params: Props) {
  // read route params
  const meta = {
    ...defaultMeta,
    ...params,
  };
  // optionally access and extend (rather than replace) parent metadata
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta name='description' content={meta.description} />
      <link rel='canonical' href={`${meta.url}`} />
      {meta?.jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(meta?.jsonLd) }}
        />
      )}
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />
      <meta property='og:url' content={`${meta.url}`} />
      <meta property='og:image:alt' content='Aglint Inc' />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {/* <meta name="twitter:site" content="@th_clarence" /> */}
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      <meta property='twitter:image:alt' content='Aglint Inc' />

      <link rel='shortcut icon' href={meta.icon} type='image/x-icon' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content={meta.image} />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}
