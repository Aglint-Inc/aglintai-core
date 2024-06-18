import { memo, useCallback, useEffect, useMemo } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useKeyPress } from '@/src/components/JobApplicationsDashboard/hooks';
import { useApplication } from '@/src/context/ApplicationContext';
import {
  ApplicationStore,
  useApplicationStore,
} from '@/src/context/ApplicationContext/store';
import { ApplicationsStore } from '@/src/context/ApplicationsContext/store';

const allTabs: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationStore['tab']]: ApplicationsStore['section'] | null;
} = {
  Details: null,
  Screening: 'screening',
  Assessment: 'assessment',
  Interview: 'interview',
  Tasks: 'interview',
  Activity: null,
};

const Tabs = memo(() => {
  const { tab, setTab, drawerOpen } = useApplicationStore(
    ({ tab, setTab, drawer }) => ({
      tab,
      setTab,
      drawerOpen: drawer.open,
    }),
  );

  const {
    tabs: { data },
  } = useApplication();

  const tabs = Object.entries(allTabs).reduce(
    (acc, [key, value]) => {
      const safeKey = key as ApplicationStore['tab'];
      if (!value || (data ?? []).includes(value)) acc.push(safeKey);
      return acc;
    },
    [] as ApplicationStore['tab'][],
  );

  const count = useMemo(() => (tabs ?? []).length, [tabs]);

  const handleSelectNextSection = useCallback(() => {
    if (tabs) {
      const index = tabs.indexOf(tab);
      setTab(tabs[(index + 1) % count]);
    }
  }, [tabs, count, tab]);

  const handleSelectPrevSection = useCallback(() => {
    if (tabs) {
      const index = tabs.indexOf(tab);
      setTab(tabs[index - 1 < 0 ? count - 1 : index - 1]);
    }
  }, [tabs, count, tab]);

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (drawerOpen)
      if (left) handleSelectPrevSection();
      else if (right) handleSelectNextSection();
  }, [drawerOpen, left, right]);

  const pills = useMemo(
    () =>
      tabs.map((t) => (
        <NewTabPill
          key={t}
          onClickPill={{ onClick: () => setTab(t) }}
          textLabel={t}
          isPillActive={tab === t}
        />
      )),
    [tabs, tab],
  );
  return <>{pills}</>;
});
Tabs.displayName = 'Tabs';

export { Tabs };
