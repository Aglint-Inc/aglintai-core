import { PropsWithChildren } from 'react';

import { Page404 } from '@/devlink/Page404';

import { useRolesAndPermissions } from '../context/RolesAndPermissions/RolesAndPermissionsContext';

export const WithScreening = (props: PropsWithChildren) => {
  const { isScreeningEnabled } = useRolesAndPermissions();
  return isScreeningEnabled ? props.children : <Page404 />;
};
