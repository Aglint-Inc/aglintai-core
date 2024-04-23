/* eslint-disable no-unused-vars */
import { supportedTypes } from '@/src/pages/api/job/jobApplications/candidateUpload/utils';

import {
  createCandidateResumeDbAction,
  deleteCandidateResumeDbAction
} from './utils';

export type CandidateResumesContext = {
  handleCandidateResumesCreate: (
    inputData: CandidateResumesCreateAction['request']['inputData'],
    signal?: CandidateResumesCreateAction['request']['signal']
  ) => void;
  // handleCandidateResumesBulkCreate: (
  //   inputData: CandidateResumesBulkCreateAction['request']['inputData'],
  //   signal?: CandidateResumesBulkCreateAction['request']['signal'],
  // ) => void;
  // handleCandidateResumesRead: (
  //   signal?: CandidateResumesReadAction['request']['signal'],
  // ) => void;
  // handleCandidateResumesUpdate: (
  //   inputData: CandidateResumesUpdateAction['request']['inputData'],
  //   signal?: CandidateResumesUpdateAction['request']['signal'],
  // ) => void;
  // handleCandidateResumesBulkUpdate: (
  //   inputData: CandidateResumesBulkUpdateAction['request']['inputData'],
  //   signal?: CandidateResumesBulkUpdateAction['request']['signal'],
  // ) => void;
  handleCandidateResumesDelete: (
    inputData: CandidateResumesDeleteAction['request']['inputData'],
    signal?: CandidateResumesDeleteAction['request']['signal']
  ) => void;
  // handleCandidateResumesError: (error: PostgrestError) => void;
  // intialLoad: boolean;
};

export type CandidateResumesCreateAction = {
  request: {
    inputData: {
      file: File;
      candidate_file_id: string;
      contentType: keyof typeof supportedTypes;
    };
    retry: number;
    signal: AbortSignal;
  };
  response: ReturnType<typeof createCandidateResumeDbAction>;
};

export type CandidateResumesDeleteAction = {
  request: {
    inputData: {
      candidate_file_id: string;
      contentType: keyof typeof supportedTypes;
    };
    retry: number;
    signal: AbortSignal;
  };
  response: ReturnType<typeof deleteCandidateResumeDbAction>;
};
