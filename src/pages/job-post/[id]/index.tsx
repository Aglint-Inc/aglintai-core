import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InvalidJob, LoaderSvg } from '@/devlink';
import Seo from '@/src/components/Common/Seo';
import JobPostPublic from '@/src/components/JobPost';
import InvalidJobPostLottie from '@/src/components/JobPost/InvalidJobPostLottie';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

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
      supabase
        .from('public_jobs')
        .select('*')
        .or(query)
        .then(({ data, error }) => {
          if (!error && data?.length > 0) {
            if (data[0]?.status == 'closed' || data[0]?.status == 'archived') {
              setValid(false);
            } else {
              if (router.query.preview || data[0]?.status == 'draft') {
                setPost(data[0].draft as JobTypeDB);
              } else {
                setPost(data[0]);
              }
              setPost(data[0]);
              setValid(true);
            }
            setLoading(false);
            supabase
              .from('recruiter')
              .select('*')
              .eq('id', data[0].recruiter_id)
              .then(({ data, error }) => {
                if (!error) {
                  setRecruiter(data[0]);
                }
              });
            supabase
              .from('public_jobs')
              .select('*')
              .eq('recruiter_id', data[0].recruiter_id)
              .then(({ data, error }) => {
                if (!error) {
                  setJobs(data);
                }
              });
          } else {
            setLoading(false);
          }
        });
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
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 450000,
        maxValue: 1200000,
        unitText: 'YEAR',
      },
    },

    datePosted: post?.created_at,
    validThrough: validThrough,
    description: description,
    employmentType: 'Full-time',
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: '6',
    },
    incentiveCompensation:
      'Performance-based annual bonus plan, project-completion bonuses',
    industry: 'Computer Software',

    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: post?.location?.split(', ')[0],
        addressCountry: post?.location?.split(', ')[2] == 'India' ? 'IN' : 'US',
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
