import { Slider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { cloneDeep, isNumber, set } from 'lodash';
import Image from 'next/image';
import React, { useState } from 'react';

import { CandidateFilter, JobPills } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import {
  CandidateSearchState,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import { getRelevantCndidates } from '../utils';
import AUIButton from '../../Common/AUIButton';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

type FilterType = {
  profileLimit: number;
} & CandidateSearchState['queryJson'];

const SearchFilter = ({ handleDialogClose }) => {
  const { jobsData } = useJobs();
  const { candidateSearchState, updateState } = useCandidateSearchCtx();
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
      // eslint-disable-next-line no-undef
      const cands = await getRelevantCndidates(
        newQueryJson,
        jobsData.jobs.map((j) => j.id),
      );

      updateState({
        path: 'candidates',
        value: cands,
      });
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
      slotDegreeInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('universities', [...filters.degrees, s]);
            }}
          />
        </>
      }
      slotDegreeSuggestion={filters.degrees.map((lang, index) => {
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
      slotSkillInput={
        <>
          <FilterInput
            handleAdd={(s) => {
              handleUpdate('skills', [...filters.skills, s]);
            }}
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
        </>
      }
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

export default SearchFilter;
