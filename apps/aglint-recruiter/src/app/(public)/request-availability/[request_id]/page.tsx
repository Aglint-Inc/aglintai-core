'use client';
import { getFullName } from '@aglint/shared-utils';
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
  const location =
    candidateRequestAvailability?.applications.public_jobs.office_locations
      ?.city ??
    '' +
      ' ' +
      candidateRequestAvailability?.applications.public_jobs.office_locations
        ?.region ??
    '' +
      ' ' +
      candidateRequestAvailability?.applications.public_jobs.office_locations
        ?.country ??
    '';
  const candidate = candidateRequestAvailability?.applications.candidates;
  return (
    <PublicPageLayout
      header={
        <SchedulingPageHeader
          companyDetails={{
            name: candidateRequestAvailability?.recruiter?.name ?? '',
            logo: candidateRequestAvailability?.recruiter?.logo ?? '',
            location: location ?? '',
            jobTitle:
              candidateRequestAvailability?.applications.public_jobs
                .job_title ?? '',
            jobType:
              candidateRequestAvailability?.applications.public_jobs.job_type ??
              '',
          }}
          candidateDetails={{
            name: getFullName(
              candidate?.first_name ?? '',
              candidate?.last_name ?? '',
            ),
            position: candidate?.current_job_title ?? '',
            email: candidate?.email ?? '',
          }}
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
              <h2 className='mr-2 flex items-center gap-2 text-lg font-semibold'>
                Availability Request
              </h2>
              <UIBadge
                icon={CheckCircle}
                variant={isSubmitted ? 'success' : 'info'}
                className='mr-2'
                textBadge={isSubmitted ? 'Submitted' : 'Pending'}
              />
            </div>
          }
        />
      }
      footer={<Footer brand={true} />}
    >
      <CandidateAvailability />
    </PublicPageLayout>
  );
}

export default RequestAvailability;
