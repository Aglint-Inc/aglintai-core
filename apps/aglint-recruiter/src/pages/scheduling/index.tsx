import InterviewsLayout from 'src/app/(authenticated)/_interviews/InterviewsLayout';
import InterviewsPage from 'src/app/(authenticated)/_interviews/page';

function SchedulingMainPage() {
  return (
    <InterviewsLayout>
      <InterviewsPage />
    </InterviewsLayout>
  );
}

export default SchedulingMainPage;
