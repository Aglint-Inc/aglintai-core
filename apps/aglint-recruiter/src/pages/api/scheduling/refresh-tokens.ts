import { type NextApiRequest, type NextApiResponse } from 'next';

type BodyParams = {
  refresh_token: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { refresh_token } = req.body as BodyParams;
    const newAccessToken = await refreshAccessToken(
      refresh_token,
      process.env.GOOGLE_SCHEDULE_CLIENT_ID,
      process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    );
    res.status(200).send(newAccessToken);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';

  const requestBody = new URLSearchParams();
  requestBody.append('refresh_token', refreshToken);
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);
  requestBody.append('grant_type', 'refresh_token');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const responseBody = await response.json();
  const newAccessToken = responseBody.access_token;

  return newAccessToken;
}
