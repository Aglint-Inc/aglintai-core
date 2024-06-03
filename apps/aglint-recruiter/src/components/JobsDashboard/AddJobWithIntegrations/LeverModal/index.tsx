import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';

import { AtsCard } from '@/devlink/AtsCard';
import { AtsJobs } from '@/devlink/AtsJobs';
import { IntegrationFetching } from '@/devlink/IntegrationFetching';
import { IntegrationModal } from '@/devlink/IntegrationModal';
import { LeverApiKey } from '@/devlink/LeverApiKey';
import { LoadingJobsAts } from '@/devlink/LoadingJobsAts';
import { NoResultAts } from '@/devlink/NoResultAts';
import { SkeletonLoaderAtsCard } from '@/devlink/SkeletonLoaderAtsCard';
import { ButtonPrimaryDefaultRegular } from '@/devlink3/ButtonPrimaryDefaultRegular';
import LoaderLever from '@/public/lottie/AddJobWithIntegrations';
import FetchingJobsLever from '@/public/lottie/FetchingJobsLever';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_LEVER_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { POSTED_BY } from '../utils';
import {
  createJobApplications,
  createJobObject,
  createLeverJobReference,
  fetchAllJobs,
  getLeverStatusColor,
} from './utils';

export function LeverModalComp() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobs, handleJobRead, experimental_handleGenerateJd } = useJobs();
  const [loading, setLoading] = useState(false);
  const [leverPostings, setLeverPostings] = useState([]);
  const [selectedLeverPostings, setSelectedLeverPostings] = useState([]);
  const [leverFilter, setLeverFilter] = useState('published');
  const [initialFetch, setInitialFetch] = useState(true);
  const apiRef = useRef(null);

  useEffect(() => {
    if (jobs.status === 'success' && recruiter.lever_key) {
      fetchJobs();
    }
  }, [jobs.status]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(recruiter.lever_key);
    setLeverPostings(
      allJobs.filter((post) => {
        if (
          jobs.data?.filter(
            (job) =>
              job.posted_by === POSTED_BY.LEVER &&
              job.job_title === post.text &&
              job.location == post.categories.location,
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
      setIntegration((prev) => ({
        ...prev,
        lever: { open: true, step: STATE_LEVER_DIALOG.IMPORTING },
      }));

      const dbJobs = await createJobObject(selectedLeverPostings, recruiter);
      const { data: newJobs, error } = await supabase
        .from('public_jobs')
        .insert(dbJobs)
        .select();

      if (!error) {
        selectedLeverPostings.map(async (post) => {
          await createLeverJobReference({
            posting_id: post.id,
            recruiter_id: recruiter.id,
            job_id: newJobs.filter(
              (job) =>
                job.job_title == post.text &&
                job.location == post.categories.location,
            )[0].id,
          });
        });

        const jobsObj = selectedLeverPostings.map((post) => {
          return {
            ...post,
            job_id: newJobs.filter(
              (job) =>
                job.job_title == post.text &&
                job.location == post.categories.location,
            )[0].id,
            recruiter_id: recruiter.id,
          };
        });
        await createJobApplications(jobsObj, recruiter.lever_key);
        await experimental_handleGenerateJd(newJobs[0].id);
        await handleJobRead();
        setIntegration((prev) => ({
          ...prev,
          lever: { open: false, step: STATE_LEVER_DIALOG.IMPORTING },
        }));
        router.push(ROUTES['/jobs/[id]']({ id: newJobs[0].id }));
      } else {
        toast.error(
          'Import failed. Please try again later or contact support for assistance.',
        );
        posthog.capture('Error Importing Lever Jobs');
        handleClose();
      }
    } catch (error) {
      toast.error(
        'Import failed. Please try again later or contact support for assistance.',
      );
      handleClose();
    }
  };

  const submitApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/lever/getPostings', {
        offset: 0,
        apiKey: apiRef.current.value,
        isInitial: true,
      });
      if (response.status === 200 && response.data.data) {
        setIntegration((prev) => ({
          ...prev,
          lever: { open: true, step: STATE_LEVER_DIALOG.FETCHING },
        }));
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
            setIntegration((prev) => ({
              ...prev,
              lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
            }));
          }, 1000);
        }
      } else {
        setLoading(false);
        setIntegration((prev) => ({
          ...prev,
          lever: { open: true, step: STATE_LEVER_DIALOG.ERROR },
        }));
      }
    } catch (error) {
      setLoading(false);
      setIntegration((prev) => ({
        ...prev,
        lever: { open: true, step: STATE_LEVER_DIALOG.ERROR },
      }));
    }
  };

  return (
    <IntegrationModal
      slotLogo={
        <>
          <Image src={'/images/ats/lever.png'} width={120} height={34} alt='' />
        </>
      }
      slotApiKey={
        integration.lever.step === STATE_LEVER_DIALOG.API ||
        integration.lever.step === STATE_LEVER_DIALOG.ERROR ? (
          <LeverApiKey
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
            onClickSupport={{
              onClick: () => {
                window.open(
                  'https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials',
                  '_blank',
                );
              },
            }}
            isApiWrong={integration.lever.step === STATE_LEVER_DIALOG.ERROR}
            slotSearch={
              <UITextField
                ref={apiRef}
                labelSize='small'
                fullWidth
                placeholder='API key'
                type='password'
              />
            }
          />
        ) : integration.lever.step === STATE_LEVER_DIALOG.FETCHING ? (
          <IntegrationFetching
            slotIntegrationLogo={
              <Image
                src={'/images/ats/leverbig.svg'}
                width={50}
                height={50}
                alt=''
              />
            }
            textCompany={'Lever'}
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
        ) : integration.lever.step === STATE_LEVER_DIALOG.LISTJOBS ? (
          <Stack
            justifyContent={'flex-start'}
            height={'100%'}
            overflow={'hidden'}
          >
            <AtsJobs
              textNumberofJobs={
                <Typography variant='body1'>
                  {selectedLeverPostings.length == 0
                    ? `Showing ${leverPostings.length} Jobs from lever`
                    : `${selectedLeverPostings.length} Jobs selected`}
                </Typography>
              }
              onClickImport={{
                onClick: () => {
                  importLever();
                  posthog.capture('Lever Jobs successfully imported');
                },
              }}
              isImportDisable={selectedLeverPostings.length === 0}
              isAllActive={leverFilter == 'all'}
              isClosedActive={leverFilter == 'closed'}
              isInternalActive={leverFilter == 'internal'}
              isPublishedActive={leverFilter == 'published'}
              onClickClosed={{
                onClick: () => {
                  setLeverFilter('closed');
                },
              }}
              onClickPublished={{
                onClick: () => {
                  setLeverFilter('published');
                },
              }}
              onClickInternal={{
                onClick: () => {
                  setLeverFilter('internal');
                },
              }}
              onClickAll={{
                onClick: () => {
                  setLeverFilter('all');
                },
              }}
              slotAtsCard={
                !initialFetch ? (
                  leverPostings.filter((job) => {
                    if (leverFilter !== 'all') {
                      return job.state === leverFilter;
                    } else {
                      return true;
                    }
                  }).length > 0 ? (
                    leverPostings
                      .filter((job) => {
                        if (leverFilter !== 'all') {
                          return job.state === leverFilter;
                        } else {
                          return true;
                        }
                      })
                      .map((post, ind) => {
                        return (
                          <ScrollList uniqueKey={ind} key={ind}>
                            <AtsCard
                              isChecked={
                                selectedLeverPostings?.filter(
                                  (p) => p.id === post.id,
                                )?.length > 0
                              }
                              onClickCheck={{
                                onClick: () => {
                                  if (
                                    selectedLeverPostings?.some(
                                      (p) => p.id === post.id,
                                    )
                                  ) {
                                    // If the object is already in the array, remove it
                                    setSelectedLeverPostings((prev) =>
                                      prev.filter((p) => p.id !== post.id),
                                    );
                                  } else {
                                    if (selectedLeverPostings.length < 1) {
                                      // If the object is not in the array, add it
                                      setSelectedLeverPostings((prev) => [
                                        ...prev,
                                        post,
                                      ]);
                                    } else {
                                      toast.warning(
                                        'You can import one job at a time.',
                                      );
                                    }
                                  }
                                },
                              }}
                              propsTextColor={{
                                style: {
                                  color: getLeverStatusColor(post.state),
                                },
                              }}
                              textRole={post.text}
                              textStatus={post.state}
                              textWorktypeLocation={post.categories.location}
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
        ) : integration.lever.step === STATE_LEVER_DIALOG.IMPORTING ? (
          <LoadingJobsAts
            textAtsCompany={'Lever'}
            textJobCount={
              selectedLeverPostings.length < 1
                ? `${selectedLeverPostings.length} Job`
                : `${selectedLeverPostings.length} Jobs`
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
