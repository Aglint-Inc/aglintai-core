import { Drawer as DrawerDev } from '@mui/material';
import { useMemo } from 'react';

import { Application } from '@/src/context/ApplicationContext';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useJob } from '@/src/context/JobContext';

const Drawer = () => {
  const {
    interviewPlans: { data: interviewPlans },
  } = useJob();

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
  } = useApplicationStore(({ drawer, handlClose }) => ({
    drawer,
    handlClose,
  }));

  const tabs: Parameters<typeof Application>[0]['placeholderData']['tabs'] =
    job?.flags;

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
        }
      : undefined;

  const activity: Parameters<
    typeof Application
  >[0]['placeholderData']['activity'] =
    placeholderData?.activity_count === 0 ? [] : undefined;

  const tasks: Parameters<typeof Application>[0]['placeholderData']['tasks'] =
    placeholderData?.activity_count === 0 ? [] : undefined;

  const sessions: Parameters<
    typeof Application
  >[0]['placeholderData']['interview'] = useMemo(
    () => placeholderData?.meeting_details ?? [],
    [placeholderData?.meeting_details],
  );

  const plans: Parameters<
    typeof Application
  >[0]['placeholderData']['interview'] = useMemo(
    () =>
      sessions.length
        ? []
        : (interviewPlans?.flatMap((item) => item.interview_session) ?? [])
            .sort((a, z) => a.session_order - z.session_order)
            .map(
              ({
                id,
                session_duration,
                name,
                session_type,
                schedule_type,
                session_order,
                meeting_id,
              }) => ({
                session_duration,
                session_name: name,
                session_type,
                schedule_type,
                status: 'not_scheduled',
                session_order,
                meeting_id,
                session_id: id,
                meeting_flow: null,
              }),
            ),
    [interviewPlans?.flatMap((item) => item.interview_session), sessions],
  );

  return (
    <DrawerDev open={open} onClose={() => handlClose()} anchor='right'>
      {!!application_id && (
        <Application
          application_id={application_id}
          job_id={job?.id}
          placeholderData={{
            interview: [...sessions, ...plans],
            meta,
            tabs,
            activity,
            tasks,
          }}
          showResumePreviewActions={true}
          navigation={{
            handleUp: handleSelectPrevApplication,
            handleDown: handleSelectNextApplication,
          }}
          showTabs={true}
          defaultTab={section === 'interview' ? 'Interview' : 'Details'}
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
            interview={<Application.Body.Interview />}
          />
        </Application>
      )}
    </DrawerDev>
  );
};

export default Drawer;
