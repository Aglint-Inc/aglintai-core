import RequestDetailsPage from 'src/app/(authenticated)/_request/[id]/page';
import RequestDetailsLayout from 'src/app/(authenticated)/_request/[id]/RequestDetailsLayout';

function Page() {
  return (
    <RequestDetailsLayout>
      <RequestDetailsPage />
    </RequestDetailsLayout>
  );
}

export default Page;
