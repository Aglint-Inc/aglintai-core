import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useEffect } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

export type TabsType = 'interview' | 'candidate_stages' | 'resume' | 'scoring';

function TabsComp() {
  const router = useRouterPro();
  const tab = router.queryParams.tab as TabsType;

  const { isScoringEnabled } = useRolesAndPermissions();
  const { isShowFeature } = useAuthDetails();

  const job_id = router.params.job;
  const application_id = router.params.application;

  const allTabs = [
    {
      tab: 'scoring',
      onClick: () => {
        router.replace(
          `${ROUTES['/jobs/[job]/[application]']({
            application_id,
            job: job_id,
          })}?tab=scoring`,
        );
      },
      textLabel: 'Scoring',
      isVisible: isScoringEnabled,
    },
    {
      tab: 'resume',
      onClick: () => {
        router.replace(
          `${ROUTES['/jobs/[job]/[application]']({
            application_id,
            job: job_id,
          })}?tab=resume`,
        );
      },
      textLabel: 'Resume',
      isVisible: true,
    },
    {
      tab: 'interview',
      onClick: () => {
        router.replace(
          `${ROUTES['/jobs/[job]/[application]']({
            application_id,
            job: job_id,
          })}?tab=interview`,
        );
      },
      textLabel: 'Interview',
      isVisible: isShowFeature('SCHEDULING'),
    },
    {
      tab: 'candidate_stages',
      onClick: () => {
        router.replace(
          `${ROUTES['/jobs/[job]/[application]']({
            application_id,
            job: job_id,
          })}?tab=candidate_stages`,
        );
      },
      textLabel: 'Candidate Stages',
      isVisible: isShowFeature('CANDIDATE_PORTAL'),
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

    router.replace(
      `${ROUTES['/jobs/[job]/[application]']({
        application_id,
        job: job_id,
      })}?tab=${pre}`,
    );
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    router.replace(
      `${ROUTES['/jobs/[job]/[application]']({
        application_id,
        job: job_id,
      })}?tab=${next}`,
    );
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

  return (
    <Tabs value={allTabs.find((tabItem) => tabItem.tab === tab)?.textLabel}>
      <TabsList>
        {allTabs
          .filter((tab) => tab.isVisible)
          .map((tabItem) => (
            <>
              <TabsTrigger onClick={tabItem.onClick} value={tabItem.textLabel}>
                {tabItem.textLabel}
              </TabsTrigger>
            </>
          ))}
      </TabsList>
    </Tabs>
  );
}

export default TabsComp;
