'use client';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';

import SchedulingViewComp from './_common/components';
import Requests from './_common/components/Requests';

function Page() {
  return (
    <TwoColumnPageLayout
      sidebarPosition='right'
      sidebarWidth={460}
      sidebar={<Requests />}
    >
      <SchedulingViewComp /> {/* Added JobHiringTeamDashboard component */}
    </TwoColumnPageLayout>
  );
}

export default Page;
