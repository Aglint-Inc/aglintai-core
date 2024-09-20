import { type DatabaseTable, type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type API_save_interview_feedback } from './types';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { interview_id, feedback } =
        req.body as unknown as API_save_interview_feedback['request'];
      if (!interview_id || !feedback) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }
      const isSaved = await saveInterviewFeedback({
        id: interview_id,
        feedback,
      });
      return res.status(200).send(
        getResponse({
          data: isSaved,
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
  data: Partial<API_save_interview_feedback['response']>,
) => {
  return { data: false, error: null, ...data };
};

const saveInterviewFeedback = ({
  id,
  feedback,
}: {
  id: string;
  feedback: DatabaseTable['interview_meeting']['candidate_feedback'];
}) => {
  return supabase
    .from('interview_meeting')
    .update({ candidate_feedback: feedback })
    .eq('id', id)
    .then(({ error }) => {
      if (error) throw new Error(error.message);
      return true;
    });
};
