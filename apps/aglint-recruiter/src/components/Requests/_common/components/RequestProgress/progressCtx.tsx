/* eslint-disable no-unused-vars */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { createContext, useContext } from 'react';

import { RequestProgressMapType, TriggerActionMapType } from './types';

// Define the types for the context values
export interface RequestProgressContextType {
  reqTriggerActionsMap: TriggerActionMapType;
  reqProgressMap: RequestProgressMapType;
  companyEmailTemplatesMp: Partial<
    Record<
      DatabaseEnums['email_slack_types'],
      DatabaseTable['company_email_template']
    >
  >;
  editTrigger: DatabaseTable['workflow']['trigger'];
  setEditTrigger: (trigger: DatabaseTable['workflow']['trigger']) => void;
  showEditDialog: boolean;
  setShowEditDialog: (show: boolean) => void;
}
// Define the context with the proper type
export const RequestProgressContext = createContext<
  RequestProgressContextType | undefined
>(undefined);

export const useRequestProgressProvider = (): RequestProgressContextType => {
  const context = useContext(RequestProgressContext);
  if (!context) {
    throw new Error('useRequestContext must be used within a RequestProvider');
  }
  return context;
};
