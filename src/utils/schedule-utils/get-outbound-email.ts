import { isEnvProd } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

import { allowed_outbound_emails } from '../integrations/constants';

export const getOutboundEmail = (email: string, is_sendgrid = false) => {
  if (
    isEnvProd() ||
    email.toLowerCase().includes('@aglinthq.com') ||
    allowed_outbound_emails.includes(email.toLowerCase())
  ) {
    return email;
  } else {
    if (is_sendgrid) {
      return [
        'chinmail@aglinthq.com',
        'ravi@aglinthq.com',
        'dileep@aglinthq.com',
      ];
    }
    return 'chinmai@aglinthq.com';
  }
};
