import { type DatabaseTable } from '@aglint/shared-types';

import type { getGreenhouseMeta } from './process';

export type GreenhouseAPI = {
  GET: {
    request: {};
    response: Awaited<ReturnType<typeof getGreenhouseMeta>>;
  };
  POST: {
    request: DatabaseTable['integrations']['greenhouse_metadata'];
    
    response: DatabaseTable['integrations']['greenhouse_metadata'];
  };
};
