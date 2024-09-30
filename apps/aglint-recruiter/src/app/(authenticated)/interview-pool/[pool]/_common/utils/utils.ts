import {
  type DatabaseTable,
  type DatabaseTableInsert,
  type PauseJson,
} from '@aglint/shared-types';
import axios from 'axios';
import { type MemberType } from 'src/app/_common/types/memberType';

import { supabase } from '@/utils/supabase/client';

import { schedulesSupabase } from '../../../../../_common/utils/schedules-query';
import { type useModuleAndUsers } from '../hooks/useModuleAndUsers';
import { type StatusTraining } from '../types/pool';

export const fetchSchedulesCountByModule = async (module_id: string) => {
  const { data } = await supabase
    .from('meeting_details')
    .select()
    .eq('module_id', module_id);

  const upcomingCount = data.reduce(
    (acc, cur) => (cur.status === 'confirmed' ? acc + 1 : acc),
    0,
  );

  const completedCount = data.reduce(
    (acc, cur) => (cur.status === 'completed' ? acc + 1 : acc),
    0,
  );

  const cancelledCount = data.reduce(
    (acc, cur) => (cur.status === 'cancelled' ? acc + 1 : acc),
    0,
  );

  return {
    upcomingCount,
    completedCount,
    cancelledCount,
  };
};

export const fetchModuleSchedules = async (
  module_id: string,
  filter: DatabaseTable['interview_meeting']['status'][],
  changeText: string,
) => {
  const query = schedulesSupabase()
    .eq('module_id', module_id)
    .eq('meeting_interviewers.is_confirmed', true);

  if (changeText) {
    query.ilike('session_name', `%${changeText}%`);
  }

  if (typeof filter === 'string' || Array.isArray(filter)) {
    if (typeof filter === 'string') query.eq('status', filter);
    else if (Array.isArray(filter)) query.in('status', filter);
  }

  // if (filter) {
  //   query.eq('status', filter);
  // }

  const { data } = await query.throwOnError();

  return data;
};

export const fetchProgress = async ({
  trainer_ids,
}: {
  trainer_ids: string[]; // interview_module_relation_id
}) => {
  const { data } = await supabase
    .from('interview_training_progress')
    .select(
      '*,interview_session_relation(*,interview_session(*,interview_meeting(*)),interview_module_relation(*)),recruiter_user(first_name,last_name)',
    )
    .in('interview_session_relation.interview_module_relation_id', trainer_ids)
    .eq('interview_session_relation.is_confirmed', true)
    .order('created_at', { ascending: false })
    .not('interview_session_relation', 'is', null)
    .throwOnError();
  const resRel = data
    .filter(
      (ses) =>
        ses.interview_session_relation.interview_session.interview_meeting
          .status === 'completed',
    )
    .map((sesRel) => {
      const interview_session_relation: DatabaseTable['interview_session_relation'] =
        {
          feedback: sesRel.interview_session_relation.feedback,
          accepted_status: sesRel.interview_session_relation.accepted_status,
          id: sesRel.interview_session_relation.id,
          interview_module_relation_id:
            sesRel.interview_session_relation.interview_module_relation_id,
          interviewer_type: sesRel.interview_session_relation.interviewer_type,
          is_confirmed: sesRel.interview_session_relation.is_confirmed,
          session_id: sesRel.interview_session_relation.session_id,
          training_type: sesRel.interview_session_relation.training_type,
          user_id: sesRel.interview_session_relation.user_id,
        };
      return {
        ...sesRel,
        interview_meeting:
          sesRel.interview_session_relation.interview_session.interview_meeting,
        interview_session_relation,
        interview_module_relation:
          sesRel.interview_session_relation.interview_module_relation,
        interview_session: sesRel.interview_session_relation.interview_session,
      };
    });

  return resRel;
};

export const fetchInterviewModules = async (rec_id: string) => {
  const { data, error } = await supabase
    .from('interview_types_view')
    .select('*')
    .eq('recruiter_id', rec_id);
  if (error) throw new Error(error.message);
  return data;
};

export const fetchMembers = async (rec_id: string) => {
  const resMem = await axios.post('/api/scheduling/fetchUserDetails', {
    recruiter_id: rec_id,
  });
  if (resMem.status !== 200) {
    throw new Error('Error fetching user details');
  }
  return resMem.data as MemberType[];
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




