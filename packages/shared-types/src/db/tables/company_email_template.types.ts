import { DatabaseEnums } from '../..';
import { TableType } from './index.types';

export type CustomCompanyEmailTemplate = TableType<
  'company_email_template',
  {
    type: DatabaseEnums['email_slack_types']; // dont change
  }
>;
