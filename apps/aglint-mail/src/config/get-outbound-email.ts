/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { get } from '@vercel/edge-config';

export const getOutboundEmail = async (email: string) => {
  let allowed_outbound_emails = (await get('allowlist-candidates')) as string[];
  allowed_outbound_emails = allowed_outbound_emails.map((e) =>
    e.toLocaleLowerCase(),
  );
  // console.log(allowed_outbound_emails);
  if (allowed_outbound_emails.includes(email.toLowerCase())) {
    return email;
  }
  const sudo_cand_email = (await get('sudo-candidate')) as string;
  return sudo_cand_email;
};
