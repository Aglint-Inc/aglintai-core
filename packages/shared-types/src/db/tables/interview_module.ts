import { z } from 'zod';
import { interviewModuleUpdateSchema } from '../zod-schema.types';
import type { TableType } from './index.types';

export type CustomModule = TableType<
  'interview_module',
  {
    settings: {
      require_training: boolean;
      noShadow: number;
      noReverseShadow: number;
      reqruire_approval: boolean;
    } | null;
  }
>;

export const customInterviewModuleUpdateSchema =
  interviewModuleUpdateSchema.extend({
    settings: z
      .object({
        require_training: z.boolean(),
        noShadow: z.number(),
        noReverseShadow: z.number(),
        reqruire_approval: z.boolean(),
      })
      .optional(),
  });
