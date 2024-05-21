import { useSearchParams } from 'next/navigation';

import Seo from '@/src/components/Common/Seo';
import CompanyDetailComp from '@/src/components/CompanyDetailComp';

function CompanyPage() {
  const tab = useSearchParams().get('tab');
  return (
    <>
      {tab === 'basic-info' && (
        <Seo
          title='Basic info - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'additional-info' && (
        <Seo
          title='Additional Info - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'team' && (
        <Seo
          title='Team - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      <CompanyDetailComp />
    </>
  );
}

export default CompanyPage;
