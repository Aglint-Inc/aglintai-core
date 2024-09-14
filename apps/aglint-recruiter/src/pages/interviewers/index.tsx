import Seo from '@/components/Common/Seo';
import Interviewers from '@/components/Interviewers';
// import { useRouter } from 'next/router';
// import Interviewers from '@/components/Interviewers';
// import InterviewersTabs from '@/components/Interviewers/Tab';

function InterviewersPage() {
  // const router = useRouter();
  // const tab = router.query.tab;
  return (
    <>
      <Seo
        title='Interviewers | Aglint AI'
        description='AI for People Products'
      />
      {/* <UIPageLayout
        slotTopbarLeft={
          <UITypography type='small' variant='p'>
            Interviewers
          </UITypography>
        }
        slotTopbarRight={<></>}
        slotBody={<Interviewers />}
      /> */}
      {/* ex page don't delete 🙏 */}
      {/* <UIPageLayout
        slotTopbarLeft={<Typography>{capitalizeAll(String(tab))}</Typography>}
        slotTopbarRight={<InterviewersTabs />}
        slotBody={<Interviewers />}
      /> */}
      <Interviewers />
    </>
  );
}

export default InterviewersPage;
