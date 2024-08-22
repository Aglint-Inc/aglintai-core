import { Database, Tables } from "./schema.types";
import { Custom } from "./utils.types";

export type CustomMembersMeta = {
  [id in
    | keyof Pick<
        Tables<"public_jobs">,
        "hiring_manager" | "recruiter" | "recruiting_coordinator" | "sourcer"
      >
    | "previous_interviewers"]: boolean;
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

export type CustomJobParamters = Custom<
  Pick<
    Database["public"]["Tables"]["public_jobs"]["Row"],
    "parameter_weights" | "jd_json" | "draft" | "posted_by"
  >,
  {
    parameter_weights: CustomParameterWeights;
    jd_json: CustomJdJson;
    draft: CustomDraft;
    posted_by: "Greenhouse" | "Aglint" | "Lever" | "Ashby";
  }
>;

type CustomParameterWeights = {
  skills: number;
  experience: number;
  education: number;
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
