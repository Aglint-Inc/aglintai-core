'use client';

import { PublicPageLayout } from '@components/layouts/public-layout';

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
            <div className='flex w-full flex-row justify-center p-4 text-lg font-semibold'>
              {data.isBooked ? (
                <h2>{`Interview confirmed.`}</h2>
              ) : (
                <h2>
                  {`Available slots are organized by day. Each slot includes the total time required for your interview, including breaks.`}
                </h2>
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
