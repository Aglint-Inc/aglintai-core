import { JobTypeDB, RecruiterDB } from '@aglint/shared-types';
import Seo from '@components/Common/Seo';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Footer from '@/src/components/Common/Footer';
import Loader from '@/src/components/Common/Loader';
import CompanyJobPost from '@/src/components/CompanyJobPost';

import JobNotFound from '../JobNotFound';

function JobPost() {
  const router = useRouter();
  let jobId = router.query.id;
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState<RecruiterDB>();
  const [jobs, setJobs] = useState<JobTypeDB[]>([]);

  useEffect(() => {
    if (router.isReady && jobId) {
      let jobId = router.query.id;
      (async () => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobpost/company`,
          {
            job_id: jobId,
          },
        );
        if (response.data) {
          setRecruiter(response.data.recruiter);
          setJobs(response.data.jobs);
          if (response.data.recruiter) {
            setValid(true);
            setLoading(false);
          }
        }
      })();
    }
  }, [router.isReady]);

  return (
    <Stack height={'100vh'}>
      <Seo
        title={recruiter?.name || 'Company | Aglint AI'}
        description='AI for People Products'
      />
      {loading ? (
        <Stack height= "100vh" justifyContent="center" alignItems="center">
          <Loader />
        </Stack>
      ) : valid ? (
        <CompanyJobPost recruiter={recruiter} jobs={jobs} />
      ) : (
        <Stack height="100vh" justifyContent="center" alignItems="center">
          <JobNotFound />
        </Stack>
      )}
     
    </Stack>
  );
}

export default JobPost;

JobPost.publicProvider = (page) => {
  return <>{page}</>;
};
