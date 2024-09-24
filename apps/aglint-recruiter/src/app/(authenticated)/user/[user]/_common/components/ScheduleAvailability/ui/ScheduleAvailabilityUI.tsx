import { type schedulingSettingType } from '@aglint/shared-types';
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

import UITypography from '@/components/Common/UITypography';

import { type InterviewLoadItemType, type ScheduleKeywordType } from '..';

type Props = {
  interviewLoads: InterviewLoadItemType[];
  timeZone: string;
  workingHours: schedulingSettingType['workingHours'];
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
        <UITypography variant='p' type='small'>
          {timeZone || ' - '}
        </UITypography>
      </SectionSubCard>

      <SectionSubCard title='Interview Load'>
        <div className='flex gap-5'>
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
        <Table>
          <TableHeader>
            <TableRow>
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

const SectionSubCard = ({ title, children }) => {
  return (
    <div className='mb-6'>
      <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

const WorkHourList = ({ day }) => {
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

const LoadCard = ({ load }) => {
  return (
    <div className='h-fit min-w-[150px] rounded-sm border-[1px]'>
      <UITypography className='bg-gray-100 px-4 py-2 text-lg font-semibold'>
        {load.title}
      </UITypography>
      <div className='flex gap-2 px-4 py-2'>
        <UITypography className='text-sm font-bold'>{load.count}</UITypography>
        <UITypography className='text-sm'>{load.type}</UITypography>
      </div>
    </div>
  );
};

const KeywordViewSection = ({ title, description, keywords }) => {
  return (
    <div className='mb-6'>
      <UITypography
        variant='p'
        type='small'
        className='mb-1 text-lg font-semibold'
      >
        {title}
      </UITypography>
      <UITypography variant='p' type='small' className='mb-4'>
        {description}
      </UITypography>
      <div className='flex flex-wrap gap-2'>
        {keywords.map((keyword, i) => {
          return (
            <div
              key={i}
              className='w-fit rounded-full bg-gray-100 px-4 py-1 text-gray-900'
            >
              <UITypography type='small' variant='p'>
                {keyword}
              </UITypography>
            </div>
          );
        })}
      </div>
    </div>
  );
};
