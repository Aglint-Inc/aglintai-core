import { get } from '@vercel/edge-config';

import { isEnvProd } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

export const getOutboundEmail = async (email: string, is_sendgrid = false) => {
  let allowed_outbound_emails = (await get('allowlist-candidates')) as string[];
  allowed_outbound_emails = allowed_outbound_emails.map((e) =>
    e.toLocaleLowerCase(),
  );
  if (isEnvProd() || allowed_outbound_emails.includes(email.toLowerCase())) {
    return email;
  } else {
    if (is_sendgrid) {
      const bounce_email = await get('bounce-back-email');
      return bounce_email;
    }
    const sudo_cand_email = await get('sudo-candidate');
    return sudo_cand_email;
  }
};
