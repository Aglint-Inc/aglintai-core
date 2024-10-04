import axios from 'axios';

import type { candidatePortalGetEmailtype } from '@/api/candidate_portal/get_email/route';
import { supabase } from '@/utils/supabase/client';

export const getCandidateEmailByApplicationId = async (
  application_id: string,
) => {
  const { data } = await axios.post<candidatePortalGetEmailtype>(
    '/api/candidate_portal/get_email',
    {
      application_id,
    },
  );

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
