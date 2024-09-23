import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { useCompanyDetailComp } from '../hooks/hook';
import CompanyInfoComp from './CompanyDetails';
import Holidays from './Holidays';
import PortalSettings from './PortalSettings';
import RolesAndPermissionsComponent from './Roles';
import SchedulingSettings from './Scheduling';
import SchedulingReasons from './SchedulingReason';
import SettingsSubNabItem from './SideNav';
import { settingSubNavItem } from './SideNav/utils';
import TeamManagement from './TeamManagement';
import SchedulerEmailTemps from './Templates';
import WorkingHour from './WorkingHours';

const CompanyDetailComp = () => {
  const { recruiter } = useAuthDetails();
  const { updateSettings, tab, setIsSaving } = useCompanyDetailComp();

  return (
    <div className='container mx-auto'>
      <div className='mb-6 flex gap-6'>
        <div className='w-1/4'>
          <div className='sticky top-[32px]'>
            <SettingsSubNabItem />
          </div>
        </div>
        <div className='w-3/4'>
          {tab === settingSubNavItem['COMPANYINFO'] && <CompanyInfoComp />}
          {tab === settingSubNavItem['WORKINGHOURS'] && (
            <WorkingHour
              initialData={recruiter.scheduling_settings}
              updateSettings={updateSettings}
            />
          )}
          {tab === settingSubNavItem['USERS'] && <TeamManagement />}
          {tab === settingSubNavItem['ROLES'] && (
            <RolesAndPermissionsComponent />
          )}
          {tab === settingSubNavItem['SCHEDULING_REASONS'] && (
            <SchedulingReasons />
          )}
          {tab === settingSubNavItem.HOLIDAYS && <Holidays />}
          {tab === settingSubNavItem.SCHEDULING && (
            <SchedulingSettings updateSettings={updateSettings} />
          )}
          {tab === settingSubNavItem.PORTAL_SETTINGS && <PortalSettings />}
          {(tab === settingSubNavItem.EMAILTEMPLATE ||
            tab === settingSubNavItem.SLACKTEMPLATE ||
            tab === settingSubNavItem.AGENTTEMPLATE ||
            tab === settingSubNavItem.CALENDERTEMPLATE) && (
            <SchedulerEmailTemps setSaving={setIsSaving} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailComp;
