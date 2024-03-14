import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';
import withRoleProtection from '@/src/HOC/RoleProtection';

function CompanyPage() {
  return (
    <>
      <Seo title='Aglint | Company Settings' description='Company Settings' />
      <CompanyDetailComp />
    </>
  );
}

export default withRoleProtection(CompanyPage, ['admin', 'member']);
