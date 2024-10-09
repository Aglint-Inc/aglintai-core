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
                  <div className='text-sm text-muted-foreground'>
                    Welcome Applicant!
                  </div>
                  <div className='flex flex-row items-end gap-2'>
                    <UIBadge
                      variant='success'
                      textBadge='Interview confirmed'
                    />
                    <p className='font-semibold'>Interview confirmed.</p>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {`Your interview has been confirmed. Please find the interview details below. An email has been sent to the candidate with the interview details.`}
                  </p>
                </div>
              ) : (
                <div className='flex flex-col items-end space-y-2'>
                  <div className='text-sm text-muted-foreground'>
                    Welcome Applicant
                  </div>
                  <div className='flex flex-row items-end gap-2'>
                    <UIBadge variant='info' textBadge='Pending' />
                    <h1 className='text-lg font-semibold'>
                      Book your interview
                    </h1>
                  </div>
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
