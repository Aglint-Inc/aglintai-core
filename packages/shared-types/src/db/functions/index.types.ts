import type { Database } from "../schema.types";
import type { CustomizableTypes, Custom } from "../utils.types";
import type { CustomCreateSessionRequest } from "./create_session_request.types";
import type { CustomGetAllInterviewers } from "./get_all_interviewers";
import type { CustomGetApplicantBadges } from "./get_applicant_badges.types";
import type { CustomGetApplicantLocations } from "./get_applicant_locations.types";
import type { CustomGetInterviewScheduleByJobId } from "./get_interview_schedule_by_job_id";
import type { CustomGetRequestCountStats } from "./get_request_count_stats.types";
import type { CustomGetRequestCountStatsNew } from "./get_request_count_stats_new.types";
import type { CustomGetExperienceAndTenure } from "./getexperienceandtenure";
import type { CustomGetLocationsPool } from "./getlocationspool";
import type { CustomGetSkillPools } from "./getskillpools";
import type { CustomInsertDebriefSession } from "./insert_debrief_session.types";
import type { CustomMoveToInterview } from "./move_to_interview.types";
import type { CustomSchedulingAnalyticsCompletedInterviews } from "./scheduling_analytics_completed_interviews.types";
import type { CustomSchedulingAnalyticsFilters } from "./scheduling_analytics_filters.types";
import type { CustomSchedulingAnalyticsInterviewers } from "./scheduling_analytics_interviewers.types";
import type { CustomSchedulingAnalyticsLeaderboard } from "./scheduling_analytics_leaderboard.types";
import type { CustomSchedulingAnalyticsReasons } from "./scheduling_analytics_reasons.types";
import type { CustomUpdateDebriefSession } from "./update_debrief_session.types";

type DatabaseFunctions = Database["public"]["Functions"];
type DatabaseFunctionArgs<T extends keyof DatabaseFunctions> =
  DatabaseFunctions[T]["Args"];
type DatabaseFunctionReturns<T extends keyof DatabaseFunctions> =
  DatabaseFunctions[T]["Returns"];

export type FunctionType<
  T extends keyof DatabaseFunctions,
  U extends DatabaseFunctionArgs<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseFunctionArgs<T>[number]>]: any }
    : DatabaseFunctionArgs<T> extends CustomizableTypes<"Object">
      ? { [id in keyof Partial<DatabaseFunctionArgs<T>>]: any }
      : never,
  V extends DatabaseFunctionReturns<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseFunctionReturns<T>[number]>]: any }
    : DatabaseFunctionReturns<T> extends CustomizableTypes<"Object">
      ? { [id in keyof Partial<DatabaseFunctionReturns<T>>]: any }
      : any = never,
> = Custom<
  DatabaseFunctions[T],
  //@ts-expect-error
  {
    Args: Custom<DatabaseFunctionArgs<T>, U>;
    Returns: V extends never
      ? DatabaseFunctionReturns<T>
      : DatabaseFunctionReturns<T> extends CustomizableTypes<"Array">
        ? V[]
        : V;
  }
>;

export type Functions = Custom<
  DatabaseFunctions,
  {
    insert_debrief_session: CustomInsertDebriefSession;
    update_debrief_session: CustomUpdateDebriefSession;
    get_applicant_locations: CustomGetApplicantLocations;
    get_applicant_badges: CustomGetApplicantBadges;
    create_session_request: CustomCreateSessionRequest;
    move_to_interview: CustomMoveToInterview;
    get_request_count_stats: CustomGetRequestCountStats;
    get_request_count_stats_new: CustomGetRequestCountStatsNew;
    scheduling_analytics_completed_interviews: CustomSchedulingAnalyticsCompletedInterviews;
    scheduling_analytics_filters: CustomSchedulingAnalyticsFilters;
    scheduling_analytics_interviewers: CustomSchedulingAnalyticsInterviewers;
    scheduling_analytics_leaderboard: CustomSchedulingAnalyticsLeaderboard;
    // scheduling_analytics_reasons: CustomSchedulingAnalyticsReasons;
    get_all_interviewers: CustomGetAllInterviewers;
    get_interview_schedule_by_job_id: CustomGetInterviewScheduleByJobId;
    getexperienceandtenure: CustomGetExperienceAndTenure;
    getlocationspool: CustomGetLocationsPool;
    getskillpools: CustomGetSkillPools;
  }
>;
