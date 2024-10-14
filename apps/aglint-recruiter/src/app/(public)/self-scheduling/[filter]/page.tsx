'use client';

import { getFullName } from '@aglint/shared-utils';
import { PublicPageLayout } from '@components/layouts/public-layout';
import { UIBadge } from '@components/ui-badge';

import Footer from '@/common/Footer';
import { Loader } from '@/common/Loader';
import UIError from '@/common/UIError';
import { SeoPro } from '@/components/Common/SeoPro';

import SchedulingPageHeader from '../../_common/_components/SchedulingPageHeader';
import CandidateInviteNew from './_common/components';
import { useInviteMeta } from './_common/hooks/useInviteMeta';

const CandidateInvitePage = () => {
  const { data, isLoading, isError } = useInviteMeta();

  if (isLoading) return <Loader />;

  if (!data || isError) return <UIError />;

  const candidate = {
    name: getFullName(data.candidate.first_name, data.candidate.last_name),
    position: data.candidate.current_job_title ?? '',
    email: data.candidate.email ?? '',
  };

  return (
    <PublicPageLayout
      header={
        <SchedulingPageHeader
          companyDetails={{
            jobTitle: data.job.title,
            name: data.recruiter.name,
            location: data.job.location,
            logo: data.recruiter.logo ?? '',
          }}
          description={
            <div className='flex w-full flex-row justify-end p-4'>
              {data.isBooked ? (
                <div className='flex flex-col items-end space-y-2'>
                  <div className='flex flex-row items-end gap-2'>
                    <h1 className='text-lg font-semibold'>Interview</h1>
                    <UIBadge variant='success' textBadge='Confirmed' />
                  </div>
                </div>
              ) : (
                <div className='flex flex-row items-start gap-2'>
                  <h1 className='text-lg font-semibold'>Interview</h1>
                  <UIBadge variant='info' textBadge='Pending' />
                </div>
              )}
            </div>
          }
          candidateDetails={candidate}
        />
      }
      footer={<Footer brand={true} />}
    >
      <>
        <SeoPro title={'Candidate Booking | Aglint AI'} />
        <CandidateInviteNew />
      </>
    </PublicPageLayout>
  );
};

export default CandidateInvitePage;
