import {
  type DatabaseTable,
  type DatabaseTableInsert,
  type SupabaseType,
} from '@aglint/shared-types';

import { getOrganizerId } from './getOrganizerId';

export const updateMeetingStatus = async ({
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
    job_id: string;
    recruiter_id: string;
  }[];
  meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'];
}) => {
  const organizer_id = await getOrganizerId(application_id, supabase);

  const upsertMeetings: DatabaseTableInsert['interview_meeting'][] =
    selectedSessions.map((ses) => ({
      status: 'waiting',
      id: ses.interview_meeting_id,
      organizer_id: organizer_id,
      meeting_flow,
      application_id,
      job_id: ses.job_id,
      recruiter_id: ses.recruiter_id,
    }));

  await supabase
    .from('interview_meeting')
    .upsert(upsertMeetings)
    .select()
    .throwOnError();

  return true;
};
