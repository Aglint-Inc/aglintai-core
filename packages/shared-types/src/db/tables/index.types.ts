import type { Database } from "../schema.types";
import type { Custom, CustomizableTypes, Type } from "../utils.types";
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
import { CustomPermissions } from "./permissions";
import { CustomModuleRelation } from "./interview_module_relation";
import { CustomLogs } from "./logs";
import { CustomTour } from "./tour.types";
import { CustomModule } from "./interview_module";
import { CustomRequest } from "./requests.types";
import { CustomRequestProgress } from "./request_progress";

type DatabaseTables = Database["public"]["Tables"];
type DatabaseTableInsert<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Insert"];
type DatabaseTableRow<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Row"];
type DatabaseTableUpdate<T extends keyof DatabaseTables> =
  DatabaseTables[T]["Update"];

export type TableType<
  T extends keyof DatabaseTables,
  U extends DatabaseTableRow<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseTableRow<T>[number]>]: any }
    : { [id in keyof Partial<DatabaseTableRow<T>>]: any },
> = Required<
  Custom<
    DatabaseTables[T],
    //@ts-expect-error
    {
      //@ts-expect-error
      Row: Custom<DatabaseTableRow<T>, U>;
      //@ts-expect-error
      Insert: Custom<DatabaseTableInsert<T>, Partial<U>>;
      //@ts-expect-error
      Update: Custom<DatabaseTableUpdate<T>, Partial<U>>;
    }
  >
>;

// TODO: REMOVE PARTIALS AND TS_EXPECT_ERROR AFTER STRICT NULL CHECK IS TURNED ON

export type Tables = Custom<
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
    permissions: CustomPermissions;
    interview_module_relation: CustomModuleRelation;
    logs: CustomLogs;
    tour: CustomTour;
    interview_module: CustomModule;
    request: CustomRequest;
    request_progress: CustomRequestProgress;
  }
>;
