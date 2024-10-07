import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import { unstable_noStore } from 'next/cache';

import { api, HydrateClient } from '@/trpc/server';

import { Activity } from './_common/components/Activity';
import CandidateInfo from './_common/components/CandidateInfo';
import Requests from './_common/components/Requests';

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    application: string;
  };
}) => {
  unstable_noStore();
  void api.application.application_details.prefetch({
    application_id: params.application,
  });
  void api.application.application_meta.prefetch({
    application_id: params.application,
  });
  void api.application.application_activity.prefetch({
    application_id: params.application,
  });
  void api.application.application_request.prefetch({
    application_id: params.application,
  });
  void api.interview_pool.get_all.prefetch();
  return (
    <HydrateClient>
      <TwoColumnPageLayout
        header={
          <>
            <CandidateInfo />
          </>
        }
        sidebarPosition='right'
        sidebar={
          <>
            <div className='flex flex-col space-y-8'>
              <Requests />
              <Activity />
            </div>
          </>
        }
        sidebarWidth={420}
      >
        {children}
      </TwoColumnPageLayout>
    </HydrateClient>
  );
};

export default Layout;
