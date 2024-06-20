import { supabaseWrap } from '@aglint/shared-utils';
import { Slider, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { cloneDeep, set } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { AddSkillPIll } from '@/devlink/AddSkillPIll';
import { AiIcon } from '@/devlink/AiIcon';
import { ButtonGenerate } from '@/devlink/ButtonGenerate';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateFilter } from '@/devlink/CandidateFilter';
import { JobPills } from '@/devlink/JobPills';
import { SkillsGenerate } from '@/devlink/SkillsGenerate';
import { API_FAIL_MSG } from '@/src/components/Jobs/Dashboard/JobPostCreateUpdate/utils';
import { useJobs } from '@/src/context/JobsContext';
import { similarJobs } from '@/src/utils/prompts/candidateDb/similarJobs';
import { similarSkills } from '@/src/utils/prompts/candidateDb/similarSkills';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  CandidateSearchState,
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
              min={1}
              value={filters.profileLimit}
              aria-label='Default'
              valueLabelDisplay='auto'
              sx={{
                mr: 3,
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
          <ButtonSolid
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
                        <AiIcon />
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
                          <AiIcon />
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
