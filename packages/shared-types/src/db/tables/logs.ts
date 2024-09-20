import type { TableType } from "./index.types";

export type CustomLogs = TableType<
  "logs",
  {
    meta?: Record<string, any>;
    status: "process" | "start" | "success" | "error";
  }
>;
