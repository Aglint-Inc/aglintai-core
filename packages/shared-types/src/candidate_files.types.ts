import { DB } from "..";

export type CandidateFiles = Omit<
  DB["public"]["Tables"]["candidate_files"]["Row"],
  Embedding
>;
export type CandidateFilesInsert = Omit<
  DB["public"]["Tables"]["candidate_files"]["Insert"],
  Embedding
>;
export type CandidateFilesUpdate = Omit<
  DB["public"]["Tables"]["candidate_files"]["Update"],
  Embedding
>;

type Embedding =
  | "skills_embedding"
  | "education_embedding"
  | "experience_embedding"
  | "resume_embedding";
