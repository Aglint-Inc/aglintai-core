import type { SchedulingSettingType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import {
  Page,
  // PageDescription,
  // PageHeader,
  // PageHeaderText,
  // PageTitle,
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
  const { recruiter, refetch } = useTenant();
  const initialData = recruiter.scheduling_settings;
  const [workingHours, setWorkingHours] = useState<
    SchedulingSettingType['workingHours']
  >([]);
  const [timeZone, setTimeZone] = useState<TimezoneObj | null>(null);
  const [selectedHourBreak, setSelectedHourBreak] = useState<{
    start_time: string;
    end_time: string;
  } | null>({ start_time: '', end_time: '' });

  useEffect(() => {
    initialLoad();
  }, [recruiter.scheduling_settings]);

  function initialLoad() {
    if (initialData) {
      const schedulingSettingData = cloneDeep(
        initialData,
      ) as SchedulingSettingType;
      setTimeZone({ ...schedulingSettingData.timeZone } as TimezoneObj);
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
      setWorkingHours(cloneDeep(schedulingSettingData.workingHours));
    }
  }

  const { mutateAsync, isPending: isUpdating } =
    api.tenant.updateTenant.useMutation({
      onSuccess: () => {
        refetch();
      },
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
      await mutateAsync({
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
      {/* <PageHeader>
        <PageHeaderText>
          <PageTitle>Working Hours</PageTitle>
          <PageDescription>
            {' '}
            Update the settings here changes will be saved automatically.
          </PageDescription>
        </PageHeaderText>
      </PageHeader> */}
      <div className='flex flex-col gap-8'>
        <TimeZone
          timeZone={timeZone}
          handleUpdate={handleUpdate}
          isUpdating={isUpdating}
        />
        <WorkTime
          workingHours={workingHours}
          handleUpdate={handleUpdate}
          isUpdating={isUpdating}
        />
        {!!selectedHourBreak && (
          <BreakTimeCard
            breakTime={selectedHourBreak}
            handleUpdate={handleUpdate}
            isUpdating={isUpdating}
          />
        )}
      </div>
    </Page>
  );
}
