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
    workflow: { trigger, id },
    actions: { data: actions },
    handleUpdateAction,
    handleCreateAction,
  } = useWorkflow();

  const workflow_id = id!;

  const globalOptions = useMemo(
    () =>
      ACTION_TRIGGER_MAP[trigger as keyof typeof ACTION_TRIGGER_MAP].filter(
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
      { action_type, target_api, order, id }: WorkflowAction,
    ) => {
      switch (action_type) {
        case 'email':
          {
            const emailTemplate = (all_company_email_template ?? []).find(
              ({ type }) => type === target_api,
            );
            fn({
              workflow_id,
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
            });
          }
          break;
        case 'slack':
          {
            fn({
              workflow_id,
              id,
              action_type,
              target_api,
              order,
            });
          }
          break;
        case 'end_point':
          {
            fn({
              workflow_id,
              id,
              action_type,
              target_api,
              order,
            });
          }
          break;
        case 'agent_instruction':
          {
            fn({
              workflow_id,
              id,
              action_type,
              target_api,
              order,
              payload: {
                agent: {
                  instruction: '',
                },
              },
            });
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
          ? actions![actions!.length - 1].order + 1
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
      ACTION_TRIGGER_MAP[trigger as keyof typeof ACTION_TRIGGER_MAP].find(
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

const ActionsContext = createContext<
  ReturnType<typeof useActionsContext> | undefined
>(undefined);

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
