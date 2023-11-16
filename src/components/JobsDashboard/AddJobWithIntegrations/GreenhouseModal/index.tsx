import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_GREENHOUSE_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import FetchingJobsLever from './Loader';
import { createJobApplications, createJobObject, fetchAllJobs } from './utils';
import LoaderLever from '../Loader';
import { generateEmbedding,POSTED_BY } from '../utils';

export function GreenhouseModal() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobsData, handleJobRead } = useJobs();
  const [postings, setPostings] = useState([]);
  const [selectedGreenhousePostings, setSelectedGreenhousePostings] = useState(
    [],
  );
  const [greenhouseFilter, setGreenhouseFilter] = useState('live');
  const [initialFetch, setInitialFetch] = useState(true);
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

      const dbJobs = await createJobObject(
        selectedGreenhousePostings,
        recruiter,
      );

      const { data: newJobs, error } = await supabase
        .from('public_jobs')
        .insert(dbJobs)
        .select();
      if (!error) {
        newJobs.map((job) => {
          generateEmbedding(job.description, job.id);
        });
        // selectedGreenhousePostings.map(async (post) => {
        //   await createLeverJobReference({
        //     posting_id: post.id,
        //     recruiter_id: recruiter.id,
        //     job_id: newJobs.filter(
        //       (job) =>
        //         job.job_title == post.text &&
        //         job.location == post.categories.location,
        //     )[0].id,
        //   });
        // });

        const jobsObj = selectedGreenhousePostings.map((post) => {
          return {
            ...post,
            public_job_id: newJobs.filter(
              (job) =>
                job.job_title == post.title &&
                job.location == post.location.name,
            )[0].id,
            recruiter_id: recruiter.id,
          };
        });
        await createJobApplications(jobsObj, recruiter.greenhouse_key);
        await handleJobRead();
        setIntegration((prev) => ({
          ...prev,
          greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
        }));

        toast.success('Jobs Imported Successfully');
        router.push(`${pageRoutes.JOBS}?status=published`);
      } else {
        toast.error(
          'Sorry unable to import. Please try again later or contact support.',
        );
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

        if (responseRec.status === 200 && responseRec.data[0]?.lever_key) {
          setRecruiter(responseRec.data[0]);
          setPostings(response.data);
          setInitialFetch(false);
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
        setIntegration((prev) => ({
          ...prev,
          greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.ERROR },
        }));
      }
    } catch (error) {
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
            onClickContinue={{
              onClick: () => {
                submitApiKey();
              },
            }}
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
                  }).length > 0 ? (
                    postings
                      .filter((job) => {
                        if (greenhouseFilter == 'live') {
                          return job.live;
                        } else if (greenhouseFilter == 'closed') {
                          return !job.active;
                        } else if (greenhouseFilter == 'active') {
                          return job.active;
                        } else {
                          return true;
                        }
                      })
                      .map((post, ind) => {
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
                                  if (selectedGreenhousePostings.length < 5) {
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
                                      // If the object is not in the array, add it
                                      setSelectedGreenhousePostings((prev) => [
                                        ...prev,
                                        post,
                                      ]);
                                    }
                                  } else {
                                    toast.error(
                                      'You can select maximum 5 jobs at a time',
                                    );
                                  }
                                },
                              }}
                              // propsTextColor={{
                              //   style: {
                              //     color: getLeverStatusColor(post.state),
                              //   },
                              // }}
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
