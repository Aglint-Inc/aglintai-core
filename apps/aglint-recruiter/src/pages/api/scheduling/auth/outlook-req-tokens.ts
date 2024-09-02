/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

type BodyParams = {
  code: string;
};

const rediret_uri = `${process.env.NEXT_PUBLIC_HOST_NAME}/auth/microsoft`;
const tenant = 'common';
const scopes = `Calendars.ReadWrite offline_access User.Read`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.body as BodyParams;
    const { data } = await axios.post(
      `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
      {
        client_id: process.env.OUTLOOK_CLIENT_ID,
        scope: scopes,
        code: code,
        redirect_uri: rediret_uri,
        grant_type: 'authorization_code',
        client_secret: process.env.OUTLOOK_CLIENT_SECRET, // Include this only for web apps
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const token_info = {
      email: '',
      expiry_date: data.expires_in,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      scope: data.scope,
      provider: 'microsoft',
    };

    const { data: profileResp } = await axios.get(
      `https://graph.microsoft.com/v1.0/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token_info.access_token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // await refreshTokenMicrosoftGraph(
    //   token_info.refresh_token,
    //   process.env.OUTLOOK_CLIENT_ID,
    //   process.env.OUTLOOK_CLIENT_SECRET,
    // );
    token_info.email = profileResp.mail;
    return res.status(200).json(token_info);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response.data);
    }
    console.log('error', error);
    res.status(500).send(error.message);
  }
};

export default handler;
