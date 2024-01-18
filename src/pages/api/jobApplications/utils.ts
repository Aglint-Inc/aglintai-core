import axios from 'axios';

import { JobApplicationEmails } from '@/src/pages/api/jobApplications/candidateEmail';

import {
  type CsvUploadApi,
  type ManualUploadApi,
  type ResumeUploadApi,
  UploadApiFormData,
} from './candidateUpload/types';
import { type ReadJobApplicationApi } from './read';

type ApiRouteTypes = {
  candidateEmail: JobApplicationEmails;
  read: ReadJobApplicationApi;
  'candidateUpload/csvUpload': CsvUploadApi;
  'candidateUpload/manualUpload': ManualUploadApi;
  'candidateUpload/resumeUpload': ResumeUploadApi;
};

export const handleJobApplicationApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  if (payload[UploadApiFormData.PARAMS] && payload[UploadApiFormData.FILES]) {
    const params = Object.entries(payload[UploadApiFormData.PARAMS])
      .reduce((acc, [key, value]) => {
        if (value) acc.push(`${key}=${encodeURIComponent(value as string)}`);
        return acc;
      }, [])
      .join('&');
    const { data } = await axios<ApiRouteTypes[T]['response']>({
      method: 'post',
      url: `/api/${route}?${params}`,
      data: payload[UploadApiFormData.FILES],
      timeout: 60000,
      signal: signal,
    });
    return data;
  }
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `/api/jobApplications/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
