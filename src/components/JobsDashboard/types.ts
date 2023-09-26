import { JobTypeDB } from '@/src/types/data.types';

export type JobType = Omit<JobTypeDB, 'status'> & { status: Status | null };
export type Status = 'draft' | 'sourcing' | 'interviewing' | 'closed';
