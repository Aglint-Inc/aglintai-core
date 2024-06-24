import Seo from '@components/Common/Seo';

// import JobEmailTemplatesDashboard from '@/src/components/Jobs/Job/Email-Templates';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const JobEmailTemplatesPage = () => {
  return (
    <>
      <Seo
        title='Email Templates - Job | Aglint AI'
        description='AI for People Products'
      />
      {/* <JobEmailTemplatesDashboard /> */}
      <>Email templates</>
    </>
  );
};

JobEmailTemplatesPage.privateProvider = function privateProvider(page) {
  return (
    <JobProvider>
      <JobDashboardProvider>{page}</JobDashboardProvider>
    </JobProvider>
  );
};

export default JobEmailTemplatesPage;
