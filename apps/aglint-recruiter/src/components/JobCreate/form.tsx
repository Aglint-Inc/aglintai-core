/* eslint-disable security/detect-object-injection */
import { Autocomplete, InputAdornment, Stack } from '@mui/material';
import Image from 'next/image';
import React, { FC, memo } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobDetails } from '@/src/context/JobDashboard';
import { useCompanyMembers } from '@/src/queries/company-members';
import { JobCreate } from '@/src/queries/jobs/types';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import AvatarSelectDropDown from '../Common/AvatarSelect/AvatarSelectDropDown';
import TipTapAIEditor from '../Common/TipTapAIEditor';
import UISelect from '../Common/Uiselect';
import UITextField from '../Common/UITextField';

export type JobHiringTeamForm = Pick<
  Required<Form>,
  'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
>;

export type JobDetailsForm = Required<Omit<Form, keyof JobHiringTeamForm>>;

export type Form = Partial<{
  [id in keyof Omit<JobCreate, 'jd_json' | 'description_hash'>]: {
    value: JobCreate[id];
    required: boolean;
    error: {
      value: boolean;
      helper: string;
    };
  };
}>;

export const useJobForms = (
  fields: JobMetaFormProps['fields'],
  handleChange: JobMetaFormProps['handleChange'],
) => {
  return Object.entries(fields).reduce(
    (acc, [key, value]) => {
      const safeKey = key as keyof Form;
      switch (safeKey) {
        case 'company':
          acc[safeKey] = (
            <JobCompany name={safeKey} value={value} onChange={handleChange} />
          );
          break;
        case 'department':
          acc[safeKey] = (
            <JobDepartment
              name={safeKey}
              value={value}
              onChange={handleChange}
            />
          );
          break;
        case 'description':
          acc[safeKey] = (
            <JobDescription
              name={safeKey}
              value={value}
              onChange={handleChange}
            />
          );
          break;
        case 'job_title':
          acc[safeKey] = (
            <JobTitle name={safeKey} value={value} onChange={handleChange} />
          );
          break;
        case 'job_type':
          acc[safeKey] = (
            <JobType name={safeKey} value={value} onChange={handleChange} />
          );
          break;
        case 'location':
          acc[safeKey] = (
            <JobLocation name={safeKey} value={value} onChange={handleChange} />
          );
          break;
        case 'workplace_type':
          acc[safeKey] = (
            <JobWorkPlace
              name={safeKey}
              value={value}
              onChange={handleChange}
            />
          );
          break;
        case 'hiring_manager':
        case 'recruiter':
        case 'recruiting_coordinator':
        case 'sourcer':
          acc[safeKey] = (
            <JobCoordinator
              name={safeKey}
              value={value}
              onChange={handleChange}
            />
          );
          break;
      }
      return acc;
    },
    // eslint-disable-next-line no-unused-vars
    {} as { [id in keyof typeof fields]: React.JSX.Element },
  );
};

// export const JobForms: FC<JobMetaFormProps> = ({
//   fields,
//   handleChange,
//   handleCreate = null,
// }) => {

//   const forms =

//   return (
//     <JobDetailBlock
//       slotJobForm={forms}
//       slotHiringTeamForm={roleForms}
//       slotRichtext={description}
//       textDescription={
//         !handleCreate
//           ? 'Update the job details here; changes will be saved automatically. Publish to make the updates live.'
//           : 'Enter the basic job details below.'
//       }
//       isCreate={!!handleCreate}
//       onClickCreate={{ onClick: () => !!handleCreate && handleCreate() }}
//       styleBorder={{
//         style: {
//           borderColor: fields.description.error.value
//             ? palette.red['500']
//             : palette.grey['300'],
//         },
//       }}
//       slotRichtextWarning={
//         fields.description.error.value && (
//           <Stack
//             alignItems={'center'}
//             direction={'row'}
//             color={palette.red[500]}
//           >
//             <WarningSvg />
//             {fields.description.error.helper}
//           </Stack>
//         )
//       }
//     />
//   );
// };

const JobTitle: FC<MetaForms> = memo(({ name, value, onChange }) => {
  return (
    <UITextField
      label={'Job Title'}
      name={name}
      required
      placeholder={'Ex : Software developer'}
      value={value.value as string}
      error={value.error.value}
      helperText={value.error.helper}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
JobTitle.displayName = 'JobTitle';

const JobCompany: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const { recruiter } = useAuthDetails();
  return (
    <UITextField
      label={'Company'}
      name={name}
      required
      placeholder={'Ex : Google'}
      value={value.value as string}
      error={value.error.value}
      helperText={value.error.helper}
      onChange={(e) => onChange(name, e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Image
              style={{
                borderRadius: 'var(--radius-2)',
                objectFit: 'contain',
              }}
              alt='building'
              src={`${recruiter?.logo ?? '/images/svg/Building.svg'}`}
              width={26}
              height={26}
            />
          </InputAdornment>
        ),
      }}
    />
  );
});
JobCompany.displayName = 'JobCompany';

const JobLocation: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const { recruiter } = useAuthDetails();
  const defaultAddress = ((recruiter?.office_locations ?? []) as any[]).map(
    (s) => ({
      label: [s.city, s.region, s.country].filter(Boolean).join(', '),
      value: [s.city, s.region, s.country].filter(Boolean).join(', '),
    }),
  );
  return (
    <Autocomplete
      options={defaultAddress}
      onChange={(event: any, newValue) => {
        if (!newValue || typeof newValue === 'string') return;
        onChange(name, newValue.value);
      }}
      renderInput={(params) => (
        <UITextField
          name={name}
          rest={{ ...params }}
          label='Job Location'
          required
          placeholder='Ex. San Fransisco, United States'
          error={value.error.value}
          helperText={value.error.helper}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
      defaultValue={{
        label: value.value,
        value: value.value,
      }}
      freeSolo
      disablePortal
    />
  );
});
JobLocation.displayName = 'JobLocation';

