import { memo, useMemo } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import {
  ApplicationsStore,
  useApplicationStore,
} from '@/src/context/ApplicationContext/store';

const tabs: ApplicationsStore['tab'][] = [
  'Details',
  'Screening',
  'Assessment',
  'Interview',
  'Tasks',
  'Activity',
];

const Tabs = memo(() => {
  const { tab, setTab } = useApplicationStore(({ tab, setTab }) => ({
    tab,
    setTab,
  }));
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
