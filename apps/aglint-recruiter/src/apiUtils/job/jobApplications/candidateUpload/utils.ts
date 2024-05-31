/* eslint-disable security/detect-object-injection */
import { Applications, DatabaseEnums, DB } from '@aglint/shared-types';
import { CandidateFiles } from '@aglint/shared-types';
import { Candidate } from '@aglint/shared-types';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import * as fs from 'fs';
import { NextApiRequest } from 'next';
import { v4 as uuidv4 } from 'uuid';

import {
  ApplicationsBulkCreateAction,
  CandidateBulkCreateAction,
  CandidateCreateAction,
  CandidateDeleteAction,
  CandidateDuplicationCheckAction,
  CandidateFilesBulkCreateAction,
} from '@/src/context/CandidatesContext/types';

import { Supabase, UploadApiFormData } from './types';

const MAX_TRIES = 1;

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
  jobId: string,
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateDuplicationCheckAction['request']['signal'],
): Promise<{ duplicate: boolean; candidate: Candidate }> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('candidates')
    .select()
    .eq('recruiter_id', recruiter_id)
    .eq('email', email)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await verifyCandidate(
        supabase,
        email,
        recruiter_id,
        jobId,
        tries,
        error,
        signal,
      );
    throw new Error(`Candidate verification: ${error.message}`);
  }
  if (data.length !== 0) {
    await verifyCandidateInJob(supabase, data[0].id, jobId);
    return { duplicate: true, candidate: data[0] };
  }
  return { duplicate: false, candidate: null };
  // console.log('NEW CANDIDATE VERIFIED');
};

export const createCandidate = async (
  supabase: Supabase,
  candidate: CandidateCreateAction['request']['inputData'],
  tries: CandidateCreateAction['request']['tries'] = 0,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<Candidate> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const avatar = await emailHash(candidate.email);
  if (!candidate?.id) candidate['id'] = uuidv4();
  const { data, error } = await supabase
    .from('candidates')
    .insert({ ...candidate, avatar })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await createCandidate(supabase, candidate, tries, error, signal);
    throw new Error(`Candidate creation: ${error.message}`);
  }
  // console.log('NEW CANDIDATE CREATED');
  return data[0];
};

export const bulkCreateCandidate = async (
  supabase: Supabase,
  candidate: CandidateBulkCreateAction['request']['inputData'],
  tries: CandidateBulkCreateAction['request']['tries'] = 0,
  prev_error?: PostgrestError,
  signal?: CandidateBulkCreateAction['request']['signal'],
): Promise<CandidateBulkCreateAction['response']> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('candidates')
    .insert(candidate)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await bulkCreateCandidate(
        supabase,
        candidate,
        tries,
        error,
        signal,
      );
    throw new Error(`Candidate bulk creation: ${error.message}`);
  }
  // console.log('NEW CANDIDATE CREATED');
  return data;
};

export const bulkCreateFiles = async (
  supabase: Supabase,
  candidateFiles: CandidateFilesBulkCreateAction['request']['inputData'],
  tries: CandidateFilesBulkCreateAction['request']['tries'] = 0,
  prev_error?: PostgrestError,
  signal?: CandidateFilesBulkCreateAction['request']['signal'],
): Promise<CandidateFilesBulkCreateAction['response']> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('candidate_files')
    .insert(candidateFiles)
    .select(
      'id, created_at, candidate_id, file_url, resume_text, resume_json, type',
    )
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await bulkCreateFiles(
        supabase,
        candidateFiles,
        tries,
        error,
        signal,
      );
    throw new Error(`Candidate file bulk creation: ${error.message}`);
  }
  // console.log('NEW CANDIDATE CREATED');
  return data;
};

export const bulkCreateApplications = async (
  supabase: SupabaseClient<DB>,
  applications: ApplicationsBulkCreateAction['request']['inputData'],
  tries: ApplicationsBulkCreateAction['request']['tries'] = 0,
  prev_error?: PostgrestError,
  signal?: ApplicationsBulkCreateAction['request']['signal'],
): Promise<ApplicationsBulkCreateAction['response']> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('applications')
    .insert(applications)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await bulkCreateApplications(
        supabase,
        applications,
        tries,
        error,
        signal,
      );
    throw new Error(`Application bulk creation: ${error.message}`);
  }
  // console.log('NEW CANDIDATE CREATED');
  return data;
};

