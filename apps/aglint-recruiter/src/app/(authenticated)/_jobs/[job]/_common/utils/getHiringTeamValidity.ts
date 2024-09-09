import type { HiringTeamValidity, Job } from '@/jobs/types';
import { capitalizeAll } from '@/utils/text/textUtils';
import { validateString } from '@/utils/validateString';

const getTeamMessage = (invalidFields: string[]) => {
  const titles = (invalidFields ?? []).map((field) => capitalizeAll(field));
  return `${titles.join(', ').replace(/(,)(?!.*\1)/, ' and')} ${
    titles.length === 1 ? 'role is' : 'roles are'
  } not assigned`;
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
