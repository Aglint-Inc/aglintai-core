import type { DatabaseEnums } from "../index.schema.types";
import type { TableType } from "./index.types";

export type CustomNewTasks = TableType<
  "new_tasks",
  {
    schedule_date_range: CustomNewScheduleDateRange;
    task_action: taskActionType;
  }
>;

export type CustomNewScheduleDateRange = {
  start_date: string;
  end_date: string;
};

export type taskActionType = {
  call_followUp: number;
  email_followUp: number;
  call_followUp_reminder: number;
  email_followUp_reminder: number;
  debrief_schedule_followUp: number;
};

export type meetingCardType = {
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
