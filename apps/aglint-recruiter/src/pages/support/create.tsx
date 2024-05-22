import React from 'react';

import Seo from '@/src/components/Common/Seo';
import Support from '@/src/components/Support/Create';

function SupportPage() {
  return (
    <>
      <Seo
        title='Create Support - Support | Aglint AI'
        description='AI for People Products'
      />
      <Support />;
    </>
  );
}

export default SupportPage;
SupportPage.publicProvider = (page) => {
  return <>{page}</>;
};
