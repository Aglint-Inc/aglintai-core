import { type EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type API_request_feedback } from './type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tool, application_id, recruiter_user_id, session_id } =
    req.body as API_request_feedback['request'];
  try {
    if (tool === 'email') {
      await axios.post(
        `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/interviewEnd_email_interviewerForFeedback`,
        {
          application_id,
          recruiter_user_id,
          session_id,
        } as EmailTemplateAPi<'interviewEnd_email_interviewerForFeedback'>['api_payload'],
      );
    } else {
      await axios.post(
        `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/interviewEnd_slack_interviewerForFeedback`,
        {
          application_id,
          recruiter_user_id,
          session_id,
        } as EmailTemplateAPi<'interviewEnd_slack_interviewerForFeedback'>['api_payload'],
      );
    }
    return res.status(200).json({
      mailSent: true,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      mailSent: false,
      error: error.message,
    });
  }
}

//
