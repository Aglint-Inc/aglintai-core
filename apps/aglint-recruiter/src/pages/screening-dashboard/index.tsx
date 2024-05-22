import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CandidateDashboard from '@/src/components/NewScreening/CandidateDashboard';

const index = () => {
  return (
    <>
      <Seo
        title='Screening Dashboard - Screening | Aglint AI'
        description='AI for People Products'
      />
      <CandidateDashboard />
    </>
  );
};

export default index;
