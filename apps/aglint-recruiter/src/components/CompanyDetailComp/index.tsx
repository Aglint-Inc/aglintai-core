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
import { CheckCircle, Loader2 } from 'lucide-react';

const CompanyDetailComp = () => {
  const { recruiter } = useAuthDetails();
  const { isSaving, updateSettings, tab, setIsSaving } = useCompanyDetailComp();

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='w-64'>
        <SettingsSubNabItem />
      </div>

      {/* Content Area */}
      <div className='flex-1 overflow-y-auto'>
        {/* Auto-save Banner */}
        <div className='sticky top-0 z-10 p-2'>
          {isSaving === 'saving' && (
            <div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
              <Loader2 className='h-4 w-4 animate-spin' />
              <span>Saving changes...</span>
            </div>
          )}
          {isSaving === 'saved' && (
            <div className='flex items-center justify-center space-x-2 text-sm text-green-600'>
              <CheckCircle className='h-4 w-4' />
              <span>All changes saved</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className='w-full max-w-[1200px] mx-auto'>
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
