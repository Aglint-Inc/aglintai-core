import dayjs from 'dayjs';

import { ScheduleInfoBlock } from '@/devlink2';

import IconScheduleType from '../../ListCard/Icon';
import { useInterviewStore } from '../../store';
import { getScheduleType } from '../../utils';

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
        textDuration={
          selectedApplication?.schedule.duration + ' minutes' || '--'
        }
        slotScheduleTypeIcon={
          <IconScheduleType
            type={selectedApplication?.schedule.schedule_type}
          />
        }
        textMeetingType={getScheduleType(
          selectedApplication?.schedule.schedule_type,
        )}
      />
    </>
  );
}

export default ScheduleInfoBlockComp;
