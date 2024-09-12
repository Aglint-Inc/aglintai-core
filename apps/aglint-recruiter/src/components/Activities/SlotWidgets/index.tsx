import type { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { AlertTriangle, CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/router';

import ROUTES from '@/utils/routing/routes';

import BookingConfirmation from './BookingConfirmation';

function SlotContent({ act }: { act: DatabaseTable['application_logs'] }) {
  const router = useRouter();

  if (act.metadata.type === 'booking_confirmation') {
    return <BookingConfirmation act={act} />;
  } else if (act.metadata.type === 'candidate_response_self_schedule') {
    const rescheduleDetails = {
      response_type: act.metadata.response_type,
      reason: act.metadata.reason,
      other_details: act.metadata.other_details,
      filter_id: act.metadata.filter_id,
      session_ids: act.metadata.session_ids,
    };

    const checkDate = dayjsLocal(
      act.metadata.other_details?.dateRange?.end,
    ).isBefore(dayjsLocal().add(-1, 'day'));

    return (
      <Card className='mt-4'>
        <CardContent className='p-4 space-y-4'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className='w-5 h-5 text-muted-foreground' />
            <span className='text-sm'>
              {`${dayjsLocal(rescheduleDetails.other_details?.dateRange?.start).format('DD MMMM, YYYY')} - ${dayjsLocal(rescheduleDetails.other_details?.dateRange?.end).format('DD MMMM, YYYY')}`}
            </span>
          </div>
          {rescheduleDetails.other_details.note && (
            <p className='text-sm'>{rescheduleDetails.other_details.note}</p>
          )}
          <p className='text-sm font-medium'>
            Reason: {rescheduleDetails.reason}
          </p>
          {checkDate && (
            <Alert variant='error'>
              <AlertTriangle className='h-4 w-4' />
              <AlertDescription>Proposed date is expired</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  } else if (act.metadata.type === 'interviewer_decline') {
    const meeting_id = act.metadata.meeting_id;
    return (
      <div className='mt-4'>
        <Button
          size='sm'
          onClick={() => {
            router.push(
              ROUTES['/scheduling/view']() +
                `?meeting_id=${meeting_id}&tab=job_details`,
            );
          }}
        >
          View details
        </Button>
      </div>
    );
  } else {
    return null;
  }
}

export default SlotContent;
