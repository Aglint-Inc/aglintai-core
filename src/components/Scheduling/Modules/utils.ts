import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { PauseJson, ScheduleType, StatusTraining } from './types';

export const fetchInterviewModule = async (recruiter_id: string) => {
  try {
    const { data: dataModule, error: errorModule } = await supabase
      .from('interview_module')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .order('created_at', { ascending: false });
    if (errorModule) {
      throw errorModule;
    }
    const moduleIds = dataModule.map((panel) => panel.id);
    const { data: dataRel, error: errorRel } = await supabase
      .from('interview_module_relation')
      .select('*')
      .in('module_id', moduleIds);

    if (errorRel) {
      throw errorRel;
    }
    const intPan = dataModule.map((module) => {
      const members = dataRel.filter((rel) => rel.module_id === module.id);
      return {
        ...module,
        relations: members
      };
    });

    return intPan;
  } catch (e) {
    toast.error('Error fetching interview panel');
    return [];
  }
};

export const fetchInterviewModuleById = async (module_id: string) => {
  try {
    const { data: dataModule, error: errorModule } = await supabase
      .from('interview_module')
      .select('*')
      .eq('id', module_id);
    if (errorModule) {
      throw errorModule;
    }
    const { data: dataRel, error: errorRel } = await supabase
      .from('interview_module_relation')
      .select('*')
      .eq('module_id', module_id);

    if (errorRel) {
      throw errorRel;
    }

    return { ...dataModule[0], relations: dataRel };
  } catch (e) {
    toast.error('Error fetching interview panel');
    return [];
  }
};

export const createModule = async ({
  name,
  recruiter_id,
  description,
  isTraining
}: {
  name: string;
  description: string;
  isTraining: boolean;
  recruiter_id: string;
}) => {
  const { data: interMod, error: errorModule } = await supabase
    .from('interview_module')
    .insert({
      name: name,
      recruiter_id: recruiter_id,
      description: description,
      settings: {
        require_training: isTraining ? true : false,
        noShadow: 2,
        noReverseShadow: 2,
        reqruire_approval: false,
        approve_users: []
      }
    })
    .select();

  if (errorModule) {
    throw errorModule;
  }

  return interMod[0];
};

export const deleteModuleById = async (id: string) => {
  const { error } = await supabase
    .from('interview_module')
    .delete()
    .eq('id', id);
  if (error) {
    return false;
  } else {
    return true;
  }
};

export const deleteRelationByUserId = async ({
  user_id,
  module_id
}: {
  user_id: string;
  module_id: string;
}) => {
  const { error } = await supabase
    .from('interview_module_relation')
    .delete()
    .match({
      user_id: user_id,
      module_id: module_id
    });
  if (error) {
    return false;
  } else {
    return true;
  }
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

export const getColorStatusSchedule = (
  status: ScheduleType['schedule']['status']
) => {
  return status == 'completed'
    ? '#2F3941'
    : status == 'confirmed'
      ? '#0F3554'
      : status == 'pending'
        ? '#703815'
        : '#681219';
};
