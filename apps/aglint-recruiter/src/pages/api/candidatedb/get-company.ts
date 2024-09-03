// pages/api/apolloSearch.ts
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const apiUrl = 'https://api.apollo.io/api/v1/mixed_companies/search';

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };

  try {
    const response = await axios.post(
      apiUrl,
      {
        api_key: 'AMw7kom6e0a7EUhSuLJF4A',
        page: 1,
        per_page: 10,
        q_organization_name: req.body.name,
      },
      { headers },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res
      .status(error.response?.status || 500)
      .json({ error: 'Internal Server Error' });
  }
}
