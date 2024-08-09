import { JobGreenhouse } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/types';

export type GreenhouseJobSyncAPI = {
  request: {
    ats_job: JobGreenhouse;
  };
  response: string;
};
