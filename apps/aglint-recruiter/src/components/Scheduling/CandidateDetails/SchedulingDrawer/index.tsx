import { Drawer, Stack } from '@mui/material';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';

import BodyDrawer from './BodyDrawer';
import ButtonMain from './ButtonGroup';
import HeaderIcon from './HeaderIcon';
import { useSchedulingDrawer } from './hooks';
import { useSchedulingFlowStore } from './store';
import TextDrawerTitle from './TextDrawerTitle';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const { isScheduleNowOpen, stepScheduling, fetchingPlan } =
    useSchedulingFlowStore((state) => ({
      isScheduleNowOpen: state.isScheduleNowOpen,
      stepScheduling: state.stepScheduling,
      fetchingPlan: state.fetchingPlan,
    }));

  const { resetStateSelfScheduling } = useSchedulingDrawer({
    refetch,
  });

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isScheduleNowOpen}
        onClose={() => {
          resetStateSelfScheduling();
        }}
      >
        <Stack direction={'row'}>
          <SideDrawerLarge
            onClickCancel={{
              onClick: () => {
                resetStateSelfScheduling();
              },
            }}
            slotHeaderIcon={<HeaderIcon />}
            textDrawertitle={<TextDrawerTitle />}
            slotButtons={<ButtonMain refetch={refetch} />}
            slotSideDrawerbody={<BodyDrawer />}
            isBottomBar={
              !fetchingPlan &&
              stepScheduling !== 'request_availibility' &&
              stepScheduling !== 'success_screen' &&
              stepScheduling !== 'agents_final_screen_cta'
            }
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
