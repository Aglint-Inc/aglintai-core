/* eslint-disable security/detect-object-injection */
import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

type CloneSessionsType = {
  cloned_session_ids: string[];
  job_session_ids: string[];
};
export const getAppSessionIds = async (
  application_id,
  session_ids: string[],
) => {
  const cloned_data = supabaseWrap(
    await supabaseAdmin.rpc('clone_sessions', {
      app_id: application_id,
    }),
  ) as CloneSessionsType;
  let app_session_ids: string[] = [];
  if (session_ids.find((s_id) => cloned_data.job_session_ids.includes(s_id))) {
    app_session_ids = session_ids.map((s_id) => {
      const idx = cloned_data.job_session_ids.findIndex(
        (j_s_id) => j_s_id === s_id,
      );
      return cloned_data.cloned_session_ids[idx];
    });
  } else if (
    session_ids.every((s_id) => cloned_data.cloned_session_ids.includes(s_id))
  ) {
    app_session_ids = [...session_ids];
  } else {
    throw new Error(
      'one of the session id does not match application session id',
    );
  }

  return app_session_ids;
};
