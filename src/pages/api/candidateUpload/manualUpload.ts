/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import * as fs from 'fs';
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

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  // saveLocally?: boolean,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  // if (saveLocally) {
  //   options.uploadDir = path.join(process.cwd(), '/public/pdf');
  //   options.filename = (name, ext, path) => {
  //     return Date.now().toString() + '_' + path.originalFilename;
  //   };
  // }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ManualUploadApi['response']>,
) => {
  const { files } = await readFile(req);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const file = fs.createReadStream(
    files.resume[0].filepath,
  ) as unknown as ManualUploadApi['request']['file'];
  const {
    email,
    first_name,
    job_id,
    last_name,
    linkedin,
    phone,
    recruiter_id,
    contentType,
  } = Object.assign(
    {},
    ...Object.entries(req.query).map(([key, value]) => ({
      [key]: decodeURIComponent(value as string),
    })),
  ) as ManualUploadApi['request']['params'];
  if (!Object.keys(supportedTypes).includes(contentType)) {
    res.status(200).json({ confirmation: false, error: 'Unsupported type' });
    return;
  }
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
              async (
                e: PostgrestError,
              ): Promise<ManualUploadApi['response']> => {
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
      contentType: keyof typeof supportedTypes;
    };
    file: File;
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  };
};

export default handler;

export type Supabase = SupabaseClient<Database>;
