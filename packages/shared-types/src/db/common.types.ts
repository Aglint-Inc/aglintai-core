import { z } from "zod";
import type { Database, Tables } from "./schema.types";
import type { Custom, Type } from "./utils.types";

export type CustomMembersMeta = {
  recruiter: boolean;
  hiring_manager: boolean;
  recruiting_coordinator: boolean;
  sourcer: boolean;
  previous_interviewers: boolean;
};

export type CustomApplicationBadges = {
  skills: number;
  schools: number;
  positions: number;
  leadership: number;
  jobStability: number;
  careerGrowth: number;
  jobHopping: number;
};

export type CustomSchedulingReason = {
  internal: {
    rescheduling: string[];
    cancellation: string[];
    decline: string[];
  };
  candidate: { rescheduling: string[]; cancellation: string[] };
};

export type CustomJobParamters = Custom<
  Pick<
    Database["public"]["Tables"]["public_jobs"]["Row"],
    "parameter_weights" | "jd_json" | "draft" | "posted_by" | "draft_jd_json"
  >,
  {
    parameter_weights: CustomParameterWeights;
    jd_json: CustomJdJson;
    draft: CustomDraft;
    posted_by: ATSIntegrations;
    draft_jd_json: NewJdJson;
  }
>;

export type ATSIntegrations = "Greenhouse" | "Aglint" | "Lever" | "Ashby";

type CustomParameterWeights = {
  skills: number;
  experience: number;
  education: number;
};

type NewJdJson = {
  level:
    | "Fresher-level"
    | "Associate-level"
    | "Mid-level"
    | "Senior-level"
    | "Executive-level";
  experience: NewJdJsonItem[];
  skills: NewJdJsonItem[];
  education: NewJdJsonItem[];
};

type NewJdJsonItem = {
  field: string;
  mustHave: boolean;
};

type CustomJdJson = {
  title: string;
  level:
    | "Fresher-level"
    | "Associate-level"
    | "Mid-level"
    | "Senior-level"
    | "Executive-level";
  rolesResponsibilities: jsonItemType[];
  skills: jsonItemType[];
  educations: jsonItemType[]; // Adjust this line based on the structure of the "education" property
};

type jsonItemType = {
  field: string;
  isMustHave: boolean;
  id: string;
};

type CustomDraft = Pick<
  Database["public"]["Tables"]["public_jobs"]["Row"],
  "job_title" | "description" | "workplace_type" | "job_type"
> & { department_id?: number; jd_json: CustomJdJson; location_id?: number };

export type CustomRequestType = Custom<
  Database["public"]["Tables"]["request"]["Row"],
  {
    type:
      | "schedule_request"
      | "cancel_schedule_request"
      | "reschedule_request"
      | "decline_request";
    status: "to_do" | "in_progress" | "blocked" | "completed";
    priority: "urgent" | "standard";
  }
>;

export type CustomLocation =
  Database["public"]["Tables"]["office_locations"]["Row"];

export type CustomApplicationStatus =
  | "new"
  | "interview"
  | "qualified"
  | "disqualified";

export type CustomInterviewSessionCancelRow = Type<
  Database["public"]["Tables"]["interview_session_cancel"]["Row"],
  {
    other_details: {
      dateRange?: { start: string; end: string };
      note?: string;
    };
  }
>;

export type CustomFeedback = {
  recommendation: number;
  objective: string;
} | null;
