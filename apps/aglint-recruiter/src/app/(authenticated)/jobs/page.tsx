'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { NotFound } from '@/components/Common/404';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Body, Filter, Header } from '@/jobs/components';
import PERMISSIONS from '@/utils/routing/permissions';

import { IntegrationStoreProvider } from './_common/contexts';

const Page = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const router = useRouterPro();
  return (
    <IntegrationStoreProvider>
      {checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
        <>
          <OneColumnPageLayout header={<Header />} filter={<Filter />}>
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
