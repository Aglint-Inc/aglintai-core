import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { useCompanyDetailComp } from '../hooks/hook';
import CompanyInfoComp from './CompanyDetails';
import Holidays from './Holidays';
import PortalSettings from './PortalSettings';
import RolesAndPermissionsComponent from './Roles';
import SchedulingSettings from './Scheduling';
import SchedulingReasons from './SchedulingReason';
import SettingsSubNabItem from './SideNav';
import type { companySettingTabsType } from './SideNav/utils';
import TeamManagement from './TeamManagement';
import SchedulerEmailTemps from './Templates';
import WorkingHour from './WorkingHours';

const CompanyDetailComp = () => {
  const { recruiter } = useAuthDetails();
  const { updateSettings, tab: tempTab, setIsSaving } = useCompanyDetailComp();
  const tab = tempTab as unknown as companySettingTabsType;
  return (
    <div className='container mx-auto'>
      <div className='mb-6 flex gap-6'>
        <div className='w-1/5'>
          <div className='sticky top-[32px]'>
            <SettingsSubNabItem />
          </div>
        </div>
        <div className='w-3/4'>
          {tab === 'company-info' && <CompanyInfoComp />}
          {tab === 'team' && <TeamManagement />}
          {tab === 'roles' && <RolesAndPermissionsComponent />}
          {tab === 'schedulingReasons' && <SchedulingReasons />}
          {tab === 'workingHours' && (
            <WorkingHour
              initialData={recruiter.scheduling_settings}
              updateSettings={updateSettings}
            />
          )}
          {tab === 'holidays' && <Holidays />}
          {tab === 'scheduling' && (
            <SchedulingSettings updateSettings={updateSettings} />
          )}
          {tab === 'portalSettings' && <PortalSettings />}
          {(tab === 'emailTemplate' ||
            tab === 'slackTemplate' ||
            tab === 'agentTemplate' ||
            tab === 'calenderTemplate') && (
            <SchedulerEmailTemps setSaving={setIsSaving} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailComp;
