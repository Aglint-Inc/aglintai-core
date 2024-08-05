import { Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import posthog from 'posthog-js';

import { Checkbox } from '@/devlink/Checkbox';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { ShowCode } from '../../Common/ShowCode';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { debouncedSave } from '../utils';

const CompanyJdComp = ({ setIsSaving, disabled = false }) => {
  const { recruiter, setRecruiter } = useAuthDetails();
  let isJobMarketingEnabled = posthog.isFeatureEnabled('isJobMarketingEnabled');

  const handleChange = async (
    recruit: ReturnType<typeof useAuthDetails>['recruiter'],
  ) => {
    setIsSaving('saving');
    debouncedSave(recruit, recruiter.id);
    setRecruiter({
      ...recruiter,
      departments: undefined,
      office_locations: undefined,
    });
    setTimeout(() => {
      setIsSaving('saved');
    }, 1500);
  };

  return (
    <Stack
      p={'var(--space-1)'}
      width={'500px'}
      spacing={'var(--space-5)'}
      pt={'var(--space-5)'}
    >
      <ShowCode.When isTrue={isJobMarketingEnabled}>
        <UITextField
          labelSize='small'
          fullWidth
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
      </ShowCode.When>

      <Stack>
        <UITypography
          type={'small'}
          color={'var(--neutral-12)'}
          fontBold='default'
        >
          Employment Type
        </UITypography>
        <Stack
          pt={'var(--space-2)'}
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='flex-start'
          gap={'var(--space-2)'}
        >
          {Object.entries(recruiter?.employment_type).map((type, ind) => {
            return (
              <Stack
                key={ind}
                direction={'row'}
                p={'var(--space-1)'}
                alignItems={'center'}
                spacing={'var(--space-2)'}
              >
                <Checkbox
                  isChecked={Boolean(type[1])}
                  onClickCheck={{
                    onClick: () => {
                      if (disabled) return;
                      recruiter.employment_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    },
                  }}
                />
                <Typography
                  variant='body1'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    recruiter.employment_type[type[0]] = !type[1];
                    handleChange({ ...recruiter });
                  }}
                >
                  {capitalize(employmentType[type[0]]).replaceAll(' ', '-')}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack>
        <UITypography>Workplace Type</UITypography>
        <Stack
          pt={'var(--space-2)'}
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='flex-start'
          gap={'var(--space-2)'}
        >
          {Object.entries(recruiter?.workplace_type).map((type, ind) => {
            return (
              <Stack
                key={ind}
                direction={'row'}
                p={'var(--space-1)'}
                alignItems={'center'}
                spacing={'var(--space-2)'}
              >
                <Checkbox
                  isChecked={Boolean(type[1])}
                  onClickCheck={{
                    onClick: () => {
                      if (disabled) return;
                      recruiter.workplace_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    },
                  }}
                />
                <Stack direction={'row'} spacing={'var(--space-1)'}>
                  <Typography
                    variant='body1'
                    sx={{ cursor: 'pointer', color: 'var(--neutral-12)' }}
                    onClick={() => {
                      recruiter.workplace_type[type[0]] = !type[1];
                      handleChange({ ...recruiter });
                    }}
                  >
                    {capitalize(workplaceType[type[0]][0]).replaceAll(' ', '-')}
                  </Typography>
                  <Typography
                    variant='body1'
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
  fulltime: 'Full-time',
  parttime: 'Part-time',
  contract: 'Contract',
  temporary: 'Temporary',
  volunteer: 'Volunteer',
  internship: 'Internship',
};

const workplaceType = {
  onsite: ['On-site', '(Employees come to work in person)'],
  hybrid: ['Hybrid', '(Employees work on-site and off-site)'],
  offsite: ['Off-site', '(Employees work off-site)'],
};
