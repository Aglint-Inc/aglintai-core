import AllInterviewsLayout from 'src/app/(authenticated)/_interviews/all/AllInterviewsLayout';
import AllInterviewsPage from 'src/app/(authenticated)/_interviews/all/page';

function AllInterviewPage() {
  return (
    <AllInterviewsLayout>
      <AllInterviewsPage />
    </AllInterviewsLayout>
  );
}

export default AllInterviewPage;
