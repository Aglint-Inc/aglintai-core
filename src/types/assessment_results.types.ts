import { Database } from "./schema";

export type AssessmentResults = Database['public']['Tables']['assessment_results']['Row'];
export type AssessmentResultsInsert =
  Database['public']['Tables']['assessment_results']['Insert'];
export type AssessmentResultsUpdate =
  Database['public']['Tables']['assessment_results']['Update'];