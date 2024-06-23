/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { APISendgridPayload, EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidV4 } from 'uuid';

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { EmailWebHook } from '@/src/services/EmailWebhook/EmailWebhook';
import { getFullName } from '@/src/utils/jsonResume';
import { agent_activities } from '@/src/utils/scheduling_v2/agents_activity';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getCandidateLogger } from '../../../../utils/scheduling_v2/getCandidateLogger';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { filter_json_id, recruiter_user_id, task_id } =
    req.body as InitAgentBodyParams;
  const candLogger = getCandidateLogger(task_id, '', '', 'email_agent');
  try {
    if (!filter_json_id || !recruiter_user_id) {
      return res.status(400).send('missing fields');
    }

    const cand_details = await fetchCandDetails({
      filter_json_id,
    });

    const thread_id = uuidV4();
    // `<${conversation_id}.${Date.now()}@parse.aglinthq.com>`;
    const message_id = EmailWebHook.getMessageId(
      thread_id,
      process.env.NEXT_PUBLIC_AGENT_EMAIL,
    );
    const mailPayload: EmailTemplateAPi<'agent_email_candidate'>['api_payload'] =
      {
        recruiter_user_id,
        filter_id: filter_json_id,
        mail_headers: {
          'Message-ID': message_id,
          'In-Reply-To': message_id,
        },
        agent_email: process.env.NEXT_PUBLIC_AGENT_EMAIL,
      };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/agent_email_candidate`,
      {
        meta: mailPayload,
      },
    );
    const email_details = data as APISendgridPayload;
    supabaseWrap(
      await supabaseAdmin.from('scheduling_agent_chat_history').insert({
        application_id: cand_details.application_id,
        job_id: cand_details.job_id,
        chat_history: [
          {
            type: 'assistant',
            value: email_details.html,
          },
        ],
        company_id: cand_details.company_id,
        filter_json_id: filter_json_id,
        task_id: task_id ?? undefined,
        thread_id: thread_id,
        agent_processing: false,
        email_from_name: email_details.fromName,
        email_subject: email_details.subject,
      }),
    );
    if (task_id) {
      supabaseWrap(
        await supabaseAdmin
          .from('new_tasks')
          .update({
            status: 'in_progress',
          })
          .eq('id', task_id),
      );
    }

    await candLogger(
      `Sent interview schedule email to {candidate}`,
      {
        '{candidate}': cand_details.candidate_name,
      },
      'email_agent',
      'email_messages',
      {
        message: email_details.html,
      },
    );
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    await candLogger(
      agent_activities.email_agent.init_agent.failed_to_init,
      {},
    );
    return res.status(500).send(error.message);
  }
};

export default handler;

export const sendEmailFromAgent = async ({
  candidate_email,
  from_name,
  mail_body,
  headers,
  subject,
}) => {
  await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
    email: candidate_email,
    fromEmail: process.env.NEXT_PUBLIC_AGENT_EMAIL,
    fromName: from_name,
    subject: subject,
    text: mail_body,
    headers,
  });
};

const fetchCandDetails = async ({ filter_json_id }) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,interview_schedule(id,application_id, applications(public_jobs(id,recruiter_id), candidates(first_name,last_name)))',
      )
      .eq('id', filter_json_id),
  );

  if (!rec) {
    throw new Error('Invalid Application');
  }
  const cand_basic_info = rec.interview_schedule.applications.candidates;
  const job = rec.interview_schedule.applications.public_jobs;

  if (rec.session_ids.length === 0) {
    throw new Error('Empty sessions');
  }

  let cand_details = {
    application_id: rec.interview_schedule.application_id,
    job_id: job.id,
    candidate_name: getFullName(
      cand_basic_info.first_name,
      cand_basic_info.last_name,
    ),
    company_id: job.recruiter_id,
  };

  return cand_details;
};
