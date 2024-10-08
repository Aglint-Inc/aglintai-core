'use client';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';

import { NotFound } from '@/components/Common/404';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { UIButton } from '@/components/Common/UIButton';

import { Loader } from '../../../../../../components/Common/Loader';
import { ConfirmedInvitePage } from '../../../../../_common/components/CandidateConfirm/_common/components';
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
  const { isLoading, isError, isRefetching } = useInviteMeta();

  return (
    <div className='w-full'>
      {isLoading || isRefetching ? (
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
  );
};
export default CandidateInviteNew;

const LoadingState = () => (
  <div
    className='flex w-full items-center justify-center'
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
  <div className='flex w-full items-center justify-center'>
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
  const { timezone } = useCandidateInviteStore();

  const { data: meta } = useInviteMeta();

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
      <div className='w-full'>
        <NotFound />
      </div>
    );

  if (!waiting && meta)
    return (
      <ConfirmedInvitePage
        rounds={rounds}
        candidate={meta.candidate}
        filter_json={meta.filter_json}
        meetings={meta.meetings}
        recruiter={meta.recruiter}
        timezone={timezone}
        application_id={meta.application_id}
      />
    );

  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>
            <TimezonePicker
              onChange={(e) => {
                setTimeZone(e);
                setSelectedSlots([]);
              }}
              value={timezone.tzCode}
            />
          </SectionTitle>
        </SectionHeaderText>
        <SectionActions>
          <UIButton
            variant='outline'
            onClick={() => {
              setDetailPopup(true);
            }}
          >
            View Interview details
          </UIButton>
        </SectionActions>
      </SectionHeader>
      <Invite rounds={rounds} />
    </Section>
  );
};

const Invite = ({ rounds }: ScheduleCardsProps) => {
  if (rounds.length === 1) return <SingleDay />;
  return <MultiDay rounds={rounds} />;
};
