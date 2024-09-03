import { type PostgrestError } from '@supabase/supabase-js';

import { supabase } from '@/src/utils/supabase/client';

import {
  type CandidateFilesBulkCreateAction,
  type CandidateFilesBulkUpdateAction,
  type CandidateFilesContext,
  type CandidateFilesCreateAction,
  type CandidateFilesDeleteAction,
  type CandidateFilesReadAction,
  type CandidateFilesUpdateAction,
} from './types';

export const initialCandidatesContext: CandidateFilesContext = {
  handleCandidateFilesCreate: undefined,
  handleCandidateFilesBulkCreate: undefined,
  handleCandidateFilesRead: undefined,
  handleCandidateFilesUpdate: undefined,
  handleCandidateFilesBulkUpdate: undefined,
  handleCandidateFilesDelete: undefined,
  handleCandidateFilesError: undefined,
  intialLoad: false,
};

export const createCandidateDbAction = async (
  candidate: CandidateFilesCreateAction['request']['inputData'],
  signal?: CandidateFilesCreateAction['request']['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidate_files')
    .insert({ ...candidate })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const bulkCreateCandidateDbAction = async (
  candidates: CandidateFilesBulkCreateAction['request']['inputData'],
  signal?: CandidateFilesBulkCreateAction['request']['signal'],
) => {
  if (candidates && candidates.length !== 0) {
    const timerSignal = new AbortController();
    const timeout = setTimeout(() => timerSignal.abort(), 60000);
    const { data, error } = await supabase
      .from('candidate_files')
      .insert(candidates)
      .select()
      .abortSignal(signal)
      .abortSignal(timerSignal.signal);
    clearTimeout(timeout);
    return { data, error, confirmation: getConfirmation(error) };
  }
  return { data: [], error: null, confirmation: true };
};

export const readCandidatesDbAction = async (
  signal?: CandidateFilesReadAction['request']['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidate_files')
    .select('*')
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const updateCandidateDbAction = async (
  candidate: CandidateFilesUpdateAction['request']['inputData'],
  signal?: CandidateFilesUpdateAction['request']['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidate_files')
    .update(candidate)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const bulkUpdateCandidateDbAction = async (
  candidates: CandidateFilesBulkUpdateAction['request']['inputData'],
  signal?: CandidateFilesBulkUpdateAction['request']['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidate_files')
    .upsert(candidates)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const deleteCandidateDbAction = async (
  candidateId: CandidateFilesDeleteAction['request']['inputData'],
  signal?: CandidateFilesDeleteAction['request']['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidate_files')
    .delete()
    .eq('id', candidateId)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

const getConfirmation = (error: PostgrestError) => {
  return error ? false : true;
};
