import { PropsWithChildren } from 'react';

import { useAuthDetails } from '../context/AuthContext/AuthContext';
import NotFoundPage from '../pages/404';

export const WithAssessment = (props: PropsWithChildren) => {
  const { isAssessmentEnabled } = useAuthDetails();
  return isAssessmentEnabled ? props.children : <NotFoundPage />;
};
