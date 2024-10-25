import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { reportSchedules } from '@/utils/report-generation/reportSchedules';
export default createPageApiPostRoute(null, reportSchedules);
