import axios from 'axios';

import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  CsvUploadApi,
  ManualUploadApi,
  ResumeUploadApi,
  UploadApiFormData,
} from '@/src/pages/api/candidateUpload/types';
import { CandidateInsert } from '@/src/types/candidates.types';
import toast from '@/src/utils/toast';

const useUploadCandidate = () => {
  const { job } = useJobApplications();

  const handleUploadCandidate = async (
    candidate: Omit<CandidateInsert, 'recruiter_id'>,
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
      recruiter_id: job.recruiter_id,
    };
    const params = Object.entries(request)
      .reduce((acc, [key, value]) => {
        if (value) acc.push(`${key}=${encodeURIComponent(value)}`);
        return acc;
      }, [])
      .join('&');
    const formData = new FormData();
    formData.append(UploadApiFormData.FILES, file);
    const { data: response } = await axios<ManualUploadApi['response']>({
      method: 'post',
      url: `/api/candidateUpload/manualUpload?${params}`,
      data: formData,
      timeout: 60000,
      signal: signal,
    });
    return response;
  };

  const handleResumeUpload = async (files: File[], signal?: AbortSignal) => {
    const request: ResumeUploadApi['request']['params'] = {
      job_id: job.id,
      recruiter_id: job.recruiter_id,
    };
    const params = Object.entries(request)
      .reduce((acc, [key, value]) => {
        if (value) acc.push(`${key}=${encodeURIComponent(value)}`);
        return acc;
      }, [])
      .join('&');
    const formData = new FormData();
    files.forEach((file) => formData.append(UploadApiFormData.FILES, file));
    const { data: response } = await axios<ResumeUploadApi['response']>({
      method: 'post',
      url: `/api/candidateUpload/resumeUpload?${params}`,
      data: formData,
      timeout: 60000,
      signal: signal,
    });
    return response;
  };

  const handleBulkResumeUpload = async (
    files: File[],
    signal?: AbortSignal,
  ) => {
    const batches = files.reduce(
      (acc, curr, i) => {
        acc[i % acc.length].push(curr);
        return acc;
      },
      [[], [], [], [], []] as File[][],
    );
    const promises = batches
      .filter((batch) => batch.length !== 0)
      .map((batch) => handleResumeUpload(batch, signal));
    const responses = await Promise.allSettled(promises);
    const successCount = responses.reduce((acc, curr) => {
      if (curr.status === 'fulfilled')
        acc += curr.value.filter((response) => response.confirmation).length;
      return acc;
    }, 0);
    const failedCount = files.length - successCount;
    if (successCount > 0) {
      toast.success(
        `${successCount} resume${
          successCount === 1 ? '' : 's'
        } successfully uploaded!`,
      );
    }
    if (failedCount > 0) {
      toast.error(
        `${failedCount} resume${failedCount === 1 ? '' : 's'} failed to upload`,
      );
    }
    return { confirmation: true, error: null };
  };

  const hanelBulkCsvUpload = async (
    candidates: CsvUploadApi['request']['candidates'],
    signal?: AbortSignal,
  ) => {
    const formData: CsvUploadApi['request'] = {
      job_id: job.id,
      recruiter_id: job.recruiter_id,
      candidates,
    };
    const { data: response } = await axios<ManualUploadApi['response']>({
      method: 'post',
      url: `/api/candidateUpload/csvUpload`,
      data: formData,
      timeout: 60000,
      signal: signal,
    });
    if (response.confirmation) toast.success('Candidates uploaded');
    else if (response.error) toast.error(response.error);
    return response;
  };

  return { handleUploadCandidate, handleBulkResumeUpload, hanelBulkCsvUpload };
};

export default useUploadCandidate;
