import { createRequestSchema } from '@aglint/shared-utils';
import * as v from 'valibot';

export type APICreateRequest = v.InferInput<typeof createRequestSchema>;
