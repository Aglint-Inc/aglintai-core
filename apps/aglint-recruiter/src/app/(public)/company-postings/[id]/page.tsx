'use client';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Loader from '@/components/Common/Loader';
import { SeoPro } from '@/components/Common/SeoPro';
import CompanyJobPost from '@/components/CompanyJobPost';
import { JobNotFound } from '@/job/components/JobNotFound';
import { type CompanyPostAPI } from '@/pages/api/jobpost/company';

function JobPost({ params: { id } }: { params: { id: string } }) {
  let jobId = id;
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState<CompanyPostAPI['recruiter']>();
  const [jobs, setJobs] = useState<CompanyPostAPI['jobs']>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.post<CompanyPostAPI>(
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
        }
      }
    })().finally(() => setLoading(false));
  }, []);

  return (
    <Stack height={'100vh'}>
      <SeoPro
        title={recruiter?.name || 'Company | Aglint AI'}
        description='AI for People Products'
      />
      {loading ? (
        <Stack height='100vh' justifyContent='center' alignItems='center'>
          <Loader />
        </Stack>
      ) : valid ? (
        <CompanyJobPost recruiter={recruiter} jobs={jobs} />
      ) : (
        <Stack height='100vh' justifyContent='center' alignItems='center'>
          <JobNotFound />
        </Stack>
      )}
    </Stack>
  );
}

export default JobPost;
