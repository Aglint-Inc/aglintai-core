import React from 'react';

import Seo from '@/src/components/Common/Seo';
import Support from '@/src/components/Support/index';
// import { SupportProvider } from '@/src/context/SupportContext/SupportContext';

function SupportPage() {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <Support />
    </>
  );
}

export default SupportPage;
// SupportPage.getProvider = (page) => {
//   return <SupportProvider>{page}</SupportProvider>;
// };
