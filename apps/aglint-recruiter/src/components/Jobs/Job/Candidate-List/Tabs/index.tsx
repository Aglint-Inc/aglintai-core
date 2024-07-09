/* eslint-disable security/detect-object-injection */
import { useCallback, useEffect, useMemo } from 'react';

import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useJob } from '@/src/context/JobContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';

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

  const { section, setSection } = useApplications();

  const drawerOpen = useApplicationStore(({ drawer }) => drawer.open);

  const count = useMemo(() => (activeSections ?? []).length, [activeSections]);

  const handleSelectNextSection = useCallback(() => {
    if (activeSections) {
      const index = activeSections.indexOf(section);
      setSection(activeSections[(index + 1) % count]);
    }
  }, [activeSections, section, count]);

  const handleSelectPrevSection = useCallback(() => {
    if (activeSections) {
      const index = activeSections.indexOf(section);
      setSection(activeSections[index - 1 < 0 ? count - 1 : index - 1]);
    }
  }, [activeSections, section, count]);

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (!drawerOpen)
      if (left) handleSelectPrevSection();
      else if (right) handleSelectNextSection();
  }, [drawerOpen, left, right]);

  return (
    <>
      {activeSections.map((section) => (
        <DNDTab key={section} section={section} />
      ))}
    </>
  );
};

export default Tabs;
