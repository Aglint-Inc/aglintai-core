import { Drawer as DrawerDev } from '@mui/material';
import { useMemo } from 'react';

import { Application } from '@/src/context/ApplicationContext';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplications } from '@/src/context/ApplicationsContext';
import { getActiveSection } from '@/src/context/JobsContext/hooks';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';

const Drawer = () => {
  const { isSchedulingEnabled, isScoringEnabled } = useRolesAndPermissions();

  const {
    job,
    section,
    sectionApplication,
    handleSelectPrevApplication,
    handleSelectNextApplication,
  } = useApplications();

  const {
    drawer: { open, application_id },
    handlClose,
    initialTab,
  } = useApplicationStore(({ drawer, handlClose, initialTab }) => ({
    drawer,
    handlClose,
    initialTab,
  }));

  const tabs: Parameters<typeof Application>[0]['placeholderData']['tabs'] =
    getActiveSection({
      isAssessmentEnabled: false,
      isSchedulingEnabled,
      isScoringEnabled,
      isScreeningEnabled: false,
      job,
    });

  const placeholderData = useMemo(
    () =>
      (sectionApplication?.data?.pages ?? [])
        .flatMap((page) => page)
        .find(({ id }) => id === application_id),
    [sectionApplication, application_id],
  );

  const meta: Parameters<typeof Application>[0]['placeholderData']['meta'] =
    placeholderData
      ? {
          city: placeholderData?.city,
          current_job_title: placeholderData?.current_job_title,
          email: placeholderData?.email,
          phone: placeholderData?.phone,
          resume_processing_state: placeholderData?.resume_processing_state,
          name: placeholderData?.name,
          processing_status: placeholderData?.processing_status,
          resume_score: placeholderData?.resume_score,
          badges: placeholderData?.badges,
          bookmarked: placeholderData?.bookmarked,
          file_url: placeholderData?.file_url,
          activity_count: placeholderData?.activity_count,
          task_count: placeholderData?.task_count,
          status: placeholderData?.status,
          candidate_id: placeholderData?.candidate_id,
          timezone: placeholderData?.timezone,
        }
      : undefined;

  const activity: Parameters<
    typeof Application
  >[0]['placeholderData']['activity'] =
    placeholderData?.activity_count === 0 ? [] : undefined;

  return (
    <DrawerDev open={open} onClose={() => handlClose()} anchor='right'>
      {!!application_id && (
        <Application
          application_id={application_id}
          job_id={job?.id}
          placeholderData={{
            interview: [],
            meta,
            tabs,
            activity,
          }}
          showResumePreviewActions={true}
          navigation={{
            handleUp: handleSelectPrevApplication,
            handleDown: handleSelectNextApplication,
          }}
          showTabs={true}
          defaultTab={section === 'interview' ? 'Interview' : initialTab}
        >
          <Application.Body
            topBar={
              <Application.Body.TopBar>
                <Application.Body.TopBar.Info />
                <Application.Body.TopBar.Actions />
              </Application.Body.TopBar>
            }
            meta={<Application.Body.Meta />}
            tabs={<Application.Body.Tabs />}
            details={
              <Application.Body.Details>
                <Application.Body.Details.Insights>
                  <Application.Body.Details.Insights.Badges />
                  <Application.Body.Details.Insights.Overview />
                </Application.Body.Details.Insights>
                <Application.Body.Details.Analysis
                  score={<Application.Body.Details.Analysis.Badge />}
                >
                  <Application.Body.Details.Analysis.Education />
                  <Application.Body.Details.Analysis.Experience />
                  <Application.Body.Details.Analysis.Skills />
                </Application.Body.Details.Analysis>
                <Application.Body.Details.Experience />
                <Application.Body.Details.Education />
                <Application.Body.Details.Skills />
              </Application.Body.Details>
            }
            interview={''}
          />
        </Application>
      )}
    </DrawerDev>
  );
};

export default Drawer;
