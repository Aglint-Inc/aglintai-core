'use client';
import { PublicPageLayout } from '@components/layouts/public-layout';
import { type PropsWithChildren } from 'react';

import Footer from '@/common/Footer';

import SchedulingPageHeader from '../../_common/_components/Header';
import { useInviteMeta } from './_common/hooks/useInviteMeta';

const Layout = ({ children }: PropsWithChildren) => {
  const { data: meta } = useInviteMeta();
  return (
    <PublicPageLayout
      header={
        meta && (
          <SchedulingPageHeader
            companyName={meta.recruiter.name ?? ''}
            description={` Available slots are organized by day. Each slot includes the total
            time required for your interview, including breaks.`}
            logo={meta.recruiter.logo ?? ''}
            // title={'Select a date and time that works best for you.'}
          />
        )
      }
      footer={<Footer brand={true} />}
    >
      {children}
    </PublicPageLayout>
  );
};

export default Layout;