export const deleteCandidate = async (
  supabase: Supabase,
  id: CandidateDeleteAction['request']['inputData'],
  tries: CandidateDeleteAction['request']['tries'] = 0,
  prev_error?: PostgrestError,
  signal?: CandidateDeleteAction['request']['signal'],
): Promise<void> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
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
    if (tries < MAX_TRIES)
      return await deleteCandidate(supabase, id, tries, error, signal);
    throw new Error(`$Candidate deletion: ${error.message}`);
  }
  // console.log('NEW CANDIDATE DELETED');
};

export const createFile = async (
  supabase: Supabase,
  candidate_id: string,
  file_url: string,
  candidate_file_id: string,
  contentType: keyof typeof supportedTypes,
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<CandidateFiles> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
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
    if (tries < MAX_TRIES)
      return await createFile(
        supabase,
        candidate_id,
        file_url,
        candidate_file_id,
        contentType,
        tries,
        error,
        signal,
      );
    throw new Error(`Candidate file creation: ${error.message}`);
  }
  // console.log('NEW CANDIDATE FILE CREATED');
  return data[0];
};

export const reCreateFile = async (
  supabase: Supabase,
  candidate_id: string,
  file_url: string,
  candidate_file_id: string,
  contentType: keyof typeof supportedTypes,
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<CandidateFiles> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 25000);
  await supabase
    .from('candidate_files')
    .delete()
    .eq('candidate_id', candidate_id)
    .eq('type', 'resume');
  const { data, error } = await supabase
    .from('candidate_files')
    .insert({ candidate_id, type: 'resume', file_url, id: candidate_file_id })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await reCreateFile(
        supabase,
        candidate_id,
        file_url,
        candidate_file_id,
        contentType,
        tries,
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
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateDeleteAction['request']['signal'],
): Promise<void> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
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
    if (tries < MAX_TRIES)
      return await deleteFile(
        supabase,
        candidate_file_id,
        tries,
        error,
        signal,
      );
    throw new Error(`Candidate file deletion: ${error.message}`);
  }
  // console.log('NEW CANDIDATE FILE DELETED');
};

export const createApplication = async (
  supabase: SupabaseClient<DB>,
  job_id: string,
  candidate_id: string,
  candidate_file_id: string,
  source: DatabaseEnums['application_source'],
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<Applications> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('applications')
    .insert({ candidate_id, job_id, candidate_file_id, source })
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await createApplication(
        supabase,
        job_id,
        candidate_id,
        candidate_file_id,
        source,
        tries,
        error,
        signal,
      );
    throw new Error(`Application creation: ${error.message}`);
  }
  // console.log('NEW CANDIDATE APPLICATION CREATED');
  return data[0];
};

export const reProcessApplication = async (
  supabase: SupabaseClient<DB>,
  application_id: string,
  candidate_file_id: string,
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<Applications> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 15000);
  const { data, error } = await supabase
    .from('applications')
    .update({ candidate_file_id, processing_status: 'not started' })
    .eq('id', application_id)
    .select()
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  if (error) {
    if (tries < MAX_TRIES)
      return await reProcessApplication(
        supabase,
        application_id,
        candidate_file_id,
        tries,
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
  tries: number = 0,
  prev_error?: PostgrestError,
  signal?: CandidateCreateAction['request']['signal'],
): Promise<void> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error.message);
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
    if (tries < MAX_TRIES)
      return await deleteApplication(
        supabase,
        application_id,
        tries,
        error,
        signal,
      );
    throw new Error(`Application deletion: ${error.message}`);
  }
  // console.log('NEW CANDIDATE APPLICATION DELETED');
};

