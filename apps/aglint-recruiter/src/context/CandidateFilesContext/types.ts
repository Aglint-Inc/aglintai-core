/* eslint-disable no-unused-vars */
import { supportedTypes } from '@/src/apiUtils/job/candidateUpload/utils';

import {
  createCandidateResumeDbAction,
  deleteCandidateResumeDbAction,
} from './utils';

export type CandidateResumesContext = {
  handleCandidateResumesCreate: (
    inputData: CandidateResumesCreateAction['request']['inputData'],
    signal?: CandidateResumesCreateAction['request']['signal'],
  ) => void;
  handleCandidateResumesDelete: (
    inputData: CandidateResumesDeleteAction['request']['inputData'],
    signal?: CandidateResumesDeleteAction['request']['signal'],
  ) => void;
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
