/* eslint-disable no-unused-vars */
import {
  type CandidateFiles,
  type CandidateFilesInsert,
  type CandidateFilesUpdate,
} from '@aglint/shared-types';
import { type PostgrestError } from '@supabase/supabase-js';

export type CandidateFilesContext = {
  handleCandidateFilesCreate: (
    inputData: CandidateFilesCreateAction['request']['inputData'],
    signal?: CandidateFilesCreateAction['request']['signal'],
  ) => void;
  handleCandidateFilesBulkCreate: (
    inputData: CandidateFilesBulkCreateAction['request']['inputData'],
    signal?: CandidateFilesBulkCreateAction['request']['signal'],
  ) => void;
  handleCandidateFilesRead: (
    signal?: CandidateFilesReadAction['request']['signal'],
  ) => void;
  handleCandidateFilesUpdate: (
    inputData: CandidateFilesUpdateAction['request']['inputData'],
    signal?: CandidateFilesUpdateAction['request']['signal'],
  ) => void;
  handleCandidateFilesBulkUpdate: (
    inputData: CandidateFilesBulkUpdateAction['request']['inputData'],
    signal?: CandidateFilesBulkUpdateAction['request']['signal'],
  ) => void;
  handleCandidateFilesDelete: (
    inputData: CandidateFilesDeleteAction['request']['inputData'],
    signal?: CandidateFilesDeleteAction['request']['signal'],
  ) => void;
  handleCandidateFilesError: (error: PostgrestError) => void;
  intialLoad: boolean;
};

export type CandidateFilesCreateAction = {
  request: {
    inputData: CandidateFilesInsert;
    retry: number;
    signal: AbortSignal;
  };
  response: CandidateFiles;
};

export type CandidateFilesBulkCreateAction = {
  request: {
    inputData: CandidateFilesInsert[];
    retry: number;
    signal: AbortSignal;
  };
  response: CandidateFiles[];
};

export type CandidateFilesReadAction = {
  request: {
    retry: number;
    signal: AbortSignal;
  };
  response: CandidateFiles[];
};

export type CandidateFilesUpdateAction = {
  request: {
    inputData: CandidateFilesUpdate;
    retry: number;
    signal: AbortSignal;
  };
  response: CandidateFiles;
};

export type CandidateFilesBulkUpdateAction = {
  request: {
    inputData: CandidateFilesInsert[];
    retry: number;
    signal: AbortSignal;
  };
  response: CandidateFiles[];
};

export type CandidateFilesDeleteAction = {
  request: {
    inputData: CandidateFiles['id'];
    retry: number;
    signal: AbortSignal;
  };
  response: void;
};
