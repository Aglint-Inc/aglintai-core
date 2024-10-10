'use client';

import { useEffect } from 'react';

import { NotFound } from '@/components/Common/404';
import { UIButton } from '@/components/Common/UIButton';

import { Loader } from '../../../../../../components/Common/Loader';
import { useInviteMeta } from '../hooks/useInviteMeta';
import { useInviteSlots } from '../hooks/useInviteSlots';
import { resetCandidateInviteStore } from '../store';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const CandidateInviteNew = () => {
  const {
    isLoading,
    isError,
    data: { isBooked },
  } = useInviteMeta();

  const {
    isLoading: loadingSlots,
    isError: errorSlots,
    isRefetching,
  } = useInviteSlots();

  useEffect(() => {
    return () => {
      resetCandidateInviteStore();
    };
  }, []);

  return (
    <div className='h-[70vh] w-full'>
      {isLoading || loadingSlots || isRefetching ? (
        <LoadingState />
      ) : isError || errorSlots ? (
        <ErrorState />
      ) : (
        <>
          <div className='flex h-full w-full flex-row justify-center'>
            <div className={isBooked ? 'h-full w-full' : 'h-full w-8/12'}>
              <LeftPanel />
            </div>
            {!isBooked && (
              <div className='w-4/12 border-l p-4'>
                <RightPanel />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateInviteNew;

const LoadingState = () => (
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
