import axios from 'axios';

import { ManualUploadApi } from '@/src/pages/api/candidateUpload/manualUpload';
import { CandidateInsert } from '@/src/types/candidates.types';
import { JobType } from '@/src/types/data.types';

const useUploadCandidate = () => {
  const handleUploadCandidate = async (
    job: JobType,
    candidate: CandidateInsert,
    file: File,
    signal?: AbortSignal,
  ) => {
    const request: ManualUploadApi['request']['params'] = {
      email: candidate.email,
      first_name: candidate.first_name,
      job_id: job.id,
      last_name: candidate.last_name,
      phone: candidate.phone || null,
      linkedin: candidate.linkedin || null,
      contentType:
        file.type as ManualUploadApi['request']['params']['contentType'],
      recruiter_id: candidate.recruiter_id,
    };
    const params = Object.entries(request)
      .reduce((acc, [key, value]) => {
        if (value) acc.push(`${key}=${encodeURIComponent(value)}`);
        return acc;
      }, [])
      .join('&');
    const formData = new FormData();
    formData.append('resume', file);
    const { data: response } = await axios({
      method: 'post',
      url: `/api/candidateUpload/manualUpload?${params}`,
      data: formData,
      timeout: 60000,
      signal: signal,
    });
    return response as ManualUploadApi['response'];
  };

  return { handleUploadCandidate };
};

export default useUploadCandidate;
