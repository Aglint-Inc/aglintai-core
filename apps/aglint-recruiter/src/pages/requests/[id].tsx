import ViewRequestDetails from '@/src/components/Requests/ViewRequestDetails';
import { RequestProvider } from '@/src/context/RequestContext';
import { RequestsProvider } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';

function RequestDetailsPage() {
  const { params } = useRouterPro();
  return (
    <div>
      <RequestsProvider>
        <RequestProvider request_id={params.id}>
          <ViewRequestDetails />
        </RequestProvider>
      </RequestsProvider>
    </div>
  );
}

export default RequestDetailsPage;
