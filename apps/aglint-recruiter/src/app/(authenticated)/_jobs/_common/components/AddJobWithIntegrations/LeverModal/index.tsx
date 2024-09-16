import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import LoaderLever from '@public/lottie/AddJobWithIntegrations';
import FetchingJobsLever from '@public/lottie/FetchingJobsLever';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';

import axios from '@/client/axios';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { STATE_LEVER_DIALOG } from '@/jobs/constants';
import { useIntegrationActions, useIntegrations, useJobs } from '@/jobs/hooks';
import { type ApiLeverCreateJob } from '@/pages/api/lever/createjob';
import { useAllIntegrations } from '@/queries/intergrations';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import NoAtsResult from '../NoAtsResult';
import { POSTED_BY } from '../utils';
import { type LeverJob } from './types/job';
import { fetchAllJobs } from './utils';

export default function LeverModalComp() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setIntegration, handleClose } = useIntegrationActions();
  const integration = useIntegrations();
  const router = useRouter();
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
      setIntegration({
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
      setIntegration({
        lever: { open: false, step: STATE_LEVER_DIALOG.IMPORTING },
      });
      router.push(ROUTES['/jobs/[job]']({ job: response.public_job_id }));
    } catch (error) {
      toast.error(error.message);
      handleClose();
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
        setIntegration({
          lever: { open: true, step: STATE_LEVER_DIALOG.FETCHING },
        });
        const responseRec = await axios.post('/api/lever/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current.value,
        });

        if (responseRec.status === 200 && responseRec.data[0]?.lever_key) {
          setRecruiter(responseRec.data[0]);
          setLeverPostings(response.data.data);
          setInitialFetch(false);
          posthog.capture('Lever Data Fetched');
          setTimeout(() => {
            setIntegration({
              lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
            });
          }, 1000);
        }
      } else {
        setLoading(false);
        setIntegration({
          lever: { open: true, step: STATE_LEVER_DIALOG.ERROR },
        });
      }
    } catch (error) {
      setLoading(false);
      setIntegration({
        lever: { open: true, step: STATE_LEVER_DIALOG.ERROR },
      });
    }
  };

  return (
    <UIDialog
      open={integration.lever.open}
      onClose={handleClose}
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
              <p className='text-red-500 text-sm'>Please enter an API key</p>
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
              <p className='text-red-500 text-sm'>
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
            <p>Fetching data from Lever...</p>
            <div className='h-[100px] w-[100px] transform rotate-270'>
              <FetchingJobsLever />
            </div>
          </div>
        ) : integration.lever.step === STATE_LEVER_DIALOG.LISTJOBS ? (
          <div className='flex flex-col h-full overflow-hidden space-y-4'>
            <Tabs value={leverFilter} onValueChange={setLeverFilter}>
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='published'>Published</TabsTrigger>
                <TabsTrigger value='internal'>Internal</TabsTrigger>
                <TabsTrigger value='closed'>Closed</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant='default'
              disabled={!selectedLeverPostings}
              onClick={() => {
                importLever();
                posthog.capture('Lever Jobs successfully imported');
              }}
              className='w-full'
            >
              Import
            </Button>

            <div className='space-y-2 max-h-[400px] overflow-y-auto'>
              {!initialFetch ? (
                leverPostings.filter(
                  (job) => leverFilter === 'all' || job.state === leverFilter,
                ).length > 0 ? (
                  <>
                    <UITypography type='small' variant='p'>
                      Select only one job to import
                    </UITypography>
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
                                {post.state}
                              </p>
                            </div>

                            <div className='flex items-center'>
                              <input
                                type='radio'
                                name='option'
                                id='option1'
                                className='h-4 w-4 text-red-600 accent-neutral-700 focus:accent-neutral-600'
                                checked={selectedLeverPostings?.id === post.id}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </>
                ) : (
                  <NoAtsResult />
                )
              ) : (
                <>
                  <Skeleton className='w-full h-16 mb-2' />
                  <Skeleton className='w-full h-16 mb-2' />
                  <Skeleton className='w-full h-16 mb-2' />
                  <Skeleton className='w-full h-16 mb-2' />
                  <Skeleton className='w-full h-16 mb-2' />
                  <Skeleton className='w-full h-16 mb-2' />
                </>
              )}
            </div>
          </div>
        ) : integration.lever.step === STATE_LEVER_DIALOG.IMPORTING ? (
          <div className='flex flex-col items-center space-y-4'>
            <p>Importing from Lever</p>
            <p>{selectedLeverPostings ? '1 Job' : '0 Jobs'}</p>
            <LoaderLever />
          </div>
        ) : null}
      </div>
    </UIDialog>
  );
}
