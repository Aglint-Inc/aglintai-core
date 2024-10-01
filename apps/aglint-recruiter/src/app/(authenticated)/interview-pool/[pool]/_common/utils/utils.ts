import { type PauseJson } from '@aglint/shared-types';

import { supabase } from '@/utils/supabase/client';

export const fetchSchedulesCountByModule = async (module_id: string) => {
  const { data } = await supabase
    .from('meeting_details')
    .select()
    .eq('module_id', module_id);

  const upcomingCount = (data || []).reduce(
    (acc, cur) => (cur.status === 'confirmed' ? acc + 1 : acc),
    0,
  );

  const completedCount = (data || []).reduce(
    (acc, cur) => (cur.status === 'completed' ? acc + 1 : acc),
    0,
  );

  const cancelledCount = (data || []).reduce(
    (acc, cur) => (cur.status === 'cancelled' ? acc + 1 : acc),
    0,
  );

  return {
    upcomingCount,
    completedCount,
    cancelledCount,
  };
};

export const resumePauseDbUpdate = async ({
  module_id,
  user_id,
}: {
  module_id: string;
  user_id: string;
}) => {
  const { error } = await supabase
    .from('interview_module_relation')
    .update({ pause_json: null })
    .match({ module_id: module_id, user_id: user_id });
  if (error) {
    return false;
  }
  return true;
};

export const updatePauseJsonByUserId = async ({
  module_id,
  user_id,
  pause_json,
}: {
  module_id: string;
  user_id: string;
  pause_json: PauseJson;
}) => {
  const { error } = await supabase
    .from('interview_module_relation')
    .update({ pause_json: pause_json })
    .match({ module_id: module_id, user_id: user_id });
  if (error) {
    return false;
  } else {
    return true;
  }
};

export const deleteRelationByUserDbDelete = async ({
  module_relation_id,
}: {
  module_relation_id: string;
}) => {
  const { error } = await supabase
    .from('interview_module_relation')
    .update({
      is_archived: true,
    })
    .eq('id', module_relation_id);
  if (error) {
    return false;
  } else {
    return true;
  }
};
