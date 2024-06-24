import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
const defaultMeta = {
  title:
    'AI-Powered Career Transition & Outplacement Platform | Aglint - Tailored for Businesses ',
  site_name: 'Aglint Inc',
  description:
    'Explore Aglint’s AI-driven Career Transition Platform, offering personalized outplacement services, professional career coaching, interview preparation, and salary negotiation tools designed to support businesses in empowering their employees and fostering growth.',
  url: 'https://app.aglinthq.com',
  icon: '/favicon.ico',
  image:
    'https://ftyioiysswsjxamofooi.supabase.co/storage/v1/object/public/images/aglinthq.jpg',
  type: 'website',
  robots: 'follow, index',
};

export default function Seo(props) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
    description: defaultMeta.description,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {meta?.jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(meta?.jsonLd) }}
        />
      )}
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.site_name} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <meta property='og:image:alt' content='Aglint Inc' />
      <meta property='og:image:type' content='images/png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {/* <meta name="twitter:site" content="@th_clarence" /> */}
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      <meta property='twitter:image:alt' content='Aglint Inc' />
      <meta name='twitter:card' content='summary_large_image' />

      <link rel='shortcut icon' href={meta.icon} type='image/x-icon' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content={meta.image} />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}
