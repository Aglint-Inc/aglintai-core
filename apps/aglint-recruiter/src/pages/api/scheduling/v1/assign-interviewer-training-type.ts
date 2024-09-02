import { supabaseWrap } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

type BodyParams = {
  training_ints: {
    interviewer_module_relation_id: string;
    session_id: string;
  }[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { training_ints } = req.body as BodyParams;
  try {
    if (!training_ints) res.status(400).send('missing field');
    const module_relations = supabaseWrap(
      await supabaseAdmin
        .from('module_relations_view')
        .select()
        .in(
          'id',
          training_ints.map((int) => int.interviewer_module_relation_id),
        ),
    );

    const promises = training_ints.map(async (training_int) => {
      const int_module_data = module_relations.find(
        (reln) => reln.id === training_int.interviewer_module_relation_id,
      );
      const required_shadows = int_module_data.number_of_shadow;

      const shadow_meetings_cnt = int_module_data.shadow_completed_count;
      let is_shadow = true;
      if (shadow_meetings_cnt < required_shadows) {
        is_shadow = true;
      } else if (shadow_meetings_cnt === required_shadows) {
        is_shadow = false;
      }
      supabaseWrap(
        await supabaseAdmin
          .from('interview_session_relation')
          .update({
            training_type: is_shadow ? 'shadow' : 'reverse_shadow',
          })
          .eq(
            'interview_module_relation_id',
            training_int.interviewer_module_relation_id,
          )
          .eq('session_id', training_int.session_id)
          .select(),
      );
    });

    await Promise.all(promises);

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export default handler;
