import { type NextApiRequest, type NextApiResponse } from 'next';
const { OAuth2Client } = require('google-auth-library');

type BodyParams = {
  refresh_token: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { refresh_token } = req.body as BodyParams;
    const newAccessToken = await refreshAccessToken(
      refresh_token,
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    res.status(200).send(newAccessToken);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

export async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  // Set up OAuth2 client
  const oAuth2Client = new OAuth2Client(clientId, clientSecret);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  const { credentials } = await oAuth2Client.refreshAccessToken();
  const newAccessToken = credentials.access_token;
  return newAccessToken;
}
