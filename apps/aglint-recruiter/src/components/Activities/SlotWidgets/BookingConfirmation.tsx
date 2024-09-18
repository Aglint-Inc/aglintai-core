import type { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Card, CardContent } from '@components/ui/card';
import { Calendar, Clock } from 'lucide-react';

import { getBreakLabel } from '@/utils/getBreakLabel';

import { getScheduleType } from '../../../utils/scheduling/colors_and_enums';
import IconScheduleType from '../../Common/Icons/IconScheduleType';
import IconSessionType from '../../Common/Icons/IconSessionType';
import { formatTimeWithTimeZone } from '../../Scheduling/utils';

function BookingConfirmation({
  act,
}: {
  act: DatabaseTable['application_logs'];
}) {
  if (act.metadata.type === 'booking_confirmation') {
    const sessions = act.metadata.sessions;

    return (
      <div className='flex w-full flex-col space-y-4'>
        {sessions.map((session) => (
          <Card key={session.id} className={'w-full'}>
            <CardContent className='w-full p-4'>
              <div className='mb-2 flex items-center space-x-2'>
                <Calendar className='h-5 w-5 text-muted-foreground' />
                <span className='font-medium'>
                  {dayjsLocal(session.interview_meeting.start_time).format(
                    'DD MMMM YYYY',
                  )}
                </span>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='flex-shrink-0'>
                  <IconSessionType type={session.session_type} />
                </div>
                <div className='flex-grow'>
                  <h4 className='font-semibold'>{session.name}</h4>
                  <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                    <Clock className='h-4 w-4' />
                    <span>{getBreakLabel(session.session_duration)}</span>
                  </div>
                  <div className='flex items-center space-x-2 text-sm'>
                    <IconScheduleType type={session.schedule_type} />
                    <span>{getScheduleType(session.schedule_type)}</span>
                  </div>
                  <p className='mt-1 text-sm'>
                    {formatTimeWithTimeZone({
                      start_time: session.interview_meeting.start_time,
                      end_time: session.interview_meeting.end_time,
                      timeZone: dayjsLocal.tz.guess(),
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return null;
}

export default BookingConfirmation;
