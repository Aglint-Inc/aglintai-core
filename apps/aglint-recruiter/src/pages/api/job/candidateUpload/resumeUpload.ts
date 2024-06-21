/* eslint-disable security/detect-object-injection */
import { DB } from '@aglint/shared-types';
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import {
  ResumeUploadApi,
  Supabase,
} from '@/src/apiUtils/job/candidateUpload/types';
import {
  createAndUploadCandidate,
  createApplication,
  createFile,
  deleteCandidate,
  deleteFile,
  deleteResume,
  getFiles,
} from '@/src/apiUtils/job/candidateUpload/utils';

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

  const promises = files.map((file) => {
    const candidate_id = uuidv4();
    const contentType = file.contentType;
    return createAndUploadCandidate(
      supabase,
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
          supabase,
          candidate_id,
          file_url,
          candidate_file_id,
          file.contentType,
        )
          .then(() =>
            createApplication(
              supabase,
              job_id,
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
          .catch((e: PostgrestError): ResumeUploadApi['response'][number] => {
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
