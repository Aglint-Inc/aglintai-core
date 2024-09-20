import { DatabaseEnums, DatabaseTable } from '..';

export type APIWorkFlowCron = {
  request: {
    id: string;
    workflow_id: string;
    workflow_action_id: string;
    meta: {
      session_id: string;
      meeting_ids: string[];
      recruiter_user_id: string;
      filter_id: string;
      schedule_id: string;
      start_time: string;
      application_id: string;
      target_api: DatabaseEnums['email_slack_types'];
    };
    payload: DatabaseTable['workflow_action']['payload'];
    execution_time: string;
  };
  response: {
    success: boolean;
  };
};

type recipients = {
  type: string;
  value: string;
};
