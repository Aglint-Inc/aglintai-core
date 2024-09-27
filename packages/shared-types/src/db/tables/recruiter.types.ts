import { z } from "zod";
import type { SocialsType } from "../../data.types";
import {
  customSchedulingReasonSchema,
  customSchedulingSettingsSchema,
  socialsTypeSchema,
} from "../common.zod";
import { recruiterUpdateSchema } from "../zod-schema.types";
import type { CustomSchedulingSettings } from "./common.types";
import type { TableType } from "./index.types";
import { CustomSchedulingReason } from "../common.types";

export type CustomRecruiter = TableType<
  "recruiter",
  {
    scheduling_settings: CustomSchedulingSettings;
    scheduling_reason: CustomSchedulingReason;
    socials: SocialsType;
  }
>;

export const CustomRecruiterUpdateSchema = recruiterUpdateSchema.extend({
  scheduling_settings: customSchedulingSettingsSchema.optional(),
  scheduling_reason: customSchedulingReasonSchema.optional(),
  socials: socialsTypeSchema.optional(),
});
