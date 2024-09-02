import { type DatabaseTable } from '@aglint/shared-types';

export type GreenHouseFullSyncAPI = {
  request: {
    syncData: DatabaseTable['integrations']['greenhouse_metadata'];
  };
  response: {
    success: boolean;
  };
};
