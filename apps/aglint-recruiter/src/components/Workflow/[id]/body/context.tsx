/* eslint-disable security/detect-object-injection */
import type React from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { WorkflowAction } from '@/src/types/workflow.types';

import { ACTION_TRIGGER_MAP } from './constants';

const useActionsContext = () => {
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();

  const {
    workflow: { trigger },
    actions: { data: actions },
    handleCreateAction,
  } = useWorkflow();

  const globalOptions = useMemo(
    () =>
      ACTION_TRIGGER_MAP[trigger].filter(
        ({ value }) =>
          !(actions ?? []).find(({ target_api }) => target_api === value),
      ),
    [ACTION_TRIGGER_MAP, trigger, actions],
  );

  const currentEmailTemplate = useMemo(
    () =>
      (all_company_email_template ?? []).find(
        ({ type }) => type === globalOptions[0]?.value,
      ),
    [all_company_email_template, globalOptions],
  );

  const canCreateAction = useMemo(
    () => currentEmailTemplate && !!globalOptions.length,
    [globalOptions, currentEmailTemplate],
  );

  const createAction = useCallback(() => {
    if (canCreateAction)
      handleCreateAction({
        order: (actions ?? []).length
          ? actions[actions.length - 1].order + 1
          : 1,
        target_api: currentEmailTemplate.type,
        payload: {
          body: currentEmailTemplate.body,
          subject: currentEmailTemplate.subject,
        },
      });
  }, [handleCreateAction, actions, currentEmailTemplate, canCreateAction]);

  const getCurrentOption = useCallback(
    (type: WorkflowAction['target_api']) =>
      ACTION_TRIGGER_MAP[trigger].find(({ value }) => value === type),
    [ACTION_TRIGGER_MAP, trigger],
  );
  return {
    createAction,
    getCurrentOption,
    canCreateAction,
    globalOptions,
  };
};

const ActionsContext =
  createContext<ReturnType<typeof useActionsContext>>(undefined);

const useActions = () => {
  const value = useContext(ActionsContext);
  if (value === undefined) throw Error('Actions Context not found');
  return value;
};

const ActionsProvider = (props: React.PropsWithChildren) => {
  const value = useActionsContext();
  return (
    <ActionsContext.Provider value={value}>
      {props.children}
    </ActionsContext.Provider>
  );
};

export { ActionsProvider, useActions };
