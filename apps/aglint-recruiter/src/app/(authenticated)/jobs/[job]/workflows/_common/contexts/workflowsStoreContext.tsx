/* eslint-disable no-unused-vars */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { template } from 'lodash';
import { create } from 'zustand';

import { type ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { type useGetJobWorkflow } from '../hooks';
import {
  agentInstructionEmailTargetApi,
  type TriggerCategory,
  triggerToCategoryMap,
} from '../lib/constants';

export interface JobAutomationState {
  jobWorkflowTriggers: (DatabaseTable['workflow'] & {
    category: TriggerCategory;
  })[];
  jobWorkflowActions: DatabaseTable['workflow_action'][];
  isWorkflowsChanged: boolean; // for discard feature
  isStateUpdating: boolean; // for loading state
  company_templates: DatabaseTable['company_email_template'][];
}

const initialState: JobAutomationState = {
  jobWorkflowTriggers: [],
  jobWorkflowActions: [],
  isWorkflowsChanged: false,
  isStateUpdating: false,
  company_templates: [],
};

export const useJobAutomationStore = create<JobAutomationState>()(() => ({
  ...initialState,
}));

export const updateJobAutomationState = (isStateUpdating) => {
  useJobAutomationStore.setState({
    isStateUpdating,
  });
};
export const resetJobAutomation = () =>
  useJobAutomationStore.setState({
    ...initialState,
  });

export const updateWTrigger = (
  jobWorkflowTrigger: JobAutomationState['jobWorkflowTriggers'][number],
) => {
  useJobAutomationStore.setState((state) => ({
    jobWorkflowTriggers: state.jobWorkflowTriggers.map((trigger) =>
      trigger.id === jobWorkflowTrigger.id ? jobWorkflowTrigger : trigger,
    ),
    isWorkflowsChanged: true,
  }));
};

export const updateWAction = (
  jobWorkflowActions: JobAutomationState['jobWorkflowActions'][number],
) => {
  useJobAutomationStore.setState((state) => ({
    jobWorkflowActions: state.jobWorkflowActions.map((action) =>
      action.id === jobWorkflowActions.id ? jobWorkflowActions : action,
    ),
    isWorkflowsChanged: true,
  }));
};

export const addWaction = (
  jobWorkflowAction: JobAutomationState['jobWorkflowActions'][number],
) => {
  const target_api = jobWorkflowAction.target_api;
  let email_target_api: DatabaseEnums['email_slack_types'] = target_api;
  if (email_target_api in agentInstructionEmailTargetApi) {
    email_target_api = agentInstructionEmailTargetApi[email_target_api];
  }

  useJobAutomationStore.setState((state) => {
    return {
      jobWorkflowActions: [...state.jobWorkflowActions, jobWorkflowAction],
      isWorkflowsChanged: true,
    };
  });
};
export const deleteWAcion = (id: string, workflowId: string) => {
  useJobAutomationStore.setState((state) => {
    const parentWorkflow = state.jobWorkflowTriggers.find(
      (workflow) => workflow.id === workflowId,
    );
    if (
      state.jobWorkflowActions.filter(
        (action) => action.workflow_id === parentWorkflow.id,
      ).length === 1
    ) {
      parentWorkflow.is_active = false;
    }
    return {
      jobWorkflowActions: state.jobWorkflowActions.filter(
        (action) => action.id !== id,
      ),
      jobWorkflowTriggers: state.jobWorkflowTriggers.map((workflow) =>
        workflow.id === workflowId ? parentWorkflow : workflow,
      ),
      isWorkflowsChanged: true,
    };
  });
};
export const initiateJobAutomationState = (
  data: ReturnType<typeof useGetJobWorkflow>['data'],
) => {
  useJobAutomationStore.setState({
    company_templates:
      data.company_email_templates as JobAutomationState['company_templates'],
    jobWorkflowTriggers: data.job_workflows.map((workflow) => {
      return {
        ...workflow,
        category: triggerToCategoryMap[workflow.trigger],
      };
    }) as JobAutomationState['jobWorkflowTriggers'],
    jobWorkflowActions:
      data.job_workflow_actions as JobAutomationState['jobWorkflowActions'],
    isWorkflowsChanged: false,
  });
};
