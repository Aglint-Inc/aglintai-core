import type { DatabaseTable } from '@aglint/shared-types';

import { SafeObject } from '@/utils/safeObject';

type Weights = DatabaseTable['public_jobs']['parameter_weights'];

export const getParameterWeights = ({
  level: _level,
  ...jd
}: DatabaseTable['public_jobs']['draft_jd_json']): Weights => {
  const weights: Weights = {
    education: jd.educations.length,
    experience: jd.rolesResponsibilities.length,
    skills: jd.skills.length,
  };
  const count = SafeObject.values(weights).filter((value) =>
    Boolean(value),
  ).length;
  const defaultWeights: Weights = {
    education: 0,
    experience: 0,
    skills: 0,
  };
  const result = SafeObject.entries(weights)
    .filter(([, value]) => Boolean(value))
    .reduce(
      (acc, [key], i) => {
        const c = Math.trunc(100 / count);
        if (i === count - 1) {
          acc.obj[key] = acc.total;
          acc.total = 0;
        } else {
          acc.obj[key] = c;
          acc.total -= c;
        }
        return acc;
      },
      {
        total: 100,
        obj: weights,
      },
    ).obj;

  return {
    ...defaultWeights,
    ...result,
  };
};
