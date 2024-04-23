import axios from 'axios';

import { employmentTypeEnum, RecruiterUserType } from '@/src/types/data.types';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';
import { supabase } from '@/src/utils/supabase/client';

export const setMemberInDb = async (
  details: Partial<RecruiterUserType>,
  id: string,
) => {
  const { data, error } = await supabase
    .from('recruiter_user')
    .update(details)
    .eq('user_id', id)
    .select();
  if (!error && data.length) {
    return data[0];
  }
  return null;
};

export const inviteUserApi = (
  form: {
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
    employment: employmentTypeEnum;
    department: string;
    role: string;
    scheduling_settings: schedulingSettingType;
  },
  id: string,
  recruiter_user: {
    name: string;
    email: string;
  },
) => {
  const res = axios.post<InviteUserAPIType['out']>('/api/invite_user', {
    users: [form],
    id: id,
    recruiter_user: recruiter_user,
  });

  return res;
};

export const reinviteUser = (email: string, id: string) => {
  return axios
    .post('/api/invite_user/resend', {
      email,
      id,
    })
    .then(
      ({ data }) =>
        data as {
          error: string;
          emailSend: boolean;
        },
    );
};

export type InviteUserAPIType = {
  in: {
    users: {
      first_name: string;
      last_name: string;
      email: string;
      designation: string;
      interview_location: string;
      employment: employmentTypeEnum;
      department: string;
      role: string;
      scheduling_settings: schedulingSettingType;
    }[];
    id: string;
    recruiter_user: {
      name: string;
      email: string;
    };
  };
  out: {
    created: boolean;
    error: string;
    user: RecruiterUserType;
  };
};
