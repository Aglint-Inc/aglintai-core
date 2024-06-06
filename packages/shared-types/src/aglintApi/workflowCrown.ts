import { DatabaseEnums, DatabaseTable } from "..";

export type APIWorkFlowCron = {
  request: {
    workflow_id: string;
    workflow_action_id: string;
    meta: {
      start_time: string;
      application_id: string;
      email_type: DatabaseEnums["email_types"];
    };
    payload: DatabaseTable["workflow_action"]["payload"];
    execution_time: string;
  };
  response: {
    success: boolean;
  };
};
