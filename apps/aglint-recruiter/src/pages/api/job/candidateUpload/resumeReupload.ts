/* eslint-disable security/detect-object-injection */

import { type PostgrestError } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type ResumeReuploadApi } from '@/apiUtils/job/candidateUpload/types';
import {
  deleteCandidate,
  deleteFile,
  deleteResume,
  getFiles,
  reCreateFile,
  reProcessApplication,
  uploadResume,
} from '@/apiUtils/job/candidateUpload/utils';
import { createClient } from '@/utils/supabase/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResumeReuploadApi['response']>,
) => {
  const files = await getFiles(req);
  const { contentType, readStream } = files[0];
  const { application_id, candidate_id } = Object.assign(
    {},
    ...Object.entries(req.query).map(([key, value]) => ({
      [key]: decodeURIComponent(value as string),
    })),
  ) as ResumeReuploadApi['request']['params'];
  const supabase = await createClient();

  const result = await uploadResume(supabase, readStream, contentType)
    .then(({ file_url, candidate_file_id }) =>
      reCreateFile(
        supabase,
        candidate_id,
        file_url,
        candidate_file_id,
        contentType,
      )
        .then(() =>
          reProcessApplication(supabase, application_id, candidate_file_id)
            .then((): ResumeReuploadApi['response'] => ({
              confirmation: true,
              error: null!,
            }))
            .catch((e: PostgrestError): ResumeReuploadApi['response'] => {
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
        .catch((e: PostgrestError): ResumeReuploadApi['response'] => {
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
    .catch((e: PostgrestError): ResumeReuploadApi['response'] => ({
      confirmation: false,
      error: e.message,
    }));

  res.status(200).json(result);
  return;
};

export default handler;
