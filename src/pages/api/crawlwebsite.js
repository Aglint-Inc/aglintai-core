import { social } from 'crawlee';
import { gotScraping } from 'got-scraping';

export default async function handler(req, res) {
  if (req.body.url) {
    const url = req.body.url;
    try {
      const { body } = await gotScraping({ url });
      const result = social.parseHandlesFromHtml(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(200).send({ data: null, error: 'url is required in body' });
  }
}
