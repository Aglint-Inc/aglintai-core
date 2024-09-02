import axios from 'axios';

import { type AssessmentResultReadApi } from '../../pages/api/assessment-result/read';
import { type AssessmentResultApi } from '../../pages/api/assessment-result/result';

type ApiRouteTypes = {
  result: AssessmentResultApi;
  read: AssessmentResultReadApi;
};

export const handleAssessmentResultApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_HOST_NAME}/api/assessment-result/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
