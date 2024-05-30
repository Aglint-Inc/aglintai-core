import { DatabaseTable } from '@aglint/shared-types';

import { templateObj } from '@/src/components/JobEmailTemplates/utils';
import { tempObj } from '@/src/components/Scheduling/Settings/SchedulingEmailTemplates';
import { EmailTemplatType } from '@/src/types/companyEmailTypes';

export const emailTemplates: {
  // eslint-disable-next-line no-unused-vars
  [id in keyof DatabaseTable['recruiter']['email_template']]: EmailTemplatType;
} = {
  ...tempObj,
  ...templateObj,
};
