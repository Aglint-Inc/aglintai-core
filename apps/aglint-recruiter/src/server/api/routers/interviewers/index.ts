import { getFullName } from '@aglint/shared-utils';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../trpc';

const interviewerSchema = z.object({ recruiter_id: z.string().uuid() });
const userSchema = z.object({ user_id: z.string().uuid() });

export const interviewerRouter = createTRPCRouter({
  get_all_interviewers: publicProcedure
    .input(interviewerSchema)
    .query(async ({ ctx, input }) => {
      const { recruiter_id } = input;
      const data = (
        await ctx.adminDb
          .from('all_interviewers')
          .select(
            'user_id,profile_image,first_name,last_name,departments(id,name),office_locations(id,city,region,country),scheduling_settings->timeZone->tzCode,qualified_module_names,training_module_names,completed_meeting_count,recruiter_relation!public_recruiter_relation_user_id_fkey(roles(name)),interview_module_relation(training_status,interview_module(id,name))',
          )
          .eq('recruiter_id', recruiter_id)
          .throwOnError()
      ).data;

      const stuData = data.map((d) => ({
        user_id: d.user_id,
        name: getFullName(d.first_name, d.last_name),
        role: d.recruiter_relation?.[0]?.roles?.name,
        completed_count: d.completed_meeting_count,
        avatar: d.profile_image,
        department: d.departments,
        time_zone: d.tzCode as string,
        qualified_types: d.interview_module_relation
          ?.filter((module) => module?.training_status === 'qualified')
          ?.map((module) => module?.interview_module),
        training_types: d.interview_module_relation
          ?.filter((module) => module?.training_status === 'training')
          ?.map((module) => module?.interview_module),
        location: d.office_locations,
      }));

      return stuData;
    }),
  get_user_details: publicProcedure
    .input(userSchema)
    .query(async ({ ctx, input }) => {
      const { user_id } = input;

      const user = (
        await ctx.adminDb
          .from('recruiter_user')
          .select(
            '*,recruiter_relation!public_recruiter_relation_user_id_fkey(created_by,manager_id,roles(name,id)),office_locations(*),departments(*)',
          )
          .eq('user_id', user_id)
          .single()
          .throwOnError()
      ).data;

      const interview_type = (
        await ctx.adminDb
          .from('module_relations_view')
          .select(
            'module_name,completed_meeting_count,cancelled_meeting_count,confirmed_meeting_count,completed_meeting_duration',
          )
          .eq('user_id', user_id)
          .throwOnError()
      ).data;

      // --------------- meetings

      const { data: meeting_interviewers } = await ctx.adminDb
        .from('meeting_interviewers')
        .select(
          'meeting_id,interview_session_relation(feedback,interview_session(name,interview_meeting(applications(candidates(first_name,last_name)))))',
        )
        .eq('user_id', user_id)
        .eq('is_confirmed', true)
        .throwOnError();

      const { data: all_user_meetings } = await ctx.adminDb
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
              feed.interview_session?.interview_meeting?.applications
                ?.candidates,
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
    }),
});
