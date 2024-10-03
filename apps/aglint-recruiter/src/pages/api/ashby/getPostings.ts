//@ts-nocheck
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { decrypt } from '../decryptApiKey';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = req.body.apiKey;
    const apiKeyWithColon = req.body.apiKey + ':';
    const base64String = btoa(apiKeyWithColon);

    if (!apiKey) {
      res.status(400).send('api key is incorrect');
    }

    let decryptedApiKey = '';
    let base64decryptedApiKey = '';

    if (!req.body.isInitial) {
      decryptedApiKey = decrypt(apiKey, process.env.ENCRYPTION_KEY);
      base64decryptedApiKey = btoa(decryptedApiKey + ':');
    }

    const options = {
      method: 'POST',
      url: 'https://api.ashbyhq.com/jobPosting.list',
      headers: {
        accept: 'application/json',
        authorization: !req.body.isInitial
          ? `Basic ${base64decryptedApiKey}`
          : `Basic ${base64String}`,
      },
    };

    axios
      .request(options)
      .then(async function (response) {
        const results = response.data.results;
        //location
        const locations = await fetchLocations(
          !req.body.isInitial ? base64decryptedApiKey : base64String,
        );
        //location

        const descriptions = await fetchDescriptions(
          results.map((result: any) => result.id),
          !req.body.isInitial ? base64decryptedApiKey : base64String,
        );

        const alteredResults = results.map((result: any) => {
          const description = descriptions.find(
            (description) => description?.id === result.id,
          );
          const addr = (result.location = locations.find(
            (location: any) =>
              location.id === result.locationIds.primaryLocationId,
          )).address.postalAddress;
          return {
            ...result,
            description: description?.descriptionHtml,
            location: [
              addr.addressLocality,
              addr.addressRegion,
              addr.addressCountry,
            ].join(', '),
          };
        });

        res.status(200).send({ ...response.data, results: alteredResults });
      })
      .catch(function (error) {
        res.status(200).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
}

const fetchLocations = async (key: string) => {
  const options = {
    method: 'POST',
    url: 'https://api.ashbyhq.com/location.list',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${key}`,
    },
    data: { includeArchived: true },
  };

  const response = await axios.request(options);
  const locations = response.data.results;

  return locations;
};

const fetchDescriptions = async (jobIds: string[], key: string) => {
  const descriptions: string[] = [];
  await Promise.all(
    jobIds.map(async (id) => {
      const options = {
        method: 'POST',
        url: 'https://api.ashbyhq.com/jobPosting.info',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Basic ${key}`,
        },
        data: { jobPostingId: id },
      };

      const response = await axios.request(options);
      descriptions.push(response.data.results);
    }),
  );
  return descriptions;
};
