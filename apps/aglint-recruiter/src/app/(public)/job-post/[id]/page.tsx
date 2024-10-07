'use client';
import axios from 'axios';
import { type ReactNode, useEffect, useState } from 'react';

import { Loader } from '@/common/Loader';
import { SeoPro } from '@/components/Common/SeoPro';
import JobPostPublic from '@/components/JobPost';
import { type PublicJobAPI } from '@/pages/api/jobpost/read';

function JobPost({
  params: { id },
  searchParams: { preview },
}: {
  params: { id: string };
  searchParams: { preview: boolean };
}) {
  const jobId = id;
  const [post, setPost] = useState<PublicJobAPI['post']>();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState<PublicJobAPI['recruiter']>();
  const [jobs, setJobs] = useState<PublicJobAPI['jobs']>([]);

  useEffect(() => {
    const query = isValidUUID(jobId) ? `id.eq.${jobId}` : `slug.eq.${jobId}`;

    (async () => {
      const response = await axios.post<PublicJobAPI>(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobpost/read`,
        {
          query: query,
          preview: preview,
        },
      );
      if (response.data) {
        setPost(response.data.post);
        setValid(response.data.isValid);
        setRecruiter(response.data.recruiter);
        setJobs(response.data.jobs);
        setLoading(false);
      }
    })();
  }, []);

  function isValidUUID(uuid: string) {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
  }

  let validThrough;
  if (post?.created_at) {
    const originalDate = new Date(post?.created_at);
    // Add 30 days
    originalDate?.setDate(originalDate.getDate() + 30);
    // Format the result as a string in ISO 8601 format
    validThrough = originalDate?.toISOString();
  }

  const description = post?.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    datePosted: post?.created_at,
    validThrough: validThrough,
    description: description,
    employmentType: 'Full-time',
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      // monthsOfExperience: post?.experience_in_months || 0,
    },
    incentiveCompensation:
      'Performance-based annual bonus plan, project-completion bonuses',
    industry: 'Computer Software',

    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        // addressLocality: (post?.location_json as any)?.state || '',
        // addressCountry: (post?.location_json as any)?.country || '',
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      // name: post?.company || '',
      logo: recruiter?.logo,
    },
    occupationalCategory: '15-1132.00 Software Developers, Application',
    salaryCurrency: 'USD',
    // skills: post?.skills?.join(','),
    title: post?.job_title,
    workHours: '40 hours per week',
  };

  return (
    <div className='min-h-screen'>
      <SeoPro
        jsonLd={jsonLd}
        title={
          post?.job_title
            ? `${post?.job_title} | ${recruiter?.name}`
            : 'Job posting'
        }
        description='AI for People Products'
      />
      {loading ? (
        <Loader />
      ) : valid ? (
        <JobPostPublic post={post!} recruiter={recruiter!} jobs={jobs} />
      ) : (
        <div className='flex h-screen flex-col items-center justify-center'>
          <p className='mt-4 text-xl font-semibold text-gray-700'>
            Job not found. Please check the URL or try again later.
          </p>
        </div>
      )}
    </div>
  );
}

export default JobPost;

JobPost.publicProvider = (page: ReactNode) => {
  return <>{page}</>;
};
