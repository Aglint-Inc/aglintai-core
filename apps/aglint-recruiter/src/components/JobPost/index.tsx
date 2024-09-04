/* eslint-disable security/detect-object-injection */
import {
  type CandidateType,
  type JobApplcationDB,
  type JobTypeDB,
} from '@aglint/shared-types';
import Typography from '@mui/material/Typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Building2 } from 'lucide-react';
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

import { useToast } from '@/components/hooks/use-toast';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import ThankYou from '@/public/lottie/ThankYouLottie';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type PublicJobAPI } from '@/pages/api/jobpost/read';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';

import Footer from '../Common/Footer';
import UploadDB from './UploadDB';

type JobsListProps = Pick<PublicJobAPI, 'jobs' | 'post' | 'recruiter'>;

const JobPostPublic: React.FC<JobsListProps> = ({ post, recruiter, jobs }) => {
  const { toast } = useToast();
  const router = useRouterPro();
  const [email, setEmail] = useState<string>('');
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
            toast({
              description:
                'Thank you for subscribing! You will be notified via email.',
            });
          } else {
            toast({
              description:
                'Thank you for subscribing! You will be notified via email.',
            });
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
    <div className='relative min-h-screen w-full'>
      {thank && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-background'>
          <Card className='p-6 space-y-4'>
            <ThankYou />
            <Typography variant='h3'>
              Application submitted successfully.
            </Typography>
            <Typography>
              Thank you {candidate[0]?.first_name} for taking the time to apply
              for this role. We will be in touch with you soon. If you have any
              questions, please
            </Typography>
            <Button
              onClick={() => {
                application?.id &&
                  window.open(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${application?.id}`,
                  );
              }}
            >
              Contact Support
            </Button>
            <div className='flex items-center space-x-4'>
              <Avatar src={recruiter?.logo}>
                <Building2 className='h-10 w-10' />
              </Avatar>
              <div>
                <Typography variant='h4'>{recruiter?.name}</Typography>
                <Typography variant='muted'>
                  {[
                    recruiter?.office_locations[0]?.city,
                    recruiter?.office_locations[0]?.region,
                    recruiter?.office_locations[0]?.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      )}
      {loading && (
        <div className='absolute inset-0 z-40 flex items-center justify-center bg-background'>
          <Skeleton className='h-12 w-12 rounded-full' />
        </div>
      )}

      <ScrollArea
        className={`h-screen ${thank || loading ? 'overflow-hidden' : ''}`}
      >
        <div className='flex space-x-6 p-6 justify-center'>
          {/* Left side */}

          <div className='w-2/3 space-y-6'>
            <Card className='p-6'>
              <div className='flex items-center space-x-4 mb-6 justify-between'>
                <div className='flex items-center space-x-4'>
                  <Avatar className='h-20 w-20 border rounded overflow-hidden'>
                    {recruiter?.logo ? (
                      <img
                        src={recruiter.logo}
                        alt={recruiter?.name || 'Company logo'}
                        className='h-full w-full object-cover'
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Building2 className='h-10 w-10' />
                    )}
                  </Avatar>
                  <div>
                    <Typography variant='h4' className='font-semibold'>
                      {post?.job_title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {recruiter?.name} • {recruiter?.industry}
                    </Typography>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const targetElement =
                      document.getElementById('scrollTarget');
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                      });
                    }
                  }}
                  size='sm'
                >
                  Apply Now
                </Button>
              </div>

              <div className='mt-6'>
                <Typography variant='h4' className='font-semibold'>
                  About the Job
                </Typography>
                <Typography>
                  Ask your queries about this job to the recruiter.
                </Typography>
              </div>
              {recruiter?.company_overview && (
                <div className='mt-6'>
                  <Typography variant='h4' className='font-semibold'>
                    Company Description
                  </Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: recruiter.company_overview,
                    }}
                  />
                </div>
              )}
              <div className='mt-6 grid grid-cols-2 gap-4'>
                <Card className='p-4'>
                  <div className='flex items-center space-x-3'>
                    <div>
                      <Typography color='text.secondary' className='text-sm'>
                        Location
                      </Typography>
                      <Typography className='font-medium'>
                        {recruiter?.office_locations[0]?.city || '--'},
                        {recruiter?.office_locations[0]?.region || '--'},
                        {recruiter?.office_locations[0]?.country || '--'}
                      </Typography>
                    </div>
                  </div>
                </Card>
                <Card className='p-4'>
                  <div className='flex items-center space-x-3'>
                    <div>
                      <Typography color='text.secondary' className='text-sm'>
                        Employee Count
                      </Typography>
                      <Typography className='font-medium'>
                        {recruiter?.employee_size || '--'}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='mt-6'>
                <Typography variant='h4' className='font-semibold'>
                  Job Description
                </Typography>
                <EditorContent editor={editor} />
              </div>
              <div className='mt-12' id='scrollTarget'>
                <UploadDB
                  post={post}
                  setThank={setThank}
                  setLoading={setLoading}
                  setApplication={setApplication}
                  recruiter={recruiter}
                  setCandidate={setCandidate}
                />
              </div>
            </Card>

            <Card className='p-6'>
              <Typography variant='h4' className='mb-4 font-semibold'>
                Other Open Positions
              </Typography>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, ind) => (
                  <Card key={ind} className='p-4 mb-4'>
                    <Typography variant='h5'>
                      {job.job_title || '--'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {job.departments?.name || '--'}
                    </Typography>
                    <Typography>Location: --</Typography>
                    <Typography>Type: {job.job_type || '--'}</Typography>
                    <Button
                      className='mt-2'
                      onClick={() => {
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
                      }}
                    >
                      Apply Now
                    </Button>
                  </Card>
                ))
              ) : (
                <div className='p-4 flex flex-col items-center justify-center h-24'>
                  <Building2 className='w-8 h-8 text-gray-400 mb-2' />
                  <Typography variant='body1' color='text.secondary'>
                    No jobs found.
                  </Typography>
                </div>
              )}
              <Button
                size='sm'
                className='mt-4 text-sm py-1 px-3'
                onClick={() => {
                  window.open(
                    process.env.NEXT_PUBLIC_WEBSITE +
                      '/' +
                      ROUTES['/company-postings/[id]']({ id: recruiter.id }),
                    '_blank',
                  );
                }}
              >
                View More
              </Button>
            </Card>
          </div>

          <div className='w-1/4'>
            <div className='sticky top-6 space-y-6'>
              <Card className='p-6'>
                <Typography variant='h4' className='mb-4 font-semibold'>
                  Share Job Post
                </Typography>
                <div className='flex space-x-2'>
                  <LinkedinShareButton
                    title={`Job Post - ${post.job_title}`}
                    url={window.location.href}
                    source={window.location.href}
                  >
                    <LinkedinIcon size={24} round />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={`Job Post - ${post.job_title}`}
                  >
                    <TwitterIcon size={24} round />
                  </TwitterShareButton>
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <RedditShareButton
                    url={window.location.href}
                    title={`Job Post - ${post.job_title}`}
                  >
                    <RedditIcon size={24} round />
                  </RedditShareButton>
                </div>

                <div className='my-4 border-t border-gray-200'></div>

                <Typography variant='h4' className='mb-1 font-semibold'>
                  Get Notified
                </Typography>
                <Typography className='mb-4 text-sm text-muted-foreground'>
                  Stay updated with new job opportunities
                </Typography>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='mb-4'
                />
                <Button
                  onClick={notifyMe}
                  variant='default'
                  className='w-full text-sm py-1'
                >
                  Notify Me
                </Button>
                {error && (
                  <Typography className='text-destructive text-sm mt-2'>
                    Email is required
                  </Typography>
                )}
              </Card>
            </div>
          </div>
        </div>

        <Footer brand={true} />
      </ScrollArea>
    </div>
  );
};

export default JobPostPublic;
