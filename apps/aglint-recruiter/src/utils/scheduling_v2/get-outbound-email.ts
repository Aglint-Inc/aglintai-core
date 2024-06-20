import { get } from '@vercel/edge-config';

import { isEnvProd } from '@/src/components/Jobs/Dashboard/JobPostCreateUpdate/utils';

export const getOutboundEmail = async (email: string) => {
  let allowed_outbound_emails = (await get('allowlist-candidates')) as string[];
  allowed_outbound_emails = allowed_outbound_emails.map((e) =>
    e.toLocaleLowerCase(),
  );
  // console.log(allowed_outbound_emails);
  if (isEnvProd() || allowed_outbound_emails.includes(email.toLowerCase())) {
    return email;
  } else {
    const sudo_cand_email = await get('sudo-candidate');
    return sudo_cand_email;
  }
};
