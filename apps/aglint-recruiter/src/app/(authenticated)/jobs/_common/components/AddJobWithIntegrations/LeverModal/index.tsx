import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { capitalize } from 'lodash';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useAllIntegrations } from '@/authenticated/hooks';
import axios from '@/client/axios';
import { useTenant } from '@/company/hooks';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';
import { useRouterPro } from '@/hooks/useRouterPro';
import { STATE_LEVER_DIALOG } from '@/jobs/constants';
import {
  useIntegrationActions,
  useIntegrationStore,
  useJobs,
} from '@/jobs/hooks';
import { type ApiLeverCreateJob } from '@/pages/api/lever/createjob';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import NoAtsResult from '../NoAtsResult';
import { POSTED_BY } from '../utils';
import { type LeverJob } from './types/job';
import { fetchAllJobs } from './utils';

export default function LeverModalComp() {
  const { recruiter } = useTenant();
  const { setIntegrations, resetIntegrations } = useIntegrationActions();
  const integration = useIntegrationStore((state) => state.integrations);
  const router = useRouterPro();
  const { jobs, handleJobsRefresh, handleGenerateJd } = useJobs();
  const [loading, setLoading] = useState(false);
  const [leverPostings, setLeverPostings] = useState<LeverJob[]>([]);
  const [selectedLeverPostings, setSelectedLeverPostings] =
    useState<LeverJob>(null);
  const [leverFilter, setLeverFilter] = useState('published');
  const [initialFetch, setInitialFetch] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const apiRef = useRef(null);
  const { data: integrations } = useAllIntegrations();

  useEffect(() => {
    if (jobs.status === 'success' && integrations?.lever_key) {
      fetchJobs();
    }
  }, [jobs.status, integrations?.lever_key]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(integrations.lever_key);
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

  const importLever = async () => {
    try {
      setIntegrations({
        lever: { open: true, step: STATE_LEVER_DIALOG.IMPORTING },
      });

      const response = await axios.call<ApiLeverCreateJob>(
        'POST',
        '/api/lever/createjob',
        {
          recruiter_id: recruiter.id,
          leverPost: selectedLeverPostings,
        },
      );

      if (!response.success) {
        throw new Error('Failed to import job');
      }
      await handleGenerateJd(response.public_job_id);
      await handleJobsRefresh();
      setIntegrations({
        lever: { open: false, step: STATE_LEVER_DIALOG.IMPORTING },
      });
      router.push(ROUTES['/jobs/[job]']({ job: response.public_job_id }));
    } catch (error) {
      toast.error(error.message);
      resetIntegrations();
    }
  };

  function getLeverStatusColorClass(state: string): string {
    switch (state.toLowerCase()) {
      case 'published':
        return 'text-green-500';
      case 'internal':
        return 'text-blue-500';
      case 'closed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  const submitApiKey = async () => {
    if (!apiRef.current.value) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/api/lever/getPostings', {
        offset: 0,
        apiKey: apiRef.current.value,
        isInitial: true,
      });
      if (response.status === 200 && response.data.data) {
        setIntegrations({
          lever: { open: true, step: STATE_LEVER_DIALOG.FETCHING },
        });
        const responseRec = await axios.post('/api/lever/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current.value,
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
    <UIDialog
      open={integration.lever.open}
      onClose={resetIntegrations}
      slotButtons={<></>}
      title={
        <Image
          src={'/images/ats/lever.png'}
          width={80}
          height={20}
          alt='Lever logo'
        />
      }
    >
      <div className='flex flex-col space-y-4'>
        {integration.lever.step === STATE_LEVER_DIALOG.API ||
        integration.lever.step === STATE_LEVER_DIALOG.ERROR ? (
          <div className='space-y-4'>
            <Input
              ref={apiRef}
              type='password'
              placeholder='API key'
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <p className='text-sm text-red-500'>Please enter an API key</p>
            )}
            <Button
              variant='default'
              disabled={loading}
              onClick={submitApiKey}
              className='w-full'
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            {integration.lever.step === STATE_LEVER_DIALOG.ERROR && (
              <p className='text-sm text-red-500'>
                Invalid API key. Please try again.
              </p>
            )}
            <Button
              variant='outline'
              onClick={() =>
                window.open(
                  'https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials',
                  '_blank',
                )
              }
              className='w-full'
            >
              Support
            </Button>
          </div>
        ) : integration.lever.step === STATE_LEVER_DIALOG.FETCHING ? (
          <div className='flex flex-col items-center space-y-4'>
            <Image
              src={'/images/ats/leverbig.svg'}
              width={50}
              height={50}
              alt='Lever logo'
            />
            <p className='mb-2 text-sm text-gray-600'>
              Fetching data from Lever...
            </p>
            <div className='flex h-24 w-24 items-center justify-center'>
              <Loader2 className='h-12 w-12 animate-spin text-gray-500' />
            </div>
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
            <div className='space-y-2'>
              {!initialFetch ? (
                leverPostings.filter(
                  (job) => leverFilter === 'all' || job.state === leverFilter,
                ).length > 0 ? (
                  <>
                    <UITypography type='small' variant='p'>
                      Select a job to import
                    </UITypography>
                    <ScrollArea className='h-[400px]'>
                      {leverPostings
                        .filter(
                          (job) =>
                            leverFilter === 'all' || job.state === leverFilter,
                        )
                        .map((post) => (
                          <Card
                            key={post.id}
                            onClick={() => setSelectedLeverPostings(post)}
                            className='cursor-pointer hover:bg-gray-50'
                          >
                            <CardContent className='flex items-center justify-between p-4'>
                              <div>
                                <p className='font-medium'>{post.text}</p>
                                <p className='text-sm text-gray-500'>
                                  {post.categories.location}
                                </p>
                                <p
                                  className={`text-sm ${getLeverStatusColorClass(post.state)}`}
                                >
                                  {capitalize(post.state)}
                                </p>
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
            </div>
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
            <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
            <p className='text-gray-600'>Importing from Lever</p>
          </div>
        ) : null}
      </div>
    </UIDialog>
  );
}
