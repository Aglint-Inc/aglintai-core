import type { SchedulingSettingType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';
import { type TimezoneObj } from '@/utils/timeZone';

import BreakTimeCard from './BreakTime';
import TimeZone from './TimeZone';
import WorkTime from './WorkTime';

export default function WorkingHour() {
  const { recruiter } = useTenant();
  const initialData = recruiter.scheduling_settings;
  const [workingHours, setWorkingHours] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj>(null);
  const [selectedHourBreak, setSelectedHourBreak] = useState<{
    start_time: string;
    end_time: string;
  } | null>({ start_time: '', end_time: '' });

  useEffect(() => {
    initialLoad();
  }, []);

  function initialLoad() {
    if (initialData) {
      const schedulingSettingData = cloneDeep(
        initialData,
      ) as SchedulingSettingType;
      setSelectedTimeZone({ ...schedulingSettingData.timeZone } as TimezoneObj);
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
      setWorkingHours(cloneDeep(schedulingSettingData.workingHours));
    }
  }

  const { mutate } = api.tenant.updateTenant.useMutation({
    onError: () => {
      toast({
        title: 'Unable to update working hours',
        variant: 'destructive',
      });
    },
  });

  const handleUpdate = async (updatedData: SchedulingSettingType) => {
    try {
      const schedulingSettingObj: SchedulingSettingType = {
        ...initialData,
        ...updatedData,
      };
      mutate({
        scheduling_settings: schedulingSettingObj,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  };

  return (
    <div className='mb-8 flex flex-col gap-4'>
      <div className='flex flex-col'>
        <h2 className='mb-1 text-xl font-semibold'>Working Hours</h2>
        <p className='text-gray-600'>
          List company holidays to exclude them from scheduling.
        </p>
      </div>
      <div className='flex flex-col'>
        <TimeZone
          timeZone={initialData?.timeZone?.label}
          selectedTimeZone={selectedTimeZone}
          setSelectedTimeZone={setSelectedTimeZone}
          handleUpdate={handleUpdate}
        />
        <WorkTime
          workingHours={workingHours}
          setWorkingHours={setWorkingHours}
          handleUpdate={handleUpdate}
        />
        <BreakTimeCard
          breaktime={selectedHourBreak}
          setSelectedHourBreak={setSelectedHourBreak}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
