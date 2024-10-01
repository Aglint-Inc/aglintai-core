'use client';
import { TwoColumnLayout } from '@components/layouts/two-column-layout';

import SchedulingViewComp from './_common/components';
import Requests from './_common/components/Requests';

function Page() {
  return (
    <TwoColumnLayout
      sidebarPosition='right'
      sidebarWidth={460}
      sidebar={<Requests />}
    >
      <SchedulingViewComp /> {/* Added JobHiringTeamDashboard component */}
    </TwoColumnLayout>
  );
}

export default Page;
