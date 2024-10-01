'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';

import { Body, Filter, Header } from '@/jobs/components';

import { IntegrationStoreProvider } from './_common/contexts';

const Page = () => {
  return (
    <IntegrationStoreProvider>
      <FullWidthLayout header={<Header />} filter={<Filter />}>
        <Body />
      </FullWidthLayout>
    </IntegrationStoreProvider>
  );
};

export default Page;
