import { schema_update_meeting_ints } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { updateMeetingInterviewers } from '@/services/request-workflows/interviewer-decline/updateMeetingInterviewers';

export default createPageApiPostRoute(
  schema_update_meeting_ints,
  updateMeetingInterviewers,
);
