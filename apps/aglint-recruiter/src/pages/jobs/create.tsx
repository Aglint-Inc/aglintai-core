import Seo from '@/components/Common/Seo';
import JobCreate from '@/jobs/create/components';

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
