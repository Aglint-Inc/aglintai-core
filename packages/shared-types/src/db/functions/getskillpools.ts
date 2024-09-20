import type { FunctionType } from "./index.types";

export type CustomGetSkillPools = FunctionType<
  "getskillpools",
  {},
  {
    top_skills: {
      [id: string]: number;
    };
    required_skills: {
      [id: string]: number;
    };
  }
>;
