import { PostgrestError } from '@supabase/supabase-js';

import { supabase } from '@/src/utils/supabaseClient';

import {
  CandidateBulkCreateAction,
  CandidateBulkUpdateAction,
  CandidateCreateAction,
  CandidateDeleteAction,
  CandidateDuplicationCheckAction,
  CandidateFilteredInsertCheckAction,
  CandidateReadAction,
  CandidatesContext,
  CandidateUpdateAction,
} from './types';

export const initialCandidatesContext: CandidatesContext = {
  handleCandidateCreate: undefined,
  handleCandidateBulkCreate: undefined,
  handleCandidateRead: undefined,
  handleCandidateUpdate: undefined,
  handleCandidatesBulkUpdate: undefined,
  handleCandidateDelete: undefined,
  handleCandidateError: undefined,
  intialLoad: false,
};

export const createCandidateDbAction = async (
  candidate: CandidateCreateAction['inputData'],
  signal?: CandidateCreateAction['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .insert({ ...candidate })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const bulkCreateCandidateDbAction = async (
  candidates: CandidateBulkCreateAction['inputData'],
  signal?: CandidateBulkCreateAction['signal'],
) => {
  if (candidates && candidates.length !== 0) {
    const timerSignal = new AbortController();
    const timeout = setTimeout(() => timerSignal.abort(), 60000);
    const { data, error } = await supabase
      .from('candidates')
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
  signal?: CandidateReadAction['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const updateCandidateDbAction = async (
  candidate: CandidateUpdateAction['inputData'],
  signal?: CandidateUpdateAction['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .update(candidate)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const bulkUpdateCandidateDbAction = async (
  candidates: CandidateBulkUpdateAction['inputData'],
  signal?: CandidateBulkUpdateAction['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .upsert(candidates)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const deleteCandidateDbAction = async (
  candidateId: CandidateDeleteAction['inputData'],
  signal?: CandidateDeleteAction['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .delete()
    .eq('id', candidateId)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error, confirmation: getConfirmation(error) };
};

export const duplicateCheckCandidateDbAction = async (
  email: CandidateDuplicationCheckAction['inputData'],
  signal?: CandidateDuplicationCheckAction['signal'],
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .select()
    .eq('email', email)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error };
};

export const filteredInsertCandidateDbAction = async (
  candidate: CandidateFilteredInsertCheckAction['inputData'],
  signal?: CandidateFilteredInsertCheckAction['signal'],
) => {
  const { data: d1, error: e1 } = await duplicateCheckCandidateDbAction(
    candidate.email,
    signal,
  );
  if (!e1 && d1 && d1.length !== 0)
    return { data: d1, error: null, isNew: false };
  else {
    const { data, error } = await createCandidateDbAction(candidate, signal);
    return { data, error, isNew: true };
  }
};

const getConfirmation = (error: PostgrestError) => {
  return error ? false : true;
};
