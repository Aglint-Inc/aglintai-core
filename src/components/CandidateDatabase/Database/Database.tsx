import { Collapse } from '@mui/material';
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
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useCandFilter } from './CandDbProvider';
import SelectedCandidate from './SelectedCandidate';
import { getFilteredCands } from './utils';
import AddToJobOptions from '../Search/CandAddToJobMenu';
import { newCandJob } from '../Search/Search';
import MuiAvatar from '../../Common/MuiAvatar';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

const CandDatabase = () => {
  const { jobsData } = useJobs();
  const [isLoading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCand] = useState(-1);
  const { recruiter } = useAuthDetails();
  const [candsCount, setCandsCount] = useState(0);
  const { updateState, candState, handleAddCandidatesTojob } = useCandFilter();
  const [newJobsForCand, setNewJobsForCand] = useState<newCandJob[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!jobsData.jobs) return;

    if (router.isReady) {
      const { page_no } = router.query;
      if (typeof page_no !== 'string') {
        router.replace('/candidates?page_no=1');
        return;
      }

      (async () => {
        try {
          setLoading(true);
          const candidates = await getFilteredCands(
            jobsData.jobs.map((j) => j.id),
            Number(page_no),
          );
          const allCands = supabaseWrap(
            await supabase
              .from('candidates')
              .select('id')
              .eq('recruiter_id', recruiter.id),
          ) as string[];

          setCandsCount(allCands.length);
          updateState({
            path: 'candidates',
            value: candidates,
          });
        } catch (err) {
          // console.log(err);
          toast.error(API_FAIL_MSG);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [jobsData.jobs, router.isReady, router.query]);

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
  }, [jobsData, candState.candidates]);

  const candidates = candState.candidates;
  const counts =
    candsCount.toString() +
    ' ' +
    (candsCount === 1 ? 'candidate' : 'candidates');
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

  const totalPageCount = Math.ceil(candsCount / 100);
  const currPageNo = Number(router.query.page_no);
  return (
    <>
      <CandidateDatabaseTable
        isChecked={isAnyRowSelected}
        textCandidateCount={counts}
        slotCandidateRows={
          <>
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
                      textAppliedJob={detail.job_title}
                      textEmail={
                        detail.email.startsWith('temp-')
                          ? '--'
                          : detail.email || '--'
                      }
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
                  onClickClose={() => setSelectedCand(-1)}
                  onClickNext={() => {
                    if (candidates.length - 1 > selectedCandidate) {
                      setSelectedCand((p) => p + 1);
                    }
                  }}
                  onClickPrev={() => {
                    if (selectedCandidate > 0) {
                      setSelectedCand((p) => p + 1);
                    }
                  }}
                  path={`[${selectedCandidate}]`}
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
                textTotalCandidateCount={candsCount}
                onClickNext={{
                  onClick: () => {
                    if (currPageNo < totalPageCount) {
                      router.push(`/candidates?page_no=${currPageNo + 1}`);
                    }
                  },
                }}
                onClickPrev={{
                  onClick: () => {
                    if (currPageNo > 1) {
                      router.push(`/candidates?page_no=${currPageNo - 1}`);
                    }
                  },
                }}
                slotAddToJob={
                  <>
                    {isAnyRowSelected && (
                      <AddToJobOptions
                        handleClickSubmit={handleAddApplications}
                        isAdding={false}
                        selectedJobIds={newJobsForCand}
                      />
                    )}
                  </>
                }
              />
            }
          </>
        }
      />
    </>
  );
};

export default CandDatabase;
