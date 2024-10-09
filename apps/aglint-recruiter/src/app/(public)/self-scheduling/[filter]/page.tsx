'use client';

import { PublicPageLayout } from '@components/layouts/public-layout';
import { UIAlert } from '@components/ui-alert';

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
          companyName={data?.recruiter?.name ?? ''}
          description={
            <div className='flex w-full flex-row justify-center p-4'>
              {data.isBooked ? (
                <UIAlert type='success' title='Interview confirmed.'>
                  <p>
                    {`Your interview has been confirmed. Please find the interview details below. An email has been sent to the candidate with the interview details.`}
                  </p>
                </UIAlert>
              ) : (
                <UIAlert variant='default' title='Book your interview'>
                  <p>
                    {`Available slots are organized by day. Each slot includes the total time required for your interview, including breaks.`}
                  </p>
                </UIAlert>
              )}
            </div>
          }
          logo={data?.recruiter?.logo ?? ''}
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
