import axios from 'axios';

import { type AssessmentBuilderQuestionApi } from '../../pages/api/assessment-builder/question';

type ApiRouteTypes = {
  question: AssessmentBuilderQuestionApi;
  template: any;
};

export const handleAssessmentBuilderApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_HOST_NAME}/api/assessment-builder/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
