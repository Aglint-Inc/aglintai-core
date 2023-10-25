import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
          rel='stylesheet'
        /> */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="We help companies hire the perfect candidates quickly. Our trained models understand company culture and values, finding the right fit. Our automated screening saves time and money." />
        <meta name="keywords" content="hiring, recruitment, AI, company culture, automated screening, job candidates" />
        <meta name="author" content="Aglint" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
