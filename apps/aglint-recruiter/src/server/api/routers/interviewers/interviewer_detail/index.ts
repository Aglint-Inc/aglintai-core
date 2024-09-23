import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const userSchema = z.object({ user_id: z.string().uuid() });

const query = async ({
  input: { user_id },
}: PrivateProcedure<typeof userSchema>) => {
  const db = createPrivateClient();
  const user = (
    await db
      .from('recruiter_user')
      .select(
        '*,recruiter_relation!public_recruiter_relation_user_id_fkey(created_by,manager_id,roles(name,id)),office_locations(*),departments(*)',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;

  const interview = (
    await db
      .from('all_interviewers')
      .select(
        'total_hours_this_week,total_hours_today,total_interviews_this_week,total_interviews_today',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;

  const interview_type = (
    await db
      .from('module_relations_view')
      .select(
        'module_name,completed_meeting_count,cancelled_meeting_count,confirmed_meeting_count,completed_meeting_duration',
      )
      .eq('user_id', user_id)
      .throwOnError()
  ).data;

  // --------------- meetings

  const { data: meeting_interviewers } = await db
    .from('meeting_interviewers')
    .select(
      'meeting_id,interview_session_relation(feedback,interview_session(name,interview_meeting(applications(candidates(first_name,last_name)))))',
    )
    .eq('user_id', user_id)
    .eq('is_confirmed', true)
    .throwOnError();

  const { data: all_user_meetings } = await db
    .from('meeting_details')
    .select(
      'id,session_name,session_duration,start_time,end_time,status,applications(candidates(first_name,last_name)),public_jobs(job_title)',
    )
    .in(
      'id',
      meeting_interviewers.map((i) => i.meeting_id),
    )
    .throwOnError();

  const allMeetingDetails = all_user_meetings.map((meeting) => {
    const { applications, public_jobs, ...details } = meeting;
    return {
      ...details,
      candidate: applications.candidates,
      job: public_jobs.job_title,
    };
  });

  // const feedbacks = meeting_interviewers.map(
  //   (meeting) => meeting?.interview_session_relation[0].feedback,
  // );
  const feedbacks = meeting_interviewers
    .filter((meeting) => meeting?.interview_session_relation?.[0].feedback)
    .map((meeting) => {
      const feed = meeting?.interview_session_relation?.[0];
      return {
        feedback: feed.feedback,
        session_name: feed.interview_session?.name,
        candidate:
          feed.interview_session?.interview_meeting?.applications?.candidates,
      };
    });

  // ----------------------

  const structuredData = {
    avatar: user.profile_image,
    first_name: user.first_name,
    last_name: user.last_name,
    position: user.position,
    phone: user.phone,
    email: user.email,
    empolyment: user.employment,
    Linkedin: user.linked_in,
    department: user.departments?.name,
    scheduling_settings: user.scheduling_settings,
    interview_week_today: interview,
    location: [
      user.office_locations?.city,
      user.office_locations?.region,
      user.office_locations?.country,
    ].filter((loc) => loc),
    timeZone: user.scheduling_settings?.timeZone?.tzCode,
    role: user.recruiter_relation?.[0]?.roles?.name,
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
      completed_hour: allMeetingDetails.reduce(
        (acc, cur) => acc + cur.session_duration,
        0,
      ),
    },
    interview_type,
    feedbacks: feedbacks,
    all_meetings: allMeetingDetails,
  };

  return structuredData;
};

export const getInterviewerDetails = privateProcedure
  .input(userSchema)
  .query(query);
