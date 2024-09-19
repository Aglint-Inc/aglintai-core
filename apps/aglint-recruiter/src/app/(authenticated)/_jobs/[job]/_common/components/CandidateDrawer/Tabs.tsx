/* eslint-disable security/detect-object-injection */
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import {
  type ApplicationStore,
  useApplicationStore,
} from '@/context/ApplicationContext/store';
import { useKeyPress } from '@/hooks/useKeyPress';

import {
  ApplicationInterviewActionsProvider,
  useApplicationInterviewActions,
} from './Common/ActionsProvider';

const allTabs: ApplicationStore['tab'][] = [
  'Details',
  'Interview',
  'Tasks',
  'Activity',
];

const Tabs = () => {
  const { showTabs, tabs, meta } = useApplication();
  if (!showTabs) return <></>;
  if (tabs.status === 'pending' || meta.status === 'pending') return <></>;
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
    meta,
  } = useApplication();

  const { validActions, notStartedTasks, latestActivities } =
    useApplicationInterviewActions();

  const counts: {
    // eslint-disable-next-line no-unused-vars
    [_id in ApplicationStore['tab']]: number | null;
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
    [meta, validActions, notStartedTasks, latestActivities],
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
        <Button
          key={t}
          onClick={() => setTab(t)}
          variant={tab === t ? 'default' : 'ghost'}
          className='relative'
        >
          {t}
          {counts[t] !== null && counts[t] !== 0 && (
            <Badge
              variant='secondary'
              className='ml-2 h-5 w-5 rounded-full p-0 text-xs leading-5'
            >
              {counts[t]}
            </Badge>
          )}
        </Button>
      )),
    [tabs, tab],
  );
  return <>{pills}</>;
});
AllTabs.displayName = 'AllTabs';

export { Tabs };
