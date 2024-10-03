/* eslint-disable security/detect-object-injection */
'use client';

import { type DatabaseTable } from '@aglint/shared-types';
import { createContext, type ReactNode, useContext } from 'react';

import { useTenant } from '@/company/hooks';

/* eslint-disable no-unused-vars */
type RolesAndPermissionsContextType = {
  checkPermissions: (x: DatabaseTable['permissions']['name'][]) => boolean;
  devlinkProps: (
    x: DatabaseTable['permissions']['name'][],
  ) => { onClick: null; style: { display: 'none' } } | object;
  ifAllowed: <T extends ((...args: unknown[]) => unknown) | ReactNode>(
    func: T,
    permission: DatabaseTable['permissions']['name'][],
  ) => T;
  isScoringEnabled: boolean;
};

const initialValue: RolesAndPermissionsContextType = {
  checkPermissions: () => false,
  devlinkProps: () => ({ onClick: null, style: { display: 'none' } }),
  ifAllowed: <T extends ((...args: unknown[]) => unknown) | ReactNode>(
    func: T,
    _: DatabaseTable['permissions']['name'][],
  ) => {
    return typeof func === 'function' ? func : ((() => {}) as T);
  },
  isScoringEnabled: false,
};
const RolesAndPermissionsContext =
  createContext<RolesAndPermissionsContextType>(initialValue);

export const RolesAndPermissionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userPermissions, recruiter } = useTenant();

  const checkPermissions: RolesAndPermissionsContextType['checkPermissions'] = (
    permissions,
  ) => {
    return (
      Boolean(permissions?.length) &&
      permissions.reduce(
        (prev, curr) =>
          prev &&
          Boolean(
            userPermissions.permissions.includes(curr) || curr === 'authorized',
          ),
        true,
      )
    );
  };
  const ifAllowed: RolesAndPermissionsContextType['ifAllowed'] = (
    func,
    permissions,
  ) => {
    // eslint-disable-next-line security/detect-object-injection
    const allow = checkPermissions(permissions);
    if (allow) {
      return func;
    }
    if (typeof func === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
        (prev, curr) =>
          prev &&
          (Boolean(userPermissions['permissions'].includes(curr)) ||
            curr === 'authorized'),
        true,
      );
    if (allow) {
      return {};
    }
    return { onClick: null, style: { display: 'none' } };
  };

  const isScoringEnabled = recruiter?.recruiter_preferences?.scoring ?? false;

  return (
    <RolesAndPermissionsContext.Provider
      value={{
        checkPermissions,
        ifAllowed,
        devlinkProps,
        isScoringEnabled,
      }}
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
