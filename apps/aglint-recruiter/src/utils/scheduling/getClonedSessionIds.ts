/* eslint-disable security/detect-object-injection */
import { ApiError, supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

type CloneSessionsType = {
  cloned_session_ids: string[];
  job_session_ids: string[];
  schedule_id: string;
};
export const getClonedSessionIds = async (
  application_id,
  session_ids: string[],
) => {
  const cloned_data = supabaseWrap(
    await supabaseAdmin.rpc('clone_sessions', {
      app_id: application_id,
    }),
  ) as CloneSessionsType;

  let cloned_sessn_ids: string[] = [];
  if (session_ids.find((s_id) => cloned_data.job_session_ids.includes(s_id))) {
    cloned_sessn_ids = session_ids.map((s_id) => {
      const idx = cloned_data.job_session_ids.findIndex(
        (j_s_id) => j_s_id === s_id,
      );
      return cloned_data.cloned_session_ids[idx];
    });
  } else if (
    session_ids.every((s_id) => cloned_data.cloned_session_ids.includes(s_id))
  ) {
    cloned_sessn_ids = [...session_ids];
  } else {
    throw new ApiError(
      'LOGIC',
      'one of the session id does not match application session id',
    );
  }

  return { cloned_sessn_ids, schedule_id: cloned_data.schedule_id };
};
