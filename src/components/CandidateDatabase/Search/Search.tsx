import { Collapse, Dialog } from '@mui/material';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';

import {
  BookmarkEmpty,
  CandidateDatabaseDetail,
  CandidateDetailsCard,
  CandidateEmpty,
  CandidateSkills,
  ViewMoreSkills,
} from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { SearchHistoryType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';

import AddToJobOptions from '../CandAddToJobMenu';
// import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import SearchFilter from './SearchFilter';
import SelectedCandidate from './SelectedCandidate';
import {
  CandidateSearchRes,
  initialState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import InCompleteLottie from '../IncompleteLottie';
import { joinSearchResultWithBookMarkAndJobApplied } from '../utils';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import { supabaseWrap } from '../../JobsDashboard/JobPostCreateUpdate/utils';

export type newCandJob = {
  title: string;
  id: string;
};

const CandidatesSearch = () => {
  const {
    candidateSearchState,
    updateState,
    updatenewSearchRes,
    bookMarkCandidate,
    handleAddCandidatesTojob,
  } = useCandidateSearchCtx();
  const router = useRouter();
  const { jobsData } = useJobs();
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [newJobsForCand, setNewJobsForCand] = useState<newCandJob[]>([]);
  const [isaddingTOJob, setIsAddingToJob] = useState(false);
  useEffect(() => {
    const { searchQryId } = router.query;
    if (!router.isReady) return;
    if (!searchQryId) {
      router.replace('/candidates/history');
    }
    (async () => {
      try {
        setIsSearching(true);
        const [searchRec] = supabaseWrap(
          await supabase
            .from('candidate_search_history')
            .select()
            .eq('id', searchQryId),
        ) as SearchHistoryType[];
        const searchResults = searchRec.search_results as any;
        const bookmarked_cands = searchRec.bookmarked_candidates || [];
        const canididatesDto = await joinSearchResultWithBookMarkAndJobApplied(
          searchResults,
          bookmarked_cands,
        );

        updatenewSearchRes({
          ...initialState,
          candidates: canididatesDto as any,
          queryJson: searchRec.query_json as any,
        });
      } catch (err) {
        // toast.error(API_FAIL_MSG);
      } finally {
        setIsSearching(false);
      }
    })();
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!jobsData.jobs) return;
    const candidates = candidateSearchState.candidates;
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
  }, [jobsData, candidateSearchState.candidates]);

  const resetActiveCards = () => {
    updateState({
      path: 'candidates',
      value: candidateSearchState.candidates.map((cand) => {
        cand.is_checked = false;
        return cand;
      }),
    });
  };

  const candidates = candidateSearchState.candidates;

  const selectedCandsCnt = useMemo(() => {
    return candidates.filter((cand) => cand.is_checked).length;
  }, [candidates]);

  const handleAddApplications = async (checkedJobIds: newCandJob[]) => {
    try {
      setIsAddingToJob(true);
      handleAddCandidatesTojob(
        candidates
          .filter((cand) => cand.is_checked)
          .map((cand) => cand.application_id),
        checkedJobIds.map((cjob) => ({
          job_id: cjob.id,
          job_title: cjob.title,
        })),
      );
    } catch (err) {
      //
    } finally {
      setIsAddingToJob(false);
    }
  };

  return (
    <>
      <CandidateDatabaseDetail
        isSelected={selectedCandsCnt > 0}
        textSelectedCount={`${selectedCandsCnt} ${
          selectedCandsCnt > 1 ? 'Candidates' : 'Candidate'
        } selected`}
        textAllCount={candidates.length}
        textBookmarkCount={candidates.filter((c) => c.is_bookmarked).length}
        isBookMarkedActive={showBookmarked}
        isAllActive={!showBookmarked}
        onClickBookmarked={{
          onClick: () => {
            setShowBookmarked(true);
          },
        }}
        onClickClearSelection={{
          onClick: () => {
            resetActiveCards();
          },
        }}
        onClickAll={{
          onClick: () => {
            setShowBookmarked(false);
          },
        }}
        onClickBookmarkSelection={{
          onClick: () => {
            const checkedCandIds = candidates
              .filter((cand) => cand.is_checked)
              .map((c) => c.application_id);
            bookMarkCandidate(checkedCandIds);
            resetActiveCards();
          },
        }}
        textRole={candidateSearchState.queryJson.jobTitles.join(', ')}
        slotCandidateDetailsCard={
          <>
            {isSearching && <Loader />}
            {!isSearching &&
              candidates
                .filter((c) => (showBookmarked ? c.is_bookmarked : true))
                .map((c, index) => {
                  return (
                    <>
                      <CandidateDetailCard
                        candidate={c}
                        key={index}
                        isActive={activeCandidate === index}
                        setIsActive={() => {
                          setActiveCandidate(index);
                        }}
                        isChecked={c.is_checked}
                        toggleChecked={() => {
                          updateState({
                            path: `candidates`,
                            value: candidates.map((cand) => {
                              if (cand.application_id === c.application_id) {
                                cand.is_checked = !cand.is_checked;
                              }
                              return cand;
                            }),
                          });
                        }}
                      />
                    </>
                  );
                })}
            {!isSearching && !showBookmarked && candidates.length == 0 && (
              <CandidateEmpty slotLottie={<InCompleteLottie />} />
            )}
            {!isSearching &&
              showBookmarked &&
              candidates.filter((c) => c.is_bookmarked).length == 0 && (
                <BookmarkEmpty />
              )}
          </>
        }
        slotCandidateDialog={
          <>
            <Collapse
              in={activeCandidate >= 0 && !isSearching}
              unmountOnExit
              translate='yes'
            >
              {activeCandidate >= 0 && (
                <SelectedCandidate
                  candidate={candidates[Number(activeCandidate)]}
                  onClickClose={() => {
                    setActiveCandidate(-1);
                  }}
                  onClickNext={() => {
                    if (activeCandidate < candidates.length - 1) {
                      setActiveCandidate((p) => p + 1);
                    }
                  }}
                  onClickPrev={() => {
                    if (activeCandidate > 0) {
                      setActiveCandidate((p) => p - 1);
                    }
                  }}
                  toggleBookMark={() => {
                    bookMarkCandidate(
                      candidates[Number(activeCandidate)].application_id,
                    );
                  }}
                />
              )}
            </Collapse>
          </>
        }
        onClickCandidateDatabase={{
          onClick: () => {
            router.push('/candidates/history');
          },
        }}
        onClickFilter={{
          onClick: () => {
            setIsFilterOpen(true);
          },
        }}
        slotAddtoJob={
          <>
            <AddToJobOptions
              handleClickSubmit={handleAddApplications}
              isAdding={isaddingTOJob}
              selectedJobIds={newJobsForCand}
            />
          </>
        }
      />
      <Dialog
        open={isfilterOpen}
        fullWidth={true}
        maxWidth={'md'}
        onClose={() => {
          setIsFilterOpen(false);
        }}
      >
        {
          <SearchFilter
            handleDialogClose={() => {
              setIsFilterOpen(false);
            }}
            setActiveCandidate={setActiveCandidate}
          />
        }
      </Dialog>
    </>
  );
};

export default CandidatesSearch;

const CandidateDetailCard = ({
  candidate,
  isActive, // setIsActive,
  setIsActive,
  isChecked,
  toggleChecked,
}: {
  candidate: CandidateSearchRes;
  isChecked: boolean;
  isActive: boolean;
  toggleChecked: any;
  setIsActive: any;
}) => {
  const { bookMarkCandidate } = useCandidateSearchCtx();
  const [showMore, setShowMore] = useState(false);
  const location = candidate.json_resume.basics.location;

  return (
    <CandidateDetailsCard
      isLocationVisible={Boolean(location)}
      textName={getFullName(candidate.first_name, candidate.last_name)}
      textJobAddedCount={candidate.applied_job_posts.length}
      isJobAddedVisible={candidate.applied_job_posts.length > 0}
      slotSkill={
        <>
          {!showMore &&
            get(candidate.json_resume, 'skills', [])
              .slice(0, 10)
              .map((s, index) => <CandidateSkills key={index} textSkill={s} />)}
          {candidate.json_resume.skills.length > 10 && (
            <ViewMoreSkills
              isViewMoreVisible={!showMore}
              isViewLessVisible={showMore}
              onClickViewMore={{
                onClick: (e) => {
                  e.stopPropagation();
                  setShowMore((p) => !p);
                },
              }}
            />
          )}
          {showMore &&
            get(candidate.json_resume, 'skills', []).map((s, index) => (
              <CandidateSkills key={index} textSkill={s} />
            ))}
        </>
      }
      isStarActive={candidate.is_bookmarked}
      textLocation={candidate.json_resume.basics.location}
      textOverview={candidate.json_resume?.overview}
      textJobRoleAtCompany={candidate.job_title}
      onClickStar={{
        onClick: (e) => {
          e.stopPropagation();
          bookMarkCandidate(candidate.application_id);
        },
      }}
      onClickCheck={{
        onClick: (e) => {
          e.stopPropagation();
          toggleChecked();
        },
      }}
      slotAvatar={
        <MuiAvatar
          level={getFullName(candidate.first_name, candidate.last_name)}
          src={candidate.profile_image}
          variant={'rounded'}
          width={'100%'}
          height={'100%'}
          fontSize={'12px'}
        />
      }
      isChecked={isChecked}
      isBorderActive={isActive}
      isOverviewVisible={Boolean(candidate.json_resume.overview)}
      onClickCard={{
        onClick: () => {
          setIsActive();
        },
      }}
    />
  );
};
