import axios from 'axios';

import { JobProfileScoreApi } from '../../pages/api/job/profileScore';

type ApiRouteTypes = {
  profileScore: JobProfileScoreApi;
};

export const handleJobApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `/api/job/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
