'use client';

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

  return (
    <PublicPageLayout
      header={
        <SchedulingPageHeader
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
