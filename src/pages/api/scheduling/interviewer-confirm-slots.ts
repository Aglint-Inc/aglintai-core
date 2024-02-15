import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InterviewerAvailabliity } from '@/src/components/Scheduling/Availability/availability.types';
import { Database } from '@/src/types/schema';

type BodyParams = {
  interviewer_availability: InterviewerAvailabliity[];
  interviewer_id: string;
};
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { interviewer_availability, interviewer_id } = req.body as BodyParams;
    supabaseWrap(
      await supabaseAdmin
        .from('interview_availabilties')
        .update({
          user_id: interviewer_id,
          slot_availability: interviewer_availability as any,
        })
        .eq('user_id', interviewer_id),
    );
    return res.status(200).send('ok');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
