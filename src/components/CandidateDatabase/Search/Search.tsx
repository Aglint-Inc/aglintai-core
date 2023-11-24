import { Collapse, Dialog } from '@mui/material';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

import {
  CandidateDatabaseDetail,
  CandidateDetailsCard,
  CandidateSkills,
  ViewMoreSkills,
} from '@/devlink';
import { SearchHistoryType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';

// import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import SearchFilter from './SearchFilter';
import SelectedCandidate from './SelectedCandidate';
import {
  CandidateSearchRes,
  initialState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import { joinSearchResultWithBookMark } from '../utils';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import { supabaseWrap } from '../../JobsDashboard/JobPostCreateUpdate/utils';

const CandidatesSearch = () => {
  const { candidateSearchState, updatenewSearchRes, bookMarkCandidate } =
    useCandidateSearchCtx();
  const router = useRouter();
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [checkedCands, setCheckedCands] = useState<boolean[]>(
    Array(candidateSearchState.candidates.length).fill(false),
  );
  const [showBookmarked, setShowBookmarked] = useState(false);

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
        const canididatesDto = joinSearchResultWithBookMark(
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

  const candidates = candidateSearchState.candidates;

  const resetActiveCards = () => {
    setCheckedCands(Array(candidateSearchState.candidates.length).fill(false));
  };

  return (
    <>
      <CandidateDatabaseDetail
        isSelected={checkedCands.filter((c) => c).length > 0}
        textSelectedCount={checkedCands.filter((c) => c).length}
        isBookMarkedActive={showBookmarked}
        isAllActive={!showBookmarked}
        onClickBookmarked={{
          onClick: () => {
            setShowBookmarked(true);
          },
        }}
        onClickClearSelection={{
          onClick: () => {
            setCheckedCands(
              Array(candidateSearchState.candidates.length).fill(false),
            );
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
              .filter((_, index) => checkedCands[Number(index)])
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
                        isChecked={checkedCands[Number(index)]}
                        toggleChecked={() => {
                          setCheckedCands((prev) => {
                            let updated = [...prev];
                            updated[Number(index)] = !updated[Number(index)];
                            return updated;
                          });
                        }}
                      />
                    </>
                  );
                })}
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

  return (
    <CandidateDetailsCard
      textName={getFullName(candidate.first_name, candidate.last_name)}
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
