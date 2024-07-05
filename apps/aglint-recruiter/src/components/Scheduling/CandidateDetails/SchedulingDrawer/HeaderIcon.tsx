import { GlobalIcon } from '@/devlink/GlobalIcon';

import IconSessionType from '../RightPanel/IconSessionType';
import { useSchedulingFlowStore } from './store';

function HeaderIcon() {
  const { scheduleFlow, stepScheduling } = useSchedulingFlowStore((state) => ({
    scheduleFlow: state.scheduleFlow,
    stepScheduling: state.stepScheduling,
  }));
  return (
    <>
      {stepScheduling === 'reschedule' ? (
        <GlobalIcon iconName={'event_repeat'} size={4} />
      ) : scheduleFlow === 'self_scheduling' ? (
        <GlobalIcon iconName={'attach_email'} size={4} />
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
