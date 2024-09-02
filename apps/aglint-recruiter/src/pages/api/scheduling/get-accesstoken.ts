import { type NextApiRequest, type NextApiResponse } from 'next';

// Import required modules
const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_SCHEDULE_CLIENT_ID,
  process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-cal/google`,
);

type BodyParams = {
  code: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.body as BodyParams;
    // Set the access token obtained during the OAuth flow
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    return res.status(200).json(tokens);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
