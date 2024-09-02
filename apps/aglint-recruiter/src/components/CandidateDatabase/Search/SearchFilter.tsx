import { supabaseWrap } from '@aglint/shared-utils';
import { Slider, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { cloneDeep, set } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { AddSkillPIll } from '@/devlink/AddSkillPIll';
import { ButtonGenerate } from '@/devlink/ButtonGenerate';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { CandidateFilter } from '@/devlink/CandidateFilter';
import { JobPills } from '@/devlink/JobPills';
import { SkillsGenerate } from '@/devlink/SkillsGenerate';
import { useJobs } from '@/src/context/JobsContext';
import { similarJobs } from '@/src/utils/prompts/candidateDb/similarJobs';
import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  type CandidateSearchState,
  initialState,
  useCandidateSearchCtx,
} from '../../../context/CandidateSearchProvider/CandidateSearchProvider';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { dialogFormContent, getRelevantCndidates } from '../utils';
import FilterInput from './FilterInput';

type FilterType = {
  profileLimit: number;
} & CandidateSearchState['queryJson'];

const SearchFilter = ({ handleDialogClose, setActiveCandidate }) => {
  const { jobs } = useJobs();
  const { candidateSearchState, updatenewSearchRes, updateState } =
    useCandidateSearchCtx();
  const [filters, setFilters] = useState<FilterType>({
    ...candidateSearchState.queryJson,
    profileLimit: candidateSearchState.maxProfiles,
  });
  const [isSkillGenerating, setIsSkillGenerating] = useState(false);
  const [isjobRolesGenerating, setIsjobRolesGenerating] = useState(false);
  const [suggestedJobs, setSuggestedJobs] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  const router = useRouter();

  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const handleUpdatePillInput = (path: string, inputText: string) => {
    if (!inputText) return;
    const inputVals = inputText.split(',').filter((s) => Boolean(s.trim()));
    setFilters((p) => {
      const updated = cloneDeep(p);
      set(updated, path, [...filters[String(path)], ...inputVals]);
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

  const handleGenSimJobRoles = async () => {
    try {
      setIsjobRolesGenerating(true);
      const resp = await similarJobs(filters.jobTitles);
      setSuggestedJobs(resp.related_jobs);
    } catch (err) {
      //
    } finally {
      setIsjobRolesGenerating(false);
    }
  };

  const handleGenSimSkills = async () => {
    try {
      setIsSkillGenerating(true);
      const resp = await similarSkills(filters.skills);
      setSuggestedSkills(resp.related_skills);
    } catch (err) {
      //
    } finally {
      setIsSkillGenerating(false);
    }
  };

  const handleApplyFilters = async () => {
    try {
      if (isFilterLoading) return;
      updateState({
        path: 'candidates',
        value: [],
      });
      setActiveCandidate(0);
      setIsFilterLoading(true);
      // eslint-disable-next-line no-unused-vars
      const newQueryJson = (({ profileLimit, ...o }) => o)(filters); // remove profileLimit
      // eslint-disable-next-line no-undef
      const cands = (await getRelevantCndidates(
        newQueryJson,
        jobs.data.map((j) => j.id),
        filters.profileLimit,
      )) as any;

      updatenewSearchRes({
        ...initialState,
        candidates: cands,
        maxProfiles: filters.profileLimit,
        queryJson: newQueryJson,
      });
      supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .update({
            query_json: newQueryJson,
            search_results: cands,
          })
          .eq('id', router.query.searchQryId)
          .select(),
      );
    } catch (err) {
      // console.log(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsFilterLoading(false);
      handleDialogClose();
    }
  };

  return (
    <CandidateFilter
      // onClickClose={{
      //   onClick: () => {
      //     handleDialogClose();
      //   },
      // }}
      slotProfileInput={
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Slider
              size='small'
              defaultValue={50}
              min={1}
              value={filters.profileLimit}
              aria-label='Default'
              valueLabelDisplay='auto'
              sx={{
                mr: 3,
                backgroundColor: 'var(--neutral-3)',
              }}
              onChange={(e: any) => {
                setFilters((p) => ({
                  ...p,
                  profileLimit: e.target.value,
                }));
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
              handleUpdatePillInput('jobTitles', s);
            }}
            path='jobTitles'
          />
        </>
      }
      slotButtonPrimarySmall={
        <>
          <ButtonSoft
            textButton='Apply'
            size={2}
            iconName='trending_up'
            isLeftIcon
            isLoading={isFilterLoading}
            onClickButton={{
              onClick: () => {
                !isFilterLoading && handleApplyFilters();
              },
            }}
          />
        </>
      }
      slotMinExperienceInput={
        <>
          <UITextField
            value={filters.minExp}
            onChange={(e) => {
              if (Number(e.target.value) < 0) return;
              setFilters((p) => ({ ...p, minExp: Number(e.target.value) }));
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
              if (Number(e.target.value) < 0) return;
              setFilters((p) => ({ ...p, maxExp: Number(e.target.value) }));
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
          {filters.jobTitles.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.jobTitles.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      slotLanguageInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('languages', s);
            }}
            path='languages'
          />
        </>
      }
      slotLocationInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('location', s);
            }}
            path='location'
          />
        </>
      }
      slotUniversityInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('universities', s);
            }}
            path='universities'
          />
        </>
      }
      slotDegreeInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('degrees', s);
            }}
            path='degrees'
          />
        </>
      }
      slotDegreeSuggestion={
        <>
          {filters.degrees.map((lang, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('degrees', index);
                  },
                }}
                textJob={lang}
              />
            );
          })}
          {filters.degrees.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.degrees.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      slotExcludedCompanyInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('excludedCompanies', s);
            }}
            path='excludedCompanies'
          />
        </>
      }
      slotPreferredCompanyInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('prefferedCompanies', s);
            }}
            path='prefferedCompanies'
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
          {filters.languages.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.languages.emptyMsg}
              </UITypography>
            </>
          )}
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
          {filters.location.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.location.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      slotUniversitySuggestion={
        <>
          {filters.universities.map((str, index) => {
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
          {filters.universities.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.universities.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      slotExcludedSuggestion={
        <>
          {filters.excludedCompanies.map((str, index) => {
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
          {filters.excludedCompanies.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.excludedCompanies.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      slotPreferredSuggestion={
        <>
          {filters.prefferedCompanies.map((str, index) => {
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
          {filters.prefferedCompanies.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.prefferedCompanies.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      slotSkillInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('skills', s);
            }}
            path='skills'
          />
        </>
      }
      slotSkillSuggestion={
        <>
          {filters.skills.map((str, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('skills', index);
                  },
                }}
                textJob={str}
              />
            );
          })}
          {filters.skills.length === 0 && (
            <>
              <UITypography type='small' color={'var(--neutral-11)'}>
                {dialogFormContent.skills.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      onClickResetFilter={{
        onClick: handleResetFilter,
      }}
      slotGenerate={
        <SkillsGenerate
          textDescription={`Click on 'Generate' button to get suggested job titles`}
          slotGenerateSkill={
            <>
              {suggestedSkills.length === 0 && (
                <ButtonGenerate
                  onClickGenerate={{
                    onClick: handleGenSimSkills,
                  }}
                  slotIcon={
                    <>
                      {isSkillGenerating ? (
                        <CircularProgress
                          color='inherit'
                          size={'15px'}
                          sx={{ color: 'var(--neutral-6)' }}
                        />
                      ) : (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clip-path='url(#clip0_4853_127528)'>
                            <path
                              d='M11.9531 7.75315C10.6062 7.41565 9.93125 7.25 9.46565 6.78435C9 6.3156 8.83435 5.64375 8.49685 4.29688L8 2.3125L7.50315 4.29688C7.16565 5.64375 7 6.31875 6.53435 6.78435C6.0656 7.25 5.39375 7.41565 4.04688 7.75315L2.0625 8.25L4.04688 8.74685C5.39375 9.08435 6.06875 9.25 6.53435 9.71565C7 10.1844 7.16565 10.8562 7.50315 12.2031L8 14.1875L8.49685 12.2031C8.83435 10.8562 9 10.1812 9.46565 9.71565C9.9344 9.25 10.6062 9.08435 11.9531 8.74685L13.9375 8.25L11.9531 7.75315Z'
                              fill='currentColor'
                            />
                            <path
                              d='M12.8177 2.5846C12.3687 2.4721 12.1437 2.41689 11.9885 2.26168C11.8333 2.10543 11.7781 1.88148 11.6656 1.43252L11.4999 0.771057L11.3343 1.43252C11.2218 1.88148 11.1666 2.10648 11.0114 2.26168C10.8552 2.41689 10.6312 2.4721 10.1822 2.5846L9.52077 2.75023L10.1822 2.91585C10.6312 3.02835 10.8562 3.08356 11.0114 3.23877C11.1666 3.39502 11.2218 3.61898 11.3343 4.06793L11.4999 4.72939L11.6656 4.06793C11.7781 3.61898 11.8333 3.39398 11.9885 3.23877C12.1447 3.08356 12.3687 3.02835 12.8177 2.91585L13.4791 2.75023L12.8177 2.5846Z'
                              fill='currentColor'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_4853_127528'>
                              <rect
                                width='15'
                                height='15.5'
                                fill='white'
                                transform='translate(0.5 0.250061)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </>
                  }
                />
              )}
              <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                {suggestedSkills.map((s, index) => {
                  return (
                    <AddSkillPIll
                      key={index}
                      onClickAdd={{
                        onClick: () => {
                          setFilters((pre) => {
                            const upd = cloneDeep(pre);
                            set(upd, 'skills', [...upd.skills, s]);
                            return upd;
                          });
                          setSuggestedSkills((prev) =>
                            prev.filter((sk) => sk !== s),
                          );
                        },
                      }}
                      textSKill={s}
                    />
                  );
                })}
              </Stack>
            </>
          }
        />
      }
      slotCurrentJobSuggestion={
        <>
          <SkillsGenerate
            textDescription={`Click on 'Generate' button to get suggested job titles`}
            slotGenerateSkill={
              <>
                {suggestedJobs.length === 0 && (
                  <ButtonGenerate
                    onClickGenerate={{
                      onClick: handleGenSimJobRoles,
                    }}
                    slotIcon={
                      <>
                        {isjobRolesGenerating ? (
                          <CircularProgress
                            color='inherit'
                            size={'15px'}
                            sx={{ color: 'var(--neutral-6)' }}
                          />
                        ) : (
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g clip-path='url(#clip0_4853_127528)'>
                              <path
                                d='M11.9531 7.75315C10.6062 7.41565 9.93125 7.25 9.46565 6.78435C9 6.3156 8.83435 5.64375 8.49685 4.29688L8 2.3125L7.50315 4.29688C7.16565 5.64375 7 6.31875 6.53435 6.78435C6.0656 7.25 5.39375 7.41565 4.04688 7.75315L2.0625 8.25L4.04688 8.74685C5.39375 9.08435 6.06875 9.25 6.53435 9.71565C7 10.1844 7.16565 10.8562 7.50315 12.2031L8 14.1875L8.49685 12.2031C8.83435 10.8562 9 10.1812 9.46565 9.71565C9.9344 9.25 10.6062 9.08435 11.9531 8.74685L13.9375 8.25L11.9531 7.75315Z'
                                fill='currentColor'
                              />
                              <path
                                d='M12.8177 2.5846C12.3687 2.4721 12.1437 2.41689 11.9885 2.26168C11.8333 2.10543 11.7781 1.88148 11.6656 1.43252L11.4999 0.771057L11.3343 1.43252C11.2218 1.88148 11.1666 2.10648 11.0114 2.26168C10.8552 2.41689 10.6312 2.4721 10.1822 2.5846L9.52077 2.75023L10.1822 2.91585C10.6312 3.02835 10.8562 3.08356 11.0114 3.23877C11.1666 3.39502 11.2218 3.61898 11.3343 4.06793L11.4999 4.72939L11.6656 4.06793C11.7781 3.61898 11.8333 3.39398 11.9885 3.23877C12.1447 3.08356 12.3687 3.02835 12.8177 2.91585L13.4791 2.75023L12.8177 2.5846Z'
                                fill='currentColor'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_4853_127528'>
                                <rect
                                  width='15'
                                  height='15.5'
                                  fill='white'
                                  transform='translate(0.5 0.250061)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                      </>
                    }
                  />
                )}
                <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                  {suggestedJobs.map((s, index) => {
                    return (
                      <AddSkillPIll
                        key={index}
                        onClickAdd={{
                          onClick: () => {
                            setFilters((pre) => {
                              const upd = cloneDeep(pre);
                              set(upd, 'jobTitles', [...upd.jobTitles, s]);
                              return upd;
                            });
                            setSuggestedJobs((prev) =>
                              prev.filter((sk) => sk !== s),
                            );
                          },
                        }}
                        textSKill={s}
                      />
                    );
                  })}
                </Stack>
              </>
            }
          />
        </>
      }
    />
  );
};

export default SearchFilter;
