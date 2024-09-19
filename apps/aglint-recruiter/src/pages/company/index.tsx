import { useSearchParams } from 'next/navigation';
import CompanyDetailComp from 'src/app/(authenticated)/_company/_common/components';
import SeoSetting from 'src/app/(authenticated)/_company/_common/components/SeoSetting';

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
