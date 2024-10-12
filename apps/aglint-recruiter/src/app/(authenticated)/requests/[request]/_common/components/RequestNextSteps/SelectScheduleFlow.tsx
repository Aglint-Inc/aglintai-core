import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { useRequest } from '@request/hooks';
import React from 'react';

import { UIButton } from '@/common/UIButton';
import { supabase } from '@/utils/supabase/client';

import { setCandidateAvailabilityDrawerOpen } from '../CandidateAvailability/_common/contexts/CandidateAvailabilityFlowStore';
import { deleteRequestWorkflowAction } from '../RequestProgress/utils';
import { useFindAvailibility } from '../SelfSchedulingDrawer/_common/hooks/useFindAvailibility';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '../SelfSchedulingDrawer/_common/store/store';

const SelectScheduleFlow = () => {
  const { request_workflow, requestDetails } = useRequest();
  const { findAvailibility } = useFindAvailibility();
  const { fetchingPlan } = useSelfSchedulingFlowStore();
  const addedWorkflow = request_workflow.data.find(
    (w) => w.trigger === 'onRequestSchedule',
  );
  let scheduleWorkflowAction: DatabaseTable['workflow_action'] | null = null;
  if (addedWorkflow && addedWorkflow.workflow_action.length > 0) {
    scheduleWorkflowAction = addedWorkflow.workflow_action[0];
  }

  return (
    <div className='flex space-x-2'>
      <UIButton
        onClick={async () => {
          if (scheduleWorkflowAction) {
            await deleteRequestWorkflowAction(scheduleWorkflowAction.id);
            await deleteRequestProgress(requestDetails.id);
            await request_workflow.refetch();
          }
          setCandidateAvailabilityDrawerOpen(true);
        }}
        variant='outline'
        size='sm'
      >
        Get Availability
      </UIButton>

      <UIButton
        isLoading={fetchingPlan}
        size='sm'
        onClick={async () => {
          if (fetchingPlan) return;
          if (scheduleWorkflowAction) {
            await deleteRequestWorkflowAction(scheduleWorkflowAction.id);
            await deleteRequestProgress(requestDetails.id);

            await request_workflow.refetch();
          }
          await findAvailibility({
            filters: initialFilters,
            dateRange: {
              start_date: dayjsLocal().toISOString(),
              end_date: dayjsLocal().add(14, 'day').toISOString(),
            },
          });
          setIsSelfScheduleDrawerOpen(true);
        }}
      >
        Send Self Scheduling
      </UIButton>
    </div>
  );
};

export default SelectScheduleFlow;

const deleteRequestProgress = async (requestId: string) => {
  await supabase.from('request_progress').delete().eq('request_id', requestId);
};
