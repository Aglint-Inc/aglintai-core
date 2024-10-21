import { type DatabaseTable } from '@aglint/shared-types';

import {
  type getRequestProgress,
  type getRequestWorkflow,
} from '@/queries/requests';

export type RequestFormattedDetailsParams = {
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>;
  request_workflow: Awaited<ReturnType<typeof getRequestWorkflow>>;
  requestDetails: DatabaseTable['request'];
};

export type RequestDeclineFormattedDetailsParams = {
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>;
  request_workflow: Awaited<ReturnType<typeof getRequestWorkflow>>;
  requestDetails: DatabaseTable['request'];
};
