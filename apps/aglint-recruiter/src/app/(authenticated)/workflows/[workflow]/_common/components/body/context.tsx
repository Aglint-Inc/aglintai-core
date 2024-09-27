/* eslint-disable security/detect-object-injection */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { useTenant } from '@/company/hooks';
import { emailTemplateQueries } from '@/queries/email-templates';
import type { WorkflowAction } from '@/types/workflow.types';
import toast from '@/utils/toast';
import { useWorkflow } from '@/workflow/hooks';
import {
  ACTION_TRIGGER_MAP,
  AI_RESPONSE_PLACEHOLDER,
} from '@/workflows/constants';

const useActionsContext = () => {
  const { recruiter } = useTenant();
  const { data: all_company_email_template } = useQuery(
    emailTemplateQueries.emailTemplates(recruiter.id),
  );

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

  const handleCreateSelectAction = useCallback(
    (
      fn: typeof handleCreateAction | typeof handleUpdateAction,
      { action_type, target_api, order, id }: Partial<WorkflowAction>,
    ) => {
      switch (action_type) {
        case 'email':
          {
            const emailTemplate = (all_company_email_template ?? []).find(
              ({ type }) => type === target_api,
            );
            fn({
              id,
              action_type,
              target_api,
              order,
              payload: {
                email: {
                  body: emailTemplate?.body ?? '',
                  subject: emailTemplate?.subject ?? '',
                },
              },
              workflow_id: null,
            } as any);
          }
          break;
        case 'slack':
          {
            fn({
              id,
              action_type,
              target_api,
              order,
              payload: null,
              workflow_id: null,
            } as any);
          }
          break;
        case 'end_point':
          {
            fn({
              id,
              action_type,
              target_api,
              order,
              payload: null,
              workflow_id: null,
            });
          }
          break;
        case 'agent_instruction':
          {
            fn({
              id,
              action_type,
              target_api,
              order,
              workflow_id: null,

              payload: {
                agent: {
                  instruction: '',
                  ai_response: AI_RESPONSE_PLACEHOLDER,
                },
              },
            } as any);
          }
          break;
      }
    },
    [all_company_email_template],
  );

  const createAction = useCallback(
    ({
      value: { action_type, target_api },
    }: (typeof globalOptions)[number]) => {
      if (canCreateAction) {
        const order = (actions ?? []).length
          ? actions[actions.length - 1].order + 1
          : 1;
        handleCreateSelectAction(handleCreateAction, {
          action_type,
          target_api,
          order,
        } as WorkflowAction);
      } else toast.error('No other action available');
    },
    [
      handleCreateSelectAction,
      handleCreateAction,
      globalOptions,
      actions,
      canCreateAction,
      AI_RESPONSE_PLACEHOLDER,
    ],
  );

  const selectAction = useCallback(
    (action: WorkflowAction) =>
      handleCreateSelectAction(handleUpdateAction, action),
    [handleCreateSelectAction, handleUpdateAction],
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
    selectAction,
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
