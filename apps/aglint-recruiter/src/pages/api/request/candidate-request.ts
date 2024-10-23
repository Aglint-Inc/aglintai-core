import { createCandidateRequestSchema } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { createCandidateRequest } from '@/services/candidate-request';

export default createPageApiPostRoute(
  createCandidateRequestSchema,
  createCandidateRequest,
);
