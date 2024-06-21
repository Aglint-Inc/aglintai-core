import Seo from '@components/Common/Seo';

import JobCreate from '@/src/components/Jobs/Create';

const CreateJobPage = () => {
  return (
    <>
      <Seo
        title={`Create Job - Job | Aglint AI `}
        description='AI for People Products'
      />
      <JobCreate />
    </>
  );
};

export default CreateJobPage;
