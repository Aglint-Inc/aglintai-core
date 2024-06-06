import { DatabaseEnums, DatabaseTable } from "..";

export type APIWorkFlowCron = {
  request: {
    workflow_id: string;
    workflow_action_id: string;
    meta: {
      start_time: string;
      application_id: string;
    };
    payload: DatabaseTable["workflow_action"]["payload"];
    // trigger: DatabaseTable["workflow"]["trigger"];
    trigger: DatabaseEnums["email_types"];
    execution_time: string;
  };
  response: {
    success: boolean;
  };
};
