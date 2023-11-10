import axios from 'axios';

import { UploadCandidateAPi } from '@/src/pages/api/Candidates/uploadCandidates';

import { BulkImportCandidateCsv } from '.';

export const handleUploadCandidates = async (
  bulkImportData: BulkImportCandidateCsv[],
  jobId: string,
) => {
  const { data } = await axios.request({
    method: 'POST',
    url: '/api/Candidates/uploadCandidates',
    timeout: 60000,
    data: {
      candidates: bulkImportData,
      jobId,
    } as UploadCandidateAPi['request'],
  });
  return data as unknown as UploadCandidateAPi['response'];
};
