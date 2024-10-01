'use client';

import { TwoColumnLayout } from '@components/layouts/two-column-layout';

import ApplicationDetailComp from './_common/components';
import { Activity } from './_common/components/Activity';
import BreadCrumb from './_common/components/BreadCrumb';
import CandidateInfo from './_common/components/CandidateInfo';
import Requests from './_common/components/Requests';

function Page() {
  return (
    <TwoColumnLayout
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
      sidebarWidth={300}
    >
      <ApplicationDetailComp />
    </TwoColumnLayout>
  );
}

export default Page;
