import TimeZone from '@/authenticated/components/TimeZone';
import { type TimezoneObj } from '@/utils/timeZone';

import { useInterviewer } from '../../hooks/useInterviewer';
import { useScheduleSettingsUpdate } from '../../hooks/useScheduleSettingsUpdate';

export const TimeZoneUser = () => {
  const { data } = useInterviewer();
  const { handleUpdate, isUpdating } = useScheduleSettingsUpdate('TimeZone');

  const timeZone = data.scheduling_settings.timeZone as TimezoneObj;

  return (
    <TimeZone
      timeZone={timeZone}
      handleUpdate={handleUpdate}
      isUpdating={isUpdating}
    />
  );
};
