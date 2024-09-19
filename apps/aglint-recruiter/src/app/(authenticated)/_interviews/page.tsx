'use client';
import Interviews from '@interviews/components/MainBody';
import React from 'react';

import { SeoPro } from '@/components/Common/SeoPro';

function InterviewsPage() {
  return (
    <>
      <SeoPro
        title='Interviews - Scheduler | Aglint AI'
        description='AI for People Products'
      />
      <Interviews />
    </>
  );
}

export default InterviewsPage;
