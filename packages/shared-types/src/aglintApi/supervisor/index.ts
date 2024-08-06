import { fetchScheduledInterviews } from "@aglint/shared-utils";

export type FunctionNames =
  | "fetch_interview_types"
  | "fetch_interview_types_users"
  | "fetch_scheduled_interviews"
  | null;

type FunctionReturnType = {
  fetch_scheduled_interviews: Awaited<
    ReturnType<typeof fetchScheduledInterviews>
  >;
  fetch_interview_types: string[];
  fetch_interview_types_users: string[];
};

export type MetadataForFunction<F extends FunctionNames> =
  F extends keyof FunctionReturnType ? FunctionReturnType[F] : never;
