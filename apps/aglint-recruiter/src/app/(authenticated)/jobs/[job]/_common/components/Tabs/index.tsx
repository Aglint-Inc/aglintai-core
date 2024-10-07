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
    <div className='flex flex-row gap-4'>
      {activeSections.map((section) => (
        <DNDTab key={section} section={section} />
      ))}
    </div>
  );
};

export default Tabs;
