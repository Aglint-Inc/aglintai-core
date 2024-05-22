import { DB } from "..";

export type Candidate = DB["public"]["Tables"]["candidates"]["Row"];
export type CandidateInsert = DB["public"]["Tables"]["candidates"]["Insert"];
export type CandidateUpdate = DB["public"]["Tables"]["candidates"]["Update"];
