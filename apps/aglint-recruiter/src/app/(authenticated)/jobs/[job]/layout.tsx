import { type PropsWithChildren } from 'react';

import { ErrorBoundary } from '@/common/ErrorBoundary';
import { ApplicationsStoreProvider, JobProvider } from '@/job/contexts';
import { api, HydrateClient } from '@/trpc/server';

type Props = {
  params: {
    job: string;
  };
};

const Layout = async (props: PropsWithChildren<Props>) => {
  void api.jobs.job.read.prefetch({ id: props.params.job });
  return (
    <HydrateClient>
      <ErrorBoundary>
        <JobProvider>
          <ApplicationsStoreProvider>
            {props.children}
          </ApplicationsStoreProvider>
        </JobProvider>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Layout;
