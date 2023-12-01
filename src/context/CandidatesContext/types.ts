/* eslint-disable no-unused-vars */
import { PostgrestError } from '@supabase/supabase-js';

import { Database } from '@/src/types/schema';

export type Candidate = Database['public']['Tables']['candidates']['Row'];
export type CandidateInsert =
  Database['public']['Tables']['candidates']['Insert'];
export type CandidateUpdate =
  Database['public']['Tables']['candidates']['Update'];

export type CandidatesContext = {
  handleCandidateCreate: (
    inputData: CandidateCreateAction['inputData'],
    signal?: CandidateCreateAction['signal'],
  ) => void;
  handleCandidateBulkCreate: (
    inputData: CandidateBulkCreateAction['inputData'],
    signal?: CandidateBulkCreateAction['signal'],
  ) => void;
  handleCandidateRead: (signal?: CandidateReadAction['signal']) => void;
  handleCandidateUpdate: (
    inputData: CandidateUpdateAction['inputData'],
    signal?: CandidateUpdateAction['signal'],
  ) => void;
  handleCandidatesBulkUpdate: (
    inputData: CandidateBulkUpdateAction['inputData'],
    signal?: CandidateBulkUpdateAction['signal'],
  ) => void;
  handleCandidateDelete: (
    inputData: CandidateDeleteAction['inputData'],
    signal?: CandidateDeleteAction['signal'],
  ) => void;
  handleCandidateError: (error: PostgrestError) => void;
  intialLoad: boolean;
};

export type Candidates = {
  [id: Candidate['id']]: Candidate;
};

export type CandidateCreateAction = {
  inputData: CandidateInsert;
  signal: AbortSignal;
};

export type CandidateBulkCreateAction = {
  inputData: CandidateInsert[];
  signal: AbortSignal;
};

export type CandidateReadAction = {
  signal: AbortSignal;
};

export type CandidateUpdateAction = {
  inputData: CandidateUpdate;
  signal: AbortSignal;
};

export type CandidateBulkUpdateAction = {
  inputData: CandidateInsert[];
  signal: AbortSignal;
};

export type CandidateDeleteAction = {
  inputData: Candidate['id'];
  signal: AbortSignal;
};

export type CandidateDuplicationCheckAction = {
  inputData: Candidate['email'];
  signal: AbortSignal;
};

export type CandidateFilteredInsertCheckAction = {
  inputData: CandidateInsert;
  signal: AbortSignal;
};
