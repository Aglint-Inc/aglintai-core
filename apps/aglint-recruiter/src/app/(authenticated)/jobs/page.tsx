'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { NotFound } from '@/components/Common/404';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Body, Filter, Header } from '@/jobs/components';
import PERMISSIONS from '@/utils/routing/permissions';

import { IntegrationStoreProvider } from './_common/contexts';
import { useJobs } from './_common/hooks';

const Page = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const {
    jobs: { data },
    initialLoad,
  } = useJobs();
  const router = useRouterPro();
  return (
    <IntegrationStoreProvider>
      {checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
        <>
          <OneColumnPageLayout
            header={initialLoad && data?.length !== 0 && <Header />}
            filter={initialLoad && data?.length !== 0 && <Filter />}
          >
            <Body />
          </OneColumnPageLayout>
        </>
      ) : (
        <NotFound />
      )}
    </IntegrationStoreProvider>
  );
};

export default Page;
