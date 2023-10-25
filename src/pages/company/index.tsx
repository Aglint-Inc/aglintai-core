import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';

function CompanyPage() {
  return (
    <>
      <Seo title='Aglint | Company Settings' description='Company Settings' />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
