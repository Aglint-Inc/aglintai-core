/* eslint-disable security/detect-object-injection */
import { memo, useCallback, useEffect, useMemo } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useApplication } from '@/src/context/ApplicationContext';
import {
  type ApplicationStore,
  useApplicationStore,
} from '@/src/context/ApplicationContext/store';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import {
  ApplicationInterviewActionsProvider,
  useApplicationInterviewActions,
} from './Common/ActionsProvider';

const allTabs: ApplicationStore['tab'][] = [
  'Resume',
  'Details',
  'Screening',
  'Assessment',
  'Interview',
  'Tasks',
  'Activity',
];

const Tabs = () => {
  const { showTabs, tabs, interview, meta } = useApplication();
  if (!showTabs) return <></>;
  if (
    tabs.status === 'pending' ||
    interview.status === 'pending' ||
    meta.status === 'pending'
  )
    return <></>;
  return (
    <ApplicationInterviewActionsProvider>
      <AllTabs />
    </ApplicationInterviewActionsProvider>
  );
};

const AllTabs = memo(() => {
  const { tab, setTab, drawerOpen } = useApplicationStore(
    ({ tab, setTab, drawer }) => ({
      tab,
      setTab,
      drawerOpen: drawer.open,
    }),
  );

  const {
    tabs: { data },
    interview,
    meta,
  } = useApplication();

  const { validActions, notStartedTasks, latestActivities } =
    useApplicationInterviewActions();

  const counts: {
    // eslint-disable-next-line no-unused-vars
    [id in ApplicationStore['tab']]: number | null;
  } = useMemo(
    () => ({
      Resume: null,
      Screening: null,
      Assessment: null,
      Details: null,
      Interview: validActions.length ?? null,
      Activity: latestActivities.length ?? null,
      Tasks: notStartedTasks.length ?? null,
    }),
    [interview, meta, validActions, notStartedTasks, latestActivities],
  );

  const tabs = allTabs.reduce(
    (acc, value) => {
      if (data[value]) acc.push(value);
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
          isTabCountVisible={counts[t] !== null && counts[t] !== 0}
          tabCount={counts[t] ?? 0}
        />
      )),
    [tabs, tab],
  );
  return <>{pills}</>;
});
AllTabs.displayName = 'AllTabs';

export { Tabs };
