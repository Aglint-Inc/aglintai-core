/* eslint-disable security/detect-object-injection */
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { createBatches } from '@/src/pages/api/job/jobApplications/candidateEmail/utils';
import {
  CsvUploadApi,
  UploadApiFormData,
} from '@/src/pages/api/job/jobApplications/candidateUpload/types';
import { handleJobApplicationApi } from '@/src/pages/api/job/jobApplications/utils';
import { CandidateInsert } from '@/src/types/candidates.types';
import toast from '@/src/utils/toast';

const useUploadCandidate = () => {
  const { job, handleJobApplicationPaginate, pageNumber, section } =
    useJobApplications();

  const handleUploadCandidate = async (
    candidate: Omit<CandidateInsert, 'recruiter_id'>,
    file: File,
    signal?: AbortSignal,
  ) => {
    const formData = new FormData();
    formData.append(UploadApiFormData.FILES, file);
    const request = {
      params: {
        email: candidate.email,
        first_name: candidate.first_name,
        job_id: job.id,
        last_name: candidate.last_name,
        phone: candidate.phone || null,
        linkedin: candidate.linkedin || null,
        recruiter_id: job.recruiter_id,
      },
      files: formData,
    };
    const response = await handleJobApplicationApi(
      'candidateUpload/manualUpload',
      request,
      signal,
    );
    if (response.confirmation) {
      await handleJobApplicationPaginate(pageNumber[section], section);
      toast.success('Candidates uploaded');
    } else if (response.error) toast.error(response.error);
    return response;
  };

  const handleResumeReupload = async (
    file: File,
    application: Pick<JobApplication, 'id' | 'candidate_id'>,
    signal?: AbortSignal,
  ) => {
    const formData = new FormData();
    formData.append(UploadApiFormData.FILES, file);
    const request = {
      params: {
        candidate_id: application.candidate_id,
        application_id: application.id,
      },
      files: formData,
    };
    const response = await handleJobApplicationApi(
      'candidateUpload/resumeReupload',
      request,
      signal,
    );
    return response;
  };

  const handleResumeUpload = async (files: File[], signal?: AbortSignal) => {
    const formData = new FormData();
    files.forEach((file) => formData.append(UploadApiFormData.FILES, file));
    const request = {
      params: {
        job_id: job.id,
        recruiter_id: job.recruiter_id,
      },
      files: formData,
    };
    const response = await handleJobApplicationApi(
      'candidateUpload/resumeUpload',
      request,
      signal,
    );
    return response;
  };

  const handleBulkResumeUpload = async (
    files: File[],
    signal?: AbortSignal,
  ) => {
    const batches = createBatches(files, 5);
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
      await handleJobApplicationPaginate(pageNumber[section], section);
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

  const handleBulkCsvUpload = async (
    candidates: CsvUploadApi['request']['candidates'],
    signal?: AbortSignal,
  ) => {
    const formData = {
      job_id: job.id,
      recruiter_id: job.recruiter_id,
      candidates,
    };
    const response = await handleJobApplicationApi(
      'candidateUpload/csvUpload',
      formData,
      signal,
    );
    if (response.confirmation) {
      await handleJobApplicationPaginate(pageNumber[section], section);
      toast.success('Candidates uploaded');
    } else if (response.error) toast.error(response.error);
    return response;
  };

  return {
    handleUploadCandidate,
    handleBulkResumeUpload,
    handleBulkCsvUpload,
    handleResumeReupload,
  };
};

export default useUploadCandidate;
