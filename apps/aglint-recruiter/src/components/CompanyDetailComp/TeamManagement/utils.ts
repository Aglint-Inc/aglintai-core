import { type DatabaseTable, type RecruiterUserType } from '@aglint/shared-types';

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
    users: (Pick<
      DatabaseTable['recruiter_user'],
      | 'first_name'
      | 'last_name'
      | 'email'
      | 'position'
      | 'department_id'
      | 'office_location_id'
      | 'employment'
      | 'scheduling_settings'
    > & {
      role_id: string;
      manager_id: string;
    })[];
    recruiter_id: string;
  };
  response: {
    created: boolean;
    user: RecruiterUserType;
  };
};
