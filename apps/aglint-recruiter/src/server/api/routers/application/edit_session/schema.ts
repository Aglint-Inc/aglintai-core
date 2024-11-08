import {
  interviewSessionRelationRowSchema,
  interviewSessionRowSchema,
  type ZodTypeToSchema,
} from '@aglint/shared-types';
import { z } from 'zod';

import { type EditInterviewSession } from '@/queries/interview-plans';

export const schemaEditSession = interviewSessionRowSchema
  .pick({
    break_duration: true,
    interviewer_cnt: true,
    name: true,
    schedule_type: true,
    session_duration: true,
    session_type: true,
    session_order: true,
  })
  .extend({
    location: z.string(),
    interview_plan_id: z.string(),
    module_id: z.string(),
    session_id: z.string(),
    interview_module_relation_entries: z.array(
      z.object({
        id: z.string(),
        interviewer_type:
          interviewSessionRelationRowSchema.shape.interviewer_type,
        training_type: interviewSessionRelationRowSchema.shape.training_type,
      }),
    ),
  }) satisfies ZodTypeToSchema<EditInterviewSession>;
