import Page from 'src/app/(authenticated)/_Interviewers/page';

import Seo from '@/components/Common/Seo';

function InterviewersPage() {
  return (
    <>
      <Seo
        title='Interviewers | Aglint AI'
        description='AI for People Products'
      />

      <Page />
    </>
  );
}

export default InterviewersPage;
