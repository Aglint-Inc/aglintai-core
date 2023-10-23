import React from 'react';

import CompanyDetailComp from '@/src/components/CompanyDetailComp';
import Seo from '@/src/components/Common/Seo';

function CompanyPage() {
  return (
    <>
    <Seo
        title='Aglint | Company Settings'
        description='Company Settings'
      />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
