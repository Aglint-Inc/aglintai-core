import { Tables } from "./schema.types";

export type CustomMembersMeta = {
  [id in
    | keyof Pick<
        Tables<"public_jobs">,
        "hiring_manager" | "recruiter" | "recruiting_coordinator" | "sourcer"
      >
    | "previous_interviewers"]: boolean;
};
