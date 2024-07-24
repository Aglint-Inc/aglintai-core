import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';

import ScheduleIndividualCard from '../../FullSchedule/ScheduleIndividual';
import { SchedulingApplication, useSchedulingApplicationStore } from '../../store';

function RescheduleSlot() {
  const { initialSessions, selectedApplication, rescheduleSessionIds } =
    useSchedulingApplicationStore((state) => ({
      initialSessions: state.initialSessions,
      selectedApplication: state.selectedApplication,
      rescheduleSessionIds: state.rescheduleSessionIds,
    }));

  let selectedSessions: SchedulingApplication['initialSessions'] = [];

  selectedSessions = initialSessions.filter((ses) =>
    rescheduleSessionIds?.includes(ses.interview_session.id),
  );

  return (
    <Stack spacing={'var(--space-2)'} padding={'var(--space-4)'}>
      {selectedSessions.map((ses) => {
        return (
          <ScheduleIndividualCard
            key={ses.interview_session.id}
            isCheckboxVisible={false}
            selectedSessionIds={rescheduleSessionIds}
            candidate={{
              currentJobTitle: selectedApplication.candidates.current_job_title,
              fullname: getFullName(
                selectedApplication.candidates.first_name,
                selectedApplication.candidates.last_name,
              ),
              timezone: selectedApplication.candidates.timezone,
            }}
            interview_meeting={{
              end_time: ses.interview_meeting.end_time,
              id: ses.interview_meeting.id,
              start_time: ses.interview_meeting.start_time,
              status: ses.interview_meeting.status,
              meeting_flow: ses.interview_meeting.meeting_flow,
            }}
            interview_session={{
              break_duration: ses.interview_session.break_duration,
              id: ses.interview_session.id,
              name: ses.interview_session.name,
              schedule_type: ses.interview_session.schedule_type,
              session_duration: ses.interview_session.session_duration,
              session_type: ses.interview_session.session_type,
            }}
            jobTitle={selectedApplication.public_jobs.job_title}
            isCollapseNeeded={true}
            isEditIconVisible={false}
            gridStyle='1fr 1.7fr 0fr'
            users={ses.users}
            currentSession={ses}
          />
        );
      })}
    </Stack>
  );
}

export default RescheduleSlot;
