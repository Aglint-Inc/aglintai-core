import axios from 'axios';

import { type RecruiterOnboardingEmailApi } from './recruiterOnboarding';

type ApiRouteTypes = {
  recruiterOnboarding: RecruiterOnboardingEmailApi;
};

export const handleEmailApi = async <T extends keyof ApiRouteTypes>(
  route: T,
  payload: ApiRouteTypes[T]['request'],
  signal?: AbortSignal,
) => {
  const { data } = await axios<ApiRouteTypes[T]['response']>({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_HOST_NAME}/api/emails/${route}`,
    data: payload,
    timeout: 60000,
    signal: signal,
  });
  return data;
};
