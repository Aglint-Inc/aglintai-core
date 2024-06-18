import { memo, useCallback, useEffect, useMemo } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useKeyPress } from '@/src/components/JobApplicationsDashboard/hooks';
import {
  ApplicationStore,
  useApplicationStore,
} from '@/src/context/ApplicationContext/store';

const tabs: ApplicationStore['tab'][] = [
  'Details',
  // 'Screening',
  // 'Assessment',
  'Interview',
  'Tasks',
  'Activity',
];

const Tabs = memo(() => {
  const { tab, setTab, drawerOpen } = useApplicationStore(
    ({ tab, setTab, drawer }) => ({
      tab,
      setTab,
      drawerOpen: drawer.open,
    }),
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
