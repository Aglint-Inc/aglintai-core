import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import CompanyInfoComp from './CompanyDetails';
import Holidays from './Holidays';
import { useCompanyDetailComp } from './hook';
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
      {/* <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold mb-2'>Company Settings</h1>
            <p className='text-sm text-gray-600'>
              All the settings for your admin.
            </p> 
          </div>
        </div>*/}

      <div className='mb-6 flex gap-6'>
        <div className='w-1/4'>
          <SettingsSubNabItem />
        </div>
        <div className='w-3/4'>
          {tab === settingSubNavItem['COMPANYINFO'] && <CompanyInfoComp />}
          {tab === settingSubNavItem['USERS'] && <TeamManagement />}
          {tab === settingSubNavItem['ROLES'] && (
            <RolesAndPermissionsComponent />
          )}
          {tab === settingSubNavItem['SCHEDULING_REASONS'] && (
            <SchedulingReasons />
          )}
          {tab === settingSubNavItem['WORKINGHOURS'] && (
            <WorkingHour
              initialData={recruiter.scheduling_settings}
              updateSettings={updateSettings}
            />
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
