'use client';
import { PublicPageLayout } from '@components/layouts/public-layout';
import React from 'react';

import Footer from '@/common/Footer';

import SchedulingPageHeader from '../../_common/_components/Header';
import CandidateAvailability from './_common/components/MainBody';
import { useRequestAvailabilityContext } from './_common/contexts/RequestAvailabilityContext';
import { useCandidateAvailabilityData } from './_common/hooks/useRequestAvailability';
function RequestAvailability() {
  const { isSubmitted } = useRequestAvailabilityContext();
  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();

  return (
    <PublicPageLayout
      header={
        <SchedulingPageHeader
          companyName={candidateRequestAvailability?.recruiter?.name ?? ''}
          description={
            isSubmitted
              ? `Thank you for submitting your availability. We will review
          the selected time slots and confirm the schedule soon. You
          will receive a confirmation shortly.`
              : `Your Availability Requested`
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
