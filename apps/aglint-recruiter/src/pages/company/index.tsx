import { useSearchParams } from 'next/navigation';

import CompanyDetailComp from '@/src/components/CompanyDetailComp';
import SeoSetting from '@/src/components/CompanyDetailComp/SeoSetting';

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
