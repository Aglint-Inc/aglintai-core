import Seo from '@components/Common/Seo';

import JobEmailTemplatesDashboard from '@/src/components/Jobs/Job/EmailTemplates';
import { JobProvider } from '@/src/context/JobContext';

const JobEmailTemplatesPage = () => {
  return (
    <>
      <Seo
        title='Email Templates - Job | Aglint AI'
        description='AI for People Products'
      />
      <JobEmailTemplatesDashboard />
    </>
  );
};

JobEmailTemplatesPage.privateProvider = function privateProvider(page) {
  return <JobProvider>{page}</JobProvider>;
};

export default JobEmailTemplatesPage;
