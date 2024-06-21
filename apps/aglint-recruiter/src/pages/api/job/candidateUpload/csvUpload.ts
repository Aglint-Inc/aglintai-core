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
  CsvUploadApi,
  Supabase,
} from '@/src/apiUtils/job/candidateUpload/types';
import {
  bulkCreateApplications,
  bulkCreateCandidate,
  bulkCreateFiles,
} from '@/src/apiUtils/job/candidateUpload/utils';
import { CandidateFilesBulkCreateAction } from '@/src/context/CandidatesContext/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CsvUploadApi['response']>,
) => {
  const { job_id, recruiter_id, candidates } =
    req.body as CsvUploadApi['request'];
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

  const candidateFileMap = new Map();

  const safeCandidates = candidates.map(({ file_url, ...rest }) => {
    const id = uuidv4();
    candidateFileMap.set(id, file_url);
    return { id, recruiter_id, ...rest };
  });

  const { confirmation, error } = await bulkCreateCandidate(
    supabase,
    safeCandidates,
  )
    .then((candidatesData) => {
      const safeFiles = candidatesData.map(({ id }) => ({
        id: uuidv4(),
        candidate_id: id,
        file_url: candidateFileMap.get(id),
        type: 'resume' as CandidateFilesBulkCreateAction['request']['inputData'][number]['type'],
      }));
      return bulkCreateFiles(supabase, safeFiles)
        .then((filesData) => {
          const safeApplications: Parameters<typeof bulkCreateApplications>[1] =
            filesData.map(({ candidate_id, id: candidate_file_id }) => ({
              id: uuidv4(),
              candidate_id,
              job_id,
              candidate_file_id,
              source: 'csv_upload',
            }));
          return bulkCreateApplications(supabase, safeApplications)
            .then((): CsvUploadApi['response'] => ({
              confirmation: true,
              error: null,
            }))
            .catch((e: PostgrestError): CsvUploadApi['response'] => ({
              confirmation: false,
              error: e.message,
            }));
        })
        .catch((e: PostgrestError): CsvUploadApi['response'] => ({
          confirmation: false,
          error: e.message,
        }));
    })
    .catch((e: PostgrestError): CsvUploadApi['response'] => ({
      confirmation: false,
      error: e.message,
    }));

  res.status(200).json({ confirmation, error });
  return;
};

export default handler;
