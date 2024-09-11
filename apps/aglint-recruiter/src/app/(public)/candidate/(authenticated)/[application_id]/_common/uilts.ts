import axios from 'axios';

import { candidatePortalGetEmailtype } from '@/api/candidate_portal/get_email/route';
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

  return data;
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

export function hideEmail(email) {
  const [localPart, domain] = email.split('@');

  if (localPart.length < 6) {
    const hiddenLocalPart = `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`;
    return `${hiddenLocalPart}@${domain}`;
  }

  const prefix = localPart.slice(0, 3);
  const suffix = localPart.slice(-3);
  const hiddenLocalPart = `${prefix}***${suffix}`;

  return `${hiddenLocalPart}@${domain}`;
}
