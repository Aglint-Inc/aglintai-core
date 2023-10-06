import { Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import Image from 'next/image';
import React from 'react';

import { NewJobStep1 } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';
import UISelect from '../../../Common/Uiselect';
import UITextField from '../../../Common/UITextField';
const BasicStepOne = ({ formError, setFormError }) => {
  const {
    jobForm: { formFields, formType },
    handleUpdateFormFields,
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

  return (
    <>
      <NewJobStep1
        slotForm={
          <>
            <Stack p={1} rowGap={2} component={'form'}>
              <Grid container spacing={2}>
                <Grid item spacing={2} sm={formType === 'new' ? 12 : 6}>
                  <UITextField
                    label={'Job Title'}
                    defaultValue={jobTitle}
                    value={jobTitle}
                    onChange={(e) => {
                      setFormError((p) => ({ ...p, jobTitle: '' }));
                      handleUpdateFormFields({
                        path: 'jobTitle',
                        value: String(e.target.value),
                      });
                    }}
                    error={Boolean(formError.jobTitle)}
                    disabled={formType === 'edit'}
                    helperText={formError.jobTitle}
                    placeholder='Ex : Software developer'
                  />
                </Grid>
                <Grid item spacing={2} sm={formType === 'new' ? 12 : 6}>
                  <UITextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Image
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
                    error={Boolean(formError.company)}
                    helperText={formError.company}
                    label={'Company'}
                    defaultValue={company}
                    value={company}
                    onChange={(e) => {
                      setFormError((p) => ({ ...p, company: '' }));
                      handleUpdateFormFields({
                        path: 'company',
                        value: String(e.target.value),
                      });
                    }}
                    placeholder='Ex: Google'
                  />
                </Grid>

                <Grid item spacing={2} sm={formType === 'new' ? 12 : 6}>
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
                <Grid item spacing={2} sm={formType === 'new' ? 12 : 6}>
                  <Autocomplete
                    options={defaultDepartments}
                    onChange={(event: any, newValue) => {
                      if (!newValue) return;
                      setFormError((p) => ({ ...p, department: '' }));
                      handleUpdateFormFields({
                        path: 'department',
                        value: get(newValue, 'value'),
                      });
                    }}
                    renderInput={(params) => (
                      <UITextField
                        rest={{ ...params }}
                        label='Department '
                        placeholder='Ex : Marketing'
                        onChange={(e) => {
                          setFormError((p) => ({ ...p, department: '' }));
                          handleUpdateFormFields({
                            path: 'department',
                            value: String(e.target.value),
                          });
                        }}
                        error={Boolean(formError.department)}
                        helperText={formError.department}
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
                <Grid item spacing={2} sm={formType === 'new' ? 12 : 6}>
                  <Autocomplete
                    options={defaultAddress}
                    onChange={(event: any, newValue) => {
                      if (!newValue) return;
                      setFormError((p) => ({ ...p, location: '' }));
                      handleUpdateFormFields({
                        path: 'jobLocation',
                        value: get(newValue, 'value'),
                      });
                    }}
                    renderInput={(params) => (
                      <UITextField
                        rest={{ ...params }}
                        label='Job Location'
                        placeholder='Ex : San Fransisco, United States'
                        onChange={(e) => {
                          setFormError((p) => ({ ...p, location: '' }));
                          handleUpdateFormFields({
                            path: 'jobLocation',
                            value: String(e.target.value),
                          });
                        }}
                        error={Boolean(formError.location)}
                        helperText={formError.location}
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

                <Grid item spacing={2} sm={formType === 'new' ? 12 : 6}>
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
            </Stack>
          </>
        }
        isJobHeaderVisible={formType === 'new'}
      />
    </>
  );
};

export default BasicStepOne;
