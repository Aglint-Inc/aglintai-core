import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ExternalLink, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useIntegrations } from '@/authenticated/hooks';
import axios from '@/client/axios';
import { useTenant } from '@/company/hooks';
import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { useRouterPro } from '@/hooks/useRouterPro';
import { STATE_LEVER_DIALOG } from '@/jobs/constants';
import {
  useIntegrationActions,
  useIntegrationStore,
  useJobs,
} from '@/jobs/hooks';
import { api } from '@/trpc/client';
import toast from '@/utils/toast';

import NoAtsResult from '../NoAtsResult';
import { POSTED_BY } from '../utils';
import { type LeverJob } from './types/job';
import { fetchAllJobs } from './utils';

export default function LeverModalComp() {
  const { recruiter } = useTenant();
  const { setIntegrations, resetIntegrations } = useIntegrationActions();
  const integration = useIntegrationStore((state) => state.integrations);
  const { superPush } = useRouterPro();
  const { jobs, handleGenerateJd } = useJobs();
  const [loading, setLoading] = useState(false);
  const [leverPostings, setLeverPostings] = useState<LeverJob[]>([]);
  const [selectedLeverPostings, setSelectedLeverPostings] =
    useState<LeverJob | null>(null);
  const [leverFilter, setLeverFilter] = useState('published');
  const [initialFetch, setInitialFetch] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const apiRef = useRef<HTMLInputElement | null>(null);
  const { data: integrations } = useIntegrations();
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    if (jobs.status === 'success' && integrations?.lever_key) {
      fetchJobs();
    }
  }, [jobs.status, integrations?.lever_key]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(integrations.lever_key!);
    setLeverPostings(
      allJobs.filter((post) => {
        if (
          jobs.data?.filter(
            (job) =>
              job.posted_by === POSTED_BY.LEVER && job.job_title === post.text,
          ).length == 0
        ) {
          return true;
        } else {
          return false;
        }
      }),
    );
    setInitialFetch(false);
  };

  const { mutateAsync } = api.ats.lever.create_job.useMutation();

  const importLever = async () => {
    try {
      setIntegrations({
        lever: { open: true, step: STATE_LEVER_DIALOG.IMPORTING },
      });
      const response = await mutateAsync({
        leverPost: selectedLeverPostings,
      });
      await handleGenerateJd(response.public_job_id);
      // await handleJobsRefresh();
      setIntegrations({
        lever: { open: false, step: STATE_LEVER_DIALOG.IMPORTING },
      });
      superPush('/jobs/[job]', {
        params: {
          job: response.public_job_id,
        },
      });
    } catch (error: any) {
      toast.error(error.message);
      resetIntegrations();
    }
  };

  function getLeverStatusColor(
    state: string,
  ):
    | 'default'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'purple'
    | 'neutral' {
    switch (state.toLowerCase()) {
      case 'published':
        return 'success';
      case 'internal':
        return 'info';
      case 'closed':
        return 'error';
      default:
        return 'neutral';
    }
  }

  const submitApiKey = async () => {
    if (!apiRef.current!.value) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/api/lever/getPostings', {
        offset: 0,
        apiKey: apiRef.current!.value,
        isInitial: true,
      });
      if (response.status === 200 && response.data.data) {
        setIntegrations({
          lever: { open: true, step: STATE_LEVER_DIALOG.FETCHING },
        });
        const responseRec = await axios.post('/api/lever/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current!.value,
        });

        if (responseRec.status === 200 && responseRec.data[0]?.lever_key) {
          setLeverPostings(response.data.data);
          setInitialFetch(false);
          setTimeout(() => {
            setIntegrations({
              lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
            });
          }, 1000);
        }
      } else {
        setLoading(false);
        setIntegrations({
          lever: { open: true, step: STATE_LEVER_DIALOG.ERROR },
        });
      }
    } catch (error) {
      setLoading(false);
      setIntegrations({
        lever: { open: true, step: STATE_LEVER_DIALOG.ERROR },
      });
    }
  };

  return (
    <Dialog
      open={integration.lever.open}
      onOpenChange={(open) => {
        if (open && integration.lever.step !== STATE_LEVER_DIALOG.IMPORTING)
          resetIntegrations();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lever</DialogTitle>
          <DialogDescription>
            Select a job to import. You can import only one job at a time.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col'>
          {integration.lever.step === STATE_LEVER_DIALOG.API ||
          integration.lever.step === STATE_LEVER_DIALOG.ERROR ? (
            <div className='space-y-4'>
              <div className='relative'>
                <Input
                  ref={apiRef}
                  type={showApiKey ? 'text' : 'password'}
                  placeholder='API key'
                  className={error ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <Button
                  variant='ghost'
                  onClick={() => setShowApiKey(!showApiKey)}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                >
                  {showApiKey ? (
                    <EyeOff className='h-5 w-5 text-gray-400' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-400' />
                  )}
                </Button>
              </div>
              {integration.lever.step === STATE_LEVER_DIALOG.ERROR && (
                <p className='text-sm text-destructive'>
                  Invalid API key. Please try again.
                </p>
              )}
              {error && (
                <p className='text-sm text-destructive'>
                  Please enter an API key
                </p>
              )}
              <p className='text-sm text-gray-600'>
                Your connection details are encrypted and secure with our
                platform.
              </p>
            </div>
          ) : integration.lever.step === STATE_LEVER_DIALOG.FETCHING ? (
            <div className='flex flex-col items-center space-y-4'>
              <p className='mb-2 text-sm text-gray-600'>
                <Loader />
                Fetching data from Lever...
              </p>
            </div>
          ) : integration.lever.step === STATE_LEVER_DIALOG.LISTJOBS ? (
            <div className='flex h-full flex-col space-y-4 overflow-hidden'>
              <Tabs value={leverFilter} onValueChange={setLeverFilter}>
                <TabsList className='grid w-full grid-cols-4'>
                  <TabsTrigger value='all'>All</TabsTrigger>
                  <TabsTrigger value='published'>Published</TabsTrigger>
                  <TabsTrigger value='internal'>Internal</TabsTrigger>
                  <TabsTrigger value='closed'>Closed</TabsTrigger>
                </TabsList>
              </Tabs>
              <>
                {!initialFetch ? (
                  leverPostings.filter(
                    (job) => leverFilter === 'all' || job.state === leverFilter,
                  ).length > 0 ? (
                    <>
                      <ScrollArea className='h-[400px]'>
                        {leverPostings
                          .filter(
                            (job) =>
                              leverFilter === 'all' ||
                              job.state === leverFilter,
                          )
                          .map((post) => (
                            <Card
                              key={post.id}
                              onClick={() => setSelectedLeverPostings(post)}
                              className='my-2 cursor-pointer hover:bg-gray-50'
                            >
                              <CardContent className='flex items-center justify-between p-4'>
                                <div>
                                  <p className='font-medium'>{post.text}</p>
                                  <p className='text-sm text-muted-foreground'>
                                    {post.categories.location}
                                  </p>
                                  <UIBadge
                                    textBadge={
                                      post.state.charAt(0).toUpperCase() +
                                      post.state.slice(1)
                                    }
                                    color={getLeverStatusColor(post.state)}
                                    size='sm'
                                  />
                                </div>

                                <div className='flex items-center'>
                                  <input
                                    type='radio'
                                    name='option'
                                    id='option1'
                                    className='h-4 w-4 text-red-600 accent-neutral-700 focus:accent-neutral-600'
                                    checked={
                                      selectedLeverPostings?.id === post.id
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </ScrollArea>
                    </>
                  ) : (
                    <NoAtsResult />
                  )
                ) : (
                  <>
                    <Skeleton className='mb-2 h-16 w-full' />
                    <Skeleton className='mb-2 h-16 w-full' />
                    <Skeleton className='mb-2 h-16 w-full' />
                    <Skeleton className='mb-2 h-16 w-full' />
                    <Skeleton className='mb-2 h-16 w-full' />
                    <Skeleton className='mb-2 h-16 w-full' />
                  </>
                )}
              </>
              <Button
                variant='default'
                disabled={!selectedLeverPostings}
                onClick={() => {
                  importLever();
                }}
                className='w-full'
              >
                Import
              </Button>
            </div>
          ) : integration.lever.step === STATE_LEVER_DIALOG.IMPORTING ? (
            <div className='flex h-[508px] flex-col items-center justify-center space-y-4'>
              <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
              <p className='text-gray-600'>Importing from Lever</p>
            </div>
          ) : null}
        </div>
        {!integrations?.lever_key && (
          <div className='mt-4 flex w-full flex-row justify-between'>
            {loading ? null : ( // Hide the link and button if loading
              <>
                <Link
                  href='https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-sm text-muted-foreground'
                >
                  How to get my API key
                  <ExternalLink
                    size={16}
                    className='ml-2 text-muted-foreground'
                  />
                </Link>
                <Button disabled={loading} onClick={submitApiKey}>
                  {loading ? (
                    <>
                      <Loader />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
