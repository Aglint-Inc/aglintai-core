import Head from 'next/head';
import React from 'react';

const defaultMeta = {
  title: 'Aglint AI – Accelerate Your Recruitment Process',
  description: 'Enhance recruitment efficiency with Aglint AI.',
};

export default function SimpleSeo({
  title = defaultMeta.title,
  description = defaultMeta.description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
