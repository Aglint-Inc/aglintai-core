/* eslint-disable security/detect-object-injection */
'use client';

import { DatabaseTable } from '@aglint/shared-types';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { createContext, ReactNode, useContext } from 'react';

import { useAuthDetails } from '../AuthContext/AuthContext';

/* eslint-disable no-unused-vars */
export type RolesAndPermissionsContextType = {
  checkPermissions?: (x: DatabaseTable['permissions']['name'][]) => boolean;
  devlinkProps?: (
    x: DatabaseTable['permissions']['name'][],
  ) => { onClick: null; style: { display: 'none' } } | {};
  ifAllowed: <T extends Function | ReactNode>(
    func: T,
    permission: DatabaseTable['permissions']['name'][],
  ) => T;
  isAssessmentEnabled: boolean;
  isScreeningEnabled: boolean;
  isSchedulingEnabled: boolean;
  isScoringEnabled: boolean;
};

const RolesAndPermissionsContext =
  createContext<RolesAndPermissionsContextType>(undefined);

export const RolesAndPermissionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userPermissions, recruiter } = useAuthDetails();
  const checkPermissions: RolesAndPermissionsContextType['checkPermissions'] = (
    permissions,
  ) => {
    return (
      Boolean(permissions?.length) &&
      permissions.reduce(
        (prev, curr) =>
          prev &&
          Boolean(
            userPermissions['permissions'][curr] || curr === 'authorized',
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
    // Boolean(permissions.length) &&
    // permissions.reduce(
    //   (prev, curr) => prev && Boolean(userPermissions['permissions'][curr]),
    //   true,
    // );
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

  const isAssessmentEnabled = false; //useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isScreeningEnabled = false; //useFeatureFlagEnabled('isPhoneScreeningEnabled');
  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');
  const isScoringEnabled = recruiter?.recruiter_preferences?.scoring ?? false;

  return (
    <RolesAndPermissionsContext.Provider
      value={{
        checkPermissions,
        ifAllowed,
        devlinkProps,
        isAssessmentEnabled,
        isSchedulingEnabled,
        isScoringEnabled,
        isScreeningEnabled,
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
