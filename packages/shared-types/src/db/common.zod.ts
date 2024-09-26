import { z } from "zod";

export const customMembersMetaSchema = z.object({
  recruiter: z.boolean(),
  hiring_manager: z.boolean(),
  recruiting_coordinator: z.boolean(),
  sourcer: z.boolean(),
  previous_interviewers: z.boolean(),
});

export const customSchedulingSettingsSchema = z.object({
  isAutomaticTimeZone: z.boolean(),
  timeZone: z.object({
    label: z.string(),
    name: z.string(),
    tzCode: z.string(),
    utc: z.string(),
  }),
  interviewLoad: z.object({
    dailyLimit: z.object({
      value: z.number(),
      type: z.enum(["Hours", "Interviews"]),
    }),
    weeklyLimit: z.object({
      value: z.number(),
      type: z.enum(["Hours", "Interviews"]),
    }),
  }),
  workingHours: z.array(
    z.object({
      day: z.string(),
      isWorkDay: z.boolean(),
      timeRange: z.object({
        startTime: z.string(),
        endTime: z.string(),
      }),
    })
  ),
  totalDaysOff: z.array(
    z.object({
      date: z.string(),
      event_name: z.string(),
      locations: z.array(z.string()).optional(),
    })
  ),
  schedulingKeyWords: z.object({
    free: z.array(z.string()),
    SoftConflicts: z.array(z.string()),
    outOfOffice: z.array(z.string()),
    recruitingBlocks: z.array(z.string()),
  }),
  break_hour: z.object({
    start_time: z.string(),
    end_time: z.string(),
  }),
  debrief_defaults: customMembersMetaSchema,
});

export const customSchedulingReasonSchema = z.object({
  internal: z.object({
    rescheduling: z.array(z.string()),
    cancellation: z.array(z.string()),
    decline: z.array(z.string()),
  }),
  candidate: z.object({
    rescheduling: z.array(z.string()),
    cancellation: z.array(z.string()),
  }),
});

export const socialsTypeSchema = z.object({
  custom: z.record(z.string()),
  twitter: z.string(),
  youtube: z.string(),
  facebook: z.string(),
  linkedin: z.string(),
  instagram: z.string(),
});
