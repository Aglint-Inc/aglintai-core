'use client';
import { PublicPageLayout } from '@components/layouts/public-layout';
import { UIBadge } from '@components/ui-badge';
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
              <p className='text-sm text-muted-foreground'>
                Thanks for submitting. We&apos;ll review and confirm soon.
              </p>
            ) : candidateRequestAvailability?.booking_confirmed &&
              meetingsAndRounds?.meetings ? (
              <p className='text-sm'>Your meeting has been confirmed.</p>
            ) : null
          }
          title={
            <div className='flex flex-row items-center'>
              <UIBadge
                icon={CheckCircle}
                variant='success'
                className='mr-2'
                textBadge='Submitted'
              />
              <h2 className='flex items-center gap-2 text-lg font-semibold'>
                Availability Request
              </h2>
            </div>
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
