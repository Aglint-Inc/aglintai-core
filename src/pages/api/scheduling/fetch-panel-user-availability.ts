import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Database } from '@/src/types/schema';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

type BodyParams = {
  panel_id: string;
  time_slot: string;
  req_user_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { panel_id, req_user_id } = req.body as BodyParams;
    const [requested_user] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name, last_name')
        .eq('user_id', req_user_id),
    );
    const [panel] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module')
        .select(
          '*,interview_module_relation(*, recruiter_user(first_name,last_name,profile_image))',
        )
        .eq('id', panel_id),
    );
    if (!panel) throw new Error('invalid panel id');
    const recruiter_avails = await Promise.all(
      panel.interview_module_relation
        .map((reln) => reln.user_id)
        .map(async (userId) => {
          let [avail] = supabaseWrap(
            await supabaseAdmin
              .from('interview_availabilties')
              .select()
              .eq('user_id', userId),
          );
          return avail;
        }),
    );
    let finalData = recruiter_avails.map((avail) => {
      const user = panel.interview_module_relation.find(
        (panel) => panel.user_id === avail.user_id,
      ).recruiter_user;
      return {
        interviewerName: [user.first_name, user.last_name]
          .filter(Boolean)
          .join(' '),
        profileImg: user.profile_image,
        interviewerId: avail.user_id,
        slots: avail.slot_availability,
      };
    });

    return res.status(200).json({
      requested_user_name: [requested_user.first_name, requested_user.last_name]
        .filter(Boolean)
        .join(' '),
      interviewers_availabilities: finalData,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
