/* eslint-disable security/detect-object-injection */
import { DB } from '@aglint/shared-types';
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  ResumeReuploadApi,
  Supabase,
} from '@/src/apiUtils/job/candidateUpload/types';
import {
  deleteCandidate,
  deleteFile,
  deleteResume,
  getFiles,
  reCreateFile,
  reProcessApplication,
  uploadResume,
} from '@/src/apiUtils/job/candidateUpload/utils';

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
  const supabase: Supabase = createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );

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
              error: null as string,
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
