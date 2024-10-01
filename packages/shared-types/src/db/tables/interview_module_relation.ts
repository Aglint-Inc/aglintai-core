import type { PauseJson, PlanCombinationRespType } from "../../scheduleTypes";
import type { TableType } from "./index.types";

export type CustomModuleRelation = TableType<
  "interview_module_relation",
  { pause_json: PauseJson | null }
>;
