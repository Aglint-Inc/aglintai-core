import { Database } from './db.types';

export type PublicJobDbType =
  Database['public']['Tables']['public_jobs']['Row'];
export type JobApplicationDbtype =
  Database['public']['Tables']['job_applications']['Row'];
