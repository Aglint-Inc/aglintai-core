import { type SchedulingSettingType } from '@aglint/shared-types';
import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { dayjsLocal } from '@aglint/shared-utils';
import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import Typography from '@components/typography';
import { TableCell, TableRow } from '@components/ui/table';
import { capitalize } from 'lodash';
import { Calendar } from 'lucide-react';

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
}: Props) => {
  return (
    <div className='flex flex-col space-y-8'>
      <div className='grid grid-cols-2 gap-8'>
        <Section>
          <SectionHeader>
            <SectionHeaderText className='flex w-full flex-row justify-between'>
              <div>
                <SectionTitle>Working Hours</SectionTitle>
                <SectionDescription>
                  Set your company&apos;s working hours to define the
                  availability for interviews.
                </SectionDescription>
              </div>
            </SectionHeaderText>
          </SectionHeader>
          <>
            {workingHours.map((day, i) => (
              <WorkHourList key={i} day={day} />
            ))}
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
      <Typography className='px-4 pt-2 text-sm'>{load.title}</Typography>
      <div className='flex flex-col gap-1 px-4 py-2'>
        <Typography className='text-xl font-medium'>{load.count}</Typography>
        <Typography className='text-sm text-muted-foreground'>
          {load.type}
        </Typography>
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
      <Typography variant='p' type='small' className='mb-1 text-sm font-medium'>
        {title}
      </Typography>
      <Typography
        variant='p'
        type='small'
        className='mb-2 text-muted-foreground'
      >
        {description}
      </Typography>
      <div className='flex flex-wrap gap-2'>
        {keywords?.length > 0 ? (
          keywords.map((keyword, i) => {
            return (
              <div key={i} className='w-fit rounded-sm bg-gray-100 px-4 py-1'>
                <Typography type='small' variant='p'>
                  {keyword}
                </Typography>
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
