import { TableType } from "./index.types";

export type CustomApplications = TableType<
  "applications",
  {
    feedback: CustomFeedback;
  }
>;

type CustomFeedback = {
  schedule: { feedback: string; rating: number };
  sessions?: { [key: string]: { rating: number; feedback: string } };
};
