'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';
import React from 'react';

import InterviewTypesPage, { HeaderPropProvider } from './_common/components';
import { InterviewPoolHeader } from './_common/components/Header';

function Page() {
  return (
    <HeaderPropProvider>
      <FullWidthLayout header={<InterviewPoolHeader />}>
        <InterviewTypesPage />
      </FullWidthLayout>
    </HeaderPropProvider>
  );
}

export default Page;
