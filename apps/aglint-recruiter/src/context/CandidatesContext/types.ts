/* eslint-disable no-unused-vars */
import {
  type Applications,
  type ApplicationsInsert,
} from '@aglint/shared-types';
import {
  type CandidateFiles,
  type CandidateFilesInsert,
} from '@aglint/shared-types';
import {
  type Candidate,
  type CandidateInsert,
  type CandidateUpdate,
} from '@aglint/shared-types';
import { type PostgrestError } from '@supabase/supabase-js';

export type CandidatesContext = {
  handleCandidateCreate: (
    inputData: CandidateCreateAction['request']['inputData'],
    signal?: CandidateCreateAction['request']['signal'],
  ) => void;
  handleCandidateBulkCreate: (
    inputData: CandidateBulkCreateAction['request']['inputData'],
    signal?: CandidateBulkCreateAction['request']['signal'],
  ) => void;
  handleCandidateRead: (
    signal?: CandidateReadAction['request']['signal'],
  ) => void;
  handleCandidateUpdate: (
    inputData: CandidateUpdateAction['request']['inputData'],
    signal?: CandidateUpdateAction['request']['signal'],
  ) => void;
  handleCandidatesBulkUpdate: (
    inputData: CandidateBulkUpdateAction['request']['inputData'],
    signal?: CandidateBulkUpdateAction['request']['signal'],
  ) => void;
  handleCandidateDelete: (
    inputData: CandidateDeleteAction['request']['inputData'],
    signal?: CandidateDeleteAction['request']['signal'],
  ) => void;
  handleCandidateError: (error: PostgrestError) => void;
  intialLoad: boolean;
};

export type CandidateCreateAction = {
  request: {
    inputData: CandidateInsert;
    tries: number;
    signal: AbortSignal;
  };
  response: Candidate;
};

export type CandidateBulkCreateAction = {
  request: {
    inputData: CandidateInsert[];
    tries: number;
    signal: AbortSignal;
  };
  response: Candidate[];
};

export type CandidateReadAction = {
  request: {
    tries: number;
    signal: AbortSignal;
  };
  response: Candidate[];
};

export type CandidateUpdateAction = {
  request: {
    inputData: CandidateUpdate;
    tries: number;
    signal: AbortSignal;
  };
  response: Candidate;
};

export type CandidateBulkUpdateAction = {
  request: {
    inputData: CandidateInsert[];
    tries: number;
    signal: AbortSignal;
  };
  response: Candidate[];
};

export type CandidateDeleteAction = {
  request: {
    inputData: Candidate['id'];
    tries: number;
    signal: AbortSignal;
  };
  response: void;
};

export type CandidateFilesBulkCreateAction = {
  request: {
    inputData: CandidateFilesInsert[];
    tries: number;
    signal: AbortSignal;
  };
  response: CandidateFiles[];
};

export type CandidateDuplicationCheckAction = {
  request: {
    inputData: {
      email: Candidate['email'];
      recruiter_id: Candidate['recruiter_id'];
    };
    tries: number;
    signal: AbortSignal;
  };
  response: boolean;
};

export type ApplicationsBulkCreateAction = {
  request: {
    inputData: ApplicationsInsert[];
    tries: number;
    signal: AbortSignal;
  };
  response: Applications[];
};
