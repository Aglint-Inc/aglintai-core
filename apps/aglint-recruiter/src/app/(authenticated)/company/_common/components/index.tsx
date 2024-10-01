import { ScrollArea } from '@components/ui/scroll-area';

import { useRouterPro } from '@/hooks/useRouterPro';

import CompanyInfoComp from './CompanyDetails';
import Holidays from './Holidays';
import PortalSettings from './PortalSettings';
import RolesAndPermissionsComponent from './Roles';
import SchedulingSettings from './Scheduling';
import SchedulingReasons from './SchedulingReason';
import SettingsSubNabItem from './SideNav';
import type { CompanySettingTabsType } from './SideNav/utils';
import TeamManagement from './TeamManagement';
import SchedulerEmailTemps from './Templates';
import WorkingHour from './WorkingHours';

const CompanyDetailComp = () => {
  const router = useRouterPro();
  const tab = router?.queryParams?.tab as CompanySettingTabsType;
  return (
    <div className='flex p-4'>
      <div className='w-[240px]'>
        <div className='sticky top-[32px] w-full'>
          <SettingsSubNabItem />
        </div>
      </div>
      <div className='flex-1 p-4'>
        <ScrollArea>
          {tab === 'company-info' && <CompanyInfoComp />}
          {tab === 'team' && <TeamManagement />}
          {tab === 'roles' && <RolesAndPermissionsComponent />}
          {tab === 'schedulingReasons' && <SchedulingReasons />}
          {tab === 'workingHours' && <WorkingHour />}
          {tab === 'holidays' && <Holidays />}
          {tab === 'scheduling' && <SchedulingSettings />}
          {tab === 'portalSettings' && <PortalSettings />}
          {(tab === 'emailTemplate' ||
            tab === 'slackTemplate' ||
            tab === 'agentTemplate' ||
            tab === 'calenderTemplate') && <SchedulerEmailTemps />}
        </ScrollArea>
      </div>
    </div>
  );
};

export default CompanyDetailComp;
