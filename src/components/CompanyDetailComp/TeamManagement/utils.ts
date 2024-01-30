import axios from 'axios';

import { InviteUserAPIType, RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

export const getMembersFromDB = async (
  recruiter_id: string,
  user_id: string,
) => {
  const { data, error } = await supabase
    .from('recruiter_relation')
    .select()
    .eq('recruiter_id', recruiter_id)
    .or(`user_id.eq.${user_id},created_by.eq.${user_id}`);
  if (!error && data.length) {
    const userIds = data.map((item) => item.user_id);
    const { data: users, error: userError } = await supabase
      .from('recruiter_user')
      .select()
      .eq('is_deactivated', false)
      .in('user_id', userIds);
    if (!userError && users.length) {
      return users;
    } else {
      return [];
    }
  }
  return [];
};

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

export const inviteUser = (
  form: {
    name: string;
    email: string;
    role: string;
  },
  id: string,
) => {
  return axios
    .post<InviteUserAPIType['out']>('/api/invite_user', {
      users: [form],
      id: id,
    })
    .then(({ data }) => data);
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
