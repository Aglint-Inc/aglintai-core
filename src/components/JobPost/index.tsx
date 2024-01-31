/* eslint-disable security/detect-object-injection */
import { Avatar, Stack, TextField, Typography } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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

import {
  CompanyListingLinks,
  InterviewCompleted,
  JobListing,
  LoaderSvg,
  OpenJobListingCard,
} from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import {
  CandidateType,
  JobApplcationDB,
  JobTypeDB,
  RecruiterDB,
  RecruiterType,
} from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import ThankYou from './ThankYouLottie';
import UploadDB from './UploadDB';
import Icon from '../Common/Icons/Icon';

interface JobsListProps {
  post: JobTypeDB;
  recruiter: RecruiterDB;
  jobs: JobTypeDB[];
}

const JobPostPublic: React.FC<JobsListProps> = ({
  post,
  recruiter,
  jobs,
}: {
  post: JobTypeDB;
  recruiter: RecruiterType;
  jobs: JobTypeDB[];
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [thank, setThank] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [application, setApplication] = useState<JobApplcationDB>();
  const [candidate, setCandidate] = useState<CandidateType>();
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
          bgcolor={'#fff'}
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
            textDescription={`Thank you ${candidate?.first_name} for taking the time to apply for this role. We will be in touch with you soon. If you have any questions, please`}
            slotCompanyLogo={
              <Stack alignItems={'center'} spacing={1} width={'100%'}>
                <Avatar
                  id='topAvatar'
                  variant='rounded'
                  src={recruiter?.logo}
                  sx={{
                    p: '4px',
                    color: 'common.black',
                    '& .MuiAvatar-img ': {
                      objectFit: 'contain',
                    },
                    height: '78px',
                    width: '78px',
                    borderRadius: '8px',
                    // background: palette.grey[100],
                  }}
                >
                  <Icon variant='CompanyOutlinedBig' />
                </Avatar>
                <Typography variant='h3'>
                  {(recruiter as { name: string })?.name}
                </Typography>
                <Typography variant='body2'>
                  {[
                    (
                      recruiter as {
                        office_locations: {
                          city?: string;
                          region?: string;
                          country?: string;
                        }[];
                      }
                    )?.office_locations[0]?.city,
                    (
                      recruiter as {
                        office_locations: {
                          city?: string;
                          region?: string;
                          country?: string;
                        }[];
                      }
                    )?.office_locations[0]?.region,
                    (
                      recruiter as {
                        office_locations: {
                          city?: string;
                          region?: string;
                          country?: string;
                        }[];
                      }
                    )?.office_locations[0]?.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </Typography>
              </Stack>
            }
          />
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
        }}
      >
        <JobListing
          slotCompanyLogo={
            <Avatar
              id='topAvatar'
              variant='rounded'
              src={post?.logo || recruiter?.logo}
              sx={{
                p: '4px',
                color: 'common.black',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                height: '78px',
                width: '78px',
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
              } else if (soc[0] !== 'custom' && !soc[1]) {
                return null;
              }
              return (
                <CompanyListingLinks
                  key={ind}
                  slotIcon={
                    <Image
                      src={`${process.env.NEXT_PUBLIC_HOST_NAME}/images/logo/${soc[0]}.svg`}
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
              router.push(
                process.env.NEXT_PUBLIC_WEBSITE +
                  '/' +
                  pageRoutes.COMPANYPOSTINGS +
                  '/' +
                  recruiter.id,
              );
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
