import { createCandidateRequestSchema } from '@aglint/shared-utils';
import * as v from 'valibot';

export type APICreateCandidateRequest = v.InferInput<
  typeof createCandidateRequestSchema
>;
