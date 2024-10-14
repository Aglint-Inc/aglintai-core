import { type SchedulingSettingType } from '@aglint/shared-types';

import WorkTime from '@/authenticated/components/WorkTime';

import { useInterviewer } from '../../hooks/useInterviewer';
import { useScheduleSettingsUpdate } from '../../hooks/useScheduleSettingsUpdate';

export const WorkingHours = () => {
  const { handleUpdate, isUpdating } =
    useScheduleSettingsUpdate('Working Hours');

  const { data } = useInterviewer();

  const { scheduling_settings } = data;
  const workingHours =
    scheduling_settings.workingHours as SchedulingSettingType['workingHours'];

  return (
    <WorkTime
      workingHours={workingHours}
      handleUpdate={handleUpdate}
      isUpdating={isUpdating}
    />
  );
};
