import Seo from '@/src/components/Common/Seo';
import Interviewer from '@/src/components/Scheduling/Interviewers/Interviewer';
import { InterviewerContextProvider } from '@/src/context/InterviewerContext/InterviewerContext';

function InterviewerPage() {
  return (
    <>
      <Seo
        title={`Interviewer - Scheduling | Aglint AI`}
        description='AI for People Products'
      />
      <Interviewer />
    </>
  );
}

InterviewerPage.privateProvider = function privateProvider(page) {
  return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
};

export default InterviewerPage;
