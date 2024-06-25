/* eslint-disable security/detect-object-injection */
'use client';

import { createContext, ReactNode, useContext } from 'react';

import { PermissionEnums } from '@/src/utils/routing/permissions';

import { useAuthDetails } from '../AuthContext/AuthContext';

/* eslint-disable no-unused-vars */
export type RolesAndPermissionsContextType = {
  checkPermissions?: (x: PermissionEnums[]) => boolean;
  devlinkProps?: (
    x: PermissionEnums[],
  ) => { onClick: null; style: { display: 'none' } } | {};
  ifAllowed: <T extends Function | ReactNode>(
    func: T,
    permission: PermissionEnums[],
  ) => T;
};

const RolesAndPermissionsContext =
  createContext<RolesAndPermissionsContextType>(undefined);

export const RolesAndPermissionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userPermissions } = useAuthDetails();
  const checkPermissions: RolesAndPermissionsContextType['checkPermissions'] = (
    permissions,
  ) => {
    return (
      Boolean(permissions?.length) &&
      permissions.reduce(
        (prev, curr) => prev && Boolean(userPermissions['permissions'][curr]),
        true,
      )
    );
  };
  const ifAllowed: RolesAndPermissionsContextType['ifAllowed'] = (
    func,
    permissions,
  ) => {
    // eslint-disable-next-line security/detect-object-injection
    const allow =
      Boolean(permissions.length) &&
      permissions.reduce(
        (prev, curr) => prev && Boolean(userPermissions['permissions'][curr]),
        true,
      );
    if (allow) {
      return func;
    }
    if (typeof func === 'function') {
      return (() => {}) as unknown as typeof func; // Return an empty function if func is a function
    }
    return (<></>) as typeof func; // Return an empty fragment if func is a React node
  };

  const devlinkProps: RolesAndPermissionsContextType['devlinkProps'] = (
    permissions,
  ) => {
    // eslint-disable-next-line security/detect-object-injection
    const allow =
      Boolean(permissions.length) &&
      permissions.reduce(
        (prev, curr) => prev && Boolean(userPermissions['permissions'][curr]),
        true,
      );
    if (allow) {
      return {};
    }
    return { onClick: null, style: { display: 'none' } };
  };

  return (
    <RolesAndPermissionsContext.Provider
      value={{ checkPermissions, ifAllowed, devlinkProps }}
    >
      {children}
    </RolesAndPermissionsContext.Provider>
  );
};

export const useRolesAndPermissions = () => {
  const context = useContext(RolesAndPermissionsContext);
  if (context === undefined) {
    throw new Error('useTasksAgentContext must be used within a Task page');
  }
  return context;
};
