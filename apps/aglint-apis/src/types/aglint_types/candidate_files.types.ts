import { Database } from "./schema";

export type CandidateFiles =
  Omit<Database['public']['Tables']['candidate_files']['Row'], Embedding>;
export type CandidateFilesInsert =
  Omit<Database['public']['Tables']['candidate_files']['Insert'], Embedding>;
export type CandidateFilesUpdate =
  Omit<Database['public']['Tables']['candidate_files']['Update'], Embedding>;

type Embedding = 'skills_embedding' | 'education_embedding' | 'experience_embedding'| 'resume_embedding'