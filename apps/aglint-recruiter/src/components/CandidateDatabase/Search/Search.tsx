/* eslint-disable security/detect-object-injection */
import { supabaseWrap } from '@aglint/shared-utils';
import { Collapse, Dialog, Drawer, Stack } from '@mui/material';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';

import { BookmarkEmpty } from '@/devlink/BookmarkEmpty';
import { CandidateDatabaseDetail } from '@/devlink/CandidateDatabaseDetail';
import { CandidateDetailsCard } from '@/devlink/CandidateDetailsCard';
import { CandidateEmpty } from '@/devlink/CandidateEmpty';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { ViewMoreSkills } from '@/devlink/ViewMoreSkills';
import { useJobs } from '@/src/context/JobsContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

import {
  CandidateSearchRes,
  initialState,
  useCandidateSearchCtx,
} from '../../../context/CandidateSearchProvider/CandidateSearchProvider';
import Loader from '../../Common/Loader';
import InCompleteLottie from '../../Common/Lotties/CandidateDatabase_IncompleteLottie';
import MuiAvatar from '../../Common/MuiAvatar';
import AddToJobOptions from '../Database/CandAddToJobMenu';
import EmailOutReach from '../Database/EmailOutReach/EmailOutReach';
import { OutReachCtxProvider } from '../Database/EmailOutReach/OutReachCtx';
import { joinSearchResultWithBookMarkAndJobApplied } from '../utils';
// import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import SearchFilter from './SearchFilter';
import SelectedCandidate from './SelectedCandidate';

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
  const { jobs } = useJobs();
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [newJobsForCand, setNewJobsForCand] = useState<newCandJob[]>([]);
  const [isaddingTOJob, setIsAddingToJob] = useState(false);
  const [toggleOutreach, setToggleOutreach] = useState(false);

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
        );
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
        // toast.error('Something went wrong. Please try again.');
      } finally {
        setIsSearching(false);
      }
    })();
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (jobs.status === 'pending') return;
    const candidates = candidateSearchState.candidates;
    const publishedJobs = jobs.data.filter((j) => j.status === 'published');
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
  }, [jobs, candidateSearchState.candidates]);

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
    return candidates.filter(
      (cand) => (showBookmarked ? cand.is_bookmarked : true) && cand.is_checked,
    ).length;
  }, [candidates, showBookmarked]);

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
        textRole={router.query.search_title}
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
                          const activeCandIdx = candidates.findIndex(
                            (cand) => c.candidate_id === cand.candidate_id,
                          );
                          if (activeCandIdx !== -1) {
                            setActiveCandidate(activeCandIdx);
                          }
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
              in={
                activeCandidate >= 0 &&
                !isSearching &&
                (showBookmarked
                  ? // eslint-disable-next-line security/detect-object-injection
                    candidates[activeCandidate].is_bookmarked
                  : true)
              }
              unmountOnExit
              translate='yes'
            >
              {activeCandidate >= 0 && candidates.length > 0 && (
                <SelectedCandidate
                  onClickEmailOutReach={() => {
                    setToggleOutreach(true);
                  }}
                  showEmailOutReach={true}
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
              onClickEmailOutReach={() => {}}
              showEmailOutReach={false}
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
          </Stack>
          <Stack width={'68%'} height={'100vh'} overflow={'scroll'}>
            {activeCandidate >= 0 && candidates.length > 0 && (
              <OutReachCtxProvider
                selcandidate={
                  activeCandidate === -1
                    ? null
                    : {
                        candidateId:
                          candidates[Number(activeCandidate)].candidate_id,
                        candOverview:
                          candidates[Number(activeCandidate)].json_resume
                            .overview,
                        email: candidates[Number(activeCandidate)].email,
                        firstName:
                          candidates[Number(activeCandidate)].first_name,
                        lastName: candidates[Number(activeCandidate)].last_name,
                      }
                }
              >
                <EmailOutReach
                  onClose={() => {
                    setToggleOutreach(false);
                  }}
                />
              </OutReachCtxProvider>
            )}
          </Stack>
        </Stack>
      </Drawer>
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
              .map((s, index) => <GlobalBadge key={index} textBadge={s} size={2} color={'neutral'}/> )}
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
              // <CandidateSkills key={index} textSkill={s} />
              <GlobalBadge key={index} textBadge={s} size={2} color={'neutral'}/>
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
          variant={'rounded-small'}
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
