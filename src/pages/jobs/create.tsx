import Seo from '@components/Common/Seo';

import JobCreate from '@/src/components/JobCreate';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import JobsProvider from '@/src/context/JobsContext';

const CreateJobPage = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Jobs`}
        description='AI for People Products'
      />
      <JobCreate />
    </>
  );
};

CreateJobPage.getProvider = function getProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default CreateJobPage;
