import type { DatabaseTable, DatabaseTableUpdate } from '@aglint/shared-types';
import { z, type ZodSchema } from 'zod';

export const jobDescriptionSchema = z.string().min(100);

export const jsonItemSchema = z.array(
  z.object({
    id: z.string(),
    field: z.string(),
    isMustHave: z.boolean(),
  }),
) satisfies ZodSchema<
  DatabaseTable['public_jobs']['draft_jd_json'][keyof Omit<
    DatabaseTable['public_jobs']['draft_jd_json'],
    'level' | 'title'
  >]
>;

export const levelSchema = z.enum([
  'Fresher-level',
  'Associate-level',
  'Mid-level',
  'Senior-level',
  'Executive-level',
]) satisfies ZodSchema<DatabaseTable['public_jobs']['draft_jd_json']['level']>;

export const jdSchema = z.object({
  title: z.string(),
  level: levelSchema,
  rolesResponsibilities: jsonItemSchema,
  skills: jsonItemSchema,
  educations: jsonItemSchema,
}) satisfies ZodSchema<DatabaseTable['public_jobs']['draft_jd_json']>;

export const profileScoreSchema = z.object({
  id: z.string().uuid(),
  draft_jd_json: jdSchema,
}) satisfies ZodSchema<
  Pick<DatabaseTable['public_jobs'], 'draft_jd_json' | 'id'>
>;

export const hiringTeamSchema = z.object({
  id: z.string().uuid(),
  hiring_manager: z.string().uuid().optional(),
  recruiter: z.string().uuid().optional(),
  recruiting_coordinator: z.string().uuid().nullish(),
  sourcer: z.string().uuid().nullish(),
}) satisfies ZodSchema<
  Pick<
    DatabaseTableUpdate['public_jobs'],
    'id' | 'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
  >
>;

export const jobDetailsSchema = z.object({
  id: z.string().uuid(),
  description: jobDescriptionSchema.optional(),
  job_title: z.string().optional(),
  job_type: z
    .enum([
      'contract',
      'full time',
      'part time',
      'temporary',
      'volunteer',
      'internship',
    ])
    .nullish(),
  workplace_type: z.enum(['hybrid', 'on site', 'off site']).nullish(),
  department_id: z.number().nullish(),
  location_id: z.number().nullish(),
}) satisfies ZodSchema<
  Pick<
    DatabaseTableUpdate['public_jobs'],
    | 'id'
    | 'description'
    | 'job_title'
    | 'job_type'
    | 'workplace_type'
    | 'department_id'
    | 'location_id'
  >
>;
