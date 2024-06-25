import type { PropsWithChildren } from 'react';

import { useRolesAndPermissions } from '../context/RolesAndPermissions/RolesAndPermissionsContext';
import { PermissionEnums } from '../utils/routing/permissions';

export const WithPermission = (
  props: PropsWithChildren<{ permission: PermissionEnums[] }>,
) => {
  const { ifAllowed } = useRolesAndPermissions();
  return ifAllowed(props.children, props.permission);
};
