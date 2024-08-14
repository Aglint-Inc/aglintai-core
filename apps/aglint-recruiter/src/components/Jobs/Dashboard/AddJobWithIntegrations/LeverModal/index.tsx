import { Dialog, Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';

import { AtsCard } from '@/devlink/AtsCard';
import { AtsJobs } from '@/devlink/AtsJobs';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IntegrationFetching } from '@/devlink/IntegrationFetching';
import { IntegrationModal } from '@/devlink/IntegrationModal';
import { LeverApiKey } from '@/devlink/LeverApiKey';
import { LoadingJobsAts } from '@/devlink/LoadingJobsAts';
import { NoResultAts } from '@/devlink/NoResultAts';
import { SkeletonLoaderAtsCard } from '@/devlink/SkeletonLoaderAtsCard';
import LoaderLever from '@/public/lottie/AddJobWithIntegrations';
import FetchingJobsLever from '@/public/lottie/FetchingJobsLever';
import axios from '@/src/client/axios';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_LEVER_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { handleGenerateJd } from '@/src/context/JobContext/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { ApiLeverCreateJob } from '@/src/pages/api/lever/createjob';
import { useAllIntegrations } from '@/src/queries/intergrations';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import { POSTED_BY } from '../utils';
import { LeverJob } from './types/job';
import { fetchAllJobs, getLeverStatusColor } from './utils';

export default function LeverModalComp() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobs, handleJobsRefresh } = useJobs();
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
      setIntegration((prev) => ({
        ...prev,
        lever: { open: false, step: STATE_LEVER_DIALOG.IMPORTING },
      }));
      router.push(ROUTES['/jobs/[id]']({ id: response.public_job_id }));
    } catch (error) {
      toast.error(
        'Import failed. Please try again later or contact support for assistance.',
      );
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
    <Dialog open={integration.lever.open} onClose={handleClose} maxWidth={'lg'}>
      <IntegrationModal
        slotLogo={
          <>
            <Image
              src={'/images/ats/lever.png'}
              width={120}
              height={34}
              alt=''
            />
          </>
        }
        slotApiKey={
          integration.lever.step === STATE_LEVER_DIALOG.API ||
          integration.lever.step === STATE_LEVER_DIALOG.ERROR ? (
            <LeverApiKey
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
                  error={error}
                  helperText='Please enter a API key'
                  fullWidth
                  height={32}
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
                textNumberofJobs={<></>}
                onClickImport={{
                  onClick: () => {
                    importLever();
                    posthog.capture('Lever Jobs successfully imported');
                  },
                }}
                isImportDisable={!selectedLeverPostings}
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
                                  selectedLeverPostings?.id === post.id
                                }
                                onClickCheck={{
                                  onClick: () => {
                                    setSelectedLeverPostings(post);
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
              textJobCount={selectedLeverPostings ? 1 : 0}
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
