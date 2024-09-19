import { useSearchParams } from 'next/navigation';

import CompanyDetailComp from '@/components/CompanyDetailComp/_common/components';
import SeoSetting from '@/components/CompanyDetailComp/_common/components/SeoSetting';

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
