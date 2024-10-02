import { useToast } from '@components/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';

import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import { useCandidateInviteStore } from '../../store';
import CandidateInviteCalendar, {
  type CandidateInviteCalendarProps,
} from '../CalenderComp';
import { SingleDayConfirmation } from './SingleDayConfirmation';

export const SingleDay = () => {
  const { status } = useInviteSlots();
  if (status === 'error') return <SingleDayError />;
  if (status === 'pending') return <SingleDayLoading />;
  return <SingleDaySuccess />;
};

const SingleDayError = () => {
  const { refetch } = useInviteSlots();
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  }, []);
  return (
    <UIButton variant='default' onClick={() => refetch()}>
      Try again
    </UIButton>
  );
};

const SingleDayLoading = () => {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map((index) => (
        <Card key={index}>
          <CardHeader className='space-y-2'>
            <Skeleton className='h-4 w-1/4' />
          </CardHeader>
          <CardContent className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-3/5' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SingleDaySuccess = () => {
  const { handleSelectSlot } = useInviteActions();
  const { selectedSlots, timezone } = useCandidateInviteStore();
  const { data } = useInviteSlots();
  const sessions = (data || []).reduce(
    (acc, curr) => {
      const { start_time } = curr[0][0].sessions[0];
      acc.push({
        date: start_time,
        slots: curr[0],
      });
      return acc;
    },
    [] as CandidateInviteCalendarProps['sessions'],
  );

  return (
    <>
      <CandidateInviteCalendar
        sessions={sessions}
        selections={selectedSlots}
        handleSelect={(id) => {
          handleSelectSlot(0, id);
        }}
        tz={timezone.tzCode}
      />
      <SingleDayConfirmation />
    </>
  );
};
