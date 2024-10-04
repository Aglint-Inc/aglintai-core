'use client';
/* eslint-disable security/detect-object-injection */
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Building2 } from 'lucide-react';
import Image from 'next/image';

import { NotFound } from '@/components/Common/404';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { UIButton } from '@/components/Common/UIButton';

import { Loader } from '../../../../../../../components/Common/Loader';
import { ConfirmedInvitePage } from '../../../../../../_common/components/CandidateConfirm';
import { useInviteMeta } from '../hooks/useInviteMeta';
import {
  setDetailPopup,
  setSelectedSlots,
  setTimeZone,
  useCandidateInviteStore,
} from '../store';
import {
  type ScheduleCardProps,
  type ScheduleCardsProps,
} from '../types/types';
import { DetailsPopup } from './DetailsPopup';
import MultiDay from './MultiDay';
import { SingleDay } from './SingleDay';

const CandidateInviteNew = () => {
  const { isLoading, isError } = useInviteMeta();

  return (
    <div className='h-screen'>
      <div className='w-full py-10'>
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState />
        ) : (
          <>
            <CandidateInvitePlanPage />
            <DetailsPopup />
          </>
        )}
      </div>
    </div>
  );
};
export default CandidateInviteNew;

const LoadingState = () => (
  <div
    className='flex h-screen w-full items-center justify-center'
    aria-live='polite'
    aria-busy='true'
  >
    <div className='space-y-4'>
      <Loader className='mx-auto h-12 w-12' />
      <p className='text-center text-gray-600'>
        Loading your interview details...
      </p>
    </div>
  </div>
);

const ErrorState = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <div className='text-center'>
      <NotFound />
      <p className='mt-4 text-gray-600'>
        We couldn&apos;t load your interview details.
      </p>
      <UIButton
        variant='default'
        className='mt-4'
        onClick={() => window.location.reload()}
      >
        Try Again
      </UIButton>
    </div>
  </div>
);

const CandidateInvitePlanPage = () => {
  // const { handleViewedOn } = useCandidateInvite();

  const { timezone } = useCandidateInviteStore();

  const { data: meta } = useInviteMeta();

  // useEffect(() => {
  //   if (filter_json?.id) {
  //     handleViewedOn();
  //   }
  // }, [filter_json]);

  const waiting = (meta?.meetings || []).some(
    ({ interview_meeting: { status } }) => status === 'waiting',
  );
  const { rounds } = (meta?.meetings || []).reduce(
    (acc, curr) => {
      const count = acc.rounds.length;
      if (
        count === 0 ||
        acc.rounds[count - 1].sessions[
          acc.rounds[count - 1].sessions.length - 1
        ].interview_session.break_duration >= SINGLE_DAY_TIME
      )
        acc.rounds.push({
          title: `Day ${acc.rounds.length + 1}`,
          sessions: [curr],
        });
      else acc.rounds[count - 1].sessions.push(curr);
      return acc;
    },
    { rounds: [] as ScheduleCardProps['round'][] },
  );

  if (meta?.meetings.length === 0)
    return (
      <div className='h-screen w-full'>
        <NotFound />
      </div>
    );

  if (!waiting && meta)
    return (
      <ConfirmedInvitePage
        rounds={rounds}
        //@ts-ignore // remove after nullable fix
        candidate={meta.candidate}
        //@ts-ignore // remove after nullable fix
        filter_json={meta.filter_json}
        meetings={meta.meetings}
        recruiter={meta.recruiter}
        timezone={timezone}
        application_id={meta.application_id}
      />
    );

  return (
    <div className='bg-sand-3 flex w-full flex-col items-center justify-center py-4'>
      <Card className='border-neutral-6 w-full max-w-[900px] space-y-4'>
        <CardHeader className='space-y-2 text-center'>
          <div className='flex w-full justify-center'>
            <Logo
              companyName={meta.recruiter.name}
              logo={meta.recruiter.logo ?? ''}
            />
          </div>
          <CardTitle className='text-2xl font-medium'>
            Select a date and time that works best for you.
          </CardTitle>
          <p className='text-center text-muted-foreground'>
            Available slots are organized by day. Each slot includes the total
            time required for your interview, including breaks.
          </p>
          <div>
            <UIButton
              variant='ghost'
              onClick={() => {
                setDetailPopup(true);
              }}
            >
              View Schedule details
            </UIButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className='mx-auto w-full max-w-[900px] space-y-2'>
            <div className='flex w-full justify-end'>
              <div className='w-[300px]'>
                <TimezonePicker
                  onChange={(e) => {
                    setTimeZone(e);
                    setSelectedSlots([]);
                  }}
                  value={timezone.tzCode}
                />
              </div>
            </div>
            <Invite rounds={rounds} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Invite = ({ rounds }: ScheduleCardsProps) => {
  if (rounds.length === 1) return <SingleDay />;
  return <MultiDay rounds={rounds} />;
};

const Logo = ({ companyName, logo }: { companyName: string; logo: string }) => {
  return (
    <div className={'relative max-h-[60px] max-w-[60px]'}>
      <div className='relative h-[60px] w-[60px]'>
        <Image
          src={logo}
          alt={companyName}
          width={60}
          height={60}
          className='object-contain'
          onError={(e) => {
            if (e.currentTarget instanceof HTMLImageElement) {
              e.currentTarget.style.display = 'none';
              const fallback =
                e.currentTarget.parentElement?.querySelector('.fallback');
              if (fallback instanceof HTMLElement)
                fallback.style.display = 'flex';
            }
          }}
        />
        <div className='fallback absolute inset-0 hidden items-center justify-center'>
          <Building2 className='h-10 w-10 text-muted-foreground' />
        </div>
      </div>
    </div>
  );
};
