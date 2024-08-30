import { dayjsLocal } from '@aglint/shared-utils';
import { Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { setCandidateAvailabilityDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { useMeetingList } from '@/src/components/Requests/ViewRequestDetails/hooks';
import { useSelfSchedulingDrawer } from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/hooks';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';

const ScheduleFlows = () => {
  const { fetchingPlan } = useSelfSchedulingFlowStore((state) => ({
    fetchingPlan: state.fetchingPlan,
  }));

  const { refetch } = useMeetingList();

  const { findAvailibility } = useSelfSchedulingDrawer({ refetch });
  return (
    <Stack width={'100%'} direction={'row'} justifyContent={'end'} gap={2}>
      <ButtonSoft
        size={1}
        color={'accent'}
        onClickButton={{
          onClick: () => {
            setCandidateAvailabilityDrawerOpen(true);
          },
        }}
        textButton={'Send Availability Link'}
      />
      <ButtonSoft
        size={1}
        color={'accent'}
        isLoading={fetchingPlan}
        onClickButton={{
          onClick: async () => {
            if (fetchingPlan) return;
            await findAvailibility({
              filters: initialFilters,
              dateRange: {
                start_date: dayjsLocal().toISOString(),
                end_date: dayjsLocal().add(7, 'day').toISOString(),
              },
            });
            setIsSelfScheduleDrawerOpen(true);
          },
        }}
        textButton={'Send SelfScheduling Link'}
      />
    </Stack>
  );
};

export default ScheduleFlows;
