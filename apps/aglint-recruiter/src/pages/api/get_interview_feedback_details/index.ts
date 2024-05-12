import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { CustomDatabase } from '@/src/types/customSchema';

import { API_get_interview_feedback_details } from './types';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { interview_id } =
        req.body as unknown as API_get_interview_feedback_details['request'];
      if (!interview_id) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }
      const data = await getInterviewDetails(interview_id);
      return res.status(200).send(
        getResponse({
          data,
        }),
      );
    } catch (error) {
      return res.status(200).send(
        getResponse({
          error: error || 'Internal Server Error.',
        }),
      );
    }
  }
}

const getResponse = (
  data: Partial<API_get_interview_feedback_details['response']>,
) => {
  return { data: false, error: null, ...data };
};

const getInterviewDetails = async (interview_id: string) => {
  return supabase
    .from('interview_meeting')
    .select(
      'candidate_feedback, interview_schedule( applications( public_jobs(id,logo, job_title, company)))',
    )
    .eq('id', interview_id)
    .single()
    .then(({ error, data }) => {
      if (error) throw error;
      return {
        candidate_feedback: data.candidate_feedback,
        company_logo: data.interview_schedule.applications.public_jobs.logo,
        company_name: data.interview_schedule.applications.public_jobs.company,
        job_title: data.interview_schedule.applications.public_jobs.job_title,
      };
    });
};
