import { Collapse } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  CandidateDatabaseDetail,
  CandidateDetailsCard,
  CandidateDialog,
  CandidateEducation,
  CandidateEducationCard,
  CandidateExperienceCard,
  CandidateSkills,
} from '@/devlink';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { JsonResume } from '@/src/types/resume_json.types';
import {
  getformatedDate,
  getFullName,
  getLocationString,
} from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import AUIButton from '../../Common/AUIButton';
import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

export interface CandidateSearchRes {
  application_id: string;
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
  const { recruiter } = useAuthDetails();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCandidate, setActiveCandidate] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<CandidateSearchRes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const { query } = router.query;
    if (typeof query === 'string') {
      setSearchQuery(query);
      handleSearchCandidate(query);
    }
  }, [router.isReady, router.query]);

  const handleSearchCandidate = async (searchQry) => {
    try {
      setIsSearching(true);
      //   console.log('fqwnlkfnekwjn');
      //   const resp = await searchQueryToJson(searchQuery);
      //   console.log(resp);
      const { data: emb } = await axios.post('/api/ai/create-embeddings', {
        text: searchQry,
      });
      const jobIds = jobsData.jobs.map((j) => j.id);
      const embedding = emb.data[0].embedding;
      const result = supabaseWrap(
        await supabase.rpc('match_job_applications', {
          job_ids: jobIds,
          match_count: 100,
          match_threshold: 0.5,
          query_embedding: embedding,
        }),
      ) as CandidateSearchRes[];
      setCandidates(result);
      supabaseWrap(
        await supabase.from('candidate_search_history').insert({
          recruiter_id: recruiter.id,
          is_search_jd: false,
          search_query: searchQry,
        }),
      );
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <CandidateDatabaseDetail
        // isAllActive={true}
        // isBookMarkedActive={true}
        // isSelected={false}
        isSelected={false}
        onClickAll={
          {
            //   onClick: handleOnClickAll,
          }
        }
        slotSearchInput={
          <>
            <UITextField
              value={searchQuery}
              placeholder='Type your requirement here and press enter'
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              fullWidth
              InputProps={{
                onKeyDown: (e) => {
                  if (e.code === 'Enter') {
                    handleSearchCandidate(searchQuery);
                  }
                },
              }}
            />
            <AUIButton
              onClick={() => handleSearchCandidate(searchQuery)}
              endIcon={
                isSearching && (
                  <CircularProgress
                    color='inherit'
                    size={'15px'}
                    sx={{ color: palette.grey[400] }}
                  />
                )
              }
            >
              Search
            </AUIButton>
          </>
        }
        slotCandidateDetailsCard={
          <>
            {candidates.map((c, index) => {
              return (
                <CandidateDetailsCard
                  key={index}
                  textName={
                    get(c.json_resume, 'basics.firstName') +
                    ' ' +
                    get(c.json_resume, 'basics.lastName')
                  }
                  slotSkill={get(c.json_resume, 'skills', []).map(
                    (s, index) => (
                      <CandidateSkills key={index} textSkill={s} />
                    ),
                  )}
                  textLocation={getLocationString(
                    c.json_resume.basics.location,
                  )}
                  textOverview={c.json_resume.basics.summary}
                  textJobRoleAtCompany={c.json_resume.basics.label}
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
          onClick: () => {},
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
            //
          },
        }}

        // onClickCandidateDatabase={{
        //   onClick: () => {
        //     console.log('fnkewjn');
        //   },
        // }}
      />
    </>
  );
};

export default CandidatesSearch;

const SelectedCandidate = ({
  candidate,
  onClickClose,
  onClickNext,
  onClickPrev,
}: {
  candidate: CandidateSearchRes;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickClose: () => void;
}) => {
  return (
    <CandidateDialog
      textJobRoleAtCompany={candidate.json_resume.basics.label}
      textMail={candidate.json_resume.basics.email}
      // isOverviewVisible={}
      textOverview={candidate.json_resume.basics.summary}
      textLocation={getLocationString(candidate.json_resume.basics.location)}
      isOverviewVisible
      slotAddtoJob={<></>}
      onClickClose={{
        onClick: onClickClose,
      }}
      //   onClickCopy={{}}
      //   onClickLinkedin={{}}
      onClickNext={{
        onClick: onClickNext,
      }}
      onClickPrev={{
        onClick: onClickPrev,
      }}
      slotAvatar={
        <>
          <MuiAvatar
            level={getFullName(candidate.first_name, candidate.last_name)}
            src={candidate.profile_image}
            variant={'rounded'}
            width={'100%'}
            height={'100%'}
            fontSize={'12px'}
          />
        </>
      }
      textName={getFullName(
        candidate.json_resume.basics.firstName,
        candidate.json_resume.basics.lastName,
      )}
      slotDetails={
        <>
          <CandidateEducation
            slotEducationCard={
              <>
                {candidate.json_resume.education.map((ed, index) => {
                  return (
                    <CandidateEducationCard
                      key={index}
                      slotEducationLogo={<></>}
                      textUniversityName={ed.institution}
                      textDate={getformatedDate(ed.startDate, ed.endDate)}
                    />
                  );
                })}
              </>
            }
          />
          <CandidateExperience
            slotCandidateExperienceCard={
              <>
                {candidate.json_resume.work.map((exp, index) => {
                  return (
                    <CandidateExperienceCard
                      key={index}
                      textCompany={exp.name}
                      textRole={exp.position}
                      slotLogo={
                        <CompanyLogo
                          companyName={
                            exp.name ? exp.name.trim().toLowerCase() : null
                          }
                        />
                      }
                    />
                  );
                })}
              </>
            }
          />
        </>
      }
    />
  );
};
