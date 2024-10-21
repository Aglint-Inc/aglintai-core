'use client';
import { unstable_noStore } from 'next/cache';
import React from 'react';

import SampleShowcase from './_common/components/sample';
import ThemeManager from './_common/components/themeManager';
import { ThemeWrapper } from './_common/components/ThemeWrapper';

function Page() {
  unstable_noStore();

  return (
    <div className='flex-col'>
      <div className='w-full p-2'>
        <h1 className='text-3xl font-bold'>Manage Theme</h1>
        <ThemeManager />
      </div>
      <ThemeWrapper>
        <SampleShowcase />
      </ThemeWrapper>
    </div>
  );
}

export default Page;
