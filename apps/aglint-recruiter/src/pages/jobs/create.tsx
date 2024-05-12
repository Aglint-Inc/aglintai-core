import Seo from '@components/Common/Seo';

import JobCreate from '@/src/components/JobCreate';
import JobsProvider from '@/src/context/JobsContext';

const CreateJobPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobCreate />
    </>
  );
};

CreateJobPage.privateProvider = function privateProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default CreateJobPage;
