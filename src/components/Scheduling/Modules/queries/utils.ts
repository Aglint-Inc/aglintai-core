import axios from 'axios';

import { supabase } from '@/src/utils/supabase/client';

import { initialEditModule } from '../store';
import {
  MemberType,
  ModuleDashboard,
  ModuleType,
  PauseJson,
  StatusTraining,
  TransformSchedule
} from '../types';

export const fetchModules = async (module_id: string) => {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_module_id',
    {
      target_module_id: module_id
    }
  );
  if (error) throw new Error(error.message);
  return data as TransformSchedule[];
};

export const fetchProgress = async ({
  module_id,
  trainer_ids
}: {
  module_id: string;
  trainer_ids: string[];
}) => {
  const { data, error } = await supabase
    .from('interview_meeting_user')
    .select('*,interview_meeting(*,interview_schedule(*))')
    .eq('interview_meeting.module_id', module_id)
    .in('interviewer_id', trainer_ids);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchInterviewModules = async (rec_id: string) => {
  const { data, error } = await supabase.rpc('get_interview_modules', {
    rec_id: rec_id
  });
  if (error) throw new Error(error.message);
  return data as ModuleDashboard[];
};

export const fetchInterviewModuleById = async (module_id: string) => {
  const { data: dataModule, error: errorModule } = await supabase
    .from('interview_module')
    .select('*')
    .eq('id', module_id);
  if (errorModule) {
    throw errorModule;
  }
  const { data: dataRel, error: errorRel } = await supabase
    .from('interview_module_relation')
    .select(
      '*,recruiter_user(user_id,first_name,last_name,email,profile_image,scheduling_settings)'
    )
    .eq('module_id', module_id);

  if (errorRel) {
    throw new Error(errorRel.message);
  }

  return {
    ...dataModule[0],
    relations: dataRel,
    settings: dataModule[0].settings || initialEditModule.settings //for some columns setting is null thats why we are adding this
  } as ModuleType;
};

export const fetchMembers = async (rec_id: string) => {
  const resMem = await axios.post('/api/scheduling/fetchUserDetails', {
    recruiter_id: rec_id
  });
  if (resMem.status !== 200) {
    throw new Error('Error fetching user details');
  }
  return resMem.data as MemberType[];
};

export const resumePauseDbUpdate = async ({
  module_id,
  user_id
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
  pause_json
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
  module_id,
  user_id
}: {
  module_id: string;
  user_id: string;
}) => {
  const { error } = await supabase
    .from('interview_module_relation')
    .delete()
    .eq('module_id', module_id)
    .eq('user_id', user_id);
  if (error) {
    return false;
  }
  return true;
};

export const addMemberbyUserIds = async ({
  user_ids,
  module_id,
  training_status
}: {
  user_ids: string[];
  module_id: string;
  training_status: StatusTraining;
}) => {
  const { data, error } = await supabase
    .from('interview_module_relation')
    .insert(
      user_ids.map((user_id) => ({
        user_id: user_id,
        module_id: module_id,
        training_status: training_status
      }))
    )
    .select();
  if (error) {
    return { data: null, error: error };
  }
  return { data, error };
};
