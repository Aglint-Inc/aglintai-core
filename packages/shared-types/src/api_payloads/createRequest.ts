import { createCandidateRequestSchema } from '@aglint/shared-utils';
import { z } from 'zod';

export type APICreateCandidateRequest = z.infer<
  typeof createCandidateRequestSchema
>;
