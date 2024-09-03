import {
  type DatabaseTable,
  type DatabaseTableInsert,
  type SupabaseType,
} from '@aglint/shared-types';

import {
  removeSessionsFromFilterJson,
  removeSessionsFromRequestAvailability,
} from '@/src/components/Scheduling/ScheduleDetails/utils';

import { getOrganizerId } from './getOrganizerId';
import { resetSessionRelations } from './resetSessionRelations';

export const handleMeetingsOrganizerResetRelations = async ({
  application_id,
  supabase,
  selectedSessions,
  meeting_flow,
}: {
  application_id: string;
  supabase: SupabaseType;
  selectedSessions: {
    interview_session_id: string;
    interview_meeting_id: string;
    interview_schedule_id: string;
    job_id: string;
    recruiter_id: string;
  }[];
  meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'];
}) => {
  const selectedSessionIds = selectedSessions.map(
    (ses) => ses.interview_session_id,
  );

  const organizer_id = await getOrganizerId(application_id, supabase);

  const upsertMeetings: DatabaseTableInsert['interview_meeting'][] =
    selectedSessions.map((ses) => ({
      status: 'waiting',
      id: ses.interview_meeting_id,
      interview_schedule_id: ses.interview_schedule_id,
      organizer_id,
      meeting_flow,
      application_id,
      job_id: ses.job_id,
      recruiter_id: ses.recruiter_id,
    }));

  // Upsert meetings
  const upsertMeetingsPromise = supabase
    .from('interview_meeting')
    .upsert(upsertMeetings)
    .select()
    .throwOnError();

  const resetSessionRelationsPromise = resetSessionRelations({
    session_ids: selectedSessionIds,
    supabase,
  });

  const removeSessionsPromise =
    meeting_flow !== 'candidate_request'
      ? removeSessionsFromFilterJson({
          session_ids: selectedSessionIds,
          supabase,
        })
      : removeSessionsFromRequestAvailability({
          session_ids: selectedSessionIds,
          supabase,
        });

  const deleteSessionsPromise = supabase
    .from('interview_session_cancel')
    .delete()
    .in('session_id', selectedSessionIds)
    .throwOnError();

  const [upsertMeetingsData] = await Promise.all([
    upsertMeetingsPromise,
    resetSessionRelationsPromise,
    removeSessionsPromise,
    deleteSessionsPromise,
  ]);

  return { meetings: upsertMeetingsData.data, organizer_id };
};
