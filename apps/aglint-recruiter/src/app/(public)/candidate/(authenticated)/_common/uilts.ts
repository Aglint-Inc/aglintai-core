import type { GetEmail } from '@/routers/candidatePortal/get_email';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

type Output = (_input: GetEmail['input']) => Promise<GetEmail['output']>;

export const useGetCandidateEmailByApplicationId = (): Output => {
  const utils = api.useUtils();
  return utils.candidatePortal.get_email.fetch;
};

export const sendMagicLink = async ({
  email,
  application_id,
}: {
  email: string;
  application_id: string;
}) => {
  email = 'mailcatcher.aglintai@gmail.com';
  return await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate/home?application_id=${application_id}`,
    },
  });
};
