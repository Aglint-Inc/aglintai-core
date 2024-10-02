'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import React from 'react';

import InterviewTypesPage, { HeaderPropProvider } from './_common/components';
import { InterviewPoolHeader } from './_common/components/Header';

function Page() {
  return (
    <HeaderPropProvider>
      <OneColumnPageLayout header={<InterviewPoolHeader />}>
        <InterviewTypesPage />
      </OneColumnPageLayout>
    </HeaderPropProvider>
  );
}

export default Page;
