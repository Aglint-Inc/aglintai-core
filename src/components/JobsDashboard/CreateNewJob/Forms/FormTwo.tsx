import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
import React from 'react';

import { NewJobStep2 } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';
import UISelect from '../../../Common/Uiselect';
import UITextField from '../../../Common/UITextField';

const workPlaceOptions = [
  {
    name: 'OnSite',
    value: 'onSite',
  },
  {
    name: 'Hybrid',
    value: 'hybrid',
  },
  {
    name: 'Remote',
    value: 'remote',
  },
];

const jobTypeOptions = [
  {
    name: 'Internship',
    value: 'internship',
  },
  {
    name: 'Part-time',
    value: 'part-time',
  },
  {
    name: 'Full-time',
    value: 'full-time',
  },
];

const FormTwo = ({ formError, setFormError }) => {
  const {
    jobForm: { formFields },
    handleUpdateFormFields,
  } = useJobForm();

  const { company, jobTitle, jobLocation, jobType, workPlaceType } = formFields;
  return (
    <>
      <NewJobStep2
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
                menuOptions={workPlaceOptions}
                onChange={(e) => {
                  handleUpdateFormFields({
                    path: 'workPlaceType',
                    value: String(e.target.value),
                  });
                }}
                value={
                  isEmpty(workPlaceType)
                    ? workPlaceOptions[0].value
                    : workPlaceType
                }
                defaultValue={
                  isEmpty(workPlaceType)
                    ? workPlaceOptions[0].value
                    : workPlaceType
                }
                fullWidth
              />
              <UITextField
                label={'Job Location'}
                defaultValue={jobLocation}
                value={jobLocation}
                onChange={(e) => {
                  setFormError((p) => ({ ...p, location: '' }));
                  handleUpdateFormFields({
                    path: 'jobLocation',
                    value: String(e.target.value),
                  });
                }}
                placeholder='Ex : San Fransisco, United States'
                error={Boolean(formError.location)}
                helperText={formError.location}
              />
              <UISelect
                label='Job Type'
                menuOptions={jobTypeOptions}
                onChange={(e) => {
                  handleUpdateFormFields({
                    path: 'jobType',
                    value: String(e.target.value),
                  });
                }}
                value={isEmpty(jobType) ? jobTypeOptions[0].value : jobType}
                fullWidth
                defaultValue={
                  isEmpty(jobType) ? jobTypeOptions[0].value : jobType
                }
              />
            </Stack>
          </>
        }
      />
    </>
  );
};

export default FormTwo;
