import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const userSchema = z.object({ user_id: z.string().uuid() });

const query = async ({
  input: { user_id },
}: PublicProcedure<typeof userSchema>) => {
  const db = createPublicClient();

  const [res1, res2, res3, res4] = await Promise.all([
    db
      .from('recruiter_user')
      .select(
        '*,recruiter_relation!public_recruiter_relation_user_id_fkey(created_by,manager_id,roles(name,id)),office_locations(*),departments(*)',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError(),

    db
      .from('all_interviewers')
      .select(
        'total_hours_this_week,total_hours_today,total_interviews_this_week,total_interviews_today',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError(),

    db
      .from('module_relations_view')
      .select(
        'module_name,completed_meeting_count,cancelled_meeting_count,confirmed_meeting_count,completed_meeting_duration',
      )
      .eq('user_id', user_id)
      .throwOnError(),

    db
      .from('meeting_interviewers')
      .select(
        'meeting_id,interview_session_relation(feedback,interview_session(name,interview_meeting(applications(candidates(first_name,last_name)))))',
      )
      .eq('user_id', user_id)
      .eq('is_confirmed', true)
      .throwOnError(),
  ]);
  const user = res1.data;
  const interview = res2.data;
  const interview_type = res3.data;
  const meeting_interviewers = res4.data;

  if (!user || !interview || !interview_type || !meeting_interviewers)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Interviewer detail fetch failed',
    });

  const newinterview = {
    total_hours_this_week: interview?.total_hours_this_week ?? 0,
    total_hours_today: interview?.total_hours_today ?? 0,
    total_interviews_this_week: interview?.total_interviews_this_week ?? 0,
    total_interviews_today: interview?.total_interviews_today ?? 0,
  };

  const meeting_ids = meeting_interviewers?.map(
    (i) => i.meeting_id,
  ) as string[];

  const all_user_meetings = (
    await db
      .from('meeting_details')
      .select(
        'id,session_name,session_duration,start_time,end_time,status,applications(candidates(first_name,last_name)),public_jobs(job_title)',
      )
      .in('id', meeting_ids)
      .throwOnError()
  ).data;

  const allMeetingDetails = all_user_meetings?.map((meeting) => {
    const { applications, public_jobs, ...details } = meeting;
    return {
      ...details,
      candidate: applications?.candidates,
      job: public_jobs?.job_title,
    };
  });

  const feedbacks = meeting_interviewers?.length
    ? meeting_interviewers
        .filter((meeting) => meeting?.interview_session_relation?.[0].feedback)
        .map((meeting) => {
          const feed = meeting?.interview_session_relation?.[0];
          const candidate =
            feed.interview_session?.interview_meeting?.applications?.candidates;
          return {
            feedback: feed.feedback,
            session_name: feed.interview_session?.name ?? '',
            candidate: {
              first_name: candidate?.first_name ?? '',
              last_name: candidate?.last_name ?? '',
            },
          };
        })
    : [];

  // ----------------------

  const structuredData = {
    first_name: user.first_name,
    email: user.email,
    empolyment: user.employment,
    user_id: user.user_id,
    schedule_auth: user.schedule_auth,
    avatar: user.profile_image ?? '',
    last_name: user.last_name ?? '',
    position: user.position ?? '',
    phone: user.phone ?? '',
    Linkedin: user.linked_in ?? '',
    department: user.departments?.name ?? '',
    scheduling_settings: user.scheduling_settings,
    linked_in: user.linked_in,
    office_location_id: user?.office_locations?.id || null,
    employment: user?.employment,
    profile_image: user.profile_image,
    department_id: user.departments?.id || null,
    is_calendar_connected: user.is_calendar_connected,
    role_id: user?.recruiter_relation?.[0]?.roles?.id || null,
    manager_id: user?.recruiter_relation?.[0]?.manager_id || null,
    role: user?.recruiter_relation?.[0]?.roles?.name ?? '',

    location: [
      user?.office_locations?.city,
      user?.office_locations?.region,
      user?.office_locations?.country,
    ]
      .filter((loc) => loc)
      .join(', '),
    timeZone: user?.scheduling_settings?.timeZone?.tzCode,
    meeting_count: {
      completed:
        allMeetingDetails?.filter((meet) => meet.status === 'completed')
          ?.length || 0,
      upcoming:
        allMeetingDetails?.filter((meet) => meet.status === 'confirmed')
          ?.length || 0,
      cancelled:
        allMeetingDetails?.filter((meet) => meet.status === 'cancelled')
          ?.length || 0,
      completed_hour: allMeetingDetails?.length
        ? allMeetingDetails.reduce((acc, cur) => {
            const sessionDuration = cur?.session_duration as number;
            return acc + sessionDuration;
          }, 0)
        : 0,
    },
    interview_type: interview_type ?? [],
    feedbacks: feedbacks,
    interview_week_today: newinterview,
    all_meetings: allMeetingDetails,
  };

  return structuredData;
};

export const getInterviewerDetails = publicProcedure
  .input(userSchema)
  .query(query);

export type GetInterviewerDetails = ProcedureDefinition<
  typeof getInterviewerDetails
>;
