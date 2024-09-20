import { dayjsLocal } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import capitalize from 'lodash/capitalize';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';

import { type useInterviewer } from '../../hooks/useInterviewer';
import { EditForm } from './EditDialog';
export default function ScheduleAvailability({
  schedulingSettings,
  interviewTodayWeek,
}: {
  schedulingSettings: ReturnType<
    typeof useInterviewer
  >['data']['scheduling_settings'];
  interviewTodayWeek: ReturnType<
    typeof useInterviewer
  >['data']['interview_week_today'];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const {
    total_hours_this_week,
    total_interviews_this_week,
    total_hours_today,
    total_interviews_today,
  } = interviewTodayWeek;

  const thisWeek = {
    label:
      schedulingSettings?.interviewLoad?.weeklyLimit.type === 'Interviews'
        ? 'Interview'
        : 'Hour',
    count:
      schedulingSettings?.interviewLoad?.weeklyLimit.type === 'Interviews'
        ? total_interviews_this_week +
            ' / ' +
            schedulingSettings?.interviewLoad?.weeklyLimit.value || 0
        : total_hours_this_week +
            ' / ' +
            schedulingSettings?.interviewLoad?.weeklyLimit.value || 0,
  };
  const today = {
    label:
      schedulingSettings?.interviewLoad?.dailyLimit.type === 'Interviews'
        ? 'Interview'
        : 'Hour',
    count:
      schedulingSettings?.interviewLoad?.dailyLimit.type === 'Interviews'
        ? total_interviews_today +
            ' / ' +
            schedulingSettings?.interviewLoad?.dailyLimit.value || 0
        : total_hours_today +
            ' / ' +
            schedulingSettings?.interviewLoad?.dailyLimit.value || 0,
  };

  return (
    <>
      <Card
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
      >
        <CardHeader>
          <CardTitle className='text-xl'>
            <div className='flex h-[40px] w-full justify-between'>
              <UITypography>Availability</UITypography>
              {isHover && (
                <UIButton
                  size='sm'
                  variant='secondary'
                  onClick={() => setIsEditOpen(true)}
                  icon={<Pencil />}
                />
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold'>Time Zone</h3>
            <UITypography variant='p' type='small'>
              {schedulingSettings?.timeZone?.label || ' - '}
            </UITypography>
          </div>
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold'>Interview Load</h3>
            <div className='flex gap-5'>
              {/* <div className='h-[100px] w-[200px] bg-gray-200'>
                <UITypography>Today</UITypography>
                <UITypography>
                  <p className='text-2xl font-bold'>{today.count}</p>
                  <p className='text-sm'>{today.label}</p>
                </UITypography>
              </div> */}
              <div className='h-fit min-w-[150px] rounded-sm border-[1px]'>
                <UITypography className='bg-gray-100 px-4 py-2 text-lg font-semibold'>
                  Today
                </UITypography>
                <div className='flex gap-2 px-4 py-2'>
                  <UITypography className='text-sm font-bold'>
                    {today.count}
                  </UITypography>
                  <UITypography className='text-sm'>{today.label}</UITypography>
                </div>
              </div>
              <div className='h-fit min-w-[150px] rounded-sm border-[1px]'>
                <UITypography className='bg-gray-100 px-4 py-2 text-lg font-semibold'>
                  This Week
                </UITypography>
                <div className='flex gap-2 px-4 py-2'>
                  <UITypography className='text-sm font-bold'>
                    {thisWeek.count}
                  </UITypography>
                  <UITypography className='text-sm'>
                    {thisWeek.label}
                  </UITypography>
                </div>
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold'>Working Hours</h3>
            <p className='mb-4 text-sm text-muted-foreground'>
              Set your company&apos;s working hours to define the availability
              for interviews.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedulingSettings.workingHours
                  .filter((day) => day.isWorkDay)
                  .map((day, i) => (
                    <TableRow key={i}>
                      <TableCell className='font-medium'>
                        {capitalize(day.day)}
                      </TableCell>
                      <TableCell>
                        {dayjsLocal()
                          .set(
                            'hour',
                            parseInt(day.timeRange.startTime.split(':')[0]),
                          )
                          .set(
                            'minute',
                            parseInt(day.timeRange.startTime.split(':')[1]),
                          )
                          .format('hh:mm A') +
                          ' to ' +
                          dayjsLocal()
                            .set(
                              'hour',
                              parseInt(day.timeRange.endTime.split(':')[0]),
                            )
                            .set(
                              'minute',
                              parseInt(day.timeRange.endTime.split(':')[1]),
                            )
                            .format('hh:mm A')}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold'>Scheduling Keywords</h3>
            <div className='mb-6'>
              <UITypography
                variant='p'
                type='small'
                className='mb-1 text-lg font-semibold'
              >
                Free
              </UITypography>
              <UITypography variant='p' type='small' className='mb-4'>
                When these keywords appear in a calendar event title,
                overlapping interviews will not be considered scheduling
                conflicts.
              </UITypography>
              <ViewKeywords
                keywords={schedulingSettings.schedulingKeyWords.free}
                // setKeywords={setFreeKeywords}
              />
            </div>
            <div className='mb-6'>
              <UITypography
                variant='p'
                type='small'
                className='mb-1 text-lg font-semibold'
              >
                Soft Conflicts
              </UITypography>
              <UITypography variant='p' type='small' className='mb-4'>
                When these keywords are found in a calendar event title,
                overlapping interviews will be marked as soft conflicts and will
                require your confirmation to schedule.
              </UITypography>
              <ViewKeywords
                keywords={schedulingSettings.schedulingKeyWords.SoftConflicts}
              />
            </div>
            <div className='mb-6'>
              <UITypography
                variant='p'
                type='small'
                className='mb-1 text-lg font-semibold'
              >
                Out of Office
              </UITypography>
              <UITypography variant='p' type='small' className='mb-4'>
                When any of these specified keywords appear in a calendar event
                title, the day will be considered an Out of Office day, and
                interviews will not be scheduled.
              </UITypography>
              <ViewKeywords
                keywords={schedulingSettings.schedulingKeyWords.outOfOffice}
              />
            </div>
            <div className='mb-6'>
              <UITypography
                variant='p'
                type='small'
                className='mb-1 text-lg font-semibold'
              >
                Recruiting Blocks
              </UITypography>
              <UITypography variant='p' type='small' className='mb-4'>
                If these keywords are found in a calendar event title, these
                blocks will be given first preference for scheduling interviews.
              </UITypography>
              <ViewKeywords
                keywords={
                  schedulingSettings.schedulingKeyWords.recruitingBlocks
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <UIDialog
        open={isEditOpen}
        title='Update Availability'
        size='xl'
        onClose={() => setIsEditOpen(false)}
        slotButtons={<></>}
      >
        <EditForm
          schedulingSettings={schedulingSettings}
          setIsEditOpen={setIsEditOpen}
        />
      </UIDialog>
    </>
  );
}

const ViewKeywords = ({ keywords }: { keywords: string[] }) => {
  return (
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
  );
};
