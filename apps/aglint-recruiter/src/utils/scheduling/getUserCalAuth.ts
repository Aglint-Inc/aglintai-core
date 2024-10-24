import { CApiError } from '@aglint/shared-utils';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import type { GetAuthParams } from '../event_book/types';

export const getUserCalAuth = async ({
  company_cred,
  recruiter,
}: {
  company_cred: GetAuthParams['company_cred'];
  recruiter: GetAuthParams['recruiter'];
}) => {
  try {
    if (!recruiter) {
      throw new CApiError('SERVER_ERROR', 'Recruiter not found');
    }
    if (recruiter && recruiter.schedule_auth) {
      const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_SCHEDULE_CLIENT_ID,
        process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-cal/google`,
      );
      const schedule_auth = recruiter.schedule_auth as any;
      oAuth2Client.setCredentials({
        access_token: schedule_auth.access_token,
        refresh_token: schedule_auth.refresh_token,
      });
      return oAuth2Client;
    } else {
      if (!company_cred) {
        throw new CApiError('SERVER_ERROR', 'Company cred not found');
      }
      const jwtClient = new google.auth.JWT({
        email: company_cred.client_email,
        key: company_cred.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
        subject: recruiter.email,
      });

      await jwtClient.authorize();
      return jwtClient;
    }
  } catch (error) {
    console.error('Error in getting user cal auth', error);
    console.log(recruiter?.email, error?.response?.data);
    return null;
  }
};
