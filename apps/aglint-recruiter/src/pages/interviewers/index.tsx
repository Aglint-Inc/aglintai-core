import { Typography } from '@mui/material';
import React from 'react';

import { PageLayout } from '@/devlink2/PageLayout';
import Seo from '@/src/components/Common/Seo';
import Interviewers from '@/src/components/Interviewers';
import InterviewersTabs from '@/src/components/Interviewers/Tab';

function InterviewersPage() {
  return (
    <>
      <Seo
        title='Interviewers | Aglint AI'
        description='AI for People Products'
      />
      <PageLayout
        slotTopbarLeft={<Typography>Interviewers</Typography>}
        slotTopbarRight={<InterviewersTabs />}
        slotBody={<Interviewers />}
      />
      ;
    </>
  );
}

export default InterviewersPage;
