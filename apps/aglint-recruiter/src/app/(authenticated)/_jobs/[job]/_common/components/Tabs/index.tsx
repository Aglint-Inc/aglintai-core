/* eslint-disable security/detect-object-injection */
import { useMemo } from 'react';

import { useJob } from '@/job/hooks';

import DNDTab from './dndTab';

const Tabs = () => {
  const { job } = useJob();

  const activeSections = useMemo(
    () =>
      (
        [
          'new',
          'screening',
          'assessment',
          'interview',
          'qualified',
          'disqualified',
        ] as (keyof (typeof job)['flags'])[]
      ).filter((value) => job?.flags[value]),
    [job?.flags],
  );

  return (
    <>
      {activeSections.map((section) => (
        <DNDTab key={section} section={section} />
      ))}
    </>
  );
};

export default Tabs;
