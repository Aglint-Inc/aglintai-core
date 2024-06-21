import { PropsWithChildren } from 'react';

import { useAuthDetails } from '../context/AuthContext/AuthContext';
import NotFoundPage from '../pages/404';

export const WithScreening = (props: PropsWithChildren) => {
  const { isScreeningEnabled } = useAuthDetails();
  return isScreeningEnabled ? props.children : <NotFoundPage />;
};
