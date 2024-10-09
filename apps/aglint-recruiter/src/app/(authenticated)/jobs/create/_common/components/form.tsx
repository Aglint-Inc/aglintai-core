import { getFullName } from '@aglint/shared-utils';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { cn } from '@lib/utils';
import { UserX } from 'lucide-react';
import React, { type FC, memo } from 'react';

import { useTenant } from '@/company/hooks';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import UITextField from '@/components/Common/UITextField';
import type { Form } from '@/jobs/types';
import { useCompanyMembers } from '@/queries/company-members';
import { formatOfficeLocation } from '@/utils/formatOfficeLocation';
import { capitalizeAll } from '@/utils/text/textUtils';

export const useJobForms = (
  fields: JobMetaFormProps['fields'],
  handleChange: JobMetaFormProps['handleChange'],
) => {
  return Object.entries(fields).reduce(
    (acc, [key, value]) => {
      const safeKey = key as keyof Form;
      switch (safeKey) {
        case 'department_id':
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
        case 'location_id':
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
    {} as { [_id in keyof typeof fields]: React.JSX.Element },
  );
};

const JobTitle: FC<MetaForms> = memo(({ name, value, onChange }) => {
  return (
    <UITextField
      label={'Job Title'}
      name={name}
      required
      placeholder={value.placeholder}
      value={value.value as string}
      error={value.error.value}
      helperText={value.error.helper}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
JobTitle.displayName = 'JobTitle';

const JobCompany: FC<MetaForms> = memo(({ name, value, onChange }) => {
  return (
    <div className='relative'>
      <Input
        id={name}
        name={name}
        placeholder='Ex : Google'
        value={value.value as string}
        onChange={(e) => onChange(name, e.target.value)}
        className={cn('pl-10', value.error.value && 'border-destructive')}
      />
      <Label
        htmlFor={name}
        className='absolute left-3 top-1/2 -translate-y-1/2'
      >
        Company
      </Label>
      {value.error.value && (
        <p className='mt-1 text-sm text-destructive'>{value.error.helper}</p>
      )}
    </div>
  );
});
JobCompany.displayName = 'JobCompany';

const JobLocation: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const { recruiter } = useTenant();
  const options = (recruiter?.office_locations ?? []).map((s) => ({
    // @ts-ignore
    name: formatOfficeLocation(s),
    // TODO: fix with null checks
    value: s.id,
  }));
  return (
    <div>
      <Label htmlFor={name}>Job Location</Label>
      <Select
        onValueChange={(value) => {
          onChange(name, value);
        }}
        value={value.value as string}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a location' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
JobLocation.displayName = 'JobLocation';

type Defaults = {
  [id in keyof Pick<Form, 'workplace_type' | 'job_type'>]: {
    value: NonNullable<Form[id]>['value'];
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
  return defaults[type]!.reduce(
    (acc, { label, value }) => {
      acc.push({ name: label, value: value! });
      return acc;
    },
    [] as { name: string; value: string }[],
  );
};

const JobType: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const options = getOptions('job_type');
  return (
    <div>
      <Label htmlFor={name}>Job Type</Label>
      <Select
        onValueChange={(value) => {
          onChange(name, value);
        }}
        value={value.value as string}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a type' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
JobType.displayName = 'JobType';

const JobDepartment: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const { recruiter } = useTenant();
  const options = recruiter.departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  return (
    <div>
      <Label htmlFor={name}>Department</Label>
      <Select
        onValueChange={(value) => {
          onChange(name, value);
        }}
        value={value.value as string}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a department' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
JobDepartment.displayName = 'JobDepartment';

type Roles = NonNullable<
  ReturnType<typeof useCompanyMembers>['data']
>[number]['role'];

const roles = {
  'hiring manager': () => [...new Set<Roles>(['admin', 'hiring manager'])],
  recruiter: () => [
    ...new Set<Roles>([
      ...roles['hiring manager'](),
      'recruiting coordinator',
      'recruiter',
      'sourcer',
    ]),
  ],
  'recruiting coordinator': () => [...new Set<Roles>([...roles.recruiter()])],
  sourcer: () => [...new Set<Roles>([...roles.recruiter()])],
} as const as {
  // eslint-disable-next-line no-unused-vars
  [_id in Roles]: () => Roles[];
};

const nameToRole = (name: MetaForms['name']): Roles => {
  switch (name) {
    case 'recruiting_coordinator':
      return 'recruiting coordinator';
    case 'hiring_manager':
      return 'hiring manager';
    default:
      return name as Roles;
  }
};

export const JobCoordinator: FC<MetaForms & { label?: boolean }> = memo(
  ({ name, onChange, value, label = true }) => {
    const { data } = useCompanyMembers();
    const options = (data ?? [])
      .filter(({ role }) =>
        (roles[nameToRole(name)] ?? (() => []))().includes(role),
      )
      .map((c) => ({
        name: getFullName(c.first_name, c.last_name),
        value: c.user_id,
        start_icon_url: c.profile_image,
      }));
    if (!value.required)
      options.push({
        name: 'Unassigned',
        value: '_',
        start_icon_url: (<UserX />) as any,
      });

    const safeValue = value.value ?? '_';
    return (
      <UISelectDropDown
        onValueChange={(value) => {
          if (value === '_') onChange(name, null);
          const coordinator = (data ?? []).find((c) => c.user_id === value);
          if (coordinator) onChange(name, coordinator.user_id);
        }}
        label={label ? capitalizeAll(name) : undefined}
        menuOptions={options}
        required={value.required}
        value={safeValue.toString()}
        error={value.error.value}
        helperText={value.error.helper}
      />
    );
  },
);
JobCoordinator.displayName = 'JobCoordinator';

const JobWorkPlace: FC<MetaForms> = memo(({ name, value, onChange }) => {
  const options = getOptions('workplace_type');
  return (
    <div>
      <Label htmlFor={name}>Workplace Type</Label>
      <Select
        onValueChange={(value) => {
          onChange(name, value);
        }}
        value={value.value as string}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a type' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
JobWorkPlace.displayName = 'JobWorkPlace';

const JobDescription: FC<MetaForms> = memo(({ name, value, onChange }) => {
  return (
    <div className='max-w-3xl'>
      <div className={cn('w-full')}>
        <TipTapAIEditor
          initialValue={value.value as string}
          handleChange={(e) => onChange(name, e)}
          placeholder='Enter job description'
          disabled={false}
          height='calc(100vh - 480px)'
        />
      </div>
    </div>
  );
});
JobDescription.displayName = 'JobDescription';

type MetaForms = {
  name: keyof Form;
  value: NonNullable<Form[keyof Form]>;
  // eslint-disable-next-line no-unused-vars
  onChange: (name: keyof Form, value: any) => void;
};

export type JobMetaFormProps = {
  fields: Form;
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: keyof Form, value: string | number) => void;
  handleCreate?: () => void;
  handleCancel?: () => void;
};
