/* eslint-disable security/detect-object-injection */

import { type PostgrestError } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { type ResumeUploadApi } from '@/apiUtils/job/candidateUpload/types';
import {
  createAndUploadCandidate,
  createApplication,
  createFile,
  deleteCandidate,
  deleteFile,
  deleteResume,
  getFiles,
} from '@/apiUtils/job/candidateUpload/utils';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResumeUploadApi['response']>,
) => {
  const files = await getFiles(req);
  const { job_id, recruiter_id } = Object.assign(
    {},
    ...Object.entries(req.query).map(([key, value]) => ({
      [key]: decodeURIComponent(value as string),
    })),
  ) as ResumeUploadApi['request']['params'];

  const promises = files.map((file) => {
    const candidate_id = uuidv4();
    const contentType = file.contentType;
    return createAndUploadCandidate(
      supabaseAdmin,
      {
        id: candidate_id,
        email: candidate_id,
        recruiter_id,
        first_name: file.fileName,
      },
      file.readStream,
      contentType,
    )
      .then(({ file_url, candidate_file_id }) =>
        createFile(
          supabaseAdmin,
          candidate_id,
          file_url,
          candidate_file_id,
          file.contentType,
        )
          .then(() =>
            createApplication(
              supabaseAdmin,
              job_id,
              recruiter_id,
              candidate_id,
              candidate_file_id,
              'resume_upload',
            )
              .then((): ResumeUploadApi['response'][number] => ({
                confirmation: true,
                error: null as string,
              }))
              .catch(
                (e: PostgrestError): ResumeUploadApi['response'][number] => {
                  Promise.allSettled([
                    deleteFile(supabaseAdmin, candidate_file_id),
                    deleteResume(supabaseAdmin, candidate_file_id, contentType),
                    deleteCandidate(supabaseAdmin, candidate_id),
                  ]);
                  return {
                    confirmation: false,
                    error: e.message,
                  };
                },
              ),
          )
          .catch((e: PostgrestError): ResumeUploadApi['response'][number] => {
            Promise.allSettled([
              deleteResume(supabaseAdmin, candidate_file_id, contentType),
              deleteCandidate(supabaseAdmin, candidate_id),
            ]);
            return {
              confirmation: false,
              error: e.message,
            };
          }),
      )
      .catch((e: PostgrestError): ResumeUploadApi['response'][number] => ({
        confirmation: false,
        error: e.message,
      }));
  });

  const responses = await Promise.allSettled(promises);

  const results = responses.reduce(
    (acc, curr) => {
      switch (curr.status) {
        case 'rejected':
          acc.push({ confirmation: false, error: curr.reason });
          break;
        case 'fulfilled':
          acc.push(curr.value);
      }
      return acc;
    },
    [] as ResumeUploadApi['response'],
  );

  res.status(200).json(results);
  return;
};

export default handler;
