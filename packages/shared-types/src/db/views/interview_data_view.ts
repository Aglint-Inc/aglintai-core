import { DatabaseTable, DatabaseView, schedulingSettingType } from "../..";
import type { ViewType } from "./index.types";

export type CustomInterviewDataView = ViewType<
  "interview_data_view",
  {
    applications: DatabaseTable["applications"];
    candidates: {
      id: string;
      first_name: string;
      last_name: string;
      current_job_title: string;
      email: string;
      phone: string;
      timezone: string;
    };
    schedule: DatabaseTable["interview_schedule"];
    public_jobs: {
      id: string;
      job_title: string;
      recruiting_coordinator: string;
      department_id: number;
    };
    interview_session_meetings: {
      interview_meeting: null | DatabaseTable["interview_meeting"];
      interview_session: DatabaseTable["interview_session"];
    }[];
  }
>;
