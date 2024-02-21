import { RecruiterDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

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
  showToast: boolean = false,
): Promise<boolean> => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    toast.error(`Oops! Something went wrong. (${error.message})`);
    return false;
  } else {
    showToast && toast.success(`Password reset successfully`);
    return true;
  }
};

export const refershAccessToken = async ({ refresh_token }) => {
  await supabase.auth.refreshSession({
    refresh_token: refresh_token,
  });
};
