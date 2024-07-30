import { DatabaseTable } from '@aglint/shared-types';

import {
  JobDetailsForm,
  JobHiringTeamForm,
} from '@/src/components/Jobs/Create/form';
import { Job } from '@/src/queries/jobs/types';
import { capitalizeAll } from '@/src/utils/text/textUtils';

type DetailsValidity = {
  validity: boolean;
  invalidFields: (keyof JobDetailsForm)[];
  message: string;
};

export const getDetailsValidity = (job: Job): DetailsValidity => {
  if (!job) {
    const invalidFields: DetailsValidity['invalidFields'] = [
      'company',
      'department_id',
      'description',
      'job_title',
      'job_type',
      'location',
      'workplace_type',
    ];
    const message = getMessage(invalidFields);
    return {
      validity: false,
      invalidFields,
      message,
    };
  }
  //TODO: HACK FOR BACKWARD COMPATABILITY, DELETE LATER
  const draft = {
    job_title: job.job_title,
    company: job.company,
    department: job.department_id,
    description: job.description,
    job_type: job.job_type,
    location: job.location,
    workplace_type: job.workplace_type,
    ...(job.draft ?? {}),
  };
  const result = Object.entries(draft).reduce(
    (acc, [key, value]) => {
      const safeKey = key as keyof typeof draft;
      switch (safeKey) {
        case 'description':
          {
            const valid = !validateDescription(value as string);
            if (acc.validity && !valid) acc.validity = valid;
            if (!valid) acc.invalidFields.push(safeKey);
          }
          break;
        //TODO: HACK HERE AGAIN
        case 'company':
        case 'department_id':
        case 'job_title':
        case 'job_type':
        case 'location':
        case 'workplace_type':
          {
            const valid = !validateString(value as string);
            if (acc.validity && !valid) acc.validity = valid;
            if (!valid) acc.invalidFields.push(safeKey);
          }
          break;
      }
      return acc;
    },
    { validity: true, invalidFields: [] } as DetailsValidity,
  );
  result['message'] = getMessage(result.invalidFields);
  return result;
};

const getMessage = (invalidFields: string[]) => {
  const titles = (invalidFields ?? []).map((field) => capitalizeAll(field));
  return `${titles.join(', ').replace(/(,)(?!.*\1)/, ' and')} ${
    titles.length === 1 ? 'field is' : 'fields are'
  } incomplete`;
};

const getTeamMessage = (invalidFields: string[]) => {
  const titles = (invalidFields ?? []).map((field) => capitalizeAll(field));
  return `${titles.join(', ').replace(/(,)(?!.*\1)/, ' and')} ${
    titles.length === 1 ? 'role is' : 'roles are'
  } not assigned`;
};

type HiringTeamValidity = {
  validity: boolean;
  invalidFields: (keyof Pick<
    JobHiringTeamForm,
    'hiring_manager' | 'recruiter'
  >)[];
  message: string;
};

export const getHiringTeamValidity = (job: Job): HiringTeamValidity => {
  if (!job) {
    const invalidFields: HiringTeamValidity['invalidFields'] = [
      'hiring_manager',
      'recruiter',
    ];
    const message = getTeamMessage(invalidFields);
    return {
      validity: false,
      invalidFields,
      message,
    };
  }

  //TODO: HACK FOR BACKWARD COMPATABILITY, DELETE LATER
  const draft = {
    hiring_manager: job.hiring_manager,
    recruiter: job.recruiter,
  };
  const result = Object.entries(draft).reduce(
    (acc, [key, value]) => {
      const safeKey = key as keyof typeof draft;
      switch (safeKey) {
        //TODO: HACK HERE AGAIN
        case 'hiring_manager':
        case 'recruiter':
          {
            const valid = !validateString(value as string);
            if (acc.validity && !valid) acc.validity = valid;
            if (!valid) acc.invalidFields.push(safeKey);
          }
          break;
      }
      return acc;
    },
    { validity: true, invalidFields: [] } as HiringTeamValidity,
  );
  result['message'] = getTeamMessage(result.invalidFields);
  return result;
};

export const validateJd = (
  jd_json: DatabaseTable['public_jobs']['jd_json'],
) => {
  return (
    !jd_json ||
    Object.entries(jd_json).length === 0 ||
    Object.values(jd_json).filter((a) => Array.isArray(a) && a.length !== 0)
      .length === 0
  );
};

export const validateString = (str: string | number) => {
  return (
    typeof str === 'number' ||
    !str ||
    typeof str !== 'string' ||
    str.length === 0
  );
};

export const validateDescription = (str: string) => {
  return validateString(str) || str.length < 100;
};
