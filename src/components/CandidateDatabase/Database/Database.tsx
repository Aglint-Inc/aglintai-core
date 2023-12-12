import { Collapse, Drawer, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  CandidateDatabaseRow,
  CandidateDatabaseTable,
  Pagination,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useCandFilter } from './CandDbProvider';
import EmailOutReach from './EmailOutReach/EmailOutReach';
import { OutReachCtxProvider } from './EmailOutReach/OutReachCtx';
import FilterComp from './FilterComp';
import SelectedCandidate from './SelectedCandidate';
import SortComp from './SortComp';
import { getFilteredCands } from './utils';
import AddToJobOptions from '../CandAddToJobMenu';
import { newCandJob } from '../Search/Search';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import UITypography from '../../Common/UITypography';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

const CandDatabase = () => {
  const { jobsData } = useJobs();
  const { recruiter } = useAuthDetails();
  const [isLoading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCand] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const { updateState, candState, handleAddCandidatesTojob } = useCandFilter();
  const [newJobsForCand, setNewJobsForCand] = useState<newCandJob[]>([]);
  const [toggleOutreach, setToggleOutreach] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!jobsData.jobs) return;

    if (router.isReady) {
      const { page_no, location, name, job_role, sort_by_param, sort_type } =
        router.query as Record<string, string>;

      if (!page_no || !sort_by_param || !sort_type) {
        if (!page_no) {
          router.query.page_no = '1';
        }
        if (!sort_by_param) {
          router.query.sort_by_param = 'first_name';
        }
        if (!sort_type) {
          router.query.sort_type = 'asc';
        }
        router.replace(router);
        return;
      }

      (async () => {
        try {
          setLoading(true);
          const { filteredCands, total_results } = await getFilteredCands({
            recruiter_id: recruiter.id,
            currPage: Number(page_no),
            location_filter: location,
            name_filter: name,
            job_role: job_role,
            sort_param: sort_by_param as any,
            is_sort_desc: sort_type === 'desc',
          });
          setTotalResults(total_results);
          updateState({
            path: 'candidates',
            value: filteredCands,
          });
        } catch (err) {
          toast.error(API_FAIL_MSG);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [jobsData.jobs, router.isReady, router.query]);

  //for apply jobs
  useEffect(() => {
    if (!jobsData.jobs) return;
    const candidates = candState.candidates;
    const publishedJobs = jobsData.jobs.filter((j) => j.status === 'published');
    let candJobSet = new Set();
    for (let candJob of candidates.filter((cand) => cand.is_checked)) {
      for (let appliedJob of candJob.applied_job_posts) {
        candJobSet.add(appliedJob.job_id);
      }
    }
    const remainJobs: newCandJob[] = [];
    for (let job of publishedJobs) {
      if (!candJobSet.has(job.id)) {
        remainJobs.push({
          id: job.id,
          title: job.job_title,
        });
      }
    }
    setNewJobsForCand(remainJobs);
  }, [recruiter, candState.candidates]);

  const candidates = candState.candidates;
  const checkedCands = `Selected ${
    candState.candidates.filter((c) => c.is_checked).length
  } Candidate`;
  const counts =
    totalResults.toString() +
    ' ' +
    (totalResults === 1 ? 'candidate' : 'candidates');
  const isAnyRowSelected =
    candidates.findIndex((cand) => cand.is_checked) !== -1;

  const checkCandidates = (candId) => {
    const updatedCands = candidates.map((cand) => {
      if (cand.candidate_id === candId) {
        cand.is_checked = !cand.is_checked;
      }
      return cand;
    });

    updateState({
      path: 'candidates',
      value: updatedCands,
    });
  };

  const handleAddApplications = async (checkedJobIds: newCandJob[]) => {
    handleAddCandidatesTojob(
      candidates
        .filter((cand) => cand.is_checked)
        .map((cand) => cand.application_id),
      checkedJobIds.map((cjob) => ({
        job_id: cjob.id,
        job_title: cjob.title,
      })),
    );
  };
  const resetClick = () => {
    router.query.page_no = '1';

    router.query.sort_by_param = 'first_name';

    router.query.sort_type = 'asc';

    router.replace(router);
  };

  const totalPageCount = Math.ceil(totalResults / 100);
  const currPageNo = Number(router.query.page_no);
  return (
    <>
      <CandidateDatabaseTable
        isAddToJobVisible={isAnyRowSelected}
        onClickReset={{
          onClick: () => {
            resetClick();
          },
        }}
        isChecked={isAnyRowSelected}
        textCandidateCount={counts}
        slotAddtoJob={
          <>
            {isAnyRowSelected && (
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <UITypography fontBold='normal' type='small'>
                  {checkedCands}
                </UITypography>
                <AddToJobOptions
                  handleClickSubmit={handleAddApplications}
                  isAdding={false}
                  selectedJobIds={newJobsForCand}
                  isPopupCandidate={true}
                />
              </Stack>
            )}
          </>
        }
        slotCandidateRows={
          <>
            {candidates.length === 0 && isLoading && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                height={'500px'}
                width={'80vw'}
              >
                <Loader />
              </Stack>
            )}
            {candidates.map((detail, index) => {
              return (
                <>
                  <div
                    key={detail.candidate_id}
                    style={{
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'all 0.5s ease 0s',
                    }}
                  >
                    <CandidateDatabaseRow
                      slotNameAvatar={
                        <MuiAvatar
                          level={getFullName(
                            detail.first_name,
                            detail.last_name,
                          )}
                          src={detail.profile_image}
                          fontSize={'12px'}
                          variant={'rounded'}
                          width={'100%'}
                          height={'100%'}
                        />
                      }
                      textName={getFullName(
                        detail.first_name,
                        detail.last_name,
                      )}
                      textAppliedJob={detail.job_title || '--'}
                      textEmail={
                        detail.json_resume.basics?.email ??
                        (detail.email.startsWith('temp-')
                          ? '--'
                          : detail.email || '--')
                      }
                      isSelected={selectedCandidate === index}
                      textLocation={detail.json_resume.basics.location || '--'}
                      textPhone={detail.json_resume.basics.phone || '--'}
                      onClickCheck={{
                        onClick: (e) => {
                          e.stopPropagation();
                          checkCandidates(detail.candidate_id);
                        },
                      }}
                      isChecked={detail.is_checked}
                      onClickList={{
                        onClick: (e) => {
                          e.stopPropagation();
                          setSelectedCand(index);
                        },
                      }}
                    />
                  </div>
                </>
              );
            })}
          </>
        }
        slotFilter={
          <>
            <FilterComp />
          </>
        }
        slotSort={
          <>
            <SortComp />
          </>
        }
        onClickCheck={{
          onClick: () => {
            updateState({
              path: 'candidates',
              value: candidates.map((c) => {
                c.is_checked = isAnyRowSelected ? false : true;
                return c;
              }),
            });
          },
        }}
        onClickAiSearch={{
          onClick: () => {
            router.push('/candidates/history');
          },
        }}
        slotCandidateDetails={
          <>
            <Collapse
              in={selectedCandidate !== -1 && !isLoading}
              unmountOnExit
              translate='yes'
              orientation='vertical'
            >
              {selectedCandidate !== -1 && (
                <SelectedCandidate
                  showClose={false}
                  onClickClose={() => setSelectedCand(-1)}
                  onClickNext={() => {
                    if (candidates.length - 1 > selectedCandidate) {
                      setSelectedCand((p) => p + 1);
                    }
                  }}
                  onClickPrev={() => {
                    if (selectedCandidate > 0) {
                      setSelectedCand((p) => p - 1);
                    }
                  }}
                  path={`[${selectedCandidate}]`}
                  onCLickEmailOutReach={() => {
                    setToggleOutreach(true);
                  }}
                  // isEmailOutreachVisible={Boolean(
                  //   candidates[Number(selectedCandidate)].email,
                  // )}
                />
              )}
            </Collapse>
          </>
        }
        slotPagination={
          <>
            {
              <Pagination
                textCurrentPageCount={currPageNo}
                textCurrentCandidateCount={candidates.length}
                textTotalPageCount={totalPageCount}
                textTotalCandidateCount={totalResults}
                onClickNext={{
                  onClick: () => {
                    if (currPageNo < totalPageCount) {
                      router.query.page_no = `${currPageNo + 1}`;
                      router.push(router);
                    }
                  },
                }}
                onClickPrev={{
                  onClick: () => {
                    if (currPageNo > 1) {
                      router.query.page_no = `${currPageNo - 1}`;
                      router.push(router);
                    }
                  },
                }}
              />
            }
          </>
        }
      />
      <Drawer
        anchor={'right'}
        open={toggleOutreach}
        onClose={() => {
          setToggleOutreach(false);
        }}
      >
        <Stack direction={'row'} width={'1150px'}>
          <Stack width={'460px'} height={'100vh'} overflow={'scroll'}>
            <SelectedCandidate
              showClose={true}
              onClickClose={() => setToggleOutreach(false)}
              onClickNext={() => {
                if (candidates.length - 1 > selectedCandidate) {
                  setSelectedCand((p) => p + 1);
                }
              }}
              onClickPrev={() => {
                if (selectedCandidate > 0) {
                  setSelectedCand((p) => p - 1);
                }
              }}
              path={`[${selectedCandidate}]`}
              onCLickEmailOutReach={() => {
                setToggleOutreach(true);
              }}
              isEmailOutreachVisible={false}
            />
          </Stack>
          <Stack width={'68%'} height={'100vh'} overflow={'scroll'}>
            <OutReachCtxProvider
              selcandidate={
                selectedCandidate !== -1
                  ? candidates[Number(selectedCandidate)]
                  : null
              }
            >
              <EmailOutReach
                onClose={() => {
                  setToggleOutreach(false);
                }}
              />
            </OutReachCtxProvider>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default CandDatabase;
