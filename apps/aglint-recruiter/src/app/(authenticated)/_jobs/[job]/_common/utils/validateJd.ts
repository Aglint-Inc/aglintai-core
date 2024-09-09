import { DatabaseTable } from '@aglint/shared-types';

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
