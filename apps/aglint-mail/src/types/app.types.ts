import { DatabaseTable } from '@aglint/shared-types';

export type MailPayloadType = Pick<
  DatabaseTable['company_email_template'],
  'from_name' | 'body' | 'subject'
>;
