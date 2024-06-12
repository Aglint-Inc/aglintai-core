import type { Database } from "../schema.types";
import type { Type } from "../utils.types";
import type { CustomApplicationLogs } from "./application_logs.types";
import type { CustomApplications } from "./applications.types";
import { CustomCandidateFiles } from "./candidate_files";
import type { CandidateRequestAvailability } from "./candidate_request_availability.type";
import { CustomInterviewFilterJson } from "./interview_filter_json";
import { CustomCompanyEmailTemplate } from "./company_email_template.types";
import type { CustomInterviewSessionCancel } from "./interview_session_cancel.types";
import type { CustomInterviewSessionRelation } from "./interview_session_relation.types";
import type { CustomInterviewSession } from "./interview_sessions.types";
import type { CustomNewTasks } from "./new_tasks.types";
import type { CustomNewTaskProgress } from "./new_tasks_progress.types";
import { CustomPublicJobs } from "./public_jobs.types";
import type { CustomRecruiter } from "./recruiter.types";
import type { CustomRecruiterUser } from "./recruiter_user.types";
import type { CustomWorkflowAction } from "./workflow_action.types";

type DatabaseTables = Database["public"]["Tables"];

export type TableType<
  T extends keyof DatabaseTables,
  U extends { [id in keyof Partial<DatabaseTables[T]["Row"]>]: any },
> = Type<
  DatabaseTables[T],
  //@ts-ignore
  {
    Insert: Type<DatabaseTables[T]["Insert"], Partial<U>>;
    Row: Type<DatabaseTables[T]["Row"], U>;
    Update: Type<DatabaseTables[T]["Update"], Partial<U>>;
  }
>;

export type Tables = Type<
  DatabaseTables,
  {
    new_tasks: CustomNewTasks;
    interview_session_relation: CustomInterviewSessionRelation;
    new_tasks_progress: CustomNewTaskProgress;
    recruiter: CustomRecruiter;
    recruiter_user: CustomRecruiterUser;
    interview_session_cancel: CustomInterviewSessionCancel;
    applications: CustomApplications;
    candidate_request_availability: CandidateRequestAvailability;
    interview_session: CustomInterviewSession;
    workflow_action: CustomWorkflowAction;
    application_logs: CustomApplicationLogs;
    candidate_files: CustomCandidateFiles;
    public_jobs: CustomPublicJobs;
    interview_filter_json: CustomInterviewFilterJson;
    company_email_template: CustomCompanyEmailTemplate;
  }
>;
