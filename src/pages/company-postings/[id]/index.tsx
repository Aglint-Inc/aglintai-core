import Seo from '@components/Common/Seo';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Loader from '@/src/components/Common/Loader';
import CompanyJobPost from '@/src/components/CompanyJobPost';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';

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
        title={recruiter?.name || 'Company'}
        description='Explore exciting career opportunities and find your perfect job match on our job listing page'
      />
      {loading ? (
        <Stack height={'100vh'}>
          <Loader />
        </Stack>
      ) : valid ? (
        <CompanyJobPost recruiter={recruiter} jobs={jobs} />
      ) : (
        <Stack width={'100%'} alignItems={'center'} p={'100px'}>
          <Typography variant='h3'>Invalid Job Post</Typography>
        </Stack>
      )}
    </Stack>
  );
}

export default JobPost;

JobPost.getLayout = (page) => {
  return <>{page}</>;
};
