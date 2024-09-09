import { ScoreWheelParams } from '@/components/Common/ScoreWheel';
import { Job } from '@/jobs/types';

export const distributeScoreWeights = (jd_json: Job['draft']['jd_json']) => {
  const disabled = {
    experience: (jd_json?.rolesResponsibilities ?? []).length === 0,
    skills: (jd_json?.skills ?? []).length === 0,
    education: (jd_json?.educations ?? []).length === 0,
  };
  const count = Object.values(disabled).filter((v) => !v).length;
  const resets = Object.entries(disabled).reduce((acc, [key, value]) => {
    if (value) return { ...acc, [key]: 0 };
    return acc;
  }, {} as ScoreWheelParams);
  const { obj } = Object.entries(disabled)
    .filter(([, value]) => !value)
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
        obj: {} as ScoreWheelParams,
        total: 100,
      },
    );
  return { ...resets, ...obj };
};
