import { Collapse } from '@mui/material';
import { Paper } from '@mui/material';
import { DialogContent, Slider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { cloneDeep, get, isNumber, set } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  CandidateDatabaseDetail,
  CandidateDetailsCard,
  CandidateDialog,
  CandidateEducation,
  CandidateEducationCard,
  CandidateExperienceCard,
  CandidateFilter,
  CandidateSkills,
  JobPills,
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
import toast from '@/src/utils/toast';

import {
  CandidateSearchState,
  initialState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import { candidateSearchByQuery, getqueriedCandidates } from '../utils';
import AUIButton from '../../Common/AUIButton';
import MuiAvatar from '../../Common/MuiAvatar';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

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

const CandidatesSearch = ({ handleSetJdPopUp }) => {
  const { jobsData } = useJobs();
  const { recruiter } = useAuthDetails();
  const { candidateSearchState, updatenewSearchRes, updateState } =
    useCandidateSearchCtx();
  const searchInfo = candidateSearchState.searchInfo;
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchInfo.searchText);
  const [activeCandidate, setActiveCandidate] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const candidates = candidateSearchState.candidates;
  useEffect(() => {
    const { query } = router.query;
    if (typeof query === 'string') {
      setSearchQuery(query);
    }
    return () => {
      updatenewSearchRes(initialState);
    };
  }, [router.isReady, router.query]);

  const handleSearchCandidate = async (searchQry) => {
    try {
      setIsSearching(true);
      const newSearchState = await candidateSearchByQuery(
        searchQry,
        jobsData.jobs.map((j) => j.id),
        recruiter.id,
        candidateSearchState.maxProfiles,
      );
      updatenewSearchRes(newSearchState);
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <CandidateDatabaseDetail
        isSelected={false}
        textSelectedCount={0}
        onClickAll={
          {
            //   onClick: handleOnClickAll,
          }
        }
        slotSearchInput={
          <>
            {searchInfo.searchType === 'query' && (
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
            )}
          </>
        }
        slotCandidateDetailsCard={
          <>
            {candidates.map((c, index) => {
              return (
                <CandidateDetailsCard
                  key={index}
                  textName={getFullName(c.first_name, c.last_name)}
                  slotSkill={get(c.json_resume, 'skills', []).map(
                    (s, index) => (
                      <CandidateSkills key={index} textSkill={s} />
                    ),
                  )}
                  textLocation={getLocationString(
                    c.json_resume.basics.location,
                  )}
                  textOverview={c.json_resume.overview}
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
          onClick: () => {
            handleSetJdPopUp();
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
            updateState({
              path: 'componentinView',
              value: 'history',
            });
          },
        }}
        isViewJdVisible={searchInfo.searchType === 'jd'}
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
      textOverview={candidate.json_resume.overview}
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
      textName={getFullName(candidate.first_name, candidate.last_name)}
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

type FilterType = {
  profileLimit: number;
} & CandidateSearchState['queryJson'];

const SearchFilter = ({ handleDialogClose }) => {
  const { jobsData } = useJobs();
  const { candidateSearchState, updatenewSearchRes } = useCandidateSearchCtx();
  const [filters, setFilters] = useState<FilterType>({
    ...candidateSearchState.queryJson,
    profileLimit: candidateSearchState.maxProfiles,
  });
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const handleUpdate = (path, value) => {
    setFilters((p) => {
      const updated = cloneDeep(p);
      set(updated, path, value);
      return updated;
    });
  };

  const handlePillRemove = (path, index) => {
    setFilters((p) => {
      const updated = cloneDeep(p);
      updated[String(path)] = filters[String(path)].filter(
        (s, idx) => idx !== index,
      );
      return updated;
    });
  };

  const handleResetFilter = () => {
    setFilters({
      ...candidateSearchState.queryJson,
      profileLimit: candidateSearchState.maxProfiles,
    });
  };

  const handleApplyFilters = async () => {
    try {
      setIsFilterLoading(true);
      // eslint-disable-next-line no-unused-vars
      const newQueryJson = (({ profileLimit, ...o }) => o)(filters); // remove profileLimit
      const { result, summary } = await getqueriedCandidates(
        newQueryJson,
        jobsData.jobs.map((j) => j.id),
        filters.profileLimit,
      );
      updatenewSearchRes({
        ...candidateSearchState,
        candidates: result,
        maxProfiles: filters.profileLimit,
        queryJson: newQueryJson,
        searchInfo: {
          searchText: summary,
          searchType: candidateSearchState.searchInfo.searchType,
        },
      });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsFilterLoading(false);
      handleDialogClose();
    }
  };

  return (
    <CandidateFilter
      slotProfileInput={
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Slider
              size='small'
              defaultValue={50}
              value={filters.profileLimit}
              aria-label='Default'
              valueLabelDisplay='auto'
              sx={{
                mr: 3,
              }}
              onChange={(e: any) => {
                handleUpdate('profileLimit', e.target.value);
              }}
            />
            <UITypography fontBold='normal' type='small'>
              {filters.profileLimit}
            </UITypography>
          </div>
        </>
      }
      slotCurrentJobInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('jobTitles', [...filters.jobTitles, s]);
            }}
          />
        </>
      }
      slotButtonPrimarySmall={
        <>
          <AUIButton
            variant='primary'
            size='small'
            onClick={() => {
              handleApplyFilters();
            }}
            endIcon={
              isFilterLoading && (
                <CircularProgress
                  color='inherit'
                  size={'15px'}
                  sx={{ color: palette.grey[400] }}
                />
              )
            }
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                width={12}
                height={12}
                alt=''
                src={'/images/svg/graphUp.svg'}
                style={{ marginRight: '10px' }}
              />
              <p>Apply Filters</p>
            </div>
          </AUIButton>
        </>
      }
      slotMinExperienceInput={
        <>
          <UITextField
            value={filters.minExp}
            onChange={(e) => {
              handleUpdate('minExp', e.target.value);
            }}
            type='number'
          />
        </>
      }
      slotMaxExperienceInput={
        <>
          <UITextField
            value={filters.maxExp}
            onChange={(e) => {
              handleUpdate('maxExp', e.target.value);
            }}
            type='number'
          />
        </>
      }
      slotJobRole={
        <>
          {filters.jobTitles.map((title, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('jobTitles', index);
                  },
                }}
                textJob={title}
              />
            );
          })}
        </>
      }
      slotLanguageInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('languages', [...filters.languages, s]);
            }}
          />
        </>
      }
      slotLocationInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('location', [...filters.location, s]);
            }}
          />
        </>
      }
      slotUniversityInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('universities', [...filters.universities, s]);
            }}
          />
        </>
      }
      slotExcludedCompanyInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('excludedCompanies', [
                ...filters.excludedCompanies,
                s,
              ]);
            }}
          />
        </>
      }
      slotPreferredCompanyInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('prefferedCompanies', [
                ...filters.prefferedCompanies,
                s,
              ]);
            }}
          />
        </>
      }
      slotLanguageSuggestion={
        <>
          {filters.languages.map((lang, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('languages', index);
                  },
                }}
                textJob={lang}
              />
            );
          })}
        </>
      }
      slotLocationSuggestion={
        <>
          {filters.location.map((str, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('location', index);
                  },
                }}
                textJob={str}
              />
            );
          })}
        </>
      }
      slotUniversitySuggestion={filters.universities.map((str, index) => {
        return (
          <JobPills
            key={index}
            onClickDelete={{
              onClick: () => {
                handlePillRemove('universities', index);
              },
            }}
            textJob={str}
          />
        );
      })}
      slotExcludedSuggestion={filters.excludedCompanies.map((str, index) => {
        return (
          <JobPills
            key={index}
            onClickDelete={{
              onClick: () => {
                handlePillRemove('excludedCompanies', index);
              },
            }}
            textJob={str}
          />
        );
      })}
      slotPreferredSuggestion={filters.prefferedCompanies.map((str, index) => {
        return (
          <JobPills
            key={index}
            onClickDelete={{
              onClick: () => {
                handlePillRemove('prefferedCompanies', index);
              },
            }}
            textJob={str}
          />
        );
      })}
      onClickResetFilter={{
        onClick: handleResetFilter,
      }}
    />
  );
};

const FilterInput = ({
  type = 'string',
  handleAdd,
}: {
  type?: 'string' | 'number';
  // eslint-disable-next-line no-unused-vars
  handleAdd: (s: any) => void;
}) => {
  const [input, setInput] = useState<string | number>();
  return (
    <UITextField
      value={input}
      onChange={(e) => {
        if (type === 'number' && isNumber(e.target.value)) {
          setInput(Number(e.target.value));
        } else {
          setInput(e.target.value);
        }
      }}
      placeholder='Type and press enter to add'
      type={type}
      InputProps={{
        onKeyDown: (e) => {
          if (e.code === 'Enter') {
            handleAdd(input);
            type === 'string' && setInput('');
            type === 'number' && setInput(0);
          }
        },
      }}
    />
  );
};
