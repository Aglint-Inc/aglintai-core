import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { reportDeclines } from '@/utils/report-generation/reportDeclines';
export default createPageApiPostRoute(null, reportDeclines);
