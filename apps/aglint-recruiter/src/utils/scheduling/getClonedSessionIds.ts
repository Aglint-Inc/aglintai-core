/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

type CloneSessionsType = {
  old_new_session_ids: {
    old_session_id: string;
    new_session_id: string;
  }[];
  cloned_sessions: {
    interview_meeting: Pick<DatabaseTable['interview_meeting'], 'id'>;
    interview_session: Pick<
      DatabaseTable['interview_session'],
      'id' | 'meeting_id'
    >;
  }[];
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

  let cloned_sessn_data: Pick<
    DatabaseTable['interview_session'],
    'id' | 'meeting_id'
  >[] = [];
  cloned_sessn_data = session_ids.map((s_id) => {
    if (cloned_data.old_new_session_ids.length > 0) {
      let new_sess_map = cloned_data.old_new_session_ids.find(
        (c) => c.old_session_id === s_id,
      );
      let cloned_session_data = cloned_data.cloned_sessions.find(
        (c) => c.interview_session.id === new_sess_map.new_session_id,
      );
      if (!cloned_session_data) {
        throw new Error('session id not found in job session ids');
      }
      return cloned_session_data.interview_session;
    } else {
      let cloned_session_data = cloned_data.cloned_sessions.find(
        (c) => c.interview_session.id === s_id,
      );
      if (!cloned_session_data) {
        throw new Error('session id not found in job session ids');
      }
      return cloned_session_data.interview_session;
    }
  });

  return { cloned_sessn_data, schedule_id: cloned_data.schedule_id };
};
