import {
  DatabaseTable,
  DatabaseTableInsert,
  PauseJson,
} from '@aglint/shared-types';
import axios from 'axios';

import { supabase } from '@/src/utils/supabase/client';

import { schedulesSupabase } from '../../schedules-query';
import { MemberType, ModuleDashboard, StatusTraining } from '../types';

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
  filter: DatabaseTable['interview_meeting']['status'],
  changeText: string,
) => {
  const query = schedulesSupabase()
    .eq('module_id', module_id)
    .eq('meeting_interviewers.is_confirmed', true);

  if (changeText) {
    query.ilike('session_name', `%${changeText}%`);
  }

  if (filter) {
    query.eq('status', filter);
  }

  const { data } = await query.throwOnError();

  return data;
};

export const fetchProgress = async ({
  module_id,
  trainer_ids,
}: {
  module_id: string;
  trainer_ids: string[]; // interview_module_relation_id
}) => {
  const { data } = await supabase
    .from('interview_training_progress')
    .select(
      '*,interview_session_relation(*,interview_session(*,interview_meeting(*)),interview_module_relation(*))',
    )
    .eq('interview_session.module_id', module_id)
    .in('interview_module_relation_id', trainer_ids)
    .eq('is_confirmed', true)
    .throwOnError();

  const resRel = data.map((sesRel) => {
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
  const { data, error } = await supabase.rpc('get_interview_modules', {
    rec_id: rec_id,
  });
  if (error) throw new Error(error.message);
  return data as unknown as ModuleDashboard[];
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
    .delete()
    .eq('id', module_relation_id);
  if (error) {
    return false;
  } else {
    return true;
  }
};

export const addMemberbyUserIds = async ({
  user_ids,
  module_id,
  training_status,
  number_of_reverse_shadow,
  number_of_shadow,
}: {
  user_ids: string[];
  module_id: string;
  training_status: StatusTraining;
  number_of_reverse_shadow: number;
  number_of_shadow: number;
}) => {
  const interviewModRelations: DatabaseTableInsert['interview_module_relation'][] =
    user_ids.map((user_id) => ({
      user_id: user_id,
      module_id: module_id,
      training_status: training_status,
      number_of_reverse_shadow,
      number_of_shadow,
    }));

  const { data, error } = await supabase
    .from('interview_module_relation')
    .insert(interviewModRelations)
    .select();
  if (error) {
    return { data: null, error: error };
  }
  return { data, error };
};
