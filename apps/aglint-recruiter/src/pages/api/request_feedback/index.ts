import { type TargetApiPayloadType } from '@aglint/shared-types';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { mailSender } from '@/utils/mailSender';

import { type API_request_feedback } from './type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tool, application_id, recruiter_user_id, session_id } =
    req.body as API_request_feedback['request'];
  try {
    if (tool === 'email') {
      mailSender({
        target_api: 'interviewEnd_email_interviewerForFeedback',
        payload: {
          application_id,
          recruiter_user_id,
          session_id,
        },
      });
    } else {
      await axios.post(
        `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/interviewEnd_slack_interviewerForFeedback`,
        {
          application_id,
          recruiter_user_id,
          session_id,
        } as TargetApiPayloadType<'interviewEnd_slack_interviewerForFeedback'>,
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
