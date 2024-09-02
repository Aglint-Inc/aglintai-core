import { type NextApiRequest, type NextApiResponse } from 'next';
const { google } = require('googleapis');

// Import required modules
const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-email/google`,
);

type BodyParams = {
  refresh_token: string;
  access_token: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { access_token, refresh_token } = req.body as BodyParams;
    if (!access_token || !refresh_token)
      return res.status(400).send('missing token fields');
    // Set the access token obtained during the OAuth flow
    oAuth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
      // other token properties...
    });

    // Create a People API client
    const peopleApiClient = google.people({
      version: 'v1',
      auth: oAuth2Client,
    });

    // Get user's profile information
    peopleApiClient.people.get(
      {
        resourceName: 'people/me',
        personFields: 'emailAddresses',
      },
      (error, response) => {
        if (error) {
          res.status(500).json('unable to get user email');
          return { error, data: null };
        }
        const userEmail = response.data.emailAddresses[0].value;
        return res.status(200).json(userEmail);
      },
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
