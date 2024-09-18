import RequestsPage from 'src/app/(authenticated)/_request/page';
import RequestLayout from 'src/app/(authenticated)/_request/RequestLayout';

import Seo from '@/components/Common/Seo';

const Page = () => {
  return (
    <>
      <Seo
        title={`Requests Dashboard - Requests | Aglint AI`}
        description='AI for People Products'
      />
      <RequestsPage />
    </>
  );
};

Page.privateProvider = (page) => {
  return <RequestLayout>{page}</RequestLayout>;
};

export default Page;
