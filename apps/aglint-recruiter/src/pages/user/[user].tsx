import React from 'react';
import Page from 'src/app/(authenticated)/_user/page';

import Seo from '@/components/Common/Seo';
import { InterviewerContextProvider } from '@/context/InterviewerContext/InterviewerContext';

function User() {
  return (
    <>
      <Seo
        title={`Interviewer - Scheduling | Aglint AI`}
        description='AI for People Products'
      />
      <Page />
    </>
  );
}

User.privateProvider = function privateProvider(page) {
  return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
};

export default User;
