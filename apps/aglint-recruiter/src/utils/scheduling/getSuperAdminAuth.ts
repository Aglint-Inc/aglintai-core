import { google } from 'googleapis';

import type { GetAuthParams } from '../event_book/types';

export const getSuperAdminAuth = async (
  company_cred: GetAuthParams['company_cred'],
  admin_email: string,
) => {
  const jwtClient = new google.auth.JWT({
    email: company_cred.client_email!,
    key: company_cred.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: admin_email,
  });

  await jwtClient.authorize();
  return jwtClient;
};
