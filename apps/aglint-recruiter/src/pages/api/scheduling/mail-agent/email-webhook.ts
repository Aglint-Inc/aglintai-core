/* eslint-disable no-console */
// pages/api/sendgridWebhook.js

import axios from 'axios';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

import { EmailWebHook } from '@/src/services/EmailWebhook/EmailWebhook';

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
    const agent_email = getEmail(fields.to[0]);
    console.log(agent_email);
    const raw_email_body: string = fields.text[0];
    const raw_headers = fields.headers[0];

    const curr_email_body = EmailWebHook.parseEmailBody(raw_email_body);
    const curr_email_headers = EmailWebHook.parseMailHeaders(raw_headers);
    const thread_id = EmailWebHook.parseThreadId(
      curr_email_headers,
      agent_email,
    );
    if (!thread_id) {
      console.log('invalid thread id');
      return res.status(200).send('invlaid thread id');
    }
    const reply_email_headers = EmailWebHook.getNewMailHeader(
      curr_email_headers,
      thread_id,
      agent_email,
    );

    type ApiPayload = {
      from_email?: string;
      email_body?: string;
      mail_header?: any;
      thread_id: string;
    };

    const api_payload: ApiPayload = {
      email_body: curr_email_body,
      from_email: candidate_email,
      mail_header: reply_email_headers,
      thread_id: thread_id,
    };

    const { status } = await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/email-agent/compose-email`,
      {
        ...api_payload,
      },
    );
    return res.status(status).send('');
  } catch (err) {
    console.error(err);
    return res.status(500).send('');
  }
}

const getEmail = (to_string: string) => {
  to_string = to_string.trim();
  return to_string.substring(to_string.indexOf('<') + 1, to_string.length - 1);
};
