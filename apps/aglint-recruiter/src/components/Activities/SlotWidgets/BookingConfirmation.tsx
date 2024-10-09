import type { DatabaseTable } from '@aglint/shared-types';
import { getBreakLabel } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Card, CardContent } from '@components/ui/card';
import { Calendar, Clock, Hourglass } from 'lucide-react';

import { getScheduleType } from '../../../utils/scheduling/colors_and_enums';
import IconScheduleType from '../../Common/Icons/IconScheduleType';
import { formatTimeWithTimeZone } from '../../Scheduling/utils';

function BookingConfirmation({
  act,
}: {
  act: DatabaseTable['application_logs'];
}) {
  if (act.metadata.type === 'booking_confirmation') {
    const sessions = act.metadata.sessions;

    return (
      <div className='mt-2 flex w-full flex-col space-y-4'>
        {sessions.map((session) => (
          <Card key={session.id} className={'w-full'}>
            <CardContent className='w-full p-3'>
              <div className='flex items-start space-x-4'>
                <div className='flex flex-col gap-1'>
                  <h4 className='text-md font-semibold mb-1'>{session.name}</h4>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm font-normal'>
                      {dayjsLocal(session.interview_meeting.start_time).format(
                        'DD MMMM YYYY',
                      )}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center space-x-2 text-sm'>
                      <Clock className='h-4 w-4 text-muted-foreground' />
                      <p className='mt-1 text-sm'>
                        {session.interview_meeting.start_time
                          ? formatTimeWithTimeZone({
                              start_time: session.interview_meeting.start_time,
                              end_time: session.interview_meeting.end_time,
                              timeZone: dayjsLocal.tz.guess(),
                            })
                          : ''}
                      </p>
                    </div>
                    <div className='flex items-center space-x-2 text-sm'>
                      <Hourglass className='h-4 w-4 text-muted-foreground' />
                      <span>{getBreakLabel(session.session_duration)}</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2 text-sm'>
                    <IconScheduleType type={session.schedule_type} />
                    <span>{getScheduleType(session.schedule_type)}</span>
                  </div>
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
