import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Seo from '@/components/Common/Seo';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
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
      <UIPageLayout
        slotTopbarLeft={<Typography>{capitalizeAll(String(tab))}</Typography>}
        slotTopbarRight={<InterviewersTabs />}
        slotBody={<Interviewers />}
      />
    </>
  );
}

export default InterviewersPage;
