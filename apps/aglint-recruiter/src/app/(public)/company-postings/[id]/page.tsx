'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Loader from '@/components/Common/Loader';
import { SeoPro } from '@/components/Common/SeoPro';
import CompanyJobPost from '@/components/CompanyJobPost';
import { JobNotFound } from '@/job/components/JobNotFound';
import { type CompanyPostAPI } from '@/pages/api/jobpost/company';

function JobPost({ params: { id } }: { params: { id: string } }) {
  const jobId = id;
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
    <div className='h-screen'>
      <SeoPro
        title={recruiter?.name || 'Company | Aglint AI'}
        description='AI for People Products'
      />
      {loading ? (
        <div className='h-screen flex justify-center items-center'>
          <Loader />
        </div>
      ) : valid ? (
        <CompanyJobPost recruiter={recruiter} jobs={jobs} />
      ) : (
        <div className='h-screen flex justify-center items-center'>
          <JobNotFound />
        </div>
      )}
    </div>
  );
}

export default JobPost;
