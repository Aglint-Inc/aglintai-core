/* eslint-disable security/detect-object-injection */
import { useCallback, useEffect, useMemo } from 'react';

import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import DNDTab from './dndTab';

const Tabs = () => {
  const { job } = useJob();

  const { section, changeSection } = useApplicationsStore(
    ({ section, changeSection }) => ({
      section,
      changeSection,
    }),
  );

  const drawerOpen = useApplicationStore(({ drawer }) => drawer.open);

  const count = useMemo(
    () => (job?.activeSections ?? []).length,
    [job?.activeSections],
  );

  const handleSelectNextSection = useCallback(() => {
    if (job?.activeSections) {
      const index = job.activeSections.indexOf(section);
      changeSection(job.activeSections[(index + 1) % count]);
    }
  }, [job?.activeSections, section, count]);

  const handleSelectPrevSection = useCallback(() => {
    if (job?.activeSections) {
      const index = job.activeSections.indexOf(section);
      changeSection(job.activeSections[index - 1 < 0 ? count - 1 : index - 1]);
    }
  }, [job?.activeSections, section, count]);

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (!drawerOpen)
      if (left) handleSelectPrevSection();
      else if (right) handleSelectNextSection();
  }, [drawerOpen, left, right]);

  return (
    <>
      {job.activeSections.map((section) => (
        <DNDTab key={section} section={section} />
      ))}
    </>
  );
};

export default Tabs;
