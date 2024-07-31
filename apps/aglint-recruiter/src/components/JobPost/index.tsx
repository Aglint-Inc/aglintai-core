/* eslint-disable security/detect-object-injection */
import {
  CandidateType,
  JobApplcationDB,
  JobTypeDB,
} from '@aglint/shared-types';
import { Avatar, Stack, TextField, Typography } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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

import { CompanyListingLinks } from '@/devlink/CompanyListingLinks';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewCompleted } from '@/devlink/InterviewCompleted';
import { JobListing } from '@/devlink/JobListing';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { OpenJobListingCard } from '@/devlink/OpenJobListingCard';
import ThankYou from '@/public/lottie/ThankYouLottie';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { PublicJobAPI } from '@/src/pages/api/jobpost/read';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Footer from '../Common/Footer';
import Icon from '../Common/Icons/Icon';
import UploadDB from './UploadDB';

type JobsListProps = Pick<PublicJobAPI, 'jobs' | 'post' | 'recruiter'>;

const JobPostPublic: React.FC<JobsListProps> = ({ post, recruiter, jobs }) => {
  const router = useRouterPro();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [thank, setThank] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [application, setApplication] = useState<JobApplcationDB>();
  const [candidate, setCandidate] = useState<CandidateType[]>([]);
  const editor = useEditor({
    editable: false,
    content: post?.description,
    extensions: [StarterKit],
  });

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
            setEmail('');
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
    .filter((job: JobTypeDB) => job.status === 'published');

  return (
    <Stack width={'100%'} position={'relative'} minHeight={'100vh'}>
      {thank && (
        <Stack
          height={'100vh'}
          position={'absolute'}
          zIndex={10000}
          width={'100%'}
          bgcolor={'var(--sand-3)'}
          paddingBottom={'16px'}
        >
          <InterviewCompleted
            onClickSupport={{
              onClick: () => {
                application?.id &&
                  window.open(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${application?.id}`,
                  );
              },
            }}
            slotLottie={<ThankYou />}
            textTitle={'Application submitted successfully.'}
            textDescription={`Thank you ${candidate[0]?.first_name} for taking the time to apply for this role. We will be in touch with you soon. If you have any questions, please`}
            slotCompanyLogo={
              <Stack alignItems={'center'} spacing={1} width={'100%'}>
                <Avatar
                  id='topAvatar'
                  variant='rounded'
                  src={recruiter?.logo}
                  sx={{
                    p: 'var(--space-1)',
                    color: 'common.black',
                    '& .MuiAvatar-img ': {
                      objectFit: 'contain',
                    },
                    height: '78px',
                    width: '78px',
                    borderRadius: 'var(--radius-4)',
                    // background={'var(--neutral-1)'},
                  }}
                >
                  <Icon
                    variant='CompanyOutlinedBig'
                    height='100%'
                    width='100%'
                  />
                </Avatar>
                <Typography variant='h3'>
                  {(recruiter as { name: string })?.name}
                </Typography>
                <Typography variant='body1'>
                  {[
                    recruiter?.office_locations[0]?.city,
                    recruiter?.office_locations[0]?.region,
                    recruiter?.office_locations[0]?.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </Typography>
              </Stack>
            }
          />
          <Footer brand={true} />
        </Stack>
      )}
      {loading && (
        <Stack
          height={'100vh'}
          position={'absolute'}
          zIndex={10}
          width={'100%'}
          bgcolor={'#fff'}
        >
          <Stack
            width={'100%'}
            alignItems={'center'}
            height={'100vh'}
            justifyContent={'center'}
          >
            <LoaderSvg />
          </Stack>
        </Stack>
      )}

      <Stack
        sx={{
          height: '100vh',
          overflow: thank || loading ? 'hidden' : 'scroll',
          background: 'var(--sand-3)',
          paddingBottom: '16px',
        }}
      >
        <JobListing
          slotCompanyLogo={
            <Avatar
              id='topAvatar'
              variant='rounded'
              src={post?.logo || recruiter?.logo}
              sx={{
                p: 'var(--space-1)',
                color: 'common.black',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                height: '80px',
                width: '80px',
              }}
            >
              <Icon variant='CompanyOutlinedBig' height='100%' width='100%' />
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
          isDiscriptionEmpty={Boolean(recruiter?.company_overview)}
          textCompanyLocation={post?.location}
          textEmployeeCount={recruiter?.employee_size || '--'}
          slotDescription={
            <>
              <EditorContent editor={editor} />
            </>
          }
          slotApplyForThisJob={
            <UploadDB
              post={post}
              setThank={setThank}
              setLoading={setLoading}
              setApplication={setApplication}
              recruiter={recruiter}
              setCandidate={setCandidate}
            />
          }
          slotLinks={
            recruiter?.socials &&
            Object.entries(recruiter?.socials)?.map((soc, ind) => {
              if (soc[0] === 'custom') {
                return null;
              }
              return (
                <CompanyListingLinks
                  key={ind}
                  slotIcon={
                    <Avatar
                      variant='rounded'
                      sx={{ width: '16px', height: '16px' }}
                      src={`${process.env.NEXT_PUBLIC_HOST_NAME}/images/logo/${soc[0]}.svg`}
                      alt=''
                    />
                  }
                  textLinkName={soc[0]}
                  onClickLink={{
                    onClick: () => {
                      window.open(soc[1] as string, '_blank');
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
                p: 'var(--space-1)',
                color: 'common.black',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                height: 'var(--space-8)',
                width: 'var(--space-8)',
                background: 'var(--neutral-3)',
              }}
            >
              <Icon variant='Person' />
            </Avatar>
          }
          slotOpenJobListing={
            <Stack spacing={2}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, ind) => {
                  return (
                    <OpenJobListingCard
                      key={ind}
                      textJobRole={job.job_title || '--'}
                      textCompanyType={job.departments?.name || '--'}
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
              ) : (
                <GlobalEmptyState
                  textDesc='No jobs found.'
                  iconName='work'
                  size={5}
                />
              )}
            </Stack>
          }
          onClickViewMore={{
            onClick: () => {
              window.open(
                process.env.NEXT_PUBLIC_WEBSITE +
                  '/' +
                  ROUTES['/company-postings/[id]']({ id: recruiter.id }),
                '_blank',
              );
            },
          }}
          slotInputForm={
            <TextField
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
            <Stack direction={'row'} spacing={'var(--space-2)'}>
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

        <Footer brand={true} />
      </Stack>
    </Stack>
  );
};

export default JobPostPublic;
