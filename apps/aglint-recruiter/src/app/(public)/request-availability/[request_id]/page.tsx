'use client';
import { PublicPageLayout } from '@components/layouts/public-layout';
import { UIAlert } from '@components/ui-alert';

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
              <div className='flex w-full'>
                <UIAlert type='success' className='mx-8 mt-8'>
                  <p className='text-sm'>
                    Thank you for submitting your availability. We will review
                    the selected time slots and confirm the schedule soon. You
                    will receive a confirmation shortly.
                  </p>
                </UIAlert>
              </div>
            ) : candidateRequestAvailability?.booking_confirmed &&
              meetingsAndRounds?.meetings ? (
              <div className='flex w-full'>
                <UIAlert type='success' className='mx-8 mt-8 w-full'>
                  <p className='text-sm'>Your meeting has been confirmed.</p>
                </UIAlert>
              </div>
            ) : null
          }
          title={
            <h2 className='flex items-center gap-2 p-4 text-lg font-semibold'>
              Availability Request
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
