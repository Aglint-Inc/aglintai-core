import axios from 'axios';

import { type JobDashboardApi } from './read';

type ApiRouteTypes = {
  read: JobDashboardApi;
};

export const handleJobDashboardApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `/api/jobDashboard/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
