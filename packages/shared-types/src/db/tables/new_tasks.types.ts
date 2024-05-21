import { TableType } from "./index.types";

export type CustomNewTasks = TableType<
  "new_tasks",
  { schedule_date_range: CustomNewScheduleDateRange }
>;

type CustomNewScheduleDateRange = {
  start_date: string;
  end_date: string;
};
