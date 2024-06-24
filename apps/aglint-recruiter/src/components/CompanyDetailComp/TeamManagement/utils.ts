import {
  DatabaseEnums,
  employmentTypeEnum,
  RecruiterUserType,
  schedulingSettingType,
} from '@aglint/shared-types';

import axios from '@/src/client/axios';
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

export const inviteUserApi = async (
  form: InviteUserAPIType['request']['users'][number],
  recruiter_id: string,
) => {
  return axios.call<InviteUserAPIType>('POST', '/api/invite_user', {
    users: [form],
    recruiter_id,
  });
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
  request: {
    users: {
      first_name: string;
      last_name: string;
      email: string;
      designation: string;
      interview_location: string;
      employment: employmentTypeEnum;
      department: string;
      role: DatabaseEnums['user_roles'];
      manager_id: string;
      scheduling_settings: schedulingSettingType;
    }[];
    recruiter_id: string;
  };
  response: {
    created: boolean;
    user: RecruiterUserType;
  };
};
