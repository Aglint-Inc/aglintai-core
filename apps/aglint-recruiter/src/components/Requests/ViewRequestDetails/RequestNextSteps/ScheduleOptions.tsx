import { dayjsLocal } from '@aglint/shared-utils';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';
import { useRequest } from '@/context/RequestContext';
import { useRequests } from '@/context/RequestsContext';

import { useMeetingList } from '../../_common/hooks';
import { setCandidateAvailabilityDrawerOpen } from '../CandidateAvailability/store';
import { useSelfSchedulingDrawer } from '../SelfSchedulingDrawer/_common/hooks/hooks';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '../SelfSchedulingDrawer/_common/store/store';

const ScheduleOptions = () => {
  const [isProceeding, setIsProceeding] = React.useState(false);
  const { refetch: refetchMeetings } = useMeetingList();
  const { findAvailibility } = useSelfSchedulingDrawer({
    refetch: refetchMeetings,
  });
  const { fetchingPlan } = useSelfSchedulingFlowStore();
  const { request_workflow, requestDetails } = useRequest();
  const { handleAsyncUpdateRequest } = useRequests();

  const isWorkflowAdded = request_workflow.data.find(
    (w) => w.trigger === 'onRequestSchedule',
  );
  return (
    <>
      <ShowCode.When
        isTrue={Boolean(isWorkflowAdded) && requestDetails.status === 'to_do'}
      >
        <>
          <UIButton
            onClick={async () => {
              setIsProceeding(true);
              await handleAsyncUpdateRequest({
                payload: {
                  requestId: requestDetails.id,
                  requestPayload: { status: 'in_progress' },
                },
              });
              setTimeout(() => {
                setIsProceeding(false);
              }, 2000);
            }}
          >
            {isProceeding ? 'Proceeding...' : 'Click here Proceed'}
          </UIButton>
        </>
      </ShowCode.When>
      <ShowCode.When isTrue={Boolean(!isWorkflowAdded)}>
        <>
          <UIButton
            onClick={() => {
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
              await findAvailibility({
                filters: initialFilters,
                dateRange: {
                  start_date: dayjsLocal().toISOString(),
                  end_date: dayjsLocal().add(7, 'day').toISOString(),
                },
              });
              setIsSelfScheduleDrawerOpen(true);
            }}
          >
            Send Self Scheduling
          </UIButton>
        </>
      </ShowCode.When>
    </>
  );
};

export default ScheduleOptions;
