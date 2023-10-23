import Seo from '@components/Common/Seo';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Loader from '@/src/components/Common/Loader';
import CompanyJobPost from '@/src/components/CompanyJobPost';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

function JobPost() {
  const router = useRouter();
  let jobId = router.query.id;
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState<RecruiterDB>();
  const [jobs, setJobs] = useState<JobTypeDB[]>([]);

  useEffect(() => {
    if (router.isReady && jobId) {
      supabase
        .from('recruiter')
        .select('*')
        .eq('id', jobId)
        .then(({ data, error }) => {
          if (!error && data?.length > 0) {
            setRecruiter(data[0]);
            setLoading(false);
            setValid(true);
            supabase
              .from('public_jobs')
              .select('*')
              .eq('recruiter_id', data[0].id)
              .then(({ data, error }) => {
                if (!error) {
                  setJobs(data);
                }
              });
          }
        });
    }
  }, [router.isReady]);

  return (
    <Stack minHeight={'100vh'}>
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
