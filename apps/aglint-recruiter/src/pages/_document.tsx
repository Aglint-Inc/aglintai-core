import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='AI for People Products' />

        <meta
          name='keywords'
          content='hiring, recruitment, AI, company culture, automated screening, job candidates'
        />
        <meta name='author' content='Aglint' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
