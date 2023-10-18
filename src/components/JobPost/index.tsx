/* eslint-disable security/detect-object-injection */
import { Avatar, Chip, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { CompanyListingLinks, JobListing, OpenJobListingCard } from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import UploadDB from './UploadDB';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';

interface JobsListProps {
  post: JobTypeDB;
  recruiter: RecruiterDB;
  jobs: JobTypeDB[];
}

const JobPostPublic: React.FC<JobsListProps> = ({ post, recruiter, jobs }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState(false);
  const [thank, setThank] = useState(false);
  const [loading, setLoading] = useState(false);

  const notifyMe = () => {
    if (email) {
      supabase
        .from('notify_me')
        .select('*')
        .eq('email', email)
        .then(async ({ data, error }) => {
          if (!error && data.length == 0) {
            await supabase
              .from('notify_me')
              .insert({
                email: email,
                job_id: post.id,
                job_title: post.job_title,
              })
              .select();
            toast.success(
              'Thank you for subscribing! You will be notified via email.',
            );
          } else {
            toast.success(
              'Thank you for subscribing! You will be notified via email.',
            );
          }
        });
    } else {
      setError(true);
    }
  };
  const filteredJobs = jobs
    .filter((job) => job.id !== post.id)
    .filter((job: any) => job.active_status.sourcing.isActive);

  return (
    <Stack width={'100%'} position={'relative'}>
      {thank && (
        <Stack
          height={'100vh'}
          position={'absolute'}
          zIndex={10000}
          width={'100%'}
          bgcolor={'#fff'}
        >
          <Stack direction={'row'} justifyContent={'center'} mt={'10vh'}>
            <Stack
              sx={{
                p: 4,
                borderRadius: '4px',
                border: '1px solid #d8dcde',
                maxWidth: '600px',
                textAlign: 'center',
              }}
            >
              <Typography variant='h4'>
                Thank You For Applying. We will notify you via email regarding
                the status of your application.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {loading && (
        <Stack
          height={'100vh'}
          position={'absolute'}
          zIndex={10000}
          width={'100%'}
          bgcolor={'#fff'}
        >
          <Loader />
        </Stack>
      )}

      <Stack
        sx={{
          height: '100vh',
          overflow: thank || loading ? 'hidden' : 'scroll',
        }}
      >
        <JobListing
          slotCompanyLogo={
            <Avatar
              id='topAvatar'
              variant='rounded'
              src={post?.logo}
              sx={{
                p: '4px',
                color: 'common.black',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                height: '78px',
                width: '78px',
                background: palette.grey[100],
              }}
            >
              <Icon variant='CompanyOutlinedBig' />
            </Avatar>
          }
          onClickApplyNow={{
            onClick: () => {
              const targetElement = document.getElementById('scrollTarget');
              if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'center',
                });
              }
            },
          }}
          textRole={post?.job_title}
          textCompanyName={post?.company}
          textCompanyType={recruiter?.industry}
          textAboutJob={'Ask your queries about this job to the recruiter. '}
          textCompanyDescription={recruiter?.company_overview}
          textCompanyLocation={post?.location}
          textEmployeeCount={recruiter?.employee_size || '--'}
          slotDescription={
            <>
              <Typography
                pt='4px'
                variant='body2'
                color={palette.grey[800]}
                sx={{
                  whiteSpace: 'pre-wrap',
                  h5: {
                    color: palette.grey[600],
                    pt: '20px',
                    pb: '10px',
                    m: 0,
                    fontWeight: 600,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: post?.description }}
              />
              {post?.skills.length > 0 && (
                <>
                  <Typography
                    variant='h5'
                    color={palette.grey[600]}
                    sx={{ pt: '20px', fontWeight: 600 }}
                  >
                    Skills
                  </Typography>
                  <Stack
                    mt={'10px'}
                    gap={2}
                    direction='row'
                    alignItems='stretch'
                    flexWrap='wrap'
                  >
                    {post?.skills?.map((skill, index) => (
                      <Chip label={skill} key={index} />
                    ))}
                  </Stack>
                </>
              )}
            </>
          }
          slotApplyForThisJob={
            <UploadDB post={post} setThank={setThank} setLoading={setLoading} />
          }
          slotLinks={
            recruiter?.socials &&
            Object.entries(recruiter?.socials)?.map((soc, ind) => {
              if (soc[0] === 'custom') {
                return null;
              } else if (soc[0] !== 'custom' && !soc[1]) {
                return null;
              }
              return (
                <CompanyListingLinks
                  key={ind}
                  slotIcon={
                    <Image
                      src={`/images/logo/${soc[0]}.svg`}
                      height={16}
                      width={16}
                      alt=''
                    />
                  }
                  textLinkName={soc[0]}
                  onClickLink={{
                    onClick: () => {
                      window.open(soc[1], '_blank');
                    },
                  }}
                />
              );
            })
          }
          slotImageAskJob={
            <Avatar
              variant='rounded'
              src={''}
              sx={{
                p: '4px',
                color: 'common.black',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                height: '58px',
                width: '58px',
                background: palette.grey[200],
              }}
            >
              <Icon variant='Person' />
            </Avatar>
          }
          slotOpenJobListing={
            <Stack spacing={2}>
              {filteredJobs.length > 0
                ? filteredJobs.map((job, ind) => {
                    return (
                      <OpenJobListingCard
                        key={ind}
                        textJobRole={job.job_title || '--'}
                        textCompanyType={job.department || '--'}
                        textLocation={job.location || '--'}
                        textWorkingType={job.job_type || '--'}
                        onClickApplyNow={{
                          onClick: () => {
                            const targetElement =
                              document.getElementById('topAvatar');
                            if (targetElement) {
                              targetElement.scrollIntoView({
                                behavior: 'instant',
                                block: 'end',
                                inline: 'end',
                              });
                            }
                            router.push(job.id);
                          },
                        }}
                      />
                    );
                  })
                : 'No More Jobs Postings'}
            </Stack>
          }
          onClickViewMore={{
            onClick: () => {
              router.push(pageRoutes.COMPANYPOSTINGS + recruiter.id);
            },
          }}
          slotInputForm={
            <TextField
              margin='none'
              sx={{ pb: '10px' }}
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={error}
              helperText={error ? 'Email is required' : ''}
            />
          }
          onClickNotifyMe={{
            onClick: () => {
              notifyMe();
            },
          }}
          slotSocialLink={
            <Stack direction={'row'} spacing={'10px'}>
              <LinkedinShareButton
                style={{ padding: 0, margin: 0 }}
                title={`Job Post - ${post.job_title}`}
                url={window.location.href}
                source={window.location.href}
              >
                <LinkedinIcon borderRadius={8} size={24} />
              </LinkedinShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={`Job Post - ${post.job_title}`}
              >
                <TwitterIcon borderRadius={8} size={24} />
              </TwitterShareButton>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon borderRadius={8} size={24} />
              </FacebookShareButton>
              <RedditShareButton
                url={window.location.href}
                title={`Job Post - ${post.job_title}`}
              >
                <RedditIcon borderRadius={8} size={24} />
              </RedditShareButton>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
};

export default JobPostPublic;

export const jobOpenings = [
  'Frontend Developer',
  'Software Engineer',
  'Designer',
  'Tester',
  'Data Analyst',
  'HR',
  'Project manager',
  'Business Analyst',
  'React developer',
  'NodeJs developer',
];
