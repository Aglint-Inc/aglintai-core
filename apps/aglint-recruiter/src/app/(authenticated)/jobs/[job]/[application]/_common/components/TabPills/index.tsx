import { useFlags } from '@/company/hooks/useFlags';
import UITabs from '@/components/Common/UITabs';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

export type TabsType = 'interview' | 'candidate_stages' | 'resume' | 'scoring';

function TabsComp() {
  const router = useRouterPro();
  const tab = router.queryParams.tab as TabsType;

  const { isScoringEnabled } = useRolesAndPermissions();
  const { isShowFeature } = useFlags();

  const job_id = router.params.job;
  const application_id = router.params.application;

  const allTabs = [
    {
      id: 'scoring',
      name: 'Scoring',
      isVisible: isScoringEnabled,
    },
    {
      id: 'resume',
      name: 'Resume',
      isVisible: true,
    },
    {
      id: 'interview',
      name: 'Interview',
      isVisible: isShowFeature('SCHEDULING'),
    },
    {
      id: 'candidate_stages',
      name: 'Candidate Stages',
      isVisible: isShowFeature('CANDIDATE_PORTAL'),
    },
  ].filter((tab) => tab.isVisible);

  return (
    <UITabs
      tabs={allTabs}
      defaultValue={tab || allTabs[0].id}
      onClick={(value: string) => {
        router.replace(
          `${ROUTES['/jobs/[job]/[application]']({
            application_id,
            job: job_id,
          })}?tab=` + value,
        );
      }}
    />
  );
}

export default TabsComp;
