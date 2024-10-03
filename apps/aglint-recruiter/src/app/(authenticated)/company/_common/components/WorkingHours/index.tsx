import type { SchedulingSettingType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import {
  Page,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
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
  const [workingHours, setWorkingHours] = useState<
    SchedulingSettingType['workingHours']
  >([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj | null>(
    null,
  );
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

  const handleUpdate = async (updatedData: Partial<SchedulingSettingType>) => {
    try {
      const schedulingSettingObj = {
        ...initialData,
        ...updatedData,
      } as SchedulingSettingType;
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
    <Page>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Working Hours</PageTitle>
          <PageDescription>
            {' '}
            Update the settings here changes will be saved automatically.
          </PageDescription>
        </PageHeaderText>
      </PageHeader>
      <div className='flex flex-col space-y-12'>
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
        {!!selectedHourBreak && (
          <BreakTimeCard
            breakTime={selectedHourBreak}
            setSelectedHourBreak={setSelectedHourBreak}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </Page>
  );
}
