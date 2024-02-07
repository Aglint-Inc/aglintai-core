import axios from 'axios';

import { RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

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
    name: string;
    email: string;
    role: string;
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
    users: { name: string; email: string; role: string }[];
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
