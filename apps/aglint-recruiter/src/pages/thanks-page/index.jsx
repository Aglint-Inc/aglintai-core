import React from 'react';

import Seo from '@/src/components/Common/Seo';
import InterviewThanks from '@/src/components/Interview/InterviewThanks';
import { InterviewDetailsContextProvider } from '@/src/context/InterviewDetails';

function ThanksPage() {
  return (
    <>
      <Seo
        title='Thanks Page | Aglint AI'
        description='AI for People Products'
      />
      <div>
        <InterviewDetailsContextProvider>
          <InterviewThanks />
        </InterviewDetailsContextProvider>
      </div>
    </>
  );
}

export default ThanksPage;

ThanksPage.publicProvider = (page) => {
  return <>{page}</>;
};
