import { Database } from "../..";
import { Type } from "../utils.types";
import { CustomApplications } from "./applications.types";
import { CustomInterviewSessionCancel } from "./interview_session_cancel.types";
import { CustomInterviewSessionRelation } from "./interview_session_relation.types";
import { CustomInterviewSession } from "./interview_sessions.types";
import { CustomNewTaskProgress } from "./new_tasks_progress.types";
import { CustomRecruiter } from "./recruiter.types";

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
    interview_session: CustomInterviewSession;
    interview_session_relation: CustomInterviewSessionRelation;
    new_tasks_progress: CustomNewTaskProgress;
    recruiter: CustomRecruiter;
    interview_session_cancel: CustomInterviewSessionCancel;
    applications: CustomApplications;
  }
>;