export const uploadResume = async (
  supabase: Supabase,
  file: fs.ReadStream,
  contentType: keyof typeof supportedTypes,
  tries: number = 0,
  prev_error?: string,
): Promise<{
  file_url: string;
  candidate_file_id: string;
}> => {
  if (!Object.keys(supportedTypes).includes(contentType)) {
    throw new Error('Unsupported file');
  }
  if (tries++ === MAX_TRIES) throw new Error(prev_error);
  const candidate_file_id = uuidv4();
  const ext = supportedTypes[contentType];
  const { data, error } = await supabase.storage
    .from('candidate-files')
    .upload(`resumes/${candidate_file_id}${ext}`, file, {
      cacheControl: '3600',
      duplex: 'half',
      contentType,
    });
  if (error) {
    if (tries < MAX_TRIES)
      return await uploadResume(
        supabase,
        file,
        contentType,
        tries,
        error.message,
      );
    else throw new Error(`Resume upload: ${error.message}`);
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
  tries: number = 0,
  prev_error?: string,
): Promise<void> => {
  if (tries++ === MAX_TRIES) throw new Error(prev_error);
  const ext = supportedTypes[contentType];
  const { error } = await supabase.storage
    .from('candidate-files')
    .remove([`resumes/${candidate_file_id}${ext}`]);
  if (error) {
    if (tries < MAX_TRIES)
      return await deleteResume(
        supabase,
        candidate_file_id,
        contentType,
        tries,
        error.message,
      );
    throw new Error(`Resume deletion: ${error.message}`);
  }
  // console.log('NEW CANDIDATE RESUME DELETED');
};

export const verifyAndCreateCandidate = async (
  supabase: Supabase,
  candidate: CandidateCreateAction['request']['inputData'],
  jobId: string,
) => {
  const { duplicate, candidate: candidate_data } = await verifyCandidate(
    supabase,
    candidate.email,
    candidate.recruiter_id,
    jobId,
  );
  if (duplicate) return { duplicate: true, candidate: candidate_data };
  const new_candidate_data = await createCandidate(supabase, candidate);
  return { duplicate: false, candidate: new_candidate_data };
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

export const verifyCandidateInJob = async (
  supabase: Supabase,
  candidateId: CandidateCreateAction['request']['inputData']['id'],
  jobId: string,
) => {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('candidate_id', candidateId)
    .eq('job_id', jobId);
  if (error) throw new Error(error.message);
  if (data.length !== 0) throw new Error('Candidate already exists');
};

const emailHash = async (email) => {
  return `https://gravatar.com/avatar/${await sha256(email)}`;
};

const readFile = (
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export const getFiles = async (req: NextApiRequest) => {
  const { files } = await readFile(req);
  return files[UploadApiFormData.FILES].map(
    (f) =>
      ({
        contentType: f.mimetype,
        fileName: f.originalFilename,
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        readStream: fs.createReadStream(f.filepath),
      }) as unknown as File,
  ) as {
    contentType: keyof typeof supportedTypes;
    fileName: string;
    readStream: fs.ReadStream;
  }[];
};

export const createAndUploadCandidate = async (
  supabase: Supabase,
  candidate: CandidateCreateAction['request']['inputData'],
  file: fs.ReadStream,
  contentType: keyof typeof supportedTypes,
) => {
  if (!Object.keys(supportedTypes).includes(contentType)) {
    throw new Error('Unsupported file');
  }
  const candidate_file_id = uuidv4();
  const responses = await Promise.allSettled([
    createCandidate(supabase, candidate),
    uploadResume(supabase, file, contentType),
  ]);
  if (responses[0].status === 'rejected') {
    if (responses[1].status === 'fulfilled')
      await deleteResume(supabase, candidate_file_id, contentType);
    throw new Error(responses[0].reason);
  } else if (responses[1].status === 'rejected') {
    if (responses[0].status === 'fulfilled')
      await deleteCandidate(supabase, responses[0].value.id);
    throw new Error(responses[1].reason);
  } else {
    return {
      candidate_id: responses[0].value.id,
      file_url: responses[1].value.file_url,
      candidate_file_id,
    };
  }
};
