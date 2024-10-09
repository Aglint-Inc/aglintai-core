import { schemaExecuteRequestWorkflow } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { executeRequestWorkflow } from '@/services/requests/executeRequestWorkflow';

export default createPageApiPostRoute(
  schemaExecuteRequestWorkflow,
  executeRequestWorkflow,
);
