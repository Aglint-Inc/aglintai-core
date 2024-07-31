import Seo from '@components/Common/Seo';

import Requests from '@/src/components/Requests/index';

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
  return <>{page}</>;
};

export default RequestsPage;
