import { dayjsLocal } from '@aglint/shared-utils';
import { Stack } from '@mui/material';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { NoWorkflow } from '@/devlink2/NoWorkflow';
import { setCandidateAvailabilityDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { useMeetingList } from '@/src/components/Requests/ViewRequestDetails/hooks';
import { useSelfSchedulingDrawer } from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/hooks';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';

import { useNewScheduleRequestPr } from '.';

const ChooseScheduleMode = () => {
  const { setEditTrigger, setShowEditDialog } = useNewScheduleRequestPr();
  const { fetchingPlan } = useSelfSchedulingFlowStore((state) => ({
    fetchingPlan: state.fetchingPlan,
  }));

  const { refetch } = useMeetingList();

  const { findAvailibility } = useSelfSchedulingDrawer({ refetch });
  return (
    <>
      <Stack rowGap={2}>
        <Stack width={'100%'} direction={'row'} justifyContent={'end'} gap={2}>
          <NoWorkflow
            textDesc={
              'There are no workflows set. please select an action to proceed manually or add action from below.'
            }
            slotButton={
              <>
                <ButtonSolid
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
                  isLoading={fetchingPlan}
                  textButton={'Send SelfScheduling Link'}
                />
              </>
            }
          />
        </Stack>
        <Stack direction={'row'} justifyContent={'start'}>
          <ButtonGhost
            size={1}
            isLeftIcon={true}
            iconName={'add_circle'}
            textButton={'Add Ai Actions'}
            onClickButton={{
              onClick: () => {
                setEditTrigger('onRequestSchedule');
                setShowEditDialog(true);
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default ChooseScheduleMode;
