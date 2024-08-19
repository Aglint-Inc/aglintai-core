import { useRouter } from 'next/router';

import ViewRequestDetails from '@/src/components/Requests/ViewRequestDetails';
import { RequestProvider } from '@/src/context/RequestContext';
import { RequestsProvider } from '@/src/context/RequestsContext';

function RequestDetailsPage() {
  const { query } = useRouter();
  return (
    <div>
      <RequestsProvider>
        <RequestProvider request_id={String(query?.id)}>
          <ViewRequestDetails />
        </RequestProvider>
      </RequestsProvider>
    </div>
  );
}

export default RequestDetailsPage;
