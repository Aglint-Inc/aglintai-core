/* eslint-disable no-console */
// pages/api/sendgridWebhook.js

import axios from 'axios';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
    maxDuration: 25,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = formidable({});
  try {
    const [fields] = await form.parse(req);
    const candidate_email = getEmail(fields.from[0]);

    console.log(candidate_email);

    // const to_email = getEmail(fields.to[0]);
    // const subject = fields.subject[0];
    const raw_email_body: string = fields.text[0];

    //clean incoming email body
    const cleaned_email_body = raw_email_body
      .split('\r\n')
      .filter((s) => !(s.includes('>') || s.endsWith('wrote:')))
      .filter((s) => s.length > 0)
      .join('\r\n');

    const header = getNewMailHeader(fields.headers[0]);

    type ApiPayload = {
      from_email?: string;
      email_body?: string;
      mail_header?: any;
    };

    const api_payload: ApiPayload = {
      email_body: cleaned_email_body,
      from_email: candidate_email,
      mail_header: header,
    };

    const { status } = await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/email-agent/compose-email`,
      {
        ...api_payload,
      },
    );
    return res.status(status).send('');
  } catch (err) {
    console.log(err);
    return res.status(500).send('');
  }
}

const getEmail = (to_string: string) => {
  to_string = to_string.trim();
  return to_string.substring(to_string.indexOf('<') + 1, to_string.length - 1);
};

const getNewMailHeader = (headers: string) => {
  let newHeader = {};
  let record = {};
  headers.split('\n').forEach((field) => {
    const [key, val] = field.split(':');
    record[String(key)] = val;
  });

  newHeader = {
    'Message-ID': ``,
    'In-Reply-To': ``,
    References: record['References'],
  };

  return newHeader;
};
