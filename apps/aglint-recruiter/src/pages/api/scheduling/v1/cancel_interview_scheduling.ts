import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { cancelInterviewScheduling } from '@/services/CandidateSchedule/utils/candidateCancel';

export default createPageApiPostRoute(null, cancelInterviewScheduling);
