import { PauseJson, PlanCombinationRespType } from "../../scheduleTypes";
import { TableType } from "./index.types";

export type CustomModuleRelation = TableType<
  "interview_module_relation",
  { pause_json: PauseJson }
>;
