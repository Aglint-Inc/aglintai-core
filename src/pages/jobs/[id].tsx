import JobApplicationProvider /*, {useJobApplications, useJobApplicationsForJob} */ from '@context/JobApplicationsContext';
import JobsProvider /*, { useJobs } */ from '@context/JobsContext';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const JobPage = () => {
  const router = useRouter();
  return (
    <>
      <Stack>{router.query.id}</Stack>
    </>
  );
};

JobPage.getProvider = function getProvider(page) {
  return (
    <JobsProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobsProvider>
  );
};

export default JobPage;
