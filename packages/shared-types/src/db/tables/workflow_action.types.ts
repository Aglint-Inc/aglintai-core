import { Database } from '../schema.types';
import { TableType } from './index.types';

export type CustomWorkflowAction = TableType<
  'workflow_action',
  {
    payload: CustomPayload;
    action_type: 'slack' | 'email' | 'end_point';
  }
>;

type CustomPayload = Pick<
  Database['public']['Tables']['company_email_template']['Row'],
  'subject' | 'body'
>;
