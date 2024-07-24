
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { useSchedulingApplicationStore } from '../store';
import { useSchedulingFlowStore } from './store';

function TextDrawerTitle() {
  const  selectedApplication  = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const { scheduleFlow, stepScheduling } = useSchedulingFlowStore((state) => ({
    stepScheduling: state.stepScheduling,
    scheduleFlow: state.scheduleFlow,
  }));
  return (
    <>
      {(stepScheduling === 'reschedule'
        ? 'Reschedule'
        : stepScheduling === 'schedule_all_options'
          ? 'Schedule'
          : scheduleFlow === 'self_scheduling'
            ? 'Self Scheduling Request'
            : scheduleFlow === 'email_agent'
              ? 'Schedule with Email Agent'
              : scheduleFlow === 'phone_agent'
                ? 'Schedule with Phone Agent'
                : scheduleFlow === 'create_request_availibility'
                  ? 'Request Availability'
                  : scheduleFlow === 'update_request_availibility'
                    ? 'Update Request Availability'
                    : scheduleFlow === 'debrief'
                      ? 'Schedule Debrief'
                      : 'Schedule Now') +
        ` to ${getFullName(selectedApplication.candidates.first_name, selectedApplication.candidates.last_name)} for ${capitalizeFirstLetter(selectedApplication.public_jobs.job_title)}`}
    </>
  );
}

export default TextDrawerTitle;
