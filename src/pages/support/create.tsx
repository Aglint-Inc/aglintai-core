import React from 'react';

import Support from '@/src/components/Support/Create';

function SupportPage() {
  return <Support />;
}

export default SupportPage;
SupportPage.publicProvider = (page) => {
  return <>{page}</>;
};
