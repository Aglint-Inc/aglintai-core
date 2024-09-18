import RequestHistoryPage from 'src/app/(authenticated)/_requests/[history]/page';
import RequestLayout from 'src/app/(authenticated)/_requests/RequestLayout';

import Seo from '@/components/Common/Seo';

const RequestsHistoryPage = () => {
  return (
    <>
      <Seo
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
