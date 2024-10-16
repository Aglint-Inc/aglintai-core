import type { GetEmail } from '@/routers/candidatePortal/get_email';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

export const getCandidateEmailByApplicationId = async (
  application_id: string,
) => {
  const { data } = api.candidatePortal.get_email.useQuery({
    application_id,
  }) as ProcedureQuery<GetEmail>;
  return data!;
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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate/${application_id}/home`,
    },
  });
};
