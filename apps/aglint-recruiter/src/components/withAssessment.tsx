import { PropsWithChildren } from 'react';

import { Page404 } from '@/devlink/Page404';

import { useRolesAndPermissions } from '../context/RolesAndPermissions/RolesAndPermissionsContext';

export const WithAssessment = (props: PropsWithChildren) => {
  const { isAssessmentEnabled } = useRolesAndPermissions();
  return isAssessmentEnabled ? props.children : <Page404 />;
};
