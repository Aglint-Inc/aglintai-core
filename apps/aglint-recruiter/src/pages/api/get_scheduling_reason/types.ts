import { DatabaseTable } from '@aglint/shared-types';

export type API_get_scheduling_reason = {
  request: {
    id: string;
  };
  response:
    | {
        data: DatabaseTable['recruiter']['scheduling_reason'];
        error: null;
      }
    | {
        data: null;
        error: string;
      };
};
