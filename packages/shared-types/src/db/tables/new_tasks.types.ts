import { DatabaseEnums } from "../index.schema.types";
import { TableType } from "./index.types";

export type CustomNewTasks = TableType<
  "new_tasks",
  {
    session_ids: meetingCardType[];
    schedule_date_range: CustomNewScheduleDateRange;
    task_action: taskActionType;
  }
>;

type CustomNewScheduleDateRange = {
  start_date: string;
  end_date: string;
};

export type TaskActionKey =
  | "call_followUp"
  | "email_followUp"
  | "call_followUp_reminder"
  | "email_followUp_reminder"
  | "debrief_schedule_followUp";
export type taskActionType = {
  call_followUp: number;
  email_followUp: number;
  call_followUp_reminder: number;
  email_followUp_reminder: number;
  debrief_schedule_followUp: number;
};

type meetingCardType = {
  id: string;
  name: string;
  interview_meeting: {
    id: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
  };
  session_order: number;
  users: {
    email: string;
    user_id: string;
    last_name: string;
    first_name: string;
    meeting_id: string;
    session_id: string;
    profile_image: string | null;
    training_type: DatabaseEnums["interviewer_type"];
    interviewer_type: DatabaseEnums["status_training"];
  }[];
};
