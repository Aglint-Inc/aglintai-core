import { Drawer, Stack } from '@mui/material';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';

import BodyDrawer from './BodyDrawer';
import ButtonMain from './ButtonGroup';
import Calendar from './Calendar';
import { useSelfSchedulingDrawer } from './hooks';
import { useSelfSchedulingFlowStore } from './store';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const { isSelfScheduleDrawerOpen, stepScheduling, fetchingPlan } =
    useSelfSchedulingFlowStore((state) => ({
      isSelfScheduleDrawerOpen: state.isSelfScheduleDrawerOpen,
      stepScheduling: state.stepScheduling,
      fetchingPlan: state.fetchingPlan,
    }));

  const { resetStateSelfScheduling } = useSelfSchedulingDrawer({
    refetch,
  });

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isSelfScheduleDrawerOpen}
        onClose={() => {
          resetStateSelfScheduling();
        }}
      >
        <Stack direction={'row'}>
          <Calendar />
          <SideDrawerLarge
            drawerSize={'medium'}
            onClickCancel={{
              onClick: () => {
                resetStateSelfScheduling();
              },
            }}
            slotHeaderIcon={
              <Stack display={'flex'} paddingTop={'3px'}>
                <GlobalIcon iconName={'attach_email'} size={4} />
              </Stack>
            }
            textDrawertitle={'Self Scheduling Request'}
            slotButtons={<ButtonMain refetch={refetch} />}
            slotSideDrawerbody={<BodyDrawer />}
            isBottomBar={!fetchingPlan && stepScheduling !== 'success_screen'}
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
