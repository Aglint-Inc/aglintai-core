import Seo from '@components/Common/Seo';

import Requests from '@/src/components/Requests/index';
import { RequestsProvider } from '@/src/context/RequestsContext';

const RequestsPage = () => {
  return (
    <>
      <Seo
        title={`Requests Dashboard - Requests | Aglint AI`}
        description='AI for People Products'
      />
      <Requests />
    </>
  );
};

RequestsPage.privateProvider = (page) => {
  return <RequestsProvider>{page}</RequestsProvider>;
};

export default RequestsPage;
