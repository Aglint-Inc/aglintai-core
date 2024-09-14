import type { Database } from "../schema.types";
import type { Custom, CustomizableTypes } from "../utils.types";
import { CustomAllInterviewers } from "./all_interviewer";
import { CustomApplicationStatusView } from "./application_status_view";
import { CustomApplicationView } from "./application_view.types";
import { CustomCandidateApplicationView } from "./candidate_applications_view";
import { CustomInterviewTypesView } from "./interview_types_view";
import { CustomJobView } from "./job_view.types";
import { CustomMeetingDetails } from "./meeting_details";
import { CustomMeetingInterviewersView } from "./meeting_interviewers.types";
import { CustomModuleRelationView } from "./module_relation_view";
import { CustomTasksView } from "./tasks_view";
import type { CustomWorkflowView } from "./workflow_view.types";

type DatabaseViews = Database["public"]["Views"];
type DatabaseViewRow<T extends keyof DatabaseViews> = DatabaseViews[T]["Row"];

export type ViewType<
  T extends keyof DatabaseViews,
  U extends DatabaseViewRow<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseViewRow<T>[number]>]: any }
    : { [id in keyof Partial<DatabaseViewRow<T>>]: any },
> = Custom<
  DatabaseViews[T],
  //@ts-expect-error
  {
    //@ts-expect-error
    Row: Custom<DatabaseViewRow<T>, U>;
  }
>;

export type Views = Custom<
  DatabaseViews,
  {
    candidate_applications_view: CustomCandidateApplicationView;
    workflow_view: CustomWorkflowView;
    application_status_view: CustomApplicationStatusView;
    application_view: CustomApplicationView;
    tasks_view: CustomTasksView;
    job_view: CustomJobView;
    meeting_interviewers: CustomMeetingInterviewersView;
    all_interviewers: CustomAllInterviewers;
    interview_types_view: CustomInterviewTypesView;
    module_relations_view: CustomModuleRelationView;
    meeting_details: CustomMeetingDetails;
  }
>;
