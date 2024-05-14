import { JobTypeDB } from '@aglint/shared-types';

export type JobType = Omit<JobTypeDB, 'active_status'> & {
  status: Status | null;
};

export type Status = {
  sourcing: {
    isActive: boolean;
    timeStamp: Date;
  };
  interviewing: {
    isActive: boolean;
    timeStamp: Date;
  };
  closed: {
    isActive: boolean;
    timeStamp: Date;
  };
};
