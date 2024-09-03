import { type PostgrestError } from '@supabase/supabase-js';

import { supabase } from '@/src/utils/supabase/client';

import {
  type CandidateBulkCreateAction,
  type CandidateBulkUpdateAction,
  type CandidateCreateAction,
  type CandidateDeleteAction,
  type CandidateReadAction,
  type CandidatesContext,
  type CandidateUpdateAction,
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
  candidate: CandidateCreateAction['request']['inputData'],
  signal?: CandidateCreateAction['request']['signal'],
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
  candidates: CandidateBulkCreateAction['request']['inputData'],
  signal?: CandidateBulkCreateAction['request']['signal'],
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
  signal?: CandidateReadAction['request']['signal'],
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
  candidate: CandidateUpdateAction['request']['inputData'],
  signal?: CandidateUpdateAction['request']['signal'],
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
  candidates: CandidateBulkUpdateAction['request']['inputData'],
  signal?: CandidateBulkUpdateAction['request']['signal'],
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
  candidateId: CandidateDeleteAction['request']['inputData'],
  signal?: CandidateDeleteAction['request']['signal'],
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

const getConfirmation = (error: PostgrestError) => {
  return error ? false : true;
};
