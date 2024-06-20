import { Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { get } from 'lodash';
import Image from 'next/image';
import React from 'react';

import { JobEditWarning } from '@/devlink/JobEditWarning';
import { JobWarningList } from '@/devlink/JobWarningList';
import { NewJobStep1 } from '@/devlink/NewJobStep1';

import UISelect from '../../../../Common/Uiselect';
import UITextField from '../../../../Common/UITextField';
import { useJobForm } from '../JobPostFormProvider';
import { isShoWWarn, slidePathToNum } from '../utils';
const BasicStepOne = () => {
  const {
    jobForm: { formFields, formType, jobPostId },
    handleUpdateFormFields,
    formWarnings,
  } = useJobForm();

  const {
    company,
    jobTitle,
    jobLocation,
    department,
    jobType,
    workPlaceType,
    defaultWorkPlaceTypes,
    defaultJobType,
    defaultAddress,
    defaultDepartments,
  } = formFields;

  const isShowWarn = isShoWWarn(
    formType,
    formWarnings,
    'details',
    slidePathToNum['details'],
    jobPostId,
  );

  return (
    <>
      <NewJobStep1
        isWarningVisible={isShowWarn}
        slotWarning={
          <>
            {formWarnings.details.err.length !== 0 && (
              <JobEditWarning
                slotWarningList={
                  <>
                    {formWarnings.details.err.map((er, index) => (
                      <JobWarningList key={index} textWarning={er} />
                    ))}
                  </>
                }
              />
            )}
          </>
        }
        slotForm={
          <>
            <Grid container spacing={2}>
              <Grid item spacing={2} sm={6}>
                <UITextField
                  label={'Job Title'}
                  defaultValue={jobTitle}
                  value={jobTitle}
                  onChange={(e) => {
                    handleUpdateFormFields({
                      path: 'jobTitle',
                      value: String(e.target.value),
                    });
                  }}
                  placeholder='Ex. Software developer'
                />
              </Grid>
              <Grid item spacing={2} sm={6}>
                <UITextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          style={{
                            borderRadius: 'var(--radius-2)',
                            objectFit: 'contain',
                          }}
                          alt='building'
                          src={`${
                            formFields.logo
                              ? formFields.logo
                              : '/images/svg/Building.svg'
                          }`}
                          width={26}
                          height={26}
                        />
                      </InputAdornment>
                    ),
                  }}
                  label={'Company'}
                  defaultValue={company}
                  value={company}
                  onChange={(e) => {
                    handleUpdateFormFields({
                      path: 'company',
                      value: String(e.target.value),
                    });
                  }}
                  placeholder='Ex: Google'
                />
              </Grid>

              <Grid item spacing={2} sm={6}>
                <UISelect
                  label='Workplace Type'
                  menuOptions={defaultWorkPlaceTypes}
                  onChange={(e) => {
                    handleUpdateFormFields({
                      path: 'workPlaceType',
                      value: String(e.target.value),
                    });
                  }}
                  value={workPlaceType}
                  defaultValue={workPlaceType}
                  fullWidth
                />
              </Grid>
              <Grid item spacing={2} sm={6}>
                <Autocomplete
                  options={defaultDepartments}
                  onChange={(event: any, newValue) => {
                    if (!newValue) return;
                    handleUpdateFormFields({
                      path: 'department',
                      value: get(newValue, 'value', event.target.value),
                    });
                  }}
                  renderInput={(params) => (
                    <UITextField
                      rest={{ ...params }}
                      label='Department (Optional) '
                      placeholder='Ex. Marketing'
                      onChange={(e) => {
                        handleUpdateFormFields({
                          path: 'department',
                          value: String(e.target.value),
                        });
                      }}
                    />
                  )}
                  defaultValue={{
                    label: department,
                    value: department,
                  }}
                  freeSolo
                  disablePortal
                />
              </Grid>
              <Grid item spacing={2} sm={6}>
                <Autocomplete
                  options={defaultAddress}
                  onChange={(event: any, newValue) => {
                    if (!newValue) return;
                    handleUpdateFormFields({
                      path: 'jobLocation',
                      value: get(newValue, 'value', event.target.value),
                    });
                  }}
                  renderInput={(params) => (
                    <UITextField
                      rest={{ ...params }}
                      label='Job Location'
                      placeholder='Ex. San Fransisco, United States'
                      onChange={(e) => {
                        handleUpdateFormFields({
                          path: 'jobLocation',
                          value: String(e.target.value),
                        });
                      }}
                    />
                  )}
                  defaultValue={{
                    label: jobLocation,
                    value: jobLocation,
                  }}
                  freeSolo
                  disablePortal
                />
              </Grid>

              <Grid item spacing={2} sm={6}>
                <UISelect
                  label='Job Type'
                  menuOptions={defaultJobType}
                  onChange={(e) => {
                    handleUpdateFormFields({
                      path: 'jobType',
                      value: String(e.target.value),
                    });
                  }}
                  value={jobType}
                  fullWidth
                  defaultValue={jobType}
                />
              </Grid>
            </Grid>
            {/* </Stack> */}
          </>
        }
        isJobHeaderVisible={formType === 'new'}
        isAddJob={formType === 'new'}
      />
    </>
  );
};

export default BasicStepOne;
