import RequestHistoryPage from 'src/app/(authenticated)/_requests/history/page';
import RequestLayout from 'src/app/(authenticated)/_requests/RequestLayout';

import { SeoPro } from '@/components/Common/SeoPro';

const RequestsHistoryPage = () => {
  return (
    <>
      <SeoPro
        title={`Requests Dashboard - Requests | Aglint AI`}
        description='AI for People Products'
      />
      <RequestHistoryPage />
    </>
  );
};

RequestsHistoryPage.privateProvider = (page) => {
  return <RequestLayout>{page}</RequestLayout>;
};

export default RequestsHistoryPage;
