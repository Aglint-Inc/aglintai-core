import { Database } from "./schema";

export type Candidate = Database['public']['Tables']['candidates']['Row'];
export type CandidateInsert =
  Database['public']['Tables']['candidates']['Insert'];
export type CandidateUpdate =
  Database['public']['Tables']['candidates']['Update'];