import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InvalidJob, LoaderSvg } from '@/devlink';
import Seo from '@/src/components/Common/Seo';
import JobPostPublic from '@/src/components/JobPost';
import InvalidJobPostLottie from '@/src/components/JobPost/InvalidJobPostLottie';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';

function JobPost() {
  const router = useRouter();
  let jobId = router.query.id;
  const [post, setPost] = useState<JobTypeDB>();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState<RecruiterDB>();
  const [jobs, setJobs] = useState<JobTypeDB[]>([]);

  useEffect(() => {
    if (router.isReady) {
      let query = isValidUUID(jobId) ? `id.eq.${jobId}` : `slug.eq.${jobId}`;

      (async () => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobpost/read`,
          {
            query: query,
            preview: router.query.preview,
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
    }
  }, [router]);

  function isValidUUID(uuid) {
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

  let description = post?.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    datePosted: post?.created_at,
    validThrough: validThrough,
    description: description,
    employmentType: 'Full-time',
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: post.experience_in_months || 0,
    },
    incentiveCompensation:
      'Performance-based annual bonus plan, project-completion bonuses',
    industry: 'Computer Software',

    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',

        addressLocality: (post?.location_json as any)?.state || '',
        addressCountry: (post?.location_json as any)?.country || '',
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: post?.company || '',
      logo: post?.logo,
    },
    occupationalCategory: '15-1132.00 Software Developers, Application',
    salaryCurrency: post?.location?.split(', ')[2] == 'India' ? 'INR' : 'USD',
    skills: post?.skills?.join(','),
    title: post?.job_title,
    workHours: '40 hours per week',
  };

  return (
    <Stack minHeight={'100vh'}>
      <Seo
        jsonLd={jsonLd}
        title={
          post?.job_title
            ? `${post?.job_title} | ${post?.company}`
            : 'Job posting'
        }
        url={`${process.env.NEXT_PUBLIC_WEBSITE}${router.asPath}`}
        description='AI Powered Talent Development Platform.'
      />
      {loading ? (
        <Stack
          height={'100vh'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <LoaderSvg />
        </Stack>
      ) : valid ? (
        <JobPostPublic post={post} recruiter={recruiter} jobs={jobs} />
      ) : (
        <InvalidJob slotLottie={<InvalidJobPostLottie />} />
      )}
    </Stack>
  );
}

export default JobPost;

JobPost.getLayout = (page) => {
  return <>{page}</>;
};
