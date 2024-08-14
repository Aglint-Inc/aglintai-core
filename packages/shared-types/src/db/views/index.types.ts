import type { Database } from "../schema.types";
import type { CustomizableTypes, Custom } from "../utils.types";
import { CustomAllInterviewers } from "./all_interviewer";
import { CustomApplicationView } from "./application_view.types";
import { CustomInterviewDataView } from "./interview_data_view";
import { CustomInterviewTypesView } from "./interview_types_view";
import { CustomJobView } from "./job_view.types";
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
    workflow_view: CustomWorkflowView;
    application_view: CustomApplicationView;
    tasks_view: CustomTasksView;
    job_view: CustomJobView;
    meeting_interviewers: CustomMeetingInterviewersView;
    all_interviewers: CustomAllInterviewers;
    interview_types_view: CustomInterviewTypesView;
    module_relations_view: CustomModuleRelationView;
    interview_data_view: CustomInterviewDataView;
  }
>;
