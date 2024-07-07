/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export interface ApiBodyOpenSelfScheduling {
  filter_id: string;
  timezone: string;
  application_id: string;
  sesssion_name: string[];
  candidate_id: string;
}

export type ApiResponseOpenSelfScheduling = 'updated';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { filter_id, timezone, application_id, sesssion_name, candidate_id } =
      req.body as ApiBodyOpenSelfScheduling;
    if (
      filter_id &&
      timezone &&
      application_id &&
      sesssion_name &&
      candidate_id
    ) {
      await supabaseAdmin
        .from('candidates')
        .update({ timezone: timezone })
        .eq('id', candidate_id)
        .throwOnError();

      const { data } = await supabaseAdmin
        .from('interview_filter_json')
        .select()
        .eq('id', filter_id)
        .single()
        .throwOnError();

      if (!data?.viewed_on) {
        await supabaseAdmin
          .from('interview_filter_json')
          .update({ viewed_on: new Date().toISOString() })
          .eq('id', filter_id)
          .throwOnError();

        await addScheduleActivity({
          title: `Candidate opened self scheduling link for ${sesssion_name.join(', ')}`,
          application_id,
          created_by: null,
          logged_by: 'candidate',
          supabase: supabaseAdmin,
        });
      }

      return res.status(200).send('updated');
    } else {
      return res
        .status(400)
        .send(
          'filter_id, timezone, application_id, sesssion_name are required',
        );
    }
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
