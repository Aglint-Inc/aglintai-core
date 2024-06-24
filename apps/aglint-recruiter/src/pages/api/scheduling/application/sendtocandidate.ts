/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import {
  DatabaseTable,
  InterviewMeetingTypeDb,
  RecruiterUserType,
} from '@aglint/shared-types';
import { DB } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { selfScheduleMailToCandidate } from '@/src/components/Scheduling/CandidateDetails/mailUtils';
import { SchedulingFlow } from '@/src/components/Scheduling/CandidateDetails/SelfSchedulingDrawer/store';
import { SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';
import {
  createCloneSession,
  createTask,
  getOrganizerId,
  scheduleDebrief,
} from '@/src/components/Scheduling/CandidateDetails/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
// import { mailHandler } from '@/src/components/Scheduling/Candidates/utils';
import { getScheduleName } from '@/src/components/Scheduling/utils';

export interface ApiBodyParamsSendToCandidate {
  is_debrief?: boolean;
  selectedApplication: SchedulingApplication['selectedApplication'];
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: SchedulingApplication['selectedSessionIds'];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots?: SchedulingFlow['filteredSchedulingOptions'];
  selectedDebrief: SchedulingFlow['filteredSchedulingOptions'][number];
  recruiterUser: RecruiterUserType;
  user_tz: string;
  selectedApplicationLog: DatabaseTable['application_logs'];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createServerClient<DB>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[name];
          },
          set(name: string, value: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', serialize(name, value, options));
          },
          remove(name: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', serialize(name, '', options));
          },
        },
      },
    ) as any;

    const bodyParams: ApiBodyParamsSendToCandidate = req.body;

    const resSendToCandidate = await sendToCandidate({
      dateRange: bodyParams.dateRange,
      initialSessions: bodyParams.initialSessions,
      recruiter_id: bodyParams.recruiter_id,
      recruiterUser: bodyParams.recruiterUser,
      selectedDebrief: bodyParams.selectedDebrief,
      selectedApplication: bodyParams.selectedApplication,
      selectedSessionIds: bodyParams.selectedSessionIds,
      user_tz: bodyParams.user_tz,
      supabase: supabase,
      is_debrief: bodyParams.is_debrief,
      selectedApplicationLog: bodyParams.selectedApplicationLog,
      selectedSlots: bodyParams.selectedSlots,
    });

    console.log('resSendToCandidate', resSendToCandidate);

    if (resSendToCandidate) {
      res.status(200).send(true);
    } else {
      res.status(400).send(false);
    }
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;

const sendToCandidate = async ({
  is_debrief = false,
  selectedApplication,
  initialSessions,
  selectedSessionIds,
  recruiter_id,
  dateRange,
  selectedSlots,
  selectedDebrief,
  recruiterUser,
  supabase,
  user_tz,
  selectedApplicationLog,
}: {
  is_debrief?: boolean;
  selectedApplication: SchedulingApplication['selectedApplication'];
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: SchedulingApplication['selectedSessionIds'];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots: SchedulingFlow['filteredSchedulingOptions'];
  selectedDebrief: SchedulingFlow['filteredSchedulingOptions'][number];
  recruiterUser: {
    email: string;
    first_name: string;
    last_name: string;
    user_id: string;
  };
  supabase: ReturnType<typeof createServerClient<DB>>;
  user_tz: string;
  selectedApplicationLog?: DatabaseTable['application_logs'];
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
      const createCloneRes = await createCloneSession({
        is_get_more_option: false,
        application_id: selectedApplication.id,
        allSessions: initialSessions,
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

      if (!is_debrief) {
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
        //TODO: Implement new mailHandler
        // mailHandler({
        //   filter_id: filterJson[0].id,
        //   supabase,
        //   application_id: selectedApplication.id,
        //   task_id: resTask.id,
        // });
      }

      if (is_debrief && selectedDebrief) {
        await scheduleDebrief({
          selectedDebrief,
          candidate_email: selectedApplication.candidates.email,
          candidate_id: selectedApplication.candidates.id,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          filter_id: filterJson[0].id,
          recruiter_id,
          schedule_id: createCloneRes.schedule.id,
          user_tz,
          application_id: selectedApplication.id,
          initialSessions,
          selectedSessionIds,
          rec_user_id: recruiterUser.user_id,
          supabase,
        });
      }
    } else {
      const organizer_id = await getOrganizerId(
        selectedApplication.id,
        supabase,
      );
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

      if (!is_debrief) {
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
        //TODO: Implement new mailHandler
        // mailHandler({
        //   filter_id: filterJson[0].id,
        //   supabase,
        //   application_id: selectedApplication.id,
        //   task_id: resTask.id,
        // });
      }

      if (is_debrief && selectedDebrief) {
        await scheduleDebrief({
          selectedDebrief,
          candidate_email: selectedApplication.candidates.email,
          candidate_id: selectedApplication.candidates.id,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          filter_id: filterJson[0].id,
          recruiter_id,
          schedule_id: checkSch[0].id,
          user_tz,
          application_id: selectedApplication.id,
          initialSessions,
          selectedSessionIds,
          rec_user_id: recruiterUser.user_id,
          supabase,
        });
      }
    }

    if (selectedApplicationLog?.metadata?.type === 'booking_confirmation') {
      await supabase
        .from('application_logs')
        .update({
          metadata: {
            ...selectedApplicationLog.metadata,
            action: 'rescheduled',
          },
        })
        .eq('id', selectedApplicationLog.id);
      await supabase
        .from('interview_filter_json')
        .delete()
        .eq('id', selectedApplicationLog.metadata.filter_id);
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};
