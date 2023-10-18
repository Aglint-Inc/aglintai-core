import React from 'react';

import InterviewThanks from '@/src/components/Interview/InterviewThanks';
import { InterviewDetailsContextProvider } from '@/src/context/InterviewDetails';

function ThanksPage() {
  return (
    <div>
      <InterviewDetailsContextProvider>
        <InterviewThanks />
      </InterviewDetailsContextProvider>
    </div>
  );
}

export default ThanksPage;

ThanksPage.getLayout = (page) => {
  return <>{page}</>;
};
