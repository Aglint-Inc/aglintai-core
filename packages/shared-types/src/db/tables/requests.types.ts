import type { TableType } from "./index.types";

export type CustomRequest = TableType<
  "request",
  {
    status: "to_do" | "in_progress" | "blocked" | "completed";
    type: "schedule_request";
  }
>;
