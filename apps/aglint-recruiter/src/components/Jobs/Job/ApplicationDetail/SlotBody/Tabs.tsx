import { NewTabPill } from '@devlink3/NewTabPill';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { UITab, UITabWrapper } from '@/components/Common/UITab';
import { ArrowDownToDot } from 'lucide-react';

export type TabsType =
  | 'interview'
  | 'requests'
  | 'activity'
  | 'resume'
  | 'scoring';

function Tabs() {
  const router = useRouter();
  const tab = router.query.tab as TabsType;

  const { isScoringEnabled } = useRolesAndPermissions();

  const { job_id, application_id } = useApplication();

  const allTabs = [
    {
      tab: 'resume',
      onClick: () => {
        router.push({
          query: { tab: 'resume' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Resume',
      isVisible: true,
    },
    {
      tab: 'scoring',
      onClick: () => {
        router.push({
          query: { tab: 'scoring' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Scoring',
      isVisible: isScoringEnabled,
    },
    {
      tab: 'interview',
      onClick: () => {
        router.push({
          query: { tab: 'interview' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Interview',
      isVisible: true,
    },
    {
      tab: 'requests',
      onClick: () => {
        router.push({
          query: { tab: 'requests' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Requests',
      isVisible: true,
    },
    {
      tab: 'activity',
      onClick: () => {
        router.push({
          query: { tab: 'activity' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Activity',
      isVisible: true,
    },
  ];

  const sections = allTabs
    .filter((item) => item.isVisible)
    .map((item) => item.tab);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(tab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    const currentQuery = { ...router.query };
    currentQuery.tab = pre;
    router.replace({
      pathname: router.pathname,
      query: currentQuery,
    });
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];
    const currentQuery = { ...router.query };
    currentQuery.tab = next;
    router.replace({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

  return (
    <UITabWrapper>
      {allTabs
        .filter((tab) => tab.isVisible)
        .map((tabItem, index) => (
          <UITab
            textLabel={tabItem.textLabel}
            onClickPill={tabItem.onClick}
            isPillActive={tabItem.tab === tab}
            key={index}
          />
        ))}
    </UITabWrapper>
  );
}

export default Tabs;
