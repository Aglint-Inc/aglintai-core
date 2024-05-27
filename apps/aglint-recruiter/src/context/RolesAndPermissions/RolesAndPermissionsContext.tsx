'use client';
import { DatabaseEnums } from '@aglint/shared-types';
import { createContext, ReactNode, useContext } from 'react';

import { useAuthDetails } from '../AuthContext/AuthContext';

/* eslint-disable no-unused-vars */
export type RolesAndPermissionsContextType = {
  checkPermissions?: (x: DatabaseEnums['permissions_type']) => boolean;
  ifAllowed: <T extends Function | ReactNode>(
    func: T,
    permission: DatabaseEnums['permissions_type'],
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
    permission,
  ) => {
    // eslint-disable-next-line security/detect-object-injection
    return Boolean(userPermissions['permissions'][permission]);
  };
  const ifAllowed: RolesAndPermissionsContextType['ifAllowed'] = <
    T extends Function | ReactNode,
  >(
    func,
    permission,
  ) => {
    // eslint-disable-next-line security/detect-object-injection
    if (userPermissions.permissions[permission]) {
      return func;
    }
    if (typeof func === 'function') {
      return (() => {}) as unknown as T; // Return an empty function if func is a function
    }
    return (<></>) as T; // Return an empty fragment if func is a React node
  };

  return (
    <RolesAndPermissionsContext.Provider
      value={{ checkPermissions, ifAllowed }}
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
