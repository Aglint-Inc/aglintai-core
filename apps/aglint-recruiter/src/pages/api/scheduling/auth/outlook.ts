/* eslint-disable no-console */
import { type NextApiRequest, type NextApiResponse } from 'next';

const rediret_uri = `${process.env.NEXT_PUBLIC_HOST_NAME}/auth/microsoft`;
const scopes = `Calendars.ReadWrite offline_access User.Read`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth_link = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.OUTLOOK_CLIENT_ID}&response_type=code&redirect_uri=${rediret_uri}&response_mode=query&scope=${scopes}`;

    res.status(200).send(auth_link);
  } catch (error) {
    // console.log('error', error);
    res.status(500).send(error.message);
  }
};

export default handler;
