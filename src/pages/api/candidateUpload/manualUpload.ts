/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

import { ManualUploadApi, Supabase } from './types';
import {
  createAndUploadCandidate,
  createApplication,
  createFile,
  deleteCandidate,
  deleteFile,
  deleteResume,
  getFiles,
  verifyCandidate,
} from './utils';

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
  const supabase: Supabase = createServerClient<Database>(
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
  const { confirmation, error } = await verifyCandidate(
    supabase,
    email,
    recruiter_id,
  )
    .then(() =>
      createAndUploadCandidate(
        supabase,
        {
          email,
          recruiter_id,
          first_name,
          last_name,
          linkedin,
          phone,
        },
        readStream,
        contentType,
      )
        .then(({ candidate_id, file_url, candidate_file_id }) =>
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
                candidate_id,
                candidate_file_id,
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
        .catch((e: PostgrestError): ManualUploadApi['response'] => ({
          confirmation: false,
          error: e.message,
        })),
    )
    .catch((e: PostgrestError): ManualUploadApi['response'] => ({
      confirmation: false,
      error: e.message,
    }));
  res.status(200).json({ confirmation, error });
  return;
};

export default handler;
