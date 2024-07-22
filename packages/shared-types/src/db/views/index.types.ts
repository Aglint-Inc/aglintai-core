import type { Database } from "../schema.types";
import type { CustomizableTypes, Type } from "../utils.types";
import { CustomAllInterviewers } from "./all_interviewer";
import { CustomApplicationView } from "./application_view.types";
import { CustomJobView } from "./job_view.types";
import { CustomMeetingInterviewersView } from "./meeting_interviewers.types";
import { CustomTasksView } from "./tasks_view";
import type { CustomWorkflowView } from "./workflow_view.types";

type DatabaseViews = Database["public"]["Views"];
type DatabaseViewRow<T extends keyof DatabaseViews> = DatabaseViews[T]["Row"];

export type ViewType<
  T extends keyof DatabaseViews,
  U extends DatabaseViewRow<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseViewRow<T>[number]>]: any }
    : DatabaseViewRow<T> extends CustomizableTypes<"Object">
      ? { [id in keyof Partial<DatabaseViewRow<T>>]: any }
      : never,
> = Type<
  DatabaseViews[T],
  //@ts-ignore
  {
    Row: Type<
      DatabaseViewRow<T>,
      //@ts-ignore
      Partial<U>
    >;
  }
>;

export type Views = Type<
  DatabaseViews,
  {
    workflow_view: CustomWorkflowView;
    application_view: CustomApplicationView;
    tasks_view: CustomTasksView;
    job_view: CustomJobView;
    meeting_interviewers: CustomMeetingInterviewersView;
    all_interviewers: CustomAllInterviewers;
  }
>;
