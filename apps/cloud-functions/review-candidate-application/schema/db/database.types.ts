import { Database } from './schema';

export type PublicJobType = Database['public']['Tables']['public_jobs']['Row'];
export type JobApplicationType =
  Database['public']['Tables']['applications']['Row'];
export type CandFilesType =
  Database['public']['Tables']['candidate_files']['Row'];
export type CandidatesType = Database['public']['Tables']['candidates']['Row'];
