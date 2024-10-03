import axios from 'axios';

import { type JobProfileScoreApi } from '../../pages/api/job/profileScore';
import {
  type CsvUploadApi,
  type ManualUploadApi,
  type ResumeReuploadApi,
  type ResumeUploadApi,
  UploadApiFormData,
} from './candidateUpload/types';

type ApiRouteTypes = {
  profileScore: JobProfileScoreApi;
  'candidateUpload/csvUpload': CsvUploadApi;
  'candidateUpload/manualUpload': ManualUploadApi;
  'candidateUpload/resumeUpload': ResumeUploadApi;
  'candidateUpload/resumeReupload': ResumeReuploadApi;
};

export const handleJobApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  if (
    payload[UploadApiFormData.PARAMS as keyof typeof payload] &&
    payload[UploadApiFormData.FILES as keyof typeof payload]
  ) {
    const params = Object.entries(
      //@ts-expect-error
      payload[UploadApiFormData.PARAMS as keyof typeof payload],
    )
      .reduce((acc, [key, value]) => {
        if (value) acc.push(`${key}=${encodeURIComponent(value as string)}`);
        return acc;
      }, [] as string[])
      .join('&');
    const { data } = await axios<ApiRouteTypes[T]['response']>({
      method: 'post',
      url: `/api/job/${route}?${params}`,

      data: payload[UploadApiFormData.FILES as keyof typeof payload],
      timeout: 60000,
      signal: signal,
    });
    return data;
  }
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `/api/job/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
