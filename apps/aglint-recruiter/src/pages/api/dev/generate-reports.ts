import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { reportGenerate } from '@/utils/report-generation';
export default createPageApiPostRoute(null, reportGenerate);
