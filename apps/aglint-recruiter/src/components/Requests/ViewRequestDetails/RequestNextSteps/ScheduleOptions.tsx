import { dayjsLocal } from '@aglint/shared-utils';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { useMeetingList } from '../../_common/hooks';
import { setCandidateAvailabilityDrawerOpen } from '../CandidateAvailability/store';
import { useSelfSchedulingDrawer } from '../SelfSchedulingDrawer/hooks';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '../SelfSchedulingDrawer/store';

const ScheduleOptions = () => {
  const { refetch: refetchMeetings } = useMeetingList();

  const { findAvailibility } = useSelfSchedulingDrawer({
    refetch: refetchMeetings,
  });
  const { fetchingPlan } = useSelfSchedulingFlowStore();
  return (
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
  );
};

export default ScheduleOptions;
