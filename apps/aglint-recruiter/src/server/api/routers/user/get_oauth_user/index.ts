import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { z } from 'zod';

import { type PrivateProcedure, publicProcedure } from '@/server/api/trpc';

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-email/google`,
);

const schema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

const mutation = async ({ input }: PrivateProcedure<typeof schema>) => {
  const { access_token, refresh_token } = input;

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

  let userEmail: string = '';

  // Get user's profile information
  peopleApiClient.people.get(
    {
      resourceName: 'people/me',
      personFields: 'emailAddresses',
    },
    (error, response) => {
      if (error) {
        throw new Error(error.message);
      }
      userEmail = response?.data?.emailAddresses
        ? (response?.data?.emailAddresses[0]?.value ?? '')
        : '';
      return;
    },
  );
  return userEmail;
};

export const getOauthEmail = publicProcedure.input(schema).mutation(mutation);
