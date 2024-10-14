import { type SchedulingSettingType } from '@aglint/shared-types';

import BreakTimeCard from '@/authenticated/components/BreakTime';

import { useInterviewer } from '../../hooks/useInterviewer';
import { useScheduleSettingsUpdate } from '../../hooks/useScheduleSettingsUpdate';

export const BreakTime = () => {
  const { handleUpdate, isUpdating } =
    useScheduleSettingsUpdate('Working Hours');

  const { data } = useInterviewer();

  const { scheduling_settings } = data;
  const breakTime =
    scheduling_settings.break_hour as SchedulingSettingType['break_hour'];

  return (
    <BreakTimeCard
      breakTime={breakTime}
      handleUpdate={handleUpdate}
      isUpdating={isUpdating}
    />
  );
};
