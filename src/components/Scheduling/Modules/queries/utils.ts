import axios from 'axios';
import dayjs from 'dayjs';

import { supabase } from '@/src/utils/supabase/client';

import { initialEditModule } from '../store';
import {
  MemberType,
  ModuleDashboard,
  ModuleType,
  PauseJson,
  StatusTraining,
  TransformSchedule,
} from '../types';
import { calculateHourDifference } from '../utils';
import { useGetMeetingsByModuleId } from './hooks';

export const fetchModules = async (module_id: string) => {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_module_id',
    {
      target_module_id: module_id,
    },
  );
  if (error) throw new Error(error.message);
  return data as TransformSchedule[];
};

export const fetchProgress = async ({
  module_id,
  trainer_ids,
}: {
  module_id: string;
  trainer_ids: string[]; // interview_module_relation_id
}) => {
  const { data: intSesRel, error: errSelRel } = await supabase
    .from('interview_session_relation')
    .select('*,interview_session!inner(*,interview_plan(*))')
    .eq('interview_session.module_id', module_id)
    .in('interview_module_relation_id', trainer_ids)
    .eq('is_confirmed', true);

  if (errSelRel) throw new Error(errSelRel.message);

  const filteredIntSesRel = intSesRel.filter(
    (ses) => !ses.interview_session?.interview_plan?.id,
  );

  const uniqueSessionIds = [
    ...new Set(filteredIntSesRel.map((sesrel) => sesrel.interview_session.id)),
  ];

  const { data, error } = await supabase
    .from('interview_meeting')
    .select('*,interview_session!inner(*)')
    .in('interview_session.id', uniqueSessionIds);
  // .eq('status', 'completed');

  const resRel = filteredIntSesRel
    .map((sesRel) => ({
      ...sesRel,
      interview_meeting: data.find(
        (meet) => meet.interview_session.id === sesRel.interview_session.id,
      ),
    }))
    .filter((sesRel) => sesRel?.interview_meeting?.id);

  if (error) throw new Error(error.message);
  return resRel;
};

export const fetchInterviewModules = async (rec_id: string) => {
  const { data, error } = await supabase.rpc('get_interview_modules', {
    rec_id: rec_id,
  });
  if (error) throw new Error(error.message);
  return data as unknown as ModuleDashboard[];
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
      '*,recruiter_user(user_id,first_name,last_name,email,profile_image,scheduling_settings)',
    )
    .eq('module_id', module_id);

  if (errorRel) {
    throw new Error(errorRel.message);
  }

  return {
    ...dataModule[0],
    relations: dataRel,
    settings: dataModule[0].settings || initialEditModule.settings, //for some columns setting is null thats why we are adding this
  } as ModuleType;
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
  module_id,
  user_id,
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
  training_status,
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
        training_status: training_status,
      })),
    )
    .select();
  if (error) {
    return { data: null, error: error };
  }
  return { data, error };
};

export const getMeetingsByModuleId = async (module_id: string) => {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1),
  );
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  const { data: intSesRel, error: errSelRel } = await supabase
    .from('interview_session_relation')
    .select('*,interview_session!inner(*,interview_plan(*))')
    .eq('is_confirmed', true)
    .eq('interview_session.module_id', module_id as string)
    .is('interview_session.interview_plan', null);

  if (errSelRel) throw new Error(errSelRel.message);

  const uniqueSessionIds = [
    ...new Set(
      intSesRel
        .map((sesrel) => sesrel?.interview_session?.id)
        .filter((id) => id),
    ),
  ];

  const { data, error } = await supabase
    .from('interview_meeting')
    .select('*,interview_session!inner(*)')
    .in('interview_session.id', uniqueSessionIds)
    .gte('start_time', firstDayOfWeek.toISOString().split('T')[0] + 'T00:00:00')
    .lte('end_time', lastDayOfWeek.toISOString().split('T')[0] + 'T23:59:59');

  const resRel = intSesRel
    .map((sesRel) => ({
      ...sesRel,
      interview_meeting: data.find(
        (meet) => meet.interview_session.id === sesRel?.session_id,
      ),
    }))
    .filter((sesRel) => sesRel?.interview_meeting?.id);

  if (error) throw new Error(error.message);
  return resRel;
};

export const getHours = ({
  meetingData,
  user,
  type,
}: {
  meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
  user: { id: string };
  type: 'daily' | 'weekly';
}) => {
  let currentDay = dayjs();
  if (type === 'daily') {
    return meetingData
      .filter(
        (meet) =>
          meet?.interview_module_relation_id === user.id &&
          dayjs(meet?.interview_meeting?.end_time).isSame(currentDay, 'day'),
      )
      .reduce((acc, curr) => {
        return (
          acc +
          calculateHourDifference(
            curr.interview_meeting.start_time,
            curr.interview_meeting.end_time,
          )
        );
      }, 0);
  }
  return meetingData
    .filter((meet) => meet?.interview_module_relation_id === user.id)
    .reduce((acc, curr) => {
      return (
        acc +
        calculateHourDifference(
          curr.interview_meeting.start_time,
          curr.interview_meeting.end_time,
        )
      );
    }, 0);
};
