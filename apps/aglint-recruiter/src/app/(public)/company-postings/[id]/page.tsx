import axios from 'axios';
import { Suspense } from 'react';

import { Loader } from '@/components/Common/Loader';
import { SeoPro } from '@/components/Common/SeoPro';
import CompanyJobPost from '@/components/CompanyJobPost';
import { JobNotFound } from '@/job/components/JobNotFound';
import type { CompanyPostAPI } from '@/pages/api/jobpost/company';

interface JobPostProps {
  params: {
    id: string;
  };
}

const fetchJobPost = async (jobId: string) => {
  console.log('fetchJobPost', jobId);
  try {
    const response = await axios.post<CompanyPostAPI>(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobpost/company`,
      { job_id: jobId },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching job post:', error);
    return null;
  }
};

const JobPost = async ({ params: { id } }: JobPostProps) => {
  const data = await fetchJobPost(id);
  const recruiter = data?.recruiter || null;
  const jobs = data?.jobs || [];

  return (
    <div className='h-screen'>
      <SeoPro
        title={recruiter?.name || 'Company | Aglint AI'}
        description='AI for People Products'
      />
      {recruiter ? (
        <Suspense
          fallback={
            <div className='flex h-screen items-center justify-center'>
              <Loader />
            </div>
          }
        >
          <CompanyJobPost recruiter={recruiter} jobs={jobs} />
        </Suspense>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <JobNotFound />
        </div>
      )}
    </div>
  );
};

export default JobPost;
