import React from 'react';

import Seo from '@/src/components/Common/Seo';
// import Support from '@/src/components/Support/index';
// import { SupportProvider } from '@/src/context/SupportContext/SupportContext';

function SupportPage() {
  return (
    <>
      <Seo title='Support | Aglint AI' description='AI for People Products' />
      Coming Soon
      {/* <Support /> */}
    </>
  );
}

export default SupportPage;
// SupportPage.privateProvider = (page) => {
//   return <SupportProvider>{page}</SupportProvider>;
// };