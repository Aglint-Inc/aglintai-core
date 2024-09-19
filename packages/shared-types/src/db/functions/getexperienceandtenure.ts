import type { FunctionType } from "./index.types";

export type CustomGetExperienceAndTenure = FunctionType<
  "getexperienceandtenure",
  {},
  {
    tenure: { [id: number]: number };
    experience: { [id: number]: number };
    average_tenure: number;
    average_experience: number;
  }
>;
