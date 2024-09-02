import { supportedTypes } from '@/src/apiUtils/job/candidateUpload/utils';
import { supabase } from '@/src/utils/supabase/client';

import { type CandidateResumesContext, type CandidateResumesCreateAction } from './types';

export const initialCandidateResumesContext: CandidateResumesContext = {
  handleCandidateResumesCreate: undefined,
  handleCandidateResumesDelete: undefined,
};

export const createCandidateResumeDbAction = async (
  inputData: CandidateResumesCreateAction['request']['inputData'],
) => {
  const { data, error } = await supabase.storage
    .from('candidates-files')
    .upload(
      `resumes/${inputData.candidate_file_id}${inputData.file.type}`,
      inputData.file,
      {
        cacheControl: '3600',
        contentType: inputData.contentType,
      },
    );
  return { data, error };
};

export const deleteCandidateResumeDbAction = async (
  inputData: CandidateResumesCreateAction['request']['inputData'],
) => {
  const { error } = await supabase.storage
    .from('candidate-files')
    .remove([
      `resumes/${inputData.candidate_file_id}.${
        supportedTypes[inputData.contentType]
      }`,
    ]);
  return { error };
};
