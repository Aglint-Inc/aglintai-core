import Seo from '@/components/Common/Seo';
import Interviewers from '@/components/Interviewers';

function InterviewersPage() {
  return (
    <>
      <Seo
        title='Interviewers | Aglint AI'
        description='AI for People Products'
      />

      <Interviewers />
    </>
  );
}

export default InterviewersPage;
