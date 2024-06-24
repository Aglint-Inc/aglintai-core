const xml2js = require('xml2js');

export default async function handler(req, res) {
  // Function to fetch the sitemap and parse it
  async function fetchAndParseSitemap(url) {
    const response = await fetch(url);
    const text = await response.text();

    const parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {
      parser.parseString(text, (err, result) => {
        if (err) {
          return reject(err);
        }

        // Assuming that the structure is urlset.url.loc
        const urls = result.urlset.url.map((urlObj) => urlObj.loc[0]);
        resolve(urls);
      });
    });
  }

  res.setHeader('Content-Type', 'text/xml');
  res.write('<?xml version="1.0" encoding="UTF-8"?>');
  res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  const sitemapUrl = 'https://marketing.aglinthq.com/sitemap.xml';

  fetchAndParseSitemap(sitemapUrl)
    .then((urls) => {
      const convertedUrls = urls.map((url) =>
        url.replace(
          'https://marketing.aglinthq.com/',
          `${process.env.NEXT_PUBLIC_HOST_NAME}/`
        )
      );
      convertedUrls.forEach((id) => {
        res.write(`
            <url>
              <loc>${id.trim()}</loc>
            </url>
          `);
      });

      // Add static pages
      const staticPages = ['/', '/login', '/signup'];
      staticPages.forEach((url) => {
        res.write(`
        <url>
          <loc>${`https://app.aglinthq.com${url}`}</loc>
        </url>
      `);
      });

      res.write('</urlset>');
      res.end();
    })
    .catch(() => {
      //
    });
}
