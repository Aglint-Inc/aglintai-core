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
import { capitalize } from 'lodash';
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
            <h3 className='mb-2 text-lg font-semibold'>Time Zone Infomation</h3>
            <UITypography variant='p' type='small'>
              {schedulingSettings?.timeZone?.label || ' - '}
            </UITypography>
          </div>
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold'>Time Zone Infomation</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* <div className='h-[100px] w-[200px] bg-gray-200'>
                <UITypography>Today</UITypography>
                <UITypography>
                  <p className='text-2xl font-bold'>{today.count}</p>
                  <p className='text-sm'>{today.label}</p>
                </UITypography>
              </div> */}
              <Card>
                <CardHeader className='bg-secondary text-secondary-foreground'>
                  <CardTitle>Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>{today.count}</p>
                  <p className='text-sm'>{today.label}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='bg-secondary text-secondary-foreground'>
                  <CardTitle>This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>{thisWeek.count}</p>
                  <p className='text-sm'>{thisWeek.label}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
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
