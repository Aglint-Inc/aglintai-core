'use client';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import { type PropsWithChildren } from 'react';

import { Activity } from './_common/components/Activity';
import BreadCrumb from './_common/components/BreadCrumb';
import CandidateInfo from './_common/components/CandidateInfo';
import Requests from './_common/components/Requests';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TwoColumnPageLayout
      header={
        <>
          <BreadCrumb />
          <CandidateInfo />
        </>
      }
      sidebarPosition='right'
      sidebar={
        <>
          <Requests />
          <Activity />
        </>
      }
      sidebarWidth={420}
    >
      {children}
    </TwoColumnPageLayout>
  );
};

export default Layout;
