import ViewRequestDetails from '@/components/Requests/ViewRequestDetails';
import { RequestProvider } from '@/context/RequestContext';
import { RequestsProvider } from '@/context/RequestsContext';
import { useRouterPro } from '@/hooks/useRouterPro';

function RequestDetailsPage() {
  const { params } = useRouterPro();
  return (
    <RequestsProvider>
      <RequestProvider request_id={params.id}>
        <ViewRequestDetails />
      </RequestProvider>
    </RequestsProvider>
  );
}

export default RequestDetailsPage;
