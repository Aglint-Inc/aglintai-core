import { useMemo } from 'react';

import ScheduleProgressDev from '@/src/components/Scheduling/Common/ScheduleProgress';
import { useJob } from '@/src/context/JobContext';
import { Application } from '@/src/types/applications.types';

export const ScheduleProgress = ({
  meeting_details,
}: {
  meeting_details: Application['meeting_details'];
}) => {
  const {
    interviewPlans: { data },
  } = useJob();
  const sessions = useMemo(
    () =>
      (meeting_details ?? [])
        .sort((a, z) => a.session_order - z.session_order)
        .map(
          // eslint-disable-next-line no-unused-vars
          ({ session_order, ...session }) => session,
        ),
    [meeting_details],
  );
  const jobSessions: typeof sessions = useMemo(
    () =>
      sessions.length
        ? []
        : (data?.interview_session ?? [])
            .sort((a, z) => a.session_order - z.session_order)
            .map(
              ({
                session_duration,
                name,
                session_type,
                schedule_type,
                meeting_id,
                id,
              }) => ({
                session_duration,
                session_name: name,
                session_type,
                schedule_type,
                status: 'not_scheduled',
                meeting_id,
                session_id: id,
              }),
            ),
    [sessions, data],
  );
  return <ScheduleProgressDev sessions={[...sessions, ...jobSessions]} />;
};
