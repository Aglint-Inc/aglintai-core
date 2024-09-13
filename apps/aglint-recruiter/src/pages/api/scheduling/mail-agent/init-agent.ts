/* eslint-disable no-console */
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  type APISendgridPayload,
  type TargetApiPayloadType,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { v4 as uuidV4 } from 'uuid';

import { type InitAgentBodyParams } from '@/components/ScheduleAgent/types';
import { EmailWebHook } from '@/services/EmailWebhook/EmailWebhook';
import { getFullName } from '@/utils/jsonResume';
import { mailSender } from '@/utils/mailSender';
import { agent_activities } from '@/utils/scheduling_v2/agents_activity';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

import { getCandidateLogger } from '../../../../utils/scheduling_v2/getCandidateLogger';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { filter_json_id, recruiter_user_id } = req.body as InitAgentBodyParams;
  const candLogger = getCandidateLogger('', '', 'email_agent');
  try {
    if (!filter_json_id || !recruiter_user_id) {
      return res.status(400).send('missing fields');
    }

    const cand_details = await fetchCandDetails({
      filter_json_id,
    });
    const [comp_integration] = supabaseWrap(
      await supabaseAdmin
        .from('integrations')
        .select()
        .eq('recruiter_id', cand_details.company_id),
    );
    const thread_id = uuidV4();
    const agent_email =
      process.env.LOCAL_AGENT_EMAIL ?? comp_integration.schedule_agent_email;
    //FORMAT `<${conversation_id}.${Date.now()}@parse.aglinthq.com>`;
    const message_id = EmailWebHook.getMessageId(thread_id, agent_email);
    const mailPayload: TargetApiPayloadType<'agent_email_candidate'> = {
      recruiter_user_id,
      filter_id: filter_json_id,
      mail_headers: {
        'Message-ID': message_id,
        'In-Reply-To': message_id,
      },
      agent_email,
    };

    const data = await mailSender({
      target_api: 'agent_email_candidate',
      payload: {
        ...mailPayload,
      },
    });
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
        thread_id: thread_id,
        agent_processing: false,
        email_from_name: email_details.fromName,
        email_subject: email_details.subject,
      }),
    );

    await candLogger(
      `Sent interview schedule email to {candidate}`,
      {
        '{candidate}': cand_details.candidate_name,
      },
      'email_agent',
      'send_email',
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
      'email_agent',
      'email_failed',
    );
    return res.status(500).send(error.message);
  }
};

export default handler;

const fetchCandDetails = async ({ filter_json_id }) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*, applications(public_jobs(id,recruiter_id), candidates(first_name,last_name))',
      )
      .eq('id', filter_json_id),
  );

  if (!rec) {
    throw new Error('Invalid Application');
  }
  const cand_basic_info = rec.applications.candidates;
  const job = rec.applications.public_jobs;

  if (rec.session_ids.length === 0) {
    throw new Error('Empty sessions');
  }

  const cand_details = {
    application_id: rec.application_id,
    job_id: job.id,
    candidate_name: getFullName(
      cand_basic_info.first_name,
      cand_basic_info.last_name,
    ),
    company_id: job.recruiter_id,
  };

  return cand_details;
};
