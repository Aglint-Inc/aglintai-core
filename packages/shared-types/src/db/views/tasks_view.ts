import { Database } from "../schema.types";
import {
  CustomNewScheduleDateRange,
  meetingCardType,
  taskActionType,
} from "../tables/new_tasks.types";
import type { ViewType } from "./index.types";

export type CustomTasksView = ViewType<
  "tasks_view",
  {
    last_progress: LastProgressType;
    session_ids: meetingCardType[];
    schedule_date_range: CustomNewScheduleDateRange;
    task_action: taskActionType;
  }
>;

type LastProgressType = Pick<
  Database["public"]["Tables"]["new_tasks_progress"]["Row"],
  | "id"
  | "created_by"
  | "created_at"
  | "jsonb_data"
  | "progress_type"
  | "title_meta"
> & { created_by: { id: string; name: string } };
