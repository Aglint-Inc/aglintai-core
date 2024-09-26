/* eslint-disable security/detect-object-injection */

import { type PostgrestError } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { type CsvUploadApi } from '@/apiUtils/job/candidateUpload/types';
import {
  bulkCreateApplications,
  bulkCreateCandidate,
  bulkCreateFiles,
} from '@/apiUtils/job/candidateUpload/utils';
import { type CandidateFilesBulkCreateAction } from '@/context/CandidatesContext/types';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CsvUploadApi['response']>,
) => {
  const supabaseAdmin = getSupabaseServer();

  const { job_id, recruiter_id, candidates } =
    req.body as CsvUploadApi['request'];

  const candidateFileMap = new Map();

  const safeCandidates = candidates.map(({ file_url, ...rest }) => {
    const id = uuidv4();
    candidateFileMap.set(id, file_url);
    return { id, recruiter_id, ...rest };
  });

  const { confirmation, error } = await bulkCreateCandidate(
    supabaseAdmin,
    safeCandidates,
  )
    .then((candidatesData) => {
      const safeFiles = candidatesData.map(({ id }) => ({
        id: uuidv4(),
        candidate_id: id,
        file_url: candidateFileMap.get(id),
        type: 'resume' as CandidateFilesBulkCreateAction['request']['inputData'][number]['type'],
      }));
      return bulkCreateFiles(supabaseAdmin, safeFiles)
        .then((filesData) => {
          const safeApplications: Parameters<typeof bulkCreateApplications>[1] =
            filesData.map(({ candidate_id, id: candidate_file_id }) => ({
              id: uuidv4(),
              candidate_id,
              job_id,
              candidate_file_id,
              source: 'csv_upload',
              recruiter_id,
            }));
          return bulkCreateApplications(supabaseAdmin, safeApplications)
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
