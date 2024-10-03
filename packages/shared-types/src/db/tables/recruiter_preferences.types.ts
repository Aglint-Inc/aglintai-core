import { z } from "zod";
import type { ATSIntegrations } from "../common.types";
import { recruiterPreferencesUpdateSchema } from "../zod-schema.types";
import type { TableType } from "./index.types";

export type CustomRecruiterPreferences = TableType<
  "recruiter_preferences",
  {
    ats: ATSIntegrations;
  }
>;

export const CustomRecruiterPreferencesUpdateSchema =
  recruiterPreferencesUpdateSchema.extend({
    ats: z.optional(z.enum(["Greenhouse", "Aglint", "Lever", "Ashby"])),
  });
