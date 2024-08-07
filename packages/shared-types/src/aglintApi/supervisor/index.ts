import {
  fetchInterviewTypes,
  fetchInterviewTypeUsers,
  fetchJobHiringTeam,
  fetchJobsUser,
  fetchRequestsUser,
  fetchScheduledInterviews,
} from "@aglint/shared-utils";

export type FunctionNames =
  | "fetch_interview_types"
  | "fetch_interview_types_users"
  | "fetch_scheduled_interviews"
  | "fetch_user_requests"
  | "fetch_jobs_user"
  | "fetch_hiring_team"
  | null;

type FunctionReturnType = {
  fetch_scheduled_interviews: Awaited<
    ReturnType<typeof fetchScheduledInterviews>
  >;
  fetch_user_requests: Awaited<ReturnType<typeof fetchRequestsUser>>;
  fetch_jobs_user: Awaited<ReturnType<typeof fetchJobsUser>>;
  fetch_hiring_team: Awaited<ReturnType<typeof fetchJobHiringTeam>>;
  fetch_interview_types: Awaited<ReturnType<typeof fetchInterviewTypes>>;
  fetch_interview_types_users: Awaited<
    ReturnType<typeof fetchInterviewTypeUsers>
  >;
};

export type MetadataForFunction<F extends FunctionNames> =
  F extends keyof FunctionReturnType ? FunctionReturnType[F] : never;
