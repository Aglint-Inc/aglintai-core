import { Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { RecruiterType } from '@/src/types/data.types';

import { debouncedSave } from '../utils';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';

const CompanyJdComp = ({ setIsSaving }) => {
  const { recruiter, setRecruiter } = useAuthDetails();

  const handleChange = async (recruit: RecruiterType) => {
    setIsSaving(true);
    debouncedSave(recruit, recruiter.id);
    setRecruiter(recruit);
    setIsSaving(false);
  };

  return (
    <Stack p={'4px'} width={'500px'} spacing={'20px'} pb={'40px'} pt={'20px'}>
      <UITextField
        labelSize='small'
        fullWidth
        label='Company Overview'
        placeholder='Consider adding this to provide context for generating job descriptions.'
        value={recruiter?.company_overview}
        onChange={(e) => {
          handleChange({
            ...recruiter,
            company_overview: e.target.value,
          });
        }}
        multiline
        minRows={6}
        maxRows={6}
      />
      <UITextField
        labelSize='small'
        fullWidth
        label='Benefits'
        placeholder='Consider highlighting perks and advantages to enrich your job descriptions.'
        value={recruiter?.benefits}
        onChange={(e) => {
          handleChange({
            ...recruiter,
            benefits: e.target.value,
          });
        }}
        multiline
        minRows={6}
        maxRows={6}
      />
      <UITextField
        labelSize='small'
        fullWidth
        label='Equal Opportunity Statement'
        placeholder='Consider adding an inclusivity statement to enhance your job descriptions.'
        value={recruiter?.e_o_statement}
        onChange={(e) => {
          handleChange({
            ...recruiter,
            e_o_statement: e.target.value,
          });
        }}
        multiline
        minRows={6}
        maxRows={6}
      />
      <UITextField
        labelSize='small'
        fullWidth
        label='Application Process'
        placeholder='Consider detailing the steps to clarify the process for potential candidates.'
        value={recruiter?.application_process}
        onChange={(e) => {
          handleChange({
            ...recruiter,
            application_process: e.target.value,
          });
        }}
        multiline
        minRows={6}
        maxRows={6}
      />
      <UITextField
        labelSize='small'
        fullWidth
        label='Mission & Vision Statement'
        placeholder='Consider sharing your core objectives; it helps in finding the right candidate.'
        value={recruiter?.m_v_statement}
        onChange={(e) => {
          handleChange({
            ...recruiter,
            m_v_statement: e.target.value,
          });
        }}
        multiline
        minRows={6}
        maxRows={6}
      />
      <UITextField
        labelSize='small'
        fullWidth
        label='Company Values'
        placeholder='Consider listing your organizational ethos; it guides us in candidate matching.'
        value={recruiter?.company_values}
        onChange={(e) => {
          handleChange({
            ...recruiter,
            company_values: e.target.value,
          });
        }}
        multiline
        minRows={6}
        maxRows={6}
      />

      <Stack>
        <UITypography
          type={'small'}
          color={palette.grey[800]}
          fontBold='normal'
        >
          Employment Type
        </UITypography>
        <Stack
          pt={'10px'}
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='flex-start'
          gap={'10px'}
        >
          {Object.entries(recruiter?.employment_type).map((type, ind) => {
            return (
              <Stack
                key={ind}
                direction={'row'}
                p={'4px'}
                alignItems={'center'}
                spacing={'8px'}
              >
                <Checkbox
                  isChecked={Boolean(type[1])}
                  onClickCheck={{
                    onClick: () => {
                      recruiter.employment_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    },
                  }}
                />
                <Typography
                  variant='body2'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    recruiter.employment_type[type[0]] = !type[1];
                    handleChange({ ...recruiter });
                  }}
                >
                  {employmentType[type[0]]}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack>
        <UITypography
          type={'small'}
          color={palette.grey[800]}
          fontBold='normal'
        >
          Workplace Type
        </UITypography>
        <Stack
          pt={'10px'}
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='flex-start'
          gap={'10px'}
        >
          {Object.entries(recruiter?.workplace_type).map((type, ind) => {
            return (
              <Stack
                key={ind}
                direction={'row'}
                p={'4px'}
                alignItems={'center'}
                spacing={'8px'}
              >
                <Checkbox
                  isChecked={Boolean(type[1])}
                  onClickCheck={{
                    onClick: () => {
                      recruiter.workplace_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    },
                  }}
                />
                <Stack direction={'row'} spacing={'4px'}>
                  <Typography
                    variant='body2'
                    sx={{ cursor: 'pointer', color: palette.grey[800] }}
                    onClick={() => {
                      recruiter.workplace_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    }}
                  >
                    {workplaceType[type[0]][0]}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      recruiter.workplace_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    }}
                  >
                    {workplaceType[type[0]][1]}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CompanyJdComp;

const employmentType = {
  fulltime: 'Full Time',
  parttime: 'Part Time',
  contract: 'Contract',
  temporary: 'Temporary',
  volunteer: 'Volunteer',
  internship: 'Internship',
};

const workplaceType = {
  onsite: ['On Site', '(Employees come to work in person)'],
  hybrid: ['Hybrid', '(Employees work on-site and off-site)'],
  offsite: ['Off Site', '(Employees work off-site)'],
};
