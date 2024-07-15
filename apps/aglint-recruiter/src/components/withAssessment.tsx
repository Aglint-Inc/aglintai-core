import { PropsWithChildren } from 'react';

import { Page404 } from '@/devlink/Page404';

import { useAuthDetails } from '../context/AuthContext/AuthContext';

export const WithAssessment = (props: PropsWithChildren) => {
  const { isAssessmentEnabled } = useAuthDetails();
  return isAssessmentEnabled ? props.children : <Page404 />;
};
