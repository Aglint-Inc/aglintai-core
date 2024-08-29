import { Drawer, Stack } from '@mui/material';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import CalendarResourceView from '@/src/components/Common/CalendarResourceView';

import BodyDrawer from './BodyDrawer';
import ButtonMain from './ButtonGroup';
import HeaderIcon from './HeaderIcon';
import { useSelfSchedulingDrawer } from './hooks';
import { useSelfSchedulingFlowStore } from './store';
import TextDrawerTitle from './TextDrawerTitle';
import Calendar from './Calendar';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
  const {
    isSelfScheduleDrawerOpen,
    stepScheduling,
    fetchingPlan,
    availabilities,
    dateRange,
  } = useSelfSchedulingFlowStore((state) => ({
    isSelfScheduleDrawerOpen: state.isSelfScheduleDrawerOpen,
    stepScheduling: state.stepScheduling,
    fetchingPlan: state.fetchingPlan,
    availabilities: state.availabilities,
    dateRange: state.dateRange,
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
        </Stack>
      </Drawer>
    </>
  );
}

export default SelfSchedulingDrawer;
