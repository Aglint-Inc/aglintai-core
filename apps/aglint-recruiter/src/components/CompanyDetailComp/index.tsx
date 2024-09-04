import { CircularProgress, Stack } from '@mui/material';

import { CompanySetting } from '@/devlink/CompanySetting';
import { SavedChanges } from '@/devlink/SavedChanges';
import LoaderGrey from '@/public/lottie/LoaderGrey';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import CompanyInfoComp from './CompanyInfoComp';
import Holidays from './Holidays';
import { useCompanyDetailComp } from './hook';
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
  const { show, isSaved, isSaving, updateSettings, tab, setIsSaving } =
    useCompanyDetailComp();

  return (
    <Stack overflow={'hidden'}>
      <CompanySetting
        slotNavSublink={<SettingsSubNabItem />}
        slotSavedChanges={
          show && (
            <SavedChanges
              slotLoaderIcon={
                <>
                  <CircularProgress
                    color='inherit'
                    size={'16px'}
                    sx={{ color: 'var(--neutral-6)' }}
                  />
                </>
              }
              isSaved={isSaving === 'saved'}
              isSaving={isSaving === 'saving'}
            />
          )
        }
        slotSavingLottie={<LoaderGrey />}
        isSaved={isSaved}
        slotCompany={
          <>
            {tab === settingSubNavItem['COMPANYINFO'] ? (
              <CompanyInfoComp />
            ) : tab === settingSubNavItem['USERS'] ? (
              <TeamManagement />
            ) : tab === settingSubNavItem['ROLES'] ? (
              <RolesAndPermissionsComponent />
            ) : tab === settingSubNavItem['SCHEDULING_REASONS'] ? (
              <SchedulingReasons />
            ) : tab === settingSubNavItem['WORKINGHOURS'] ? (
              <WorkingHour
                initialData={recruiter.scheduling_settings}
                updateSettings={updateSettings}
              />
            ) : tab === settingSubNavItem.HOLIDAYS ? (
              <Holidays />
            ) : tab === settingSubNavItem.SCHEDULING ? (
              <SchedulingSettings updateSettings={updateSettings} />
            ) : null}
            {(tab === settingSubNavItem.EMAILTEMPLATE ||
              tab == settingSubNavItem.SLACKTEMPLATE ||
              tab == settingSubNavItem.AGENTTEMPLATE ||
              tab == settingSubNavItem.CALENDERTEMPLATE) && (
              <SchedulerEmailTemps setSaving={setIsSaving} />
            )}
          </>
        }
      />
    </Stack>
  );
};

export default CompanyDetailComp;
