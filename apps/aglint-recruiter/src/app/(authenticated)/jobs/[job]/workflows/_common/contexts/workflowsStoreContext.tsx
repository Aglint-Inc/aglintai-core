/* eslint-disable no-unused-vars */
import { type DatabaseTable } from '@aglint/shared-types';
import { template } from 'lodash';
import { create } from 'zustand';

import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { type useGetJobWorkflow } from '../hooks';
import { type TriggerCategory, triggerToCategoryMap } from '../lib/constants';

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
  jobWorkflowTriggers: JobAutomationState['jobWorkflowTriggers'][number],
) => {
  useJobAutomationStore.setState((state) => ({
    jobWorkflowTriggers: state.jobWorkflowTriggers.map((trigger) =>
      trigger.id === jobWorkflowTriggers.id ? jobWorkflowTriggers : trigger,
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
  const actionTrigger = jobWorkflowAction.target_api.split(
    '_',
  )[0] as keyof typeof ACTION_TRIGGER_MAP;
  useJobAutomationStore.setState((state) => {
    const templateData = state.company_templates.find(
      (temp) => temp.type === jobWorkflowAction.target_api,
    );
    if (templateData) {
      if (jobWorkflowAction.action_type === 'email') {
        jobWorkflowAction.payload = {
          email: {
            subject: templateData.subject,
            body: templateData.body,
          },
        };
      } else {
        const actionDetails = ACTION_TRIGGER_MAP[actionTrigger].find(
          (action) => {
            action.value.target_api === jobWorkflowAction.target_api;
          },
        );
        if (actionDetails) {
          jobWorkflowAction.payload = actionDetails.value.payload as any; // TODO: null chck
        }
      }
    }
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
      state.jobWorkflowActions.filter((action) => action.id === id).length === 1
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
