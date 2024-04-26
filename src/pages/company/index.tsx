import { useSearchParams } from 'next/navigation';

import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';
import { capitalizeAll } from '@/src/utils/text/textUtils';
// import withRoleProtection from '@/src/HOC/RoleProtection';

function CompanyPage() {
  const tab = useSearchParams().get('tab');
  return (
    <>
      <Seo
        title={`Company | ${capitalizeAll((tab || 'settings').replace('-', ' '))}`}
        description='AI for People Products'
      />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
