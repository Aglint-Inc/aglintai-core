import { type SchedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { capitalize } from 'lodash';
import { Calendar } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import UITypography from '@/components/Common/UITypography';

import { type InterviewLoadItemType, type ScheduleKeywordType } from '..';

type Props = {
  interviewLoads: InterviewLoadItemType[];
  timeZone: string;
  workingHours: SchedulingSettingType['workingHours'];
  scheduleKeywords: ScheduleKeywordType[];
};
export const ScheduleAvailabilityUI = ({
  timeZone,
  interviewLoads,
  workingHours,
  scheduleKeywords,
}: Props) => {
  return (
    <>
      <SectionSubCard title='Time Zone'>

        <UITypography variant='p' type='small' >
          {timeZone || ' - '}
        </UITypography>
      </SectionSubCard>

      <SectionSubCard title='Interview Load'>
        <div className='flex gap-3'>
          {interviewLoads.map((load) => {
            return <LoadCard key={load.title} load={load} />;
          })}
        </div>
      </SectionSubCard>

      <SectionSubCard title='Working Hours'>
        <p className='mb-4 text-sm text-muted-foreground'>
          Set your company&apos;s working hours to define the availability for
          interviews.
        </p>
        <div className='border rounded-md overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-100'>
              <TableHead>Day</TableHead>
              <TableHead>Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workingHours.map((day, i) => (
              <WorkHourList key={i} day={day} />
            ))}
          </TableBody>
        </Table>
        </div>
      </SectionSubCard>
      <SectionSubCard title='Scheduling Keywords'>
        {scheduleKeywords.map((keyword) => {
          return (
            <KeywordViewSection
              key={keyword.title}
              title={keyword.title}
              description={keyword.description}
              keywords={keyword.keywords}
            />
          );
        })}
      </SectionSubCard>
    </>
  );
};

const SectionSubCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='mb-6'>
      <h3 className='mb-2 text-md font-medium'>{title}</h3>
      <div>{children}</div>
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
    <TableRow>
      <TableCell className='font-medium'>{capitalize(day.day)}</TableCell>
      <TableCell>{time}</TableCell>
    </TableRow>
  );
};

const LoadCard = ({ load }: { load: InterviewLoadItemType }) => {
  return (
    <div className='h-fit min-w-[150px] rounded-sm bg-gray-50'>
      <UITypography className='px-4 pt-2 text-sm'>
        {load.title}
      </UITypography>
      <div className='flex flex-col gap-1 px-4 py-2 '>
        <UITypography className='text-xl font-medium'>{load.count}</UITypography>
        <UITypography className='text-sm text-muted-foreground'>{load.type}</UITypography>
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
    <div className='mb-6'>
      <UITypography
        variant='p'
        type='small'
        className='mb-1 text-sm font-medium'
      >
        {title}
      </UITypography>
      <UITypography variant='p' type='small' className='mb-2 text-muted-foreground'>
        {description}
      </UITypography>
      <div className='flex flex-wrap gap-2'>
        {keywords?.length > 0 ? (
          keywords.map((keyword, i) => {
            return (
              <div
                key={i}
                className='w-fit rounded-sm bg-gray-100 px-4 py-1 text-gray-900'
              >
                <UITypography type='small' variant='p'>
                  {keyword}
                </UITypography>
              </div>
            );
          })
        ) : (
          <GlobalEmpty
            icon={
              <Calendar
                strokeWidth={2}
                className='h-6 w-6 text-muted-foreground'
              />
            }
            header={'No ' + title}
          />
        )}
      </div>
    </div>
  );
};
