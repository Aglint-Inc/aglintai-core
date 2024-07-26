import { SocialsType } from "../../data.types";
import type { CustomSchedulingSettings } from "./common.types";
import type { TableType } from "./index.types";

export type CustomRecruiter = TableType<
  "recruiter",
  {
    scheduling_settings: CustomSchedulingSettings;
    scheduling_reason: CustomSchedulingReason;
    socials: SocialsType;
  }
>;

type CustomSchedulingReason = {
  internal?: {
    rescheduling?: string[];
    cancellation?: string[];
    decline?: string[];
  };
  candidate?: { rescheduling?: string[]; cancellation?: string[] };
} | null;
