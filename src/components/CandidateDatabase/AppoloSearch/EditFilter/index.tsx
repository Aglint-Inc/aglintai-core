import {
  Autocomplete,
  CircularProgress,
  Dialog,
  Paper,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CdEditQuerry, JobPills } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';
import { palette } from '@/src/context/Theme/Theme';
import { useBoundStore } from '@/src/store';

import { employeeRange, initialQuery } from '../utils';
import FilterInput from '../../Search/FilterInput';

function EditFilter({
  handlePillRemove,
  handleApplyFilters,
  handleUpdatePillInput,
}) {
  const isfilterOpen = useBoundStore((state) => state.isfilterOpen);
  const setIsFilterOpen = useBoundStore((state) => state.setIsFilterOpen);
  const filters = useBoundStore((state) => state.filters);
  const setFilters = useBoundStore((state) => state.setFilters);
  const isFilterLoading = useBoundStore((state) => state.isFilterLoading);
  const [value, setValue] = useState([]);

  const handleDelete = (index) => {
    setValue(value.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (filters?.person_seniorities) {
      setValue(
        employeeRange.filter((v) =>
          filters.person_seniorities.includes(v.value),
        ),
      );
    }
  }, [filters?.person_seniorities]);

  return (
    <Dialog
      open={isfilterOpen}
      fullWidth={true}
      maxWidth={'md'}
      onClose={() => {
        setIsFilterOpen(false);
      }}
    >
      <Paper></Paper>
      <CdEditQuerry
        onClickResetQuery={{
          onClick: () => {
            setFilters(initialQuery());
          },
        }}
        slotSeniorityInput={
          <>
            <Autocomplete
              multiple
              id='tags-standard'
              options={employeeRange}
              getOptionLabel={(option) => option.display_name}
              value={value}
              onChange={(event, value) => {
                if (value) {
                  setValue(value);
                  setFilters({
                    ...filters,
                    person_seniorities: value.map((v) => v.value),
                  });
                }
              }}
              renderInput={(params) => (
                <UITextField
                  rest={{ ...params }}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                  }}
                  placeholder='Choose mutiple seniorities from the list'
                />
              )}
              renderTags={(value) =>
                value.map((option, index) => (
                  <Stack key={index} pl={'4px'}>
                    <JobPills
                      onClickDelete={{
                        onClick: () => {
                          handleDelete(index);
                          setFilters({
                            ...filters,
                            person_seniorities:
                              filters.person_seniorities.filter(
                                (v) => v !== option.value,
                              ),
                          });
                        },
                      }}
                      textJob={option.display_name}
                    />
                  </Stack>
                ))
              }
            />
          </>
        }
        slotPreferredCompanySuggestion={filters.companies.map(
          (title, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('companies', index);
                  },
                }}
                textJob={title}
              />
            );
          },
        )}
        slotJobSuggestion={filters.person_titles.map((title, index) => {
          return (
            <JobPills
              key={index}
              onClickDelete={{
                onClick: () => {
                  handlePillRemove('person_titles', index);
                },
              }}
              textJob={title}
            />
          );
        })}
        slotLocationSuggestion={filters.person_locations.map((title, index) => {
          return (
            <JobPills
              key={index}
              onClickDelete={{
                onClick: () => {
                  handlePillRemove('person_locations', index);
                },
              }}
              textJob={title}
            />
          );
        })}
        slotApplyFilterButton={
          <>
            <AUIButton
              variant='primary'
              size='small'
              onClick={() => {
                !isFilterLoading && handleApplyFilters();
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
                <p> Apply </p>
              </div>
            </AUIButton>
          </>
        }
        slotPreferredCompaniesInput={
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('companies', s);
            }}
            path='excludedCompanies'
          />
        }
        slotJobInput={
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('person_titles', s);
            }}
            path='jobTitles'
          />
        }
        slotLocationInput={
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('person_locations', s);
            }}
            path='location'
          />
        }
      />
    </Dialog>
  );
}

export default EditFilter;
