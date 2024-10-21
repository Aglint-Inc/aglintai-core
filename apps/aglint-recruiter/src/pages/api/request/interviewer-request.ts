import { createInterviewerRequestSchema } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { interviewerDeclineRequest } from '@/services/requests/interviewerDeclineRequest';

export default createPageApiPostRoute(
  createInterviewerRequestSchema,
  interviewerDeclineRequest,
);