type Defaults = {
  [id in keyof Pick<Form, 'workplace_type' | 'job_type'>]: {
    value: Form[id]['value'];
    label: string;
  }[];
};

const defaults: Defaults = {
  job_type: [
    { value: 'contract', label: 'Contract' },
    { value: 'full time', label: 'Full-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'part time', label: 'Part-time' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'volunteer', label: 'Volunteer' },
  ],
  workplace_type: [
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'off site', label: 'Off-site' },
    { value: 'on site', label: 'On-site' },
  ],
};
const getOptions = (type: keyof Defaults) => {
  return defaults[type].reduce(
    (acc, { label, value }) => {
      acc.push({ name: label, value });
      return acc;
    },
    [] as { name: string; value: string }[],
  );
};

const JobType: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const options = getOptions('job_type');
  return (
    <UISelect
      label={'Job type'}
      menuOptions={options}
      value={value.value as string}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
JobType.displayName = 'JobType';

const JobDepartment: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const { recruiter } = useAuthDetails();
  const options = recruiter.departments.map((department) => ({
    name: department,
    value: department,
  }));

  return (
    <UISelect
      label={'Department'}
      menuOptions={options}
      value={value.value as string}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
JobDepartment.displayName = 'JobDepartment';

type Roles = ReturnType<typeof useCompanyMembers>['data'][number]['role'];

const roles = {
  hiring_manager: () => [...new Set<Roles>(['admin', 'hiring_manager'])],
  recruiter: () => [
    ...new Set<Roles>([
      ...roles.hiring_manager(),
      'recruiting_coordinator',
      'recruiter',
      'sourcer',
    ]),
  ],
  recruiting_coordinator: () => [...new Set<Roles>([...roles.recruiter()])],
  sourcer: () => [...new Set<Roles>([...roles.recruiter()])],
} as const as {
  // eslint-disable-next-line no-unused-vars
  [id in Roles]: () => Roles[];
};

const JobCoordinator: FC<MetaForms> = memo(({ name, onChange, value }) => {
  const { data } = useCompanyMembers();
  const options = data
    .filter(({ role }) => (roles[name] ?? (() => []))().includes(role))
    .map((c) => ({
      name: getFullName(c.first_name, c.last_name),
      value: c.user_id,
      start_icon_url: c.profile_image,
    }));
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const coordinator = data.find((c) => c.user_id === e.target.value);
    if (coordinator) onChange(name, coordinator.user_id);
  };
  return (
    <AvatarSelectDropDown
      onChange={handleChange}
      label={capitalizeAll(name)}
      menuOptions={options}
      required={value.required}
      showMenuIcons
      value={value.value}
      error={value.error.value}
      helperText={value.error.helper}
    />
  );
});
JobCoordinator.displayName = 'JobCoordinator';

const JobWorkPlace: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const options = getOptions('workplace_type');
  return (
    <UISelect
      label={'Workplace type'}
      menuOptions={options}
      value={value.value as string}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
JobWorkPlace.displayName = 'JobWorkPlace';

const JobDescription: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const { job } = useJobDetails();
  const disable = job?.scoring_criteria_loading;
  const handleToast = () => {
    if (disable)
      toast.warning(
        'This job description is currently being used for another task. Please wait.',
      );
  };
  return (
    <Stack onClick={() => handleToast()}>
      <Stack
        style={{
          opacity: job?.scoring_criteria_loading ? 0.4 : 1,
          pointerEvents: job?.scoring_criteria_loading ? 'none' : 'auto',
        }}
      >
        <TipTapAIEditor
          initialValue={value.value as string}
          handleChange={(e) => onChange(name, e)}
          placeholder='Enter job description'
          disabled={disable}
        />
      </Stack>
    </Stack>
  );
});
JobDescription.displayName = 'JobDescription';

type MetaForms = {
  name: keyof Form;
  value: Form[keyof Form];
  // eslint-disable-next-line no-unused-vars
  onChange: (name: keyof Form, value: any) => void;
};

export type JobMetaFormProps = {
  fields: Form;
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: keyof Form, value: string | number) => void;
  handleCreate?: () => void;
};

export const WarningSvg = () => {
  return (
    <GlobalIcon iconName='warning' />
    // <svg
    //   width='22'
    //   height='13px'
    //   viewBox='0 0 17 16'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M8 4C7.72386 4 7.5 4.22386 7.5 4.5V9C7.5 9.27614 7.72386 9.5 8 9.5C8.27614 9.5 8.5 9.27614 8.5 9V4.5C8.5 4.22386 8.27614 4 8 4ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM8 16C3.85786 16 0.5 12.6421 0.5 8.5C0.5 4.35786 3.85786 1 8 1C12.1421 1 15.5 4.35786 15.5 8.5C15.5 12.6421 12.1421 16 8 16ZM8 15C11.5899 15 14.5 12.0899 14.5 8.5C14.5 4.91015 11.5899 2 8 2C4.41015 2 1.5 4.91015 1.5 8.5C1.5 12.0899 4.41015 15 8 15Z'
    //     fill='#e35b66'
    //     fill-rule='evenodd'
    //   ></path>
    // </svg>
  );
};
