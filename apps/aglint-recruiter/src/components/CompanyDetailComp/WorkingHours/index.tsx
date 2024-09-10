import type { schedulingSettingType } from '@aglint/shared-types';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

import type { TimezoneObj } from '@/components/CompanyDetailComp/Scheduling';

import BreakTimeCard from './BreakTime';
import TimeZone from './TimeZone';
import WorkTime from './WorkTime';

export default function WorkingHour({
  updateSettings,
  initialData,
}: {
  updateSettings: any;
  initialData: schedulingSettingType;
}) {
  const [workingHours, setWorkingHours] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj>(null);
  const [selectedHourBreak, setSelectedHourBreak] = useState<{
    start_time: string;
    end_time: string;
  } | null>({ start_time: '', end_time: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    initialLoad();
  }, []);

  function initialLoad() {
    if (initialData) {
      const schedulingSettingData = cloneDeep(
        initialData,
      ) as schedulingSettingType;
      setSelectedTimeZone({ ...schedulingSettingData.timeZone } as TimezoneObj);
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
      setWorkingHours(cloneDeep(schedulingSettingData.workingHours));
    }
  }

  const handleUpdate = async (updatedData) => {
    setIsUpdating(true);
    try {
      const schedulingSettingObj = {
        ...initialData,
        ...updatedData,
      } as schedulingSettingType;
      await updateSettings(schedulingSettingObj);
    } catch (e) {
      // Handle error
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className='flex flex-col w-[660px] gap-4 mx-auto mb-8'>
      <TimeZone
        timeZone={initialData?.timeZone?.label}
        selectedTimeZone={selectedTimeZone}
        setSelectedTimeZone={setSelectedTimeZone}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
      <WorkTime
        workingHours={workingHours}
        setWorkingHours={setWorkingHours}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
      <BreakTimeCard
        breaktime={selectedHourBreak}
        setSelectedHourBreak={setSelectedHourBreak}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
    </div>
  );
}
