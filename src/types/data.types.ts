import { Database } from './schema';

export type RecruiterType = Database['public']['Tables']['recruiter']['Row'];
export type JobTypeDB = Database['public']['Tables']['public_jobs']['Row'];
export type JobDB = Database['public']['Tables']['job_applications']['Row'];
