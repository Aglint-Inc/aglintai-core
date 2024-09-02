/* eslint-disable no-console */
// pages/api/apolloSearch.ts
import { type DB } from '@aglint/shared-types';
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { handleGenEmail } from '@/src/components/CandidateDatabase/Database/EmailOutReach/OutReachCtx';
import { resolveAiCmd } from '@/src/utils/prompts/candidateDb/email';
const { schema } = require('prosemirror-schema-basic');
const { Node, DOMSerializer } = require('prosemirror-model');
const jsdom = require('jsdom').JSDOM;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  if (!req.body.candidates.length) {
    console.log('No candidates selected');
    return res.status(400).json({ error: 'No candidates selected' });
  }

  if (!req.body.editorJson?.templateJson) {
    console.log('No template selected');
    return res.status(400).json({ error: 'No template selected' });
  }

  if (!req.body.recruiterUser?.user_id) {
    console.log('No recruiter user');
    return res.status(400).json({ error: 'No recruiter user' });
  }

  if (!req.body.fromEmail) {
    console.log('No from email');
    return res.status(400).json({ error: 'No from email' });
  }

  if (!req.body.subject) {
    console.log('No subject');
    return res.status(400).json({ error: 'No subject' });
  }

  const supabase = createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // eslint-disable-next-line security/detect-object-injection
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );

  console.log(req.body.candidates.length, 'candidates');

  const dbEmails = await Promise.all(
    req.body.candidates.map(async (candidate, ind) => {
      const emailBodyJson = await handleGenEmail(
        req.body.editorJson.templateJson,
        req.body.recruiterUser.first_name,
        candidate.firstName,
        async (command) => {
          const resp = await resolveAiCmd('', '', command);
          return resp;
        },
      );

      const dom = new jsdom(`<!DOCTYPE html><div id="content${ind}"></div>`);
      const doc = dom.window.document;
      const target = doc.querySelector('div');
      // Demo JSON output from ProseMirror
      const content = {
        doc: emailBodyJson,
        selection: {
          type: 'text',
          anchor: 16,
          head: 16,
        },
      };

      const contentNode = Node.fromJSON(schema, content.doc);

      DOMSerializer.fromSchema(schema).serializeFragment(
        contentNode.content,
        {
          document: doc,
        },
        target,
      );

      return {
        candidate_id: candidate.candidateId,
        recruiter_user_id: req.body.recruiterUser.user_id,
        email: {
          body: doc.getElementById(`content${ind}`).innerHTML,
          subject: req.body.subject,
          toEmail: candidate.email,
          createdAt: new Date().toISOString(),
          fromEmail: req.body.fromEmail,
        },
        email_sent: false,
      };
    }),
  );

  const { data, error } = await supabase
    .from('outreached_emails')
    .insert(dbEmails)
    .select();

  if (error) {
    console.log(JSON.stringify(error));
    return res.status(400).json({ error });
  } else {
    return res.status(200).json({ data });
  }

  // Now dbEmails contains the results of all asynchronous operations
}
