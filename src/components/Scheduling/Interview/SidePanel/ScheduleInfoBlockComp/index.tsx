import dayjs from 'dayjs';

import { ScheduleInfoBlock } from '@/devlink2';

import IconScheduleType from '../../ListCard/Icon';
import { useInterviewStore } from '../../store';

function ScheduleInfoBlockComp() {
  const selectedApplication = useInterviewStore(
    (state) => state.selectedApplication,
  );

  return (
    <>
      <ScheduleInfoBlock
        textDateTimeOrSlots={
          selectedApplication?.schedule.schedule_time
            ? selectedApplication.schedule.schedule_time
              ? dayjs(
                  selectedApplication.schedule.schedule_time.startTime,
                ).format('YYYY MMM DD') +
                ' at ' +
                dayjs(
                  selectedApplication.schedule.schedule_time.startTime,
                ).format('hh:mm A')
              : '--'
            : '--'
        }
        isDuration={Boolean(selectedApplication?.schedule.duration)}
        textDuration={selectedApplication?.schedule.duration / 60 + ' min'}
        slotScheduleTypeIcon={
          <IconScheduleType
            type={selectedApplication?.schedule.schedule_type}
          />
        }
        textMeetingType={
          selectedApplication?.schedule.schedule_type == 'zoom'
            ? ' Zoom'
            : selectedApplication?.schedule.schedule_type == 'phone_call'
              ? 'Phone Call'
              : selectedApplication?.schedule.schedule_type ==
                  'in_person_meeting'
                ? 'In Person Meeting'
                : 'Google Meet'
        }
      />
    </>
  );
}

export default ScheduleInfoBlockComp;
