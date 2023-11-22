import { Collapse } from '@mui/material';
import { Paper } from '@mui/material';
import { DialogContent } from '@mui/material';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

import {
  CandidateDatabaseDetail,
  CandidateDetailsCard,
  CandidateSkills,
} from '@/devlink';
import { JsonResume } from '@/src/types/resume_json.types';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
// import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import toast from '@/src/utils/toast';

import SearchFilter from './SearchFilter';
import SelectedCandidate from './SelectedCandidate';
import {
  initialState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import MuiPopup from '../../Common/MuiPopup';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

export interface CandidateSearchRes {
  application_id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  job_title: null;
  email: string;
  json_resume: JsonResume;
  similarity: number;
  profile_image?: string;
}

const CandidatesSearch = () => {
  const { candidateSearchState, updatenewSearchRes } = useCandidateSearchCtx();
  const router = useRouter();
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);

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
        ) as any;
        const searchResults = searchRec.search_results;

        updatenewSearchRes({
          ...initialState,
          candidates: searchResults,
          queryJson: searchRec.query_json,
        });
      } catch (err) {
        toast.error(API_FAIL_MSG);
      } finally {
        setIsSearching(false);
      }
    })();
  }, [router.isReady, router.query]);

  const candidates = candidateSearchState.candidates;
  return (
    <>
      <CandidateDatabaseDetail
        isSelected={false}
        textSelectedCount={0}
        onClickAll={
          {
            // onClick: createEmbeddings,
          }
        }
        textRole={candidateSearchState.queryJson.jobTitles.join(', ')}
        slotCandidateDetailsCard={
          <>
            {isSearching && <Loader />}
            {!isSearching &&
              candidates.map((c, index) => {
                return (
                  <CandidateDetailsCard
                    key={index}
                    textName={getFullName(c.first_name, c.last_name)}
                    slotSkill={get(c.json_resume, 'skills', []).map(
                      (s, index) => (
                        <CandidateSkills key={index} textSkill={s} />
                      ),
                    )}
                    textLocation={''}
                    textOverview={c.json_resume?.overview}
                    textJobRoleAtCompany={c.job_title}
                    onClickStar={{}}
                    onClickCheck={{}}
                    slotAvatar={
                      <MuiAvatar
                        level={getFullName(c.first_name, c.last_name)}
                        src={c.profile_image}
                        variant={'rounded'}
                        width={'100%'}
                        height={'100%'}
                        fontSize={'12px'}
                      />
                    }
                    // isChecked={true}
                    isOverviewVisible={true}
                    // isStarActive={true}
                    onClickCard={{
                      onClick: () => {
                        setActiveCandidate(index);
                      },
                    }}
                  />
                );
              })}
          </>
        }
        // textSelectedCount={12}
        onClickViewJobDescription={{
          onClick: () => {
            setIsJDModalOpen(true);
          },
        }}
        slotCandidateDialog={
          <>
            <Collapse in={activeCandidate >= 0} unmountOnExit translate='yes'>
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
        isViewJdVisible={Boolean(router.query.isJDSearch) as any}
        onClickFilter={{
          onClick: () => {
            setIsFilterOpen(true);
          },
        }}
      />
      <MuiPopup
        props={{
          open: isfilterOpen,
          fullWidth: true,
          maxWidth: 'md',
          onClose: () => {
            setIsFilterOpen(false);
          },
        }}
      >
        <Paper>
          <DialogContent>
            {
              <SearchFilter
                handleDialogClose={() => {
                  setIsFilterOpen(false);
                }}
              />
            }
          </DialogContent>
        </Paper>
      </MuiPopup>
      <MuiPopup
        props={{
          open: isJDModalOpen,
          fullWidth: true,
          onClose: () => {
            setIsJDModalOpen(false);
          },
        }}
      >
        <Paper>
          {/* <JDSearchModal
            setJdPopup={setIsJDModalOpen}
            // onClickSubmit={(str) => {
            //   // localStorage.setItem(`jd`, str);
            //   // handleSearchByJd(str);
            // }}
          /> */}
        </Paper>
      </MuiPopup>
    </>
  );
};

export default CandidatesSearch;
