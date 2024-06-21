import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CandidateDashboard from '@/src/components/NewScreening/CandidateDashboard';
import { WithScreening } from '@/src/components/withScreening';

const index = () => {
  return (
    <>
      <Seo
        title='Screening Dashboard - Screening | Aglint AI'
        description='AI for People Products'
      />
      <WithScreening>
        <CandidateDashboard />
      </WithScreening>
    </>
  );
};

export default index;
