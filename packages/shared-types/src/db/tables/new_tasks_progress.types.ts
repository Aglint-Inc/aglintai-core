import type { Enums } from "../schema.types";
import type { TableType } from "./index.types";

export type CustomNewTaskProgress = TableType<
  "new_tasks_progress",
  {
    jsonb_data: CustomJsonbData;
    title_meta: CustomTitleMeta;
    created_by: { id: string; name: string };
  }
>;

type CustomJsonbData = {
  [key: string]: any;
};

type CustomTitleMeta = Partial<{
  "{time_format}": string;
  "{candidate}": string;
  "{date_format}": string;
  "{location}": string;
  "{err_msg}": string;
  "{assigneeName}": string;
  "{currentAssigneeName}": string;
  "{assigneeId}": string;
  "{currentAssigneeId}": string;
  "{prevScheduleDateRange}": { start_date: string; end_date: string };
  "{scheduleDateRange}": { start_date: string; end_date: string };
  "{currentTriggerTime}": string;
  "{previousTriggerTime}": string;
  "{scheduleDateRangeNotFound}": { start_date: string; end_date: string };
  "{status}": Enums<"task_status">;
  "{currentStatus}": Enums<"task_status">;
  "{dueDateRage}": { prev: string; selectedDate: string };
  "{currentPriority}": Enums<"task_priority">;
  "{priority}": Enums<"task_priority">;
  "{selectedSessions}": any[];
  "{addedSessions}": any[];
  "{removedSessions}": any[];
  "{debriefDateRange}": { start_date: string; end_date: string };
}>;
