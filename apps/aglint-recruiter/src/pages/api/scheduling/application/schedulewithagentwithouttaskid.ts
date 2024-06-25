/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { scheduleWithAgentWithoutTaskId } from '@/src/components/Scheduling/CandidateDetails/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export interface ApiBodyParamsScheduleAgentWithoutTaskId {
  type: 'phone_agent' | 'email_agent';
  session_ids: string[];
  application_id: string;
  dateRange: {
    start_date: string | null;
    end_date: string | null;
  };
  recruiter_id: string;
  task_id: string;
  recruiter_user_name: string;
  candidate_name?: string;
  company_name?: string;
  rec_user_phone: string;
  rec_user_id: string;
  user_tz: string;
  trigger_count: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      application_id,
      dateRange,
      rec_user_id,
      rec_user_phone,
      recruiter_id,
      recruiter_user_name,
      session_ids,
      type,
      candidate_name,
      company_name,
      user_tz,
    } = req.body as ApiBodyParamsScheduleAgentWithoutTaskId;

    const resAgent = await scheduleWithAgentWithoutTaskId({
      application_id,
      dateRange,
      recruiter_id,
      recruiter_user_name,
      session_ids,
      type: type,
      candidate_name: candidate_name,
      company_name: company_name,
      rec_user_phone,
      rec_user_id,
      supabase: supabaseAdmin,
      user_tz,
    });

    return res.status(200).send(resAgent);
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
