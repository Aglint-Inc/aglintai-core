import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  AtsCard,
  GreenhouseApiKey,
  GreenhouseAts,
  IntegrationFetching,
  IntegrationModal,
  LeverApiKey,
  LoadingJobsAts,
  NoResultAts,
  SkeletonLoaderAtsCard,
} from '@/devlink';
import { ButtonPrimaryDefaultRegular } from '@/devlink3';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_GREENHOUSE_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import LoaderLever from '../Loader';
import { POSTED_BY } from '../utils';
import FetchingJobsLever from './Loader';
import { ExtendedJobGreenhouse, JobGreenhouse } from './types';
import {
  createJobApplications,
  createJobObject,
  fetchAllJobs,
  filterJobs,
  getGreenhouseStatusColor,
} from './utils';

export function GreenhouseModal() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobsData, handleJobRead, experimental_handleGenerateJd } = useJobs();
  const [loading, setLoading] = useState(false);
  const [postings, setPostings] = useState<JobGreenhouse[]>([]);
  const [selectedGreenhousePostings, setSelectedGreenhousePostings] = useState<
    JobGreenhouse[]
  >([]);
  const [greenhouseFilter, setGreenhouseFilter] = useState<
    'live' | 'active' | 'closed' | 'all'
  >('live');
  const [initialFetch, setInitialFetch] = useState<boolean>(true);
  const apiRef = useRef(null);

  useEffect(() => {
    if (jobsData.jobs && recruiter.greenhouse_key) {
      fetchJobs();
    }
  }, [jobsData.jobs]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(recruiter.greenhouse_key);
    setPostings(
      allJobs.filter((post) => {
        if (
          jobsData.jobs?.filter(
            (job) =>
              job.posted_by === POSTED_BY.GREENHOUSE &&
              job.job_title === post.title &&
              job.location == post.location.name,
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

  const importGreenhouse = async () => {
    try {
      setIntegration((prev) => ({
        ...prev,
        greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
      }));

      const refJobsObj = selectedGreenhousePostings.map((post) => {
        return {
          ...post,
          public_job_id: uuidv4(),
          ats_job_id: post.job_id,
          recruiter_id: recruiter.id,
          ats_json: post, //used saving the whole job posting from greenhouse
        };
      });
      //converting greenhouse jobs to db jobs
      const dbJobs = await createJobObject(refJobsObj, recruiter);

      const { data: newJobs, error } = await supabase
        .from('public_jobs')
        .insert(dbJobs)
        .select();

      if (!error) {
        //now creating jobsObj for creating candidates and job_applications
        const jobsObj = selectedGreenhousePostings.map((post) => {
          return {
            ...post,
            public_job_id: (newJobs as any).filter(
              (job) =>
                job.draft.job_title == post.title &&
                job.draft.location == post.location.name,
            )[0].id,
            recruiter_id: recruiter.id,
          };
        }) as unknown as ExtendedJobGreenhouse[];

        const astJobsObj = refJobsObj.map((post) => {
          return {
            ats_json: post.ats_json as any,
            public_job_id: post.public_job_id,
            recruiter_id: recruiter.id,
            ats_job_id: post.ats_job_id, //saving job posting id from ashby
            ats: 'greenhouse',
          };
        });

        await supabase.from('job_reference').insert(astJobsObj).select();
        await experimental_handleGenerateJd(newJobs[0].id);
        //creating candidates and job_applications
        await createJobApplications(jobsObj, recruiter.greenhouse_key);
        //updating jobsData
        await handleJobRead();
        //closing modal once done
        setIntegration((prev) => ({
          ...prev,
          greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
        }));
        router.push(`${pageRoutes.JOBS}/${newJobs[0].id}`);
      } else {
        toast.error(
          'Sorry unable to import. Please try again later or contact support.',
        );
        posthog.capture('GreenHouse Import Error');
        handleClose();
      }
    } catch (error) {
      toast.error(
        'Sorry unable to import. Please try again later or contact support.',
      );
      handleClose();
    }
  };

  const submitApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/greenhouse/getPostings', {
        page: 1,
        apiKey: apiRef.current.value,
        isInitial: true,
      });

      if (response.status === 200 && response.data.length > 0) {
        setIntegration((prev) => ({
          ...prev,
          greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.FETCHING },
        }));
        const responseRec = await axios.post('/api/greenhouse/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current.value,
        });

        if (responseRec.status === 200 && responseRec.data[0]?.greenhouse_key) {
          setRecruiter(responseRec.data[0]);
          setPostings(response.data);
          setInitialFetch(false);
          posthog.capture('Green House Data Fetched');
          setTimeout(() => {
            setIntegration((prev) => ({
              ...prev,
              greenhouse: {
                open: true,
                step: STATE_GREENHOUSE_DIALOG.LISTJOBS,
              },
            }));
          }, 1000);
        }
      } else {
        setLoading(false);
        setIntegration((prev) => ({
          ...prev,
          greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.ERROR },
        }));
      }
    } catch (error) {
      setLoading(false);
      setIntegration((prev) => ({
        ...prev,
        greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.ERROR },
      }));
    }
  };

  return (
    <IntegrationModal
      slotLogo={
        <>
          <Image
            src={'/images/ats/greenhouse.svg'}
            width={120}
            height={34}
            alt=''
          />
        </>
      }
      slotApiKey={
        integration.greenhouse.step === STATE_GREENHOUSE_DIALOG.API ||
        integration.greenhouse.step === STATE_GREENHOUSE_DIALOG.ERROR ? (
          <GreenhouseApiKey
            slotPrimaryButton={
              <ButtonPrimaryDefaultRegular
                buttonText={'Submit'}
                isDisabled={loading}
                buttonProps={{
                  onClick: () => {
                    submitApiKey();
                  },
                }}
              />
            }
            slotInput={
              <UITextField
                ref={apiRef}
                labelSize='small'
                fullWidth
                placeholder='API key'
                type='password'
              />
            }
            isApiWrong={
              integration.greenhouse.step === STATE_GREENHOUSE_DIALOG.ERROR
            }
          />
        ) : integration.greenhouse.step === STATE_GREENHOUSE_DIALOG.FETCHING ? (
          <IntegrationFetching
            textCompany={'Greenhouse'}
            slotIntegrationLogo={
              <Image
                src={'/images/ats/greenhousebig.svg'}
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
        ) : integration.greenhouse.step === STATE_GREENHOUSE_DIALOG.LISTJOBS ? (
          <Stack
            justifyContent={'flex-start'}
            height={'100%'}
            overflow={'hidden'}
          >
            <GreenhouseAts
              textNumberofJobs={
                <Typography variant='body2'>
                  {selectedGreenhousePostings.length == 0
                    ? `Showing ${
                        postings.filter((job) => {
                          if (greenhouseFilter == 'live') {
                            return job.live;
                          } else if (greenhouseFilter == 'closed') {
                            return !job.active;
                          } else if (greenhouseFilter == 'active') {
                            return job.active;
                          } else {
                            return true;
                          }
                        }).length
                      } Jobs from greenhouse`
                    : `${selectedGreenhousePostings.length} Jobs selected`}
                </Typography>
              }
              onClickImport={{
                onClick: () => {
                  importGreenhouse();
                  posthog.capture('GreenHouse Jobs successfully imported');
                },
              }}
              isImportDisable={selectedGreenhousePostings.length === 0}
              isAllActive={greenhouseFilter == 'all'}
              isClosedActive={greenhouseFilter == 'closed'}
              isActiveActive={greenhouseFilter == 'active'}
              isLiveActive={greenhouseFilter == 'live'}
              onClickClosed={{
                onClick: () => {
                  setGreenhouseFilter('closed');
                },
              }}
              onClickActive={{
                onClick: () => {
                  setGreenhouseFilter('active');
                },
              }}
              onClickLive={{
                onClick: () => {
                  setGreenhouseFilter('live');
                },
              }}
              onClickAll={{
                onClick: () => {
                  setGreenhouseFilter('all');
                },
              }}
              slotAtsCard={
                !initialFetch ? (
                  filterJobs(postings, greenhouseFilter).length > 0 ? (
                    filterJobs(postings, greenhouseFilter).map((post, ind) => {
                      return (
                        <ScrollList uniqueKey={ind} key={ind}>
                          <AtsCard
                            isChecked={
                              selectedGreenhousePostings?.filter(
                                (p) => p.id === post.id,
                              )?.length > 0
                            }
                            onClickCheck={{
                              onClick: () => {
                                if (
                                  selectedGreenhousePostings?.some(
                                    (p) => p.id === post.id,
                                  )
                                ) {
                                  // If the object is already in the array, remove it
                                  setSelectedGreenhousePostings((prev) =>
                                    prev.filter((p) => p.id !== post.id),
                                  );
                                } else {
                                  if (selectedGreenhousePostings.length < 1) {
                                    // If the object is not in the array, add it
                                    setSelectedGreenhousePostings((prev) => [
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
                                color: getGreenhouseStatusColor(post),
                              },
                            }}
                            textRole={post.title}
                            textStatus={
                              post.live
                                ? 'Live'
                                : post.active
                                  ? 'Active'
                                  : 'Closed'
                            }
                            textWorktypeLocation={post.location.name}
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
        ) : integration.greenhouse.step ===
          STATE_GREENHOUSE_DIALOG.IMPORTING ? (
          <LoadingJobsAts
            textAtsCompany={'Greenhouse'}
            textJobCount={
              selectedGreenhousePostings.length < 1
                ? `${selectedGreenhousePostings.length} Job`
                : `${selectedGreenhousePostings.length} Jobs`
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
  );
}
