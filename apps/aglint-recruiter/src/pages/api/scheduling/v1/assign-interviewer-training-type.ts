import { CApiError, supabaseWrap } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type BodyParams = {
  training_ints: {
    interviewer_module_relation_id: string;
    session_id: string;
  }[];
};

const assignInterviewerTraining = async (req_body: BodyParams) => {
  const { training_ints } = req_body as BodyParams;
  const supabaseAdmin = getSupabaseServer();

  const module_relations = (
    await supabaseAdmin
      .from('module_relations_view')
      .select()
      .in(
        'id',
        training_ints.map((int) => int.interviewer_module_relation_id),
      )
      .throwOnError()
  ).data;
  if (!module_relations) {
    throw new CApiError('SERVER_ERROR', 'No module relations found');
  }

  const promises = training_ints.map(async (training_int) => {
    const int_module_data = module_relations.find(
      (reln) => reln.id === training_int.interviewer_module_relation_id,
    );
    if (!int_module_data) {
      throw new CApiError('SERVER_ERROR', 'No module relations found');
    }
    const required_shadows = int_module_data.number_of_shadow ?? 0;

    const shadow_meetings_cnt = int_module_data.shadow_completed_count ?? 0;
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
};

export default createPageApiPostRoute(null, assignInterviewerTraining);
