import { Slider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { cloneDeep, set } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { CandidateFilter, JobPills } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import FilterInput from './FilterInput';
import {
  CandidateSearchState,
  initialState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import { dialogFormContent } from '../data';
import { getRelevantCndidates } from '../utils';
import AUIButton from '../../Common/AUIButton';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

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

  const handleApplyFilters = async () => {
    try {
      setIsFilterLoading(true);
      // eslint-disable-next-line no-unused-vars
      const newQueryJson = (({ profileLimit, ...o }) => o)(filters); // remove profileLimit
      // eslint-disable-next-line no-undef
      const cands = (await getRelevantCndidates(
        newQueryJson,
        jobsData.jobs.map((j) => j.id),
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
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
              <UITypography type='small' color={palette.grey[500]}>
                {dialogFormContent.skills.emptyMsg}
              </UITypography>
            </>
          )}
        </>
      }
      onClickResetFilter={{
        onClick: handleResetFilter,
      }}
    />
  );
};

export default SearchFilter;
