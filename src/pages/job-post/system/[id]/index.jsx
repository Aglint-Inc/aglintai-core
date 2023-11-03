import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink';
import JobPostSystem from '@/src/components/JobPostSystem';
import Seo from '@/src/components/Seo';

function JobPost() {
  const router = useRouter();
  let jobId = router.query.id;
  const [post, setPost] = useState();
  const [valid, setValid] = useState(false);
  const [initilLoading, setInitialLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      try {
        axios.post('/api/getJob', { id: jobId }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            const location = [
              res.data[0]?.job_city,
              res.data[0]?.job_state,
              res.data[0]?.job_country,
            ]
              .filter(Boolean)
              .join(', ');
            setValid(true);
            setPost({
              job_title: res.data[0].job_title,
              logo: res.data[0].employer_logo,
              company: res.data[0].employer_name,
              location: location,
              description: res.data[0].job_description,
              job_posted_at_datetime_utc:
                res.data[0].job_posted_at_datetime_utc,
              job_country: res.data[0].job_country,
              job_offer_expiration_datetime_utc:
                res.data[0].job_offer_expiration_datetime_utc,
              job_city: res.data[0].job_city,
              job_highlights: res.data[0].job_highlights,
              query: res.data[0].queries,
              employer_logo: res.data[0].employer_logo,
            });

            axios
              .post('/api/getJobs', { search: res.data[0].queries })
              .then((res) => {
                if (res.status === 200) {
                  setJobs(res.data);
                  setInitialLoading(false);
                } else {
                  setInitialLoading(false);
                }
              });
          } else {
            setValid(false);
            setInitialLoading(false);
          }
        });
      } catch (err) {
        setInitialLoading(false);
      }
    }
  }, [router.isReady]);

  let validThrough;
  if (post?.job_posted_at_datetime_utc) {
    const originalDate = new Date(post?.job_posted_at_datetime_utc);
    // Add 30 days
    originalDate?.setDate(originalDate.getDate() + 30);
    // Format the result as a string in ISO 8601 format
    validThrough = originalDate?.toISOString();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    datePosted: post?.job_posted_at_datetime_utc,
    validThrough: post?.job_offer_expiration_datetime_utc || validThrough,
    description: post?.description,
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
        addressLocality: post?.job_city,
        addressCountry: post?.job_country,
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: post?.company || '',
      logo: post?.logo,
    },
    occupationalCategory: '15-1132.00 Software Developers, Application',
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
        image={
          post?.employer_logo ||
          'https://ftyioiysswsjxamofooi.supabase.co/storage/v1/object/public/images/aglint-logo.png'
        }
      />
      {initilLoading ? (
        <Stack height={'100vh'}>
          <LoaderSvg />
        </Stack>
      ) : valid ? (
        <JobPostSystem post={post} jobs={jobs} setPost={setPost} />
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
