import { RecruiterDB } from '@aglint/shared-types';

import { supabase } from '@/src/utils/supabase/client';

export const updateRecruiterInDb = async (
  updateData: Partial<RecruiterDB>,
  id: string,
) => {
  const { data, error } = await supabase
    .from('recruiter')
    .update(updateData)
    .eq('id', id)
    .select();
  if (!error && data.length) {
    delete data[0].socials;
    return data[0] as Omit<RecruiterDB, 'address' | 'socials'>;
  }
  return null;
};

export const handleUpdatePassword = async (
  password: string,
): Promise<{
  error: boolean;
  message: string;
}> => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: 'Password reset successfully',
    };
  }
};

export const refershAccessToken = async ({ refresh_token }) => {
  await supabase.auth.refreshSession({
    refresh_token: refresh_token,
  });
};

export const updateJoinedStatus = async (user_id: string) => {
  await supabase
    .from('recruiter_user')
    .update({ status: 'active' })
    .eq('user_id', user_id)
    .throwOnError();
};
