import { DatabaseEnums, DatabaseTable } from '..';

export type APIWorkFlowCron = {
  request: {
    workflow_id: string;
    workflow_action_id: string;
    meta:
      | {
          application_id: string;
          email_type: 'debrief_calendar_invite';
        }
      | {};
    payload: DatabaseTable['workflow_action']['payload'];
    execution_time: string;
  };
  response: {
    success: boolean;
  };
};
