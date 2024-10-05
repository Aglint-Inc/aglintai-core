import { type SchedulingSettingType } from '@aglint/shared-types';
import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { dayjsLocal } from '@aglint/shared-utils';
import { EmptyState } from '@components/empty-state';
import { toast } from '@components/hooks/use-toast';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Label } from '@components/ui/label';
import { TableCell, TableRow } from '@components/ui/table';
import { capitalize } from 'lodash';
import { Calendar } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { UIButton } from '@/common/UIButton';
import DayWithTime from '@/company/components/WorkingHours/WorkTime/WorkTimeEditDialog/ui/DayWithTime';
import UITypography from '@/components/Common/UITypography';
import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { type InterviewLoadItemType, type ScheduleKeywordType } from '..';

type Props = {
  interviewLoads: InterviewLoadItemType[];
  timeZone: string;
  workingHours: SchedulingSettingType['workingHours'];
  schedulingSettings: CustomSchedulingSettingsUser;
  scheduleKeywords: ScheduleKeywordType[];
};
export const ScheduleAvailabilityUI = ({
  timeZone,
  interviewLoads,
  workingHours,
  scheduleKeywords,
  schedulingSettings,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className='flex flex-col space-y-8'>
      <div className='grid grid-cols-2 gap-8'>
        <Section>
          <SectionHeader>
            <SectionHeaderText>
              <SectionTitle>Working Hours</SectionTitle>
              <SectionDescription>
                Set your company&apos;s working hours to define the availability
                for interviews.
              </SectionDescription>
            </SectionHeaderText>
          </SectionHeader>
          <>
            <UIButton size='sm' onClick={() => setIsEdit(true)}>
              Edit
            </UIButton>
            {isEdit ? (
              <WorkingHourEdit
                schedulingSettings={schedulingSettings}
                setEdit={setIsEdit}
              />
            ) : (
              workingHours.map((day, i) => <WorkHourList key={i} day={day} />)
            )}
          </>
        </Section>
        <div className='flex flex-col gap-8'>
          <Section>
            <SectionHeader>
              <SectionHeaderText>
                <SectionTitle>Time Zone</SectionTitle>
              </SectionHeaderText>
            </SectionHeader>
            {timeZone || ' - '}
          </Section>

          <Section>
            <SectionHeader>
              <SectionHeaderText>
                <SectionTitle>Interview Load</SectionTitle>
              </SectionHeaderText>
            </SectionHeader>
            <div className='flex gap-3'>
              {interviewLoads.map((load) => {
                return <LoadCard key={load.title} load={load} />;
              })}
            </div>
          </Section>
        </div>
      </div>

      <Section>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle>Scheduling Keywords</SectionTitle>
            <SectionDescription>
              Scheduling Keywords help candidates find your interviews
              availability.
            </SectionDescription>
          </SectionHeaderText>
        </SectionHeader>
        {scheduleKeywords.map((keyword) => {
          return (
            <div key={keyword.title}>
              <KeywordViewSection
                key={keyword.title}
                title={keyword.title}
                description={keyword.description}
                keywords={keyword.keywords}
              />
            </div>
          );
        })}
      </Section>
    </div>
  );
};

const WorkingHourEdit = ({
  schedulingSettings,
  setEdit,
}: {
  schedulingSettings: CustomSchedulingSettingsUser;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [localWorkingHour, setLocalWorkingHour] = useState<
    CustomSchedulingSettingsUser['workingHours']
  >(schedulingSettings['workingHours']);

  const router = useRouterPro();
  const user_id = router?.params?.user as string;
  const { mutateAsync } = api.user.update_user.useMutation();

  const updateHandle = async () => {
    try {
      setIsSaving(true);
      const schedulingSettingObj: CustomSchedulingSettingsUser = {
        ...schedulingSettings,
        workingHours: localWorkingHour,
      };

      await mutateAsync({
        scheduling_settings: schedulingSettingObj,
        user_id,
      });
      toast({ title: 'Availability update Successfully' });
      setEdit(false);
    } catch (e) {
      toast({ title: 'Availability update failed', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='mb-4 flex flex-col gap-4'>
      <Label>Edit Working Hours</Label>
      {localWorkingHour.map((day, i) => {
        const startTime = dayjsLocal()
          .set('hour', parseInt(day.timeRange.startTime?.split(':')[0] || '0'))
          .set(
            'minute',
            parseInt(day.timeRange.startTime?.split(':')[1] || '0'),
          )
          .toISOString();

        const endTime = dayjsLocal()
          .set('hour', parseInt(day.timeRange.endTime?.split(':')[0] || '0'))
          .set('minute', parseInt(day.timeRange.endTime?.split(':')[1] || '0'))
          .toISOString();

        return (
          <DayWithTime
            key={i}
            day={day}
            i={i}
            startTime={startTime}
            endTime={endTime}
            selectStartTime={(value, i) => {
              setLocalWorkingHour((pre) => {
                const data = [...pre];
                data[i].timeRange.startTime = dayjsLocal(value).format('HH:mm');
                return data;
              });
            }}
            selectEndTime={(value, i) => {
              setLocalWorkingHour((pre) => {
                const data = [...pre];
                data[i].timeRange.endTime = dayjsLocal(value).format('HH:mm');
                return data;
              });
            }}
            setWorkingHours={setLocalWorkingHour}
          />
        );
      })}
      <UIButton isLoading={isSaving} disabled={isSaving} onClick={updateHandle}>
        Save
      </UIButton>
    </div>
  );
};

const WorkHourList = ({
  day,
}: {
  day: SchedulingSettingType['workingHours'][number];
}) => {
  const time =
    dayjsLocal()
      .set('hour', parseInt(day.timeRange.startTime.split(':')[0]))
      .set('minute', parseInt(day.timeRange.startTime.split(':')[1]))
      .format('hh:mm A') +
    ' to ' +
    dayjsLocal()
      .set('hour', parseInt(day.timeRange.endTime.split(':')[0]))
      .set('minute', parseInt(day.timeRange.endTime.split(':')[1]))
      .format('hh:mm A');

  return (
    <TableRow className='border-none hover:bg-transparent'>
      <TableCell className='font-medium'>{capitalize(day.day)}</TableCell>
      <TableCell>{time}</TableCell>
    </TableRow>
  );
};

const LoadCard = ({ load }: { load: InterviewLoadItemType }) => {
  return (
    <div className='h-fit min-w-[150px] rounded-sm bg-gray-50'>
      <UITypography className='px-4 pt-2 text-sm'>{load.title}</UITypography>
      <div className='flex flex-col gap-1 px-4 py-2'>
        <UITypography className='text-xl font-medium'>
          {load.count}
        </UITypography>
        <UITypography className='text-sm text-muted-foreground'>
          {load.type}
        </UITypography>
      </div>
    </div>
  );
};

const KeywordViewSection = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string[];
}) => {
  return (
    <div className='mb-12 flex flex-col'>
      <UITypography
        variant='p'
        type='small'
        className='mb-1 text-sm font-medium'
      >
        {title}
      </UITypography>
      <UITypography
        variant='p'
        type='small'
        className='mb-2 text-muted-foreground'
      >
        {description}
      </UITypography>
      <div className='flex flex-wrap gap-2'>
        {keywords?.length > 0 ? (
          keywords.map((keyword, i) => {
            return (
              <div key={i} className='w-fit rounded-sm bg-gray-100 px-4 py-1'>
                <UITypography type='small' variant='p'>
                  {keyword}
                </UITypography>
              </div>
            );
          })
        ) : (
          <EmptyState icon={Calendar} header={'No ' + title} />
        )}
      </div>
    </div>
  );
};
