
import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';
// import withRoleProtection from '@/src/HOC/RoleProtection';

function CompanyPage() {
  return (
    <>
      <Seo
        title={`Jobs`}
        description='AI for People Products'
      />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
