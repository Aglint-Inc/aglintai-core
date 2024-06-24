import {
  InterviewMeetingTypeDb,
  PlanCombinationRespType,
  SupabaseType,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import dayjs from 'dayjs';

import {
  fetchInterviewDataJob,
  fetchInterviewDataSchedule,
} from '@/src/components/Scheduling/CandidateDetails/hooks';
import { selfScheduleMailToCandidate } from '@/src/components/Scheduling/CandidateDetails/mailUtils';
import {
  createCloneSession,
  createTask,
  getOrganizerId,
} from '@/src/components/Scheduling/CandidateDetails/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { getScheduleName } from '@/src/components/Scheduling/utils';

export const sendToCandidateWithSessionIds = async ({
  selectedApplication,
  selectedSessionIds,
  recruiter_id,
  dateRange,
  selectedSlots,
  recruiterUser,
  supabase,
}: {
  selectedApplication: {
    id: string; // application_id
    candidates: {
      email: string;
      first_name: string;
      last_name: string;
      id: string;
    };
    public_jobs: {
      job_title: string;
    };
  };
  selectedSessionIds: string[];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots: PlanCombinationRespType[];
  recruiterUser: {
    first_name: string;
    last_name: string;
    user_id: string;
  };
  supabase: SupabaseType;
}) => {
  try {
    const scheduleName = getScheduleName({
      job_title: selectedApplication.public_jobs.job_title,
      first_name: selectedApplication.candidates.first_name,
      last_name: selectedApplication.candidates.last_name,
    });
    const { data: checkSch, error: errorCheckSch } = await supabase
      .from('interview_schedule')
      .select('id')
      .eq('application_id', selectedApplication.id);

    if (errorCheckSch) throw new Error(errorCheckSch.message);

    // check if schedule is already created (if yes then sessions are cached on candidate level)
    if (checkSch.length === 0) {
      // if not then cache all the sessions on candidate level
      const sessionsWithPlan = await fetchInterviewDataJob({
        application_id: selectedApplication.id,
        supabase,
      });

      const createCloneRes = await createCloneSession({
        is_get_more_option: false,
        application_id: selectedApplication.id,
        allSessions: sessionsWithPlan.sessions,
        session_ids: selectedSessionIds,
        scheduleName: scheduleName,
        recruiter_id: recruiter_id,
        supabase: supabase,
        rec_user_id: recruiterUser.user_id,
      });

      const { data: filterJson, error: errorFilterJson } = await supabase
        .from('interview_filter_json')
        .insert({
          filter_json: {
            start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
            end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
            organizer_name: recruiterUser.first_name,
          },
          session_ids: createCloneRes.session_ids,
          schedule_id: createCloneRes.schedule.id,
          selected_options: selectedSlots.map((slot) => {
            return {
              ...slot,
              sessions: slot.sessions.map((ses) => ({
                ...ses,
                session_id: createCloneRes.refSessions.find(
                  (s) => s.id === ses.session_id,
                ).newId,
                meeting_id: createCloneRes.refSessions.find(
                  (s) => s.id === ses.session_id,
                ).interview_meeting.id,
              })),
            };
          }),
          created_by: recruiterUser.user_id,
        })
        .select();

      if (errorFilterJson) throw new Error(errorFilterJson.message);

      const resTask = await createTask({
        application_id: selectedApplication.id,
        dateRange,
        filter_id: filterJson[0].id,
        rec_user_id: recruiterUser.user_id,
        recruiter_id,
        selectedSessions: createCloneRes.refSessions.filter((ses) =>
          selectedSessionIds.includes(ses.id),
        ),
        type: 'user',
        recruiter_user_name: recruiterUser.first_name,
        candidate_name: getFullName(
          selectedApplication.candidates.first_name,
          selectedApplication.candidates.last_name,
        ),
        supabase,
      });

      addScheduleActivity({
        title: `Sent booking link to ${getFullName(selectedApplication.candidates.first_name, selectedApplication.candidates.last_name)} for ${createCloneRes.refSessions
          .filter((ses) => ses.isSelected)
          .map((ses) => ses.name)
          .join(' , ')}`,
        application_id: selectedApplication.id,
        logged_by: 'user',
        supabase,
        created_by: recruiterUser.user_id,
        task_id: resTask.id,
      });

      selfScheduleMailToCandidate({
        filter_id: filterJson[0].id,
      });
    } else {
      const organizer_id = await getOrganizerId(
        selectedApplication.id,
        supabase,
      );
      const sessionsWithPlan = await fetchInterviewDataSchedule(
        checkSch[0].id,
        selectedApplication.id,
        supabase,
      );

      const initialSessions = sessionsWithPlan.sessions;

      const upsertMeetings: InterviewMeetingTypeDb[] = initialSessions
        .filter((ses) => selectedSessionIds.includes(ses.id))
        .map((ses) => ({
          status: 'waiting',
          id: ses.interview_meeting.id,
          interview_schedule_id: ses.interview_meeting.interview_schedule_id,
          organizer_id,
        }));

      const { error: errorUpdatedMeetings } = await supabase
        .from('interview_meeting')
        .upsert(upsertMeetings);

      if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

      const { data: filterJson, error: errorFilterJson } = await supabase
        .from('interview_filter_json')
        .insert({
          filter_json: {
            start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
            end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
            organizer_name: recruiterUser.first_name,
          },
          session_ids: selectedSessionIds,
          schedule_id: checkSch[0].id,
          selected_options: selectedSlots,
          created_by: recruiterUser.user_id,
        })
        .select();

      if (errorFilterJson) throw new Error(errorFilterJson.message);

      const resTask = await createTask({
        application_id: selectedApplication.id,
        dateRange,
        filter_id: filterJson[0].id,
        rec_user_id: recruiterUser.user_id,
        recruiter_id,
        selectedSessions: initialSessions.filter((ses) =>
          selectedSessionIds.includes(ses.id),
        ),
        type: 'user',
        recruiter_user_name: recruiterUser.first_name,
        candidate_name: getFullName(
          selectedApplication.candidates.first_name,
          selectedApplication.candidates.last_name,
        ),
        supabase,
      });
      addScheduleActivity({
        title: `Candidate invited for session ${initialSessions
          .filter((ses) => selectedSessionIds.includes(ses.id))
          .map((ses) => ses.name)
          .join(' , ')}`,
        logged_by: 'user',
        application_id: selectedApplication.id,
        supabase,
        created_by: recruiterUser.user_id,
        task_id: resTask.id,
      });

      selfScheduleMailToCandidate({
        filter_id: filterJson[0].id,
      });
    }

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};
