'use client';
import { PublicPageLayout } from '@components/layouts/public-layout';
import { CheckCircle } from 'lucide-react';

import Footer from '@/common/Footer';

import SchedulingPageHeader from '../../_common/_components/SchedulingPageHeader';
import CandidateAvailability from './_common/components/MainBody';
import { useRequestAvailabilityContext } from './_common/contexts/RequestAvailabilityContext';
import { useCandidateAvailabilityData } from './_common/hooks/useRequestAvailability';
function RequestAvailability() {
  const { isSubmitted, meetingsAndRounds } = useRequestAvailabilityContext();
  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();

  return (
    <PublicPageLayout
      header={
        <SchedulingPageHeader
          companyName={candidateRequestAvailability?.recruiter?.name ?? ''}
          description={
            isSubmitted && !candidateRequestAvailability?.booking_confirmed ? (
              <div className='ml-8 flex flex-row items-center justify-center gap-2'>
                <CheckCircle className='h-8 w-8 text-green-600' />
                <p className='flex items-center gap-2 py-4 text-sm font-semibold'>
                  Thank you for submitting your availability. We will review the
                  selected time slots and confirm the schedule soon. You will
                  receive a confirmation shortly.
                </p>
              </div>
            ) : candidateRequestAvailability?.booking_confirmed &&
              meetingsAndRounds?.meetings ? (
              <div className='ml-8 flex flex-row items-center justify-center gap-2'>
                <CheckCircle className='h-8 w-8 text-green-600' />
                <p className='flex items-center gap-2 py-4 text-sm font-semibold'>
                  Your meeting has been confirmed.
                </p>
              </div>
            ) : null
          }
          title={
            <h2 className='flex items-center gap-2 p-8 text-lg font-semibold'>
              Your Request availability
            </h2>
          }
          logo={candidateRequestAvailability?.recruiter?.logo ?? ''}
        />
      }
      footer={<Footer brand={true} />}
    >
      <CandidateAvailability />
    </PublicPageLayout>
  );
}

export default RequestAvailability;
