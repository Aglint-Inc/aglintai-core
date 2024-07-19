import { DatabaseTable, PauseJson, SupabaseType } from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { schedulesSupabase } from '../../schedules-query';
import { initialEditModule } from '../store';
import {
  MemberType,
  ModuleDashboard,
  ModuleType,
  StatusTraining,
} from '../types';
import { calculateHourDifference } from '../utils';
import { useGetMeetingsByModuleId } from './hooks';

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
    .from('interview_session')
    .select('*,interview_meeting!inner(*)')
    .in('id', uniqueSessionIds);
  // .eq('status', 'completed');

  const resRel = filteredIntSesRel
    .map((sesRel) => ({
      ...sesRel,
      interview_meeting: data.find(
        (ses) => ses.id === sesRel.interview_session.id,
      ).interview_meeting,
    }))
    .filter(
      (sesRel) =>
        sesRel?.interview_meeting?.id &&
        (sesRel.interview_meeting.status === 'confirmed' ||
          sesRel.interview_meeting.status === 'completed'),
    );

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

export const fetchInterviewModuleByIdApi = async (
  module_id: string,
  supabase: SupabaseType,
) => {
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
  const response = {
    ...dataModule[0],
    relations: dataRel,
    settings: dataModule[0].settings || initialEditModule.settings, //for some columns setting is null thats why we are adding this
  } as ModuleType;

  return {
    data: response,
    error: errorModule?.message || errorRel?.message,
  } as {
    data: ModuleType | null;
    error: string | null;
  };
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
  const { data: intSesRel, error: errorSelRel } = await supabase
    .from('interview_session_relation')
    .select('*')
    .eq('interview_module_relation_id', module_relation_id)
    .eq('is_confirmed', true);

  if (errorSelRel) {
    toast.error(errorSelRel.message);
    return false;
  }

  if (intSesRel.length === 0) {
    const { error } = await supabase
      .from('interview_module_relation')
      .delete()
      .eq('id', module_relation_id);
    if (error) {
      toast.error(errorSelRel.message);
      return false;
    } else {
      return true;
    }
  } else {
    toast.warning(
      'User cannot be deleted. Meetings are associated with this user.',
    );
    return false;
  }
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
  const firstDayOfWeek = dayjs().startOf('week').startOf('day').format();
  const lastDayOfWeek = dayjs().endOf('week').endOf('day').format();

  const { data: intSesRel, error: errSelRel } = await supabase
    .from('interview_session_relation')
    .select(
      '*,interview_session!inner(*,interview_plan(*),interview_meeting(*))',
    )
    .eq('is_confirmed', true)
    .eq('interview_session.module_id', module_id as string)
    .is('interview_session.interview_plan', null)
    .gte('interview_session.interview_meeting.start_time', firstDayOfWeek)
    .lte('interview_session.interview_meeting.end_time', lastDayOfWeek);

  if (errSelRel) throw new Error(errSelRel.message);

  const resRel = intSesRel
    .map((sesRel) => ({
      ...sesRel,
      interview_meeting: sesRel.interview_session.interview_meeting,
    }))
    .filter((ses) => Boolean(ses.interview_meeting));
  
  return resRel;
};

export const getHours = ({
  meetingData,
  user, //module_relation_id
  type,
}: {
  meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
  user: { id: string }; //module_relation_id
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
  } else {
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
  }
};
