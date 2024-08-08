/* eslint-disable security/detect-object-injection */
import type React from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import type { WorkflowAction } from '@/src/types/workflow.types';
import toast from '@/src/utils/toast';

import { ACTION_TRIGGER_MAP, AI_RESPONSE_PLACEHOLDER } from './constants';

const useActionsContext = () => {
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();

  const {
    workflow: { trigger },
    actions: { data: actions },
    handleUpdateAction,
    handleCreateAction,
  } = useWorkflow();

  const globalOptions = useMemo(
    () =>
      ACTION_TRIGGER_MAP[trigger].filter(
        ({ value }) =>
          !(actions ?? []).find(
            ({ target_api }) => target_api === value.target_api,
          ),
      ),
    [ACTION_TRIGGER_MAP, trigger, actions],
  );

  const canCreateAction = useMemo(
    () => !!globalOptions.length,
    [globalOptions],
  );

  const handleCreateUpdate = useCallback(
    (
      fn: typeof handleCreateAction | typeof handleUpdateAction,
      { action_type, target_api, order }: Partial<WorkflowAction>,
    ) => {
      switch (action_type) {
        case 'email':
          {
            const emailTemplate = (all_company_email_template ?? []).find(
              ({ type }) => type === target_api,
            );
            if (emailTemplate)
              fn({
                action_type,
                target_api,
                order,
                payload: {
                  body: emailTemplate.body,
                  subject: emailTemplate.subject,
                },
              });
            else toast.error('Email template for this action is not available');
          }
          break;
        case 'slack':
          {
            fn({
              action_type,
              target_api,
              order,
              payload: null,
            });
          }
          break;
        case 'end_point':
          {
            fn({
              action_type,
              target_api,
              order,
              payload: null,
            });
          }
          break;
        case 'agent_instruction':
          {
            fn({
              action_type,
              target_api,
              order,
              payload: {
                instruction: '',
                ai_response_status: 'not_started',
                ai_response: AI_RESPONSE_PLACEHOLDER,
              },
            });
          }
          break;
      }
    },
    [all_company_email_template],
  );

  const createAction = useCallback(() => {
    if (canCreateAction) {
      const {
        value: { action_type, target_api },
      } = globalOptions[0];
      const order = (actions ?? []).length
        ? actions[actions.length - 1].order + 1
        : 1;
      handleCreateUpdate(handleCreateAction, {
        action_type,
        target_api,
        order,
      } as WorkflowAction);
    } else toast.error('No other action available');
  }, [
    handleCreateUpdate,
    handleCreateAction,
    globalOptions,
    actions,
    canCreateAction,
    AI_RESPONSE_PLACEHOLDER,
  ]);

  const updateAction = useCallback(
    (action: WorkflowAction) => handleCreateUpdate(handleUpdateAction, action),
    [handleCreateUpdate],
  );

  const getCurrentOption = useCallback(
    (type: WorkflowAction['target_api']) =>
      ACTION_TRIGGER_MAP[trigger].find(
        ({ value: { target_api } }) => target_api === type,
      ),
    [ACTION_TRIGGER_MAP, trigger],
  );
  return {
    createAction,
    updateAction,
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
