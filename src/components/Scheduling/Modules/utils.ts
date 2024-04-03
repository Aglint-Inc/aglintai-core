import { InterviewMeetingTypeDb } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';


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
        relations: members,
      };
    });

    return intPan;
  } catch (e) {
    toast.error('Error fetching interview panel');
    return [];
  }
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
    .select('*')
    .eq('module_id', module_id);

  if (errorRel) {
    throw new Error(errorRel.message);
  }
  return { ...dataModule[0], relations: dataRel };
};

export const createModule = async ({
  name,
  recruiter_id,
  description,
  isTraining,
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
        approve_users: [],
      },
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
  module_id,
}: {
  user_id: string;
  module_id: string;
}) => {
  const { error } = await supabase
    .from('interview_module_relation')
    .delete()
    .match({
      user_id: user_id,
      module_id: module_id,
    });
  if (error) {
    return false;
  } else {
    return true;
  }
};

export const getColorStatusSchedule = (
  status: InterviewMeetingTypeDb['status'],
) => {
  return status == 'completed'
    ? '#228F67'
    : status == 'confirmed'
      ? '#337FBD'
      : status == 'waiting'
        ? '#ED8F1C'
        : status == 'cancelled'
          ? '#D93F4C'
          : '#681219';
};

export function calculateHourDifference(
  startDate: string,
  endDate: string,
): number {
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);
  const diffInMilliseconds: number = Math.abs(end.getTime() - start.getTime());
  const diffInHours: number = diffInMilliseconds / (1000 * 60 * 60);
  return diffInHours;
}
