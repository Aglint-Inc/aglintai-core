import { supabaseWrap } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { ModuleType } from '@/src/components/Scheduling/InterviewTypes/types';
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
    const [module_relation] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .select('*,interview_module(*)')
        .eq('id', training_ints[0].interviewer_module_relation_id),
    );
    const ints_session = supabaseWrap(
      await supabaseAdmin
        .from('interview_session_relation')
        .select()
        .in(
          'interview_module_relation_id',
          training_ints.map((t) => t.interviewer_module_relation_id),
        ),
    );
    const int_module = module_relation.interview_module;
    const module_setting =
      int_module.settings as unknown as ModuleType['settings'];
    const required_shadows = module_setting.noShadow;
    const promises = training_ints.map(async (training_int) => {
      const shadow_meetings_cnt = ints_session.filter(
        (i) =>
          i.training_type === 'shadow' &&
          i.interview_module_relation_id ===
            training_int.interviewer_module_relation_id,
      ).length;
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
