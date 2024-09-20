import RequestDetailsPage from 'src/app/(authenticated)/_requests/[id]/page';
import RequestDetailsLayout from 'src/app/(authenticated)/_requests/[id]/RequestDetailsLayout';

function Page() {
  return (
    <RequestDetailsLayout>
      <RequestDetailsPage />
    </RequestDetailsLayout>
  );
}

export default Page;
