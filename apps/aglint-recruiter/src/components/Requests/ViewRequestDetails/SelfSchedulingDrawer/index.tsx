import { SideDrawerLarge } from '@devlink3/SideDrawerLarge';
import { Drawer, Stack } from '@mui/material';
import { Mail } from 'lucide-react';

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
                <Mail size={4} />
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
