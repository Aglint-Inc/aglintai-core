/* eslint-disable security/detect-object-injection */

import { type PostgrestError } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type ManualUploadApi } from '@/apiUtils/job/candidateUpload/types';
import {
  createApplication,
  createFile,
  deleteCandidate,
  deleteFile,
  deleteResume,
  getFiles,
  uploadResume,
  verifyAndCreateCandidate,
} from '@/apiUtils/job/candidateUpload/utils';
import { createClient } from '@/utils/supabase/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ManualUploadApi['response']>,
) => {
  const files = await getFiles(req);
  const { readStream, contentType } = files[0];
  const {
    email,
    first_name,
    job_id,
    last_name,
    linkedin,
    phone,
    recruiter_id,
  } = Object.assign(
    {},
    ...Object.entries(req.query).map(([key, value]) => ({
      [key]: decodeURIComponent(value as string),
    })),
  ) as ManualUploadApi['request']['params'];
  const supabase = createClient();
  const { confirmation, error } = await verifyAndCreateCandidate(
    supabase,
    {
      email,
      recruiter_id,
      first_name,
      last_name,
      linkedin,
      phone,
    },
    job_id,
  )
    .then(({ candidate: { id: candidate_id }, duplicate }) =>
      uploadResume(supabase, readStream, contentType)
        .then(({ file_url, candidate_file_id }) =>
          createFile(
            supabase,
            candidate_id,
            file_url,
            candidate_file_id,
            contentType,
          )
            .then(() =>
              createApplication(
                supabase,
                job_id,
                recruiter_id,
                candidate_id,
                candidate_file_id,
                'manual_upload',
              )
                .then((): ManualUploadApi['response'] => ({
                  confirmation: true,
                  error: null as string,
                }))
                .catch((e: PostgrestError): ManualUploadApi['response'] => {
                  Promise.allSettled([
                    deleteFile(supabase, candidate_file_id),
                    deleteResume(supabase, candidate_file_id, contentType),
                    deleteCandidate(supabase, candidate_id),
                  ]);
                  return {
                    confirmation: false,
                    error: e.message,
                  };
                }),
            )
            .catch((e: PostgrestError): ManualUploadApi['response'] => {
              Promise.allSettled([
                deleteResume(supabase, candidate_file_id, contentType),
                deleteCandidate(supabase, candidate_id),
              ]);
              return {
                confirmation: false,
                error: e.message,
              };
            }),
        )
        .catch((e: PostgrestError): ManualUploadApi['response'] => {
          if (duplicate) deleteCandidate(supabase, candidate_id);
          return {
            confirmation: false,
            error: e.message,
          };
        }),
    )
    .catch((e: PostgrestError): ManualUploadApi['response'] => ({
      confirmation: false,
      error: e.message,
    }));
  res.status(200).json({ confirmation, error });
  return;
};

export default handler;
