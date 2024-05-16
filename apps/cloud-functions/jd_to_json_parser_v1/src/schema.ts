import { z } from 'zod';

export const schema = z.object({
  // role: z.string(),
  level: z.enum([
    'Fresher-level',
    'Associate-level',
    'Mid-level',
    'Senior-level',
    'Executive-level',
  ]),
  specialty: z.string(),
  industry: z.string(),
  // requirement: z.array(z.string()),
  description: z
    .string()
    .describe(
      'requirement and responsibilities described in the job description in brief.'
    ),
  qualificationRequired: z.object({
    education: z.array(
      z.string().describe('Name of the degree/course required.')
    ),
    certifications: z.array(
      z.string().describe('Name of the certification required.')
    ),
    experience: z.object({
      isRequired: z
        .boolean()
        .describe('is total experience required in job description'),
      // isRelevantExperienceRequired: z.boolean(),
      totalExperience: z.number().describe('experience required in months.'),
      // relevantExperience: z.object({
      //   years: z.number(),
      //   months: z.number(),
      // }),
    }),
    fresher: z.boolean().describe('is job for fresher.'),
  }),
  skills: z
    .array(z.string())
    .describe(
      'extract core skills (only specific skills, not generalized skill like programming or developer) required for job extracted from the Job Description.'
    ),
  // skills: z.object({
  //   coreSkills: z
  //     .array(z.string())
  //     .describe(
  //       'List of core skills (only specific skills, not generalized skill like programming or developer) required job extracted from the JD.'
  //     ),
  //   allSkills: z.array(z.string()),
  //   // .describe('analyze and all skills mentioned in the job description.'),
  // }),
  // responsibilities: z
  //   .array(z.string())
  //   .describe('List of responsibilities described in the job description.'),
  // suggestedRelatedJobTitles: z
  //   .array(z.string())
  //   .describe('suggested Relevant Job Titles.'),
});
