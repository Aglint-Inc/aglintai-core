import { PageLayout } from '@devlink2/PageLayout';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import Seo from '@/components/Common/Seo';
import Interviewers from '@/components/Interviewers';
import InterviewersTabs from '@/components/Interviewers/Tab';
import { capitalizeAll } from '@/utils/text/textUtils';

function InterviewersPage() {
  const router = useRouter();
  const tab = router.query.tab;
  return (
    <>
      <Seo
        title='Interviewers | Aglint AI'
        description='AI for People Products'
      />
      <PageLayout
        slotTopbarLeft={<Typography>{capitalizeAll(String(tab))}</Typography>}
        slotTopbarRight={<InterviewersTabs />}
        slotBody={<Interviewers />}
      />
    </>
  );
}

export default InterviewersPage;
