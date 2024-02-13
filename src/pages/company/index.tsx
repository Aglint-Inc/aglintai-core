import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

function CompanyPage() {
  const { recruiterUser } = useAuthDetails();
  const router = useRouter();
  useEffect(() => {
    if (recruiterUser && recruiterUser.role.toLowerCase() !== 'admin') {
      router.replace(pageRoutes.JOBS);
      toast.warning('You are not authorized to access this page');
    }
  }, [recruiterUser]);
  return (
    <>
      <Seo title='Aglint | Company Settings' description='Company Settings' />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
