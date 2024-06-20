import {Request, Response} from 'express';
import {emailAgentHandler} from '../../agents/emailAgent/emailAgent';
import {z} from 'zod';
import {fetchEmailAgentCandDetails} from '../../agents/emailAgent/tools/utils/fetchEmailAgentCandDetails';
import {getCandidateLogger} from '../../utils/scheduling_utils/getCandidateLogger';
import {supabaseAdmin} from '../../services/supabase/SupabaseAdmin';
import {sendEmailFromAgent} from '../../agents/emailAgent/tools/utils/sendEmailFromAgent';
import {supabaseWrap} from '@aglint/shared-utils';

const email_agent_payload = z.object({
  from_email: z.string(),
  email_body: z.string(),
  thread_id: z.string(),
  mail_header: z.any(),
});

export const composeEmail = async (req: Request, res: Response) => {
  try {
    const api_body = email_agent_payload.parse(req.body);
    const agent_payload = await fetchEmailAgentCandDetails(
      api_body.thread_id,
      api_body.email_body
    );

    if (!agent_payload) {
      return res.status(204).send('invalid candidate');
    }
    const candLogger = getCandidateLogger(
      agent_payload.payload.task_id,
      agent_payload.payload.candidate_name,
      agent_payload.payload.candidate_id,
      'email_agent'
    );
    candLogger(
      '{candidate} : Reply',
      {
        '{candidate}': '',
      },
      'candidate',
      'email_messages',
      {
        message: api_body.email_body,
      }
    );
    const {new_history} = await emailAgentHandler(agent_payload, candLogger);
    supabaseWrap(
      await supabaseAdmin
        .from('scheduling-agent-chat-history')
        .update({
          chat_history: new_history,
        })
        .eq('thread_id', api_body.thread_id)
    );
    candLogger('Mail Agent : Reply', {}, 'email_agent', 'email_messages', {
      message: new_history[new_history.length - 1]?.value as string,
    });
    await sendEmailFromAgent({
      candidate_email: agent_payload.payload.candidate_email,
      from_name: agent_payload.schedule_chat_history.from_name,
      mail_body: new_history[new_history.length - 1].value as string,
      company_name: agent_payload.payload.company_name,
      headers: api_body.mail_header ?? undefined,
      subject: agent_payload.schedule_chat_history.subject,
      agent_email: agent_payload.payload.agent_email,
    });
    return res.status(200).send('email sent');
  } catch (error: any) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};
