import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import withRoleProtection from '@/src/HOC/RoleProtection';

function CompanyPage() {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Jobs`}
        description='AI for People Products'
      />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
