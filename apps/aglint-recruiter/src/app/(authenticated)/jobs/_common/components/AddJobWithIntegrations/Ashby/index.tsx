import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Skeleton } from '@components/ui/skeleton';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useIntegrations } from '@/authenticated/hooks';
import { useTenant } from '@/company/hooks';
import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { STATE_ASHBY_DIALOG } from '@/jobs/constants';
import {
  useIntegrationActions,
  useIntegrationStore,
  useJobs,
} from '@/jobs/hooks';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import NoAtsResult from '../NoAtsResult';
import { POSTED_BY } from '../utils';
import { type JobAshby } from './types';
import { createJobObject, fetchAllJobs } from './utils';

export function AshbyModalComp() {
  const { recruiter } = useTenant();
  const { setIntegrations, resetIntegrations } = useIntegrationActions();
  const integration = useIntegrationStore((state) => state.integrations);
  const router = useRouterPro();
  const { jobs, handleJobsRefresh, handleGenerateJd } = useJobs();
  const [postings, setPostings] = useState<JobAshby[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAshbyPostings, setSelectedAshbyPostings] = useState<
    JobAshby[]
  >([]);
  const [initialFetch, setInitialFetch] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const apiRef = useRef<HTMLInputElement | null>(null);
  const { data: allIntegrations } = useIntegrations();

  useEffect(() => {
    if (jobs.status === 'success' && allIntegrations?.ashby_key) {
      fetchJobs();
    }
  }, [jobs.status, allIntegrations?.ashby_key]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(allIntegrations?.ashby_key ?? null!);

    const { data } = await supabase
      .from('public_jobs')
      .select()
      .match({ recruiter_id: recruiter.id, posted_by: 'Ashby' });

    setPostings(
      allJobs.filter((post) => {
        if (
          data?.filter(
            (job) =>
              job.posted_by === POSTED_BY.ASHBY && job.job_title === post.title,
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

  const importAshby = async () => {
    try {
      setIntegrations({
        ashby: { open: true, step: STATE_ASHBY_DIALOG.IMPORTING },
      });
      //converting ashby jobs to db jobs
      const refJobsObj = selectedAshbyPostings.map((post) => {
        return {
          ...post,
          public_job_id: uuidv4(),
          ats_job_id: post.jobId,
          recruiter_id: recruiter.id,
          ats_json: post,
        };
      });
      const dbJobs = await createJobObject(refJobsObj, recruiter.id);
      const { data: newJobs, error } = await supabase
        .from('public_jobs')
        .insert(dbJobs)
        .select();
      if (!error) {
        await handleGenerateJd(newJobs[0].id);
        await handleJobsRefresh();
        axios.post('/api/ashby/syncapplications', {
          apikey: allIntegrations?.ashby_key,
          synctoken: allIntegrations?.ashby_sync_token,
          recruiter_id: recruiter.id,
        });
        //closing modal once done
        router.push(ROUTES['/jobs/[job]']({ job: newJobs[0].id }));
        setIntegrations({
          ashby: { open: false, step: STATE_ASHBY_DIALOG.IMPORTING },
        });
      }
    } catch (error) {
      toast.error(
        'Sorry unable to import. Please try again later or contact support.',
      );
      resetIntegrations();
    }
  };

  const submitApiKey = async () => {
    if (!apiRef.current!.value) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/api/ashby/getPostings', {
        page: 1,
        apiKey: apiRef.current!.value,
        isInitial: true,
      });

      if (response.status === 200 && response.data?.results?.length > 0) {
        setIntegrations({
          ashby: { open: true, step: STATE_ASHBY_DIALOG.FETCHING },
        });
        const responseRec = await axios.post('/api/ashby/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current!.value,
        });

        if (responseRec.status === 200 && responseRec.data[0]?.ashby_key) {
          setPostings(response.data?.results);
          setInitialFetch(false);

          setTimeout(() => {
            setIntegrations({
              ashby: {
                open: true,
                step: STATE_ASHBY_DIALOG.LISTJOBS,
              },
            });
          }, 1000);
        }
      } else {
        setLoading(false);
        setIntegrations({
          ashby: { open: true, step: STATE_ASHBY_DIALOG.ERROR },
        });
      }
    } catch (error) {
      setLoading(false);
      setIntegrations({
        ashby: { open: true, step: STATE_ASHBY_DIALOG.ERROR },
      });
    }
  };

  return (
    <Dialog open={integration.ashby.open} onOpenChange={resetIntegrations}>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-center'>
            <Image
              src={'/images/ats/ashby.svg'}
              width={80}
              height={26}
              alt='Ashby logo'
            />
          </div>

          {integration.ashby.step === STATE_ASHBY_DIALOG.API ||
          integration.ashby.step === STATE_ASHBY_DIALOG.ERROR ? (
            <div className='space-y-4'>
              <Input
                ref={apiRef}
                onFocus={() => setError(false)}
                className={error ? 'border-red-500' : ''}
                placeholder='API key'
                type='password'
              />
              {error && (
                <p className='text-sm text-destructive'>
                  Please enter an API key
                </p>
              )}
              <Button
                variant='default'
                disabled={loading}
                onClick={submitApiKey}
                className='w-full'
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
              {integration.ashby.step === STATE_ASHBY_DIALOG.ERROR && (
                <p className='text-sm text-destructive'>
                  Invalid API key. Please try again.
                </p>
              )}
            </div>
          ) : integration.ashby.step === STATE_ASHBY_DIALOG.FETCHING ? (
            <div className='flex flex-col items-center space-y-4'>
              <Image
                src={'/images/ats/ashby.svg'}
                width={50}
                height={50}
                alt='Ashby logo'
              />
              <p>Fetching data from Ashby...</p>
              <div className='rotate-270 h-[100px] w-[100px] transform'>
                <Loader />
              </div>
            </div>
          ) : integration.ashby.step === STATE_ASHBY_DIALOG.LISTJOBS ? (
            <div className='flex h-full flex-col space-y-4 overflow-hidden'>
              <p className='text-sm font-medium'>
                {selectedAshbyPostings.length == 0
                  ? `Showing ${postings.length} Jobs from Ashby`
                  : `${selectedAshbyPostings.length} Jobs selected`}
              </p>
              <Button
                variant='default'
                disabled={selectedAshbyPostings.length === 0}
                onClick={() => {
                  importAshby();
                }}
                className='w-full'
              >
                Import
              </Button>
              <div className='max-h-[400px] space-y-2 overflow-y-auto'>
                {!initialFetch ? (
                  postings.length > 0 ? (
                    postings.map((post) => (
                      <Card key={post.id}>
                        <CardContent className='flex items-center justify-between p-4'>
                          <div>
                            <p className='font-medium'>{post.title}</p>
                            <p className='text-sm text-muted-foreground'>
                              {post.location}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Live
                            </p>
                          </div>
                          <Checkbox
                            checked={selectedAshbyPostings?.some(
                              (p) => p.id === post.id,
                            )}
                            onCheckedChange={() => {
                              if (
                                selectedAshbyPostings?.some(
                                  (p) => p.id === post.id,
                                )
                              ) {
                                setSelectedAshbyPostings((prev) =>
                                  prev.filter((p) => p.id !== post.id),
                                );
                              } else {
                                if (selectedAshbyPostings.length < 1) {
                                  setSelectedAshbyPostings((prev) => [
                                    ...prev,
                                    post,
                                  ]);
                                } else {
                                  toast.warning(
                                    'You can import 1 job at a time',
                                  );
                                }
                              }
                            }}
                          />
                        </CardContent>
                      </Card>
                    ))
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
            </div>
          ) : integration.ashby.step === STATE_ASHBY_DIALOG.IMPORTING ? (
            <div className='flex flex-col items-center space-y-4'>
              <p>Importing from Ashby</p>
              <p>
                {selectedAshbyPostings.length < 1
                  ? `${selectedAshbyPostings.length} Job`
                  : `${selectedAshbyPostings.length} Jobs`}
              </p>
              <Loader />
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
