import { Database } from "../schema.types";
import { TableType } from "./index.types";

export type CustomPublicJobs = TableType<
  "public_jobs",
  {
    parameter_weights: CustomParameterWeights;
    jd_json: CustomJdJson;
    draft: CustomDraft;
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
  Database["public"]["Functions"]["getjob"]["Returns"][number],
  | "job_title"
  | "description"
  | "department"
  | "company"
  | "workplace_type"
  | "job_type"
  | "location"
> & { jd_json: CustomJdJson };
