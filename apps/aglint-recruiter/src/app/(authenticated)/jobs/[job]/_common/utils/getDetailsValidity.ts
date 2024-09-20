import type { Job, JobDetailsForm } from '@/jobs/types';
import { capitalizeAll } from '@/utils/text/textUtils';
import { validateString } from '@/utils/validateString';

import { validateDescription } from './validateDescription';

type DetailsValidity = {
  validity: boolean;
  invalidFields: (keyof JobDetailsForm)[];
  message: string;
};

export const getDetailsValidity = (job: Job): DetailsValidity => {
  if (!job) {
    const invalidFields: DetailsValidity['invalidFields'] = [
      'department_id',
      'description',
      'job_title',
      'job_type',
      'location_id',
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
    department: job.department_id,
    description: job.description,
    job_type: job.job_type,
    location_id: job.location_id,
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
        case 'department_id':
        case 'job_title':
        case 'job_type':
        case 'location_id':
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
