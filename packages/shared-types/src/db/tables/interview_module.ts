import { PauseJson, PlanCombinationRespType } from "../../scheduleTypes";
import { TableType } from "./index.types";

export type CustomModule = TableType<
  "interview_module",
  {
    settings: {
      require_training: boolean;
      noShadow: number;
      noReverseShadow: number;
      reqruire_approval: boolean;
    };
  }
>;
