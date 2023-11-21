import { Collapse } from '@mui/material';
import { Paper } from '@mui/material';
import { DialogContent, Stack } from '@mui/material';
import { get, isArray } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';

import {
  CandidateDatabaseDetail,
  CandidateDetailsCard,
  CandidateSkills,
} from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { JsonResume } from '@/src/types/resume_json.types';
import { getFullName } from '@/src/utils/jsonResume';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { similarJobs } from '@/src/utils/prompts/candidateDb/similarJobs';
// import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import toast from '@/src/utils/toast';

import SearchFilter from './SearchFilter';
import SelectedCandidate from './SelectedCandidate';
import {
  CandidateSearchState,
  initialState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import { getRelevantCndidates } from '../utils';
import AUIButton from '../../Common/AUIButton';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

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
  const { jobsData } = useJobs();
  const { candidateSearchState, updatenewSearchRes } = useCandidateSearchCtx();
  const router = useRouter();
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCandidate, setActiveCandidate] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const buildQuery = async () => {
    try {
      setIsSearching(true);
      const resp = await searchJdToJson(searchQuery);
      const p: CandidateSearchState['queryJson'] = {
        jobTitles: [...resp.jobRoles],
        universities: [...resp.university],
        prefferedCompanies: [...resp.requiredPreviousCompanies],
        excludedCompanies: [],
        languages: [...resp.spokenLanguagesMentioned],
        location: [...resp.locations],
        maxExp: resp.maxExperienceInYears,
        minExp: resp.minExperienceInYears,
        skills: [...resp.skills],
        degrees: [...resp.degrees],
      };

      if (p.jobTitles.length > 0 && p.jobTitles.length < 5) {
        const j = await similarJobs(p.jobTitles);
        p.jobTitles = [...p.jobTitles, ...j.related_jobs];
      }

      // if (p.skills.length > 0 && p.skills.length < 5) {
      //   const d = await similarSkills(p.skills);
      //   p.skills = [...p.skills, ...d.related_skills];
      // }

      Object.keys(p).forEach((k) => {
        if (isArray(p[String(k)])) {
          p[String(k)] = p[String(k)].filter((s) => Boolean(s.trim()));
        }
      });

      const cndates = (await getRelevantCndidates(
        p,
        jobsData.jobs.map((j) => j.id),
      )) as any;

      updatenewSearchRes({
        ...initialState,
        candidates: cndates,
        queryJson: p,
      });

      setHideSearch(true);
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
      //
    } finally {
      setIsSearching(false);
    }
  };

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
        slotSearchInput={
          <>
            {
              <>
                {!hideSearch && (
                  <Stack gap={1} direction={'row'} width={'100%'}>
                    <Stack width={'50%'}>
                      <UITextField
                        value={searchQuery as string}
                        placeholder='Type your requirement here and press enter'
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                        fullWidth
                        InputProps={{
                          onKeyDown: (e) => {
                            if (e.code === 'Enter') {
                              buildQuery();
                            }
                          },
                        }}
                      />
                    </Stack>

                    <AUIButton
                      onClick={() => buildQuery()}
                      // endIcon={
                      //   <CircularProgress
                      //     color='inherit'
                      //     size={'15px'}
                      //     sx={{ color: palette.grey[400] }}
                      //   />
                      // }
                    >
                      <p>Search</p>
                    </AUIButton>
                  </Stack>
                )}
              </>
            }
          </>
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
