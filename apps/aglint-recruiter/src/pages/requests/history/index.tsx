import Seo from '@/components/Common/Seo';
import CompletedRequests from '@/components/Requests/CompletedRequests';
import { RequestsProvider } from '@/context/RequestsContext';

const RequestsHistoryPage = () => {
  return (
    <>
      <Seo
        title={`Requests Dashboard - Requests | Aglint AI`}
        description='AI for People Products'
      />
      <CompletedRequests />
    </>
  );
};

RequestsHistoryPage.privateProvider = (page) => {
  return <RequestsProvider>{page}</RequestsProvider>;
};

export default RequestsHistoryPage;
