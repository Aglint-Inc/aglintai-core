import { PropsWithChildren } from 'react';

import { Page404 } from '@/devlink/Page404';

import { useAuthDetails } from '../context/AuthContext/AuthContext';

export const WithScreening = (props: PropsWithChildren) => {
  const { isScreeningEnabled } = useAuthDetails();
  return isScreeningEnabled ? props.children : <Page404 />;
};
