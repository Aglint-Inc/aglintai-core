/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

import {
  createAndUploadCandidate,
  createApplication,
  createFile,
  deleteCandidate,
  deleteFile,
  deleteResume,
  supportedTypes,
  verifyCandidate,
} from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ManualUploadApi['response']>,
) => {
  const file = req.body as ManualUploadApi['request']['file'];
  const contentType = req.headers[
    'content-type'
  ] as keyof typeof supportedTypes;
  if (!Object.keys(supportedTypes).includes(contentType)) {
    res.status(200).json({ confirmation: false, error: 'Unsupported type' });
    return;
  }
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
        file,
        contentType,
      ),
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
          createApplication(supabase, job_id, candidate_id, candidate_file_id)
            .then(
              async (): Promise<ManualUploadApi['response']> => ({
                confirmation: true,
                error: null as string,
              }),
            )
            .catch(
              async (
                e: PostgrestError,
              ): Promise<ManualUploadApi['response']> => {
                await Promise.allSettled([
                  deleteFile(supabase, candidate_file_id),
                  deleteResume(supabase, candidate_file_id, contentType),
                  deleteCandidate(supabase, candidate_id),
                ]);
                return {
                  confirmation: false,
                  error: e.message,
                };
              },
            ),
        )
        .catch(
          async (e: PostgrestError): Promise<ManualUploadApi['response']> => {
            await Promise.allSettled([
              deleteResume(supabase, candidate_file_id, contentType),
              deleteCandidate(supabase, candidate_id),
            ]);
            return {
              confirmation: false,
              error: e.message,
            };
          },
        ),
    )
    .catch(
      async (e: PostgrestError): Promise<ManualUploadApi['response']> => ({
        confirmation: false,
        error: e.message,
      }),
    );
  res.status(200).json({ confirmation, error });
  return;
};

export default handler;

export type ManualUploadApi = {
  request: {
    params: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      linkedin: string;
      recruiter_id: string;
      job_id: string;
    };
    file: File;
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  };
};

export type Supabase = SupabaseClient<Database>;
