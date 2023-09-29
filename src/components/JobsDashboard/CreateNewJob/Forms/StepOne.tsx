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
const StepOne = ({ formError, setFormError }) => {
  const {
    jobForm: { formFields },
    handleUpdateFormFields,
  } = useJobForm();

  const {
    company,
    jobTitle,
    jobLocation,
    jobType,
    workPlaceType,
    defaultWorkPlaceTypes,
    defaultJobType,
    defaultAddress,
  } = formFields;

  return (
    <>
      <NewJobStep1
        slotForm={
          <>
            <Stack p={1} rowGap={2} component={'form'}>
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
                helperText={formError.jobTitle}
                placeholder='Ex : Software developer'
              />
              <UITextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Image
                        alt='building'
                        src={'/images/svg/Building.svg'}
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
              <Autocomplete
                options={defaultAddress}
                onChange={(event: any, newValue) => {
                  if (!newValue) return;
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
            </Stack>
          </>
        }
      />
    </>
  );
};

export default StepOne;
