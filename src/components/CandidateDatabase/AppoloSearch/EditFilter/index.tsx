import { CircularProgress, Dialog, MenuItem } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { CdEditQuerry, JobPills } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';
import { palette } from '@/src/context/Theme/Theme';

import { employeeRange, initialQuery } from '../utils';
import FilterInput from '../../Search/FilterInput';

function EditFilter({
  isfilterOpen,
  setIsFilterOpen,
  setFilters,
  filters,
  handlePillRemove,
  isFilterLoading,
  handleApplyFilters,
  handleUpdatePillInput,
}) {
  return (
    <Dialog
      open={isfilterOpen}
      fullWidth={true}
      maxWidth={'md'}
      onClose={() => {
        setIsFilterOpen(false);
      }}
    >
      <CdEditQuerry
        onClickResetQuery={{
          onClick: () => {
            setFilters(initialQuery());
          },
        }}
        slotCompanySizeInput={
          <UITextField
            select
            defaultValue={'10001'}
            onChange={(e) => {
              setFilters((p) => ({
                ...p,
                companySize: e.target.value,
              }));
            }}
          >
            {employeeRange.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.show}
              </MenuItem>
            ))}
          </UITextField>
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
        slotJobSuggestion={filters.jobTitles.map((title, index) => {
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
        slotLocationSuggestion={filters.locations.map((title, index) => {
          return (
            <JobPills
              key={index}
              onClickDelete={{
                onClick: () => {
                  handlePillRemove('locations', index);
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
              handleUpdatePillInput('jobTitles', s);
            }}
            path='jobTitles'
          />
        }
        slotLocationInput={
          <FilterInput
            handleAdd={(s) => {
              handleUpdatePillInput('locations', s);
            }}
            path='location'
          />
        }
      />
    </Dialog>
  );
}

export default EditFilter;
