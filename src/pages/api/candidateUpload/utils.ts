/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';

import {
  CandidateCreateAction,
  CandidateDeleteAction,
  CandidateDuplicationCheckAction,
} from '@/src/context/CandidatesContext/types';
import { Applications } from '@/src/types/applications.types';
import { CandidateFiles } from '@/src/types/candidate_files.types';
import { Candidate } from '@/src/types/candidates.types';

import { Supabase } from './manualUpload';

const RETRY = 2;

export const supportedTypes = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    '.docx',
  'text/plain': '.txt',
};

export const verifyCandidate = async (
  supabase: Supabase,
  email: CandidateDuplicationCheckAction['request']['inputData']['email'],
  recruiter_id: CandidateDuplicationCheckAction['request']['inputData']['recruiter_id'],
  retry: number = 1,
  prev_error?: PostgrestError,
  signal?: CandidateDuplicationCheckAction['request']['signal'],
): Promise<void> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('applications')
    .select('*,candidates!inner(*)')
    .eq('candidates.recruiter_id', recruiter_id)
    .eq('candidates.email', email)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await verifyCandidate(
        supabase,
        email,
        recruiter_id,
        retry + 1,
        error,
        signal,
      );
    throw new Error(error.message);
  }
  if (data.length !== 0) throw new Error('Candidate already exits');
  // console.log('NEW CANDIDATE VERIFIED');
};

export const createCandidate = async (
  supabase: Supabase,
  candidate: CandidateCreateAction['request']['inputData'],
  retry: CandidateCreateAction['request']['retry'] = 1,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<Candidate> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const avatar = await emailHash(candidate.email);
  const { data, error } = await supabase
    .from('candidates')
    .insert({ ...candidate, avatar })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await createCandidate(
        supabase,
        candidate,
        retry + 1,
        error,
        signal,
      );
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE CREATED');
  return data[0];
};

export const deleteCandidate = async (
  supabase: Supabase,
  id: CandidateDeleteAction['request']['inputData'],
  retry: CandidateDeleteAction['request']['retry'] = 1,
  prev_error?: PostgrestError,
  signal?: CandidateDeleteAction['request']['signal'],
): Promise<void> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { error } = await supabase
    .from('candidates')
    .delete()
    .eq('id', id)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await deleteCandidate(supabase, id, retry + 1, error, signal);
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE DELETED');
};

export const createFile = async (
  supabase: Supabase,
  candidate_id: string,
  file_url: string,
  candidate_file_id: string,
  contentType: keyof typeof supportedTypes,
  retry: number = 1,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<CandidateFiles> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('candidate_files')
    .insert({ candidate_id, type: 'resume', file_url, id: candidate_file_id })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await createFile(
        supabase,
        candidate_id,
        file_url,
        candidate_file_id,
        contentType,
        retry + 1,
        error,
        signal,
      );
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE FILE CREATED');
  return data[0];
};

export const deleteFile = async (
  supabase: Supabase,
  candidate_file_id: CandidateDeleteAction['request']['inputData'],
  retry: number = 1,
  prev_error?: PostgrestError,
  signal?: CandidateDeleteAction['request']['signal'],
): Promise<void> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { error } = await supabase
    .from('candidate_files')
    .delete()
    .eq('id', candidate_file_id)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await deleteFile(
        supabase,
        candidate_file_id,
        retry + 1,
        error,
        signal,
      );
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE FILE DELETED');
};

export const createApplication = async (
  supabase: Supabase,
  job_id: string,
  candidate_id: string,
  candidate_file_id: string,
  retry: number = 1,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<Applications> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('applications')
    .insert({ candidate_id, job_id, candidate_file_id })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await createApplication(
        supabase,
        job_id,
        candidate_id,
        candidate_file_id,
        retry + 1,
        error,
        signal,
      );
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE APPLICATION CREATED');
  return data[0];
};

export const deleteApplication = async (
  supabase: Supabase,
  application_id: string,
  retry: number = 1,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<void> => {
  if (retry === RETRY) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', application_id)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (retry < RETRY)
      return await deleteApplication(
        supabase,
        application_id,
        retry + 1,
        error,
        signal,
      );
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE APPLICATION DELETED');
};

export const uploadResume = async (
  supabase: Supabase,
  candidateId: string,
  jobId: string,
  file: any,
  contentType: keyof typeof supportedTypes,
  candidate_file_id: string,
  retry: number = 1,
  prev_error?: string,
): Promise<{
  file_url: string;
  candidate_file_id: string;
}> => {
  if (retry === RETRY) throw new Error(prev_error);

  const ext = supportedTypes[contentType];
  const { data, error } = await supabase.storage
    .from('candidate-files')
    .upload(`resumes/${candidate_file_id}${ext}`, file, {
      cacheControl: '3600',
      contentType,
    });
  if (error) {
    if (retry < RETRY)
      return await uploadResume(
        supabase,
        candidateId,
        jobId,
        file,
        contentType,
        candidate_file_id,
        retry + 1,
        error.message,
      );
    else throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE RESUME UPLOADED');
  return {
    file_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/candidate-files/${data?.path}`,
    candidate_file_id,
  };
};

export const deleteResume = async (
  supabase: Supabase,
  candidate_file_id: string,
  contentType: keyof typeof supportedTypes,
  retry: number = 1,
  prev_error?: string,
): Promise<void> => {
  if (retry === RETRY) throw new Error(prev_error);
  const ext = supportedTypes[contentType];
  const { error } = await supabase.storage
    .from('candidate-files')
    .remove([`resumes/${candidate_file_id}.${ext}`]);
  if (error) {
    if (retry < RETRY)
      return await deleteResume(
        supabase,
        candidate_file_id,
        contentType,
        retry + 1,
        error.message,
      );
    throw new Error(error.message);
  }
  // console.log('NEW CANDIDATE RESUME DELETED');
};

const sha256 = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

const emailHash = async (email) => {
  return `https://gravatar.com/avatar/${await sha256(email)}`;
};
