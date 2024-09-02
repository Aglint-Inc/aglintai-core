import { type NextApiRequest, type NextApiResponse } from 'next';

// Import required modules
const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_SCHEDULE_CLIENT_ID,
  process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-cal/google`,
);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar',
      ],
    });

    return res.status(200).json(authUrl);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
