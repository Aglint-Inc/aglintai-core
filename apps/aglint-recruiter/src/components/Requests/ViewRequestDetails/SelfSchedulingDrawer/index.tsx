import { Drawer } from '@mui/material';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';

import BodyDrawer from './BodyDrawer';
import ButtonMain from './ButtonGroup';
import HeaderIcon from './HeaderIcon';
import { useSelfSchedulingDrawer } from './hooks';
import { useSelfSchedulingFlowStore } from './store';
import TextDrawerTitle from './TextDrawerTitle';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const { isScheduleNowOpen, stepScheduling, fetchingPlan } =
    useSelfSchedulingFlowStore((state) => ({
      isScheduleNowOpen: state.isScheduleNowOpen,
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
        open={isScheduleNowOpen}
        onClose={() => {
          resetStateSelfScheduling();
        }}
      >
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
          isBottomBar={!fetchingPlan && stepScheduling !== 'success_screen'}
        />
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
