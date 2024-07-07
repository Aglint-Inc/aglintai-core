import {
  DatabaseTable,
  DatabaseTableInsert,
  SupabaseType,
} from '@aglint/shared-types';

import { SessionsType } from '@/src/components/Scheduling/CandidateDetails/types';

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
  selectedSessions: SessionsType[];
  meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'];
}) => {
  const selectedSessionIds = selectedSessions.map(
    (ses) => ses.interview_session.id,
  );

  const organizer_id = await getOrganizerId(application_id, supabase);

  const upsertMeetings: DatabaseTableInsert['interview_meeting'][] =
    selectedSessions.map((ses) => ({
      status: 'waiting',
      id: ses.interview_meeting.id,
      interview_schedule_id: ses.interview_meeting.interview_schedule_id,
      organizer_id,
      meeting_flow,
    }));

  const { data } = await supabase
    .from('interview_meeting')
    .upsert(upsertMeetings)
    .select()
    .throwOnError();

  await resetSessionRelations({
    session_ids: selectedSessionIds,
    supabase,
  });

  return { meetings: data, organizer_id };
};
