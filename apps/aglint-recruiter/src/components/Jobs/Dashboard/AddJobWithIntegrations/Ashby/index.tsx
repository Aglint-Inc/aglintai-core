import { Dialog, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AshbyApiKey } from '@/devlink/AshbyApiKey';
import { AshbyAtsJob } from '@/devlink/AshbyAtsJob';
import { AtsCard } from '@/devlink/AtsCard';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IntegrationFetching } from '@/devlink/IntegrationFetching';
import { IntegrationModal } from '@/devlink/IntegrationModal';
import { LeverApiKey } from '@/devlink/LeverApiKey';
import { LoadingJobsAts } from '@/devlink/LoadingJobsAts';
import { NoResultAts } from '@/devlink/NoResultAts';
import { SkeletonLoaderAtsCard } from '@/devlink/SkeletonLoaderAtsCard';
import LoaderLever from '@/public/lottie/AddJobWithIntegrations';
import FetchingJobsLever from '@/public/lottie/FetchingJobsLever';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_ASHBY_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { handleGenerateJd } from '@/src/context/JobContext/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { POSTED_BY } from '../utils';
import { JobAshby } from './types';
import { createJobObject, fetchAllJobs } from './utils';

export function AshbyModalComp() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobs, handleJobsRefresh } = useJobs();
  const [postings, setPostings] = useState<JobAshby[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAshbyPostings, setSelectedAshbyPostings] = useState<
    JobAshby[]
  >([]);
  const [initialFetch, setInitialFetch] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const apiRef = useRef(null);
  const { data: allIntegrations } = useAllIntegrations();

  useEffect(() => {
    if (jobs.status === 'success' && allIntegrations?.ashby_key) {
      fetchJobs();
    }
  }, [jobs.status, allIntegrations?.ashby_key]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(allIntegrations?.ashby_key);

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
      setIntegration((prev) => ({
        ...prev,
        ashby: { open: true, step: STATE_ASHBY_DIALOG.IMPORTING },
      }));
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
        const astJobsObj = refJobsObj.map((post) => {
          return {
            ats_json: post.ats_json as any,
            public_job_id: post.public_job_id,
            recruiter_id: recruiter.id,
            ats_job_id: post.jobId, //saving job posting id from ashby
            ats: 'ashby',
          };
        });
        await supabase.from('job_reference').insert(astJobsObj).select();
        await handleGenerateJd(newJobs[0].id);
        await handleJobsRefresh();
        axios.post('/api/ashby/syncapplications', {
          apikey: allIntegrations?.ashby_key,
          synctoken: allIntegrations?.ashby_sync_token,
          recruiter_id: recruiter.id,
        });
        //closing modal once done
        router.push(ROUTES['/jobs/[id]']({ id: newJobs[0].id }));
        setIntegration((prev) => ({
          ...prev,
          ashby: { open: false, step: STATE_ASHBY_DIALOG.IMPORTING },
        }));
      }
    } catch (error) {
      toast.error(
        'Sorry unable to import. Please try again later or contact support.',
      );
      posthog.capture('Error Importing Asbhy Jobs');
      handleClose();
    }
  };

  const submitApiKey = async () => {
    if (!apiRef.current.value) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/api/ashby/getPostings', {
        page: 1,
        apiKey: apiRef.current.value,
        isInitial: true,
      });

      if (response.status === 200 && response.data?.results?.length > 0) {
        setIntegration((prev) => ({
          ...prev,
          ashby: { open: true, step: STATE_ASHBY_DIALOG.FETCHING },
        }));
        const responseRec = await axios.post('/api/ashby/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current.value,
        });

        if (responseRec.status === 200 && responseRec.data[0]?.ashby_key) {
          setRecruiter(responseRec.data[0]);
          setPostings(response.data?.results);
          setInitialFetch(false);
          posthog.capture('Asbhy Data Fetched');
          setTimeout(() => {
            setIntegration((prev) => ({
              ...prev,
              ashby: {
                open: true,
                step: STATE_ASHBY_DIALOG.LISTJOBS,
              },
            }));
          }, 1000);
        }
      } else {
        setLoading(false);
        setIntegration((prev) => ({
          ...prev,
          ashby: { open: true, step: STATE_ASHBY_DIALOG.ERROR },
        }));
      }
    } catch (error) {
      setLoading(false);
      setIntegration((prev) => ({
        ...prev,
        ashby: { open: true, step: STATE_ASHBY_DIALOG.ERROR },
      }));
    }
  };

  return (
    <Dialog open={integration.ashby.open} onClose={handleClose} maxWidth={'lg'}>
      <IntegrationModal
        slotLogo={
          <>
            <Image
              src={'/images/ats/ashby.svg'}
              width={80}
              height={26}
              alt=''
            />
          </>
        }
        slotApiKey={
          integration.ashby.step === STATE_ASHBY_DIALOG.API ||
          integration.ashby.step === STATE_ASHBY_DIALOG.ERROR ? (
            <AshbyApiKey
              slotPrimaryButton={
                <ButtonSolid
                  textButton='Submit'
                  isDisabled={loading}
                  isLoading={loading}
                  onClickButton={{
                    onClick: submitApiKey,
                  }}
                  size={2}
                />
              }
              slotInput={
                <UITextField
                  ref={apiRef}
                  onFocus={() => setError(false)}
                  error={error}
                  helperText='Please enter a API key'
                  labelSize='small'
                  height={32}
                  fullWidth
                  placeholder='API key'
                  type='password'
                />
              }
              isApiWrong={integration.ashby.step === STATE_ASHBY_DIALOG.ERROR}
            />
          ) : integration.ashby.step === STATE_ASHBY_DIALOG.FETCHING ? (
            <IntegrationFetching
              textCompany={'Ashby'}
              slotIntegrationLogo={
                <Image
                  src={'/images/ats/ashby.svg'}
                  width={50}
                  height={50}
                  alt=''
                />
              }
              slotLottie={
                <Stack
                  height={'100px'}
                  style={{ transform: 'rotate(270deg)' }}
                  width={'100px'}
                >
                  <FetchingJobsLever />
                </Stack>
              }
            />
          ) : integration.ashby.step === STATE_ASHBY_DIALOG.LISTJOBS ? (
            <Stack
              justifyContent={'flex-start'}
              height={'100%'}
              overflow={'hidden'}
            >
              <AshbyAtsJob
                textNumberOfJobs={
                  <Typography variant='body1'>
                    {selectedAshbyPostings.length == 0
                      ? `Showing ${postings.length} Jobs from ashby`
                      : `${selectedAshbyPostings.length} Jobs selected`}
                  </Typography>
                }
                onClickImport={{
                  onClick: () => {
                    importAshby();
                    posthog.capture('Asbhy Jobs successfully imported');
                  },
                }}
                isImportDisable={selectedAshbyPostings.length === 0}
                slotAtsCard={
                  !initialFetch ? (
                    postings.length > 0 ? (
                      postings.map((post, ind) => {
                        return (
                          <ScrollList uniqueKey={ind} key={ind}>
                            <AtsCard
                              isChecked={
                                selectedAshbyPostings?.filter(
                                  (p) => p.id === post.id,
                                )?.length > 0
                              }
                              onClickCheck={{
                                onClick: () => {
                                  if (
                                    selectedAshbyPostings?.some(
                                      (p) => p.id === post.id,
                                    )
                                  ) {
                                    // If the object is already in the array, remove it
                                    setSelectedAshbyPostings((prev) =>
                                      prev.filter((p) => p.id !== post.id),
                                    );
                                  } else {
                                    if (selectedAshbyPostings.length < 1) {
                                      // If the object is not in the array, add it
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
                                },
                              }}
                              propsTextColor={{
                                style: {
                                  color: '',
                                },
                              }}
                              textRole={post.title}
                              textStatus={'Live'}
                              textWorktypeLocation={post.location}
                            />
                          </ScrollList>
                        );
                      })
                    ) : (
                      <NoResultAts />
                    )
                  ) : (
                    <>
                      <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
                      <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
                      <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
                    </>
                  )
                }
              />
            </Stack>
          ) : integration.ashby.step === STATE_ASHBY_DIALOG.IMPORTING ? (
            <LoadingJobsAts
              textAtsCompany={'Ashby'}
              textJobCount={
                selectedAshbyPostings.length < 1
                  ? `${selectedAshbyPostings.length} Job`
                  : `${selectedAshbyPostings.length} Jobs`
              }
              slotLottie={<LoaderLever />}
            />
          ) : (
            <LeverApiKey />
          )
        }
        onClickClose={{
          onClick: () => {
            handleClose();
          },
        }}
      />
    </Dialog>
  );
}
