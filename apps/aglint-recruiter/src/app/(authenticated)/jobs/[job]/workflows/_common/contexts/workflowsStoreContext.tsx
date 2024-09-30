/* eslint-disable no-unused-vars */
import { type DatabaseTable } from '@aglint/shared-types';
import { create } from 'zustand';

import { type useGetJobWorkflow } from '../hooks';
import { type TriggerCategory, triggerToCategoryMap } from '../lib/constants';

export interface JobAutomationState {
  jobWorkflowTriggers: (DatabaseTable['workflow'] & {
    category: TriggerCategory;
  })[];
  jobWorkflowActions: DatabaseTable['workflow_action'][];
}

const initialState: JobAutomationState = {
  jobWorkflowTriggers: [],
  jobWorkflowActions: [],
};

export const useJobAutomationStore = create<JobAutomationState>()(() => ({
  ...initialState,
}));

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
  }));
};

export const updateWAction = (
  jobWorkflowActions: JobAutomationState['jobWorkflowActions'][number],
) => {
  useJobAutomationStore.setState((state) => ({
    jobWorkflowActions: state.jobWorkflowActions.map((action) =>
      action.id === jobWorkflowActions.id ? jobWorkflowActions : action,
    ),
  }));
};

export const addWaction = (
  jobWorkflowActions: JobAutomationState['jobWorkflowActions'][number],
) => {
  useJobAutomationStore.setState((state) => ({
    jobWorkflowActions: [...state.jobWorkflowActions, jobWorkflowActions],
  }));
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
  });
};
