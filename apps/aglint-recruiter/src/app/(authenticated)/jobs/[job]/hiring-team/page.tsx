'use client';

import { TwoColumnLayout } from '@components/layouts/two-column-layout';

import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import {
  BreadCrumbs,
  JobHiringTeamDashboard,
} from '@/job/hiring-team/components';
import { useJob } from '@/job/hooks';

const Page = () => {
  const { job } = useJob();

  return (
    <TwoColumnLayout
      sidebarPosition='left'
      sidebar={
        <>
          <BreadCrumbs job={job} />
          <JobsSideNavV2 />
        </>
      }
      sidebarWidth={300}
    >
      <JobHiringTeamDashboard />
    </TwoColumnLayout>
  );
};

export default Page;
