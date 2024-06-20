import { templateObj } from '@/src/components/Jobs/Job/Email-Templates/utils';
import { tempObj } from '@/src/components/Scheduling/Settings/SchedulingEmailTemplates';

export const emailTemplates: {
  // eslint-disable-next-line no-unused-vars
  // [id in keyof DatabaseTable['recruiter']['email_template']]: EmailTemplatType;
} = {
  ...tempObj,
  ...templateObj,
};
