import { Avatar, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import {
  AtsCard,
  AtsJobs,
  LeverApiKey,
  LeverFetching,
  LeverModal,
  LoadingJobsAts,
  NoResultAts,
  SkeletonLoaderAtsCard,
} from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { StatusJobs } from '@/src/types/data.types';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import FetchingJobsLever from './Loader';
import { STATE_LEVER_DIALOG } from '../EmptyJobDashboard';
import LoaderLever from '../Loader';
import {
  createJobApplications,
  createJobObject,
  createLeverJobReference,
  fetchAllJobs,
  getLeverStatusColor,
  POSTED_BY,
} from '../utils';

export function LeverModalComp({ state, handleClose, setState }) {
  const { recruiter, setRecruiter } = useAuthDetails();
  const router = useRouter();
  const { handleUIJobUpdate, jobsData } = useJobs();
  const [leverPostings, setLeverPostings] = useState([]);
  const [selectedLeverPostings, setSelectedLeverPostings] = useState([]);
  const [leverFilter, setLeverFilter] = useState('published');
  const [initialFetch, setInitialFetch] = useState(true);
  const apiRef = useRef(null);

  useEffect(() => {
    if (jobsData.jobs && recruiter.lever_key) {
      fetchJobs();
    }
  }, [jobsData.jobs]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(recruiter.lever_key);
    setLeverPostings(
      allJobs.filter((post) => {
        if (
          jobsData.jobs?.filter(
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
      setState(STATE_LEVER_DIALOG.IMPORTING);
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
          };
        });
        await createJobApplications(jobsObj, recruiter.lever_key);
        newJobs.map((job) => {
          handleUIJobUpdate({
            ...job,
            active_status: job.active_status as unknown as StatusJobs,
            count: {
              new: 0,
              interviewing: 0,
              qualified: 0,
              disqualified: 0,
            },
          });
        });
        toast.success('Jobs Imported Successfully');
        router.push(`${pageRoutes.JOBS}?status=active`);
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
      const response = await axios.post('/api/lever/getPostings', {
        offset: 0,
        apiKey: apiRef.current.value,
        isInitial: true,
      });
      if (response.status === 200 && response.data.data) {
        setState(STATE_LEVER_DIALOG.FETCHING);

        const responseRec = await axios.post('/api/lever/saveApiKey', {
          recruiterId: recruiter.id,
          apiKey: apiRef.current.value,
        });

        if (responseRec.status === 200 && responseRec.data[0]?.lever_key) {
          setRecruiter(responseRec.data[0]);
          setLeverPostings(response.data.data);
          setInitialFetch(false);
          setTimeout(() => {
            setState(STATE_LEVER_DIALOG.LISTJOBS);
          }, 1000);
        }
      } else {
        setState(STATE_LEVER_DIALOG.ERROR);
      }
    } catch (error) {
      setState(STATE_LEVER_DIALOG.ERROR);
    }
  };

  return (
    <LeverModal
      slotApiKey={
        state === STATE_LEVER_DIALOG.API ||
        state === STATE_LEVER_DIALOG.ERROR ? (
          <LeverApiKey
            onClickSupport={{
              onClick: () => {
                window.open(
                  'https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials',
                  '_blank',
                );
              },
            }}
            isApiWrong={state === STATE_LEVER_DIALOG.ERROR}
            slotSearch={
              <UITextField
                ref={apiRef}
                labelSize='small'
                fullWidth
                placeholder='API key'
                type='password'
              />
            }
            onClickContinue={{
              onClick: () => {
                submitApiKey();
              },
            }}
          />
        ) : state === STATE_LEVER_DIALOG.FETCHING ? (
          <LeverFetching
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
        ) : state === STATE_LEVER_DIALOG.LISTJOBS ? (
          <Stack
            justifyContent={'flex-start'}
            height={'100%'}
            overflow={'hidden'}
          >
            <AtsJobs
              slotLogo={
                <Avatar
                  variant='square'
                  src='/images/ats/lever.png'
                  sx={{ width: '100%', height: '30px' }}
                />
              }
              textNumberofJobs={
                <Typography variant='body2'>
                  {selectedLeverPostings.length == 0
                    ? `Showing ${leverPostings.length} Jobs from lever`
                    : `${selectedLeverPostings.length} Jobs selected`}
                </Typography>
              }
              onClickImport={{
                onClick: () => {
                  importLever();
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
                                  if (selectedLeverPostings.length < 5) {
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
                                      // If the object is not in the array, add it
                                      setSelectedLeverPostings((prev) => [
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
        ) : state === STATE_LEVER_DIALOG.IMPORTING ? (
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
