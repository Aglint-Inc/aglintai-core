import { DatabaseTable } from '@aglint/shared-types';

export type GreenhouseAPI = {
  GET: {
    request: {};
    response: DatabaseTable['integrations']['greenhouse_metadata'];
  };
  POST: {
    request: DatabaseTable['integrations']['greenhouse_metadata'];
    response: DatabaseTable['integrations']['greenhouse_metadata'];
  };
};
