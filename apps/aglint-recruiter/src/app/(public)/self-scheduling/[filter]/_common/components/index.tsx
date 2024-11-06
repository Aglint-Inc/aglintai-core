'use client';

import { useEffect } from 'react';

import { ConfirmedInvitePage } from '@/common/CandidateConfirm/_common/components';
import { NotFound } from '@/components/Common/404';
import { UIButton } from '@/components/Common/UIButton';

import { Loader } from '../../../../../../components/Common/Loader';
import { useInviteMeta } from '../hooks/useInviteMeta';
import { useInviteSlots } from '../hooks/useInviteSlots';
import {
  resetCandidateInviteStore,
  useCandidateInviteSelfScheduleStore,
} from '../store';
import { getRounds } from '../utils';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const CandidateInviteNew = () => {
  const { timezone } = useCandidateInviteSelfScheduleStore();
  const { isLoading, isError, data: meta } = useInviteMeta();
  const rounds = getRounds(meta.meetings);

  useEffect(() => {
    return () => {
      resetCandidateInviteStore();
    };
  }, []);

  if (isLoading) return <LoadingStateSelfScheduling />;

  if (isError) return <ErrorState />;

  if (meta && meta.isBooked)
    return (
      <div className='h-[70vh] w-full'>
        <ConfirmedInvitePage
          rounds={rounds}
          candidate={meta.candidate}
          filter_json={meta.filter_json}
          meetings={meta.meetings}
          recruiter={meta.recruiter}
          timezone={timezone}
          application_id={meta.application_id}
        />
      </div>
    );

  return <BookingPage />;
};

export default CandidateInviteNew;

const BookingPage = () => {
  const { isLoading, isError, isRefetching } = useInviteSlots();

  if (isLoading || isRefetching) return <LoadingStateSelfScheduling />;

  if (isError) return <ErrorState />;

  return (
    <div className='h-[70vh] w-full' data-testid='booking-page'>
      <div className='flex h-full w-full flex-row justify-center'>
        <div className={'h-full w-8/12'}>
          <LeftPanel />
        </div>
        <div className='w-4/12 border-l p-4'>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export const LoadingStateSelfScheduling = () => (
  <div
    className='flex max-h-[60vh] min-h-[60vh] w-full items-center justify-center'
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
