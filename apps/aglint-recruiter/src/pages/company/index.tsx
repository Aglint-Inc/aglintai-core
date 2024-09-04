import { useSearchParams } from 'next/navigation';

import CompanyDetailComp from '@/components/CompanyDetailComp';
import SeoSetting from '@/components/CompanyDetailComp/SeoSetting';

function CompanyPage() {
  const tab = useSearchParams().get('tab');
  return (
    <>
      <SeoSetting tab={tab} />
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
