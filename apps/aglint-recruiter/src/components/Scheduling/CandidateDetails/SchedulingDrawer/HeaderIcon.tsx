import { GlobalIcon } from '@/devlink/GlobalIcon';

import IconSessionType from '../RightPanel/IconSessionType';
import { useSchedulingFlowStore } from './store';
import { Stack } from '@mui/material';

function HeaderIcon() {
  const { scheduleFlow, stepScheduling } = useSchedulingFlowStore((state) => ({
    scheduleFlow: state.scheduleFlow,
    stepScheduling: state.stepScheduling,
  }));
  return (
    <>
      {stepScheduling === 'reschedule' ? (
        <GlobalIcon iconName={'event_repeat'} size={4} />
      ) : stepScheduling === 'schedule_all_options' ? (
        ''
      ) : scheduleFlow === 'self_scheduling' ? (
        <Stack display={'flex'} paddingTop={'3px'}>
        <GlobalIcon iconName={'attach_email'} size={4} />
        </Stack>
      ) : scheduleFlow === 'email_agent' ? (
        <GlobalIcon iconName={'mail'} size={4} />
      ) : scheduleFlow === 'phone_agent' ? (
        <GlobalIcon iconName={'call'} size={4} />
      ) : scheduleFlow === 'create_request_availibility' ? (
        <GlobalIcon iconName={'exit_to_app'} size={4} />
      ) : scheduleFlow === 'update_request_availibility' ? (
        <GlobalIcon iconName={'exit_to_app'} size={4} />
      ) : scheduleFlow === 'debrief' ? (
        <IconSessionType type='debrief' />
      ) : null}
    </>
  );
}

export default HeaderIcon;
