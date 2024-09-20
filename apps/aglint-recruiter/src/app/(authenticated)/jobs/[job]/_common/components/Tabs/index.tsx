/* eslint-disable security/detect-object-injection */
import type { DatabaseTable } from '@aglint/shared-types';
import { useMemo } from 'react';

import DNDTab from './dndTab';

const Tabs = () => {
  const activeSections = useMemo(
    () =>
      [
        'new',
        'interview',
        'qualified',
        'disqualified',
      ] as DatabaseTable['applications']['status'][],
    [],
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
