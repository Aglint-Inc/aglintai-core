import { DatabaseTable } from '@aglint/shared-types';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../trpc';

const candidatePortalSchema = z.object({ application_id: z.string().uuid() });

const updateProfileSchema = z.object({
  avatar: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  linkedin: z.string().optional(),
  timezone: z.string(),
  id: z.string(),
}) satisfies z.ZodSchema<
  Pick<
    Partial<DatabaseTable['candidates']>,
    | 'avatar'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'phone'
    | 'linkedin'
    | 'timezone'
    | 'id'
  >
>;

export const candidatePortalRouter = createTRPCRouter({
  // get interviews -------------------------------------------------------------
  get_interviews: publicProcedure
    .input(candidatePortalSchema)
    .query(async ({ ctx, input }) => {
      const { application_id } = input;

      const interviews = (
        await ctx.db
          .from('meeting_details')
          .select(
            'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id',
          )
          .eq('application_id', application_id)
          .throwOnError()
      ).data;

      if (interviews.length) {
        return await Promise.all(
          interviews.map(async (interview) => {
            const interviewers = (
              await ctx.db
                .from('meeting_interviewers')
                .select('first_name,last_name,profile_image,position')
                .eq('session_id', interview.session_id)
                .throwOnError()
            ).data;
            return {
              ...interview,
              interviewers: interviewers,
            };
          }),
        );
      }
      return [];
    }),
  // get messages ----------------------------------------------------------------
  get_messages: publicProcedure
    .input(candidatePortalSchema)
    .query(async ({ ctx, input }) => {
      const { application_id } = input;
      const company = (
        await ctx.db
          .from('applications')
          .select('candidates(recruiter(name,logo))')
          .eq('id', application_id)
          .single()
          .throwOnError()
      ).data;

      const messages = (
        await ctx.db
          .from('candidate_portal_message')
          .select(
            'id,message,created_at,message,title,type,filter_id,availability_id',
          )
          .eq('application_id', application_id)
          .throwOnError()
      ).data;

      const enrichedMessages = await Promise.all(
        messages.map(async (message) => {
          let vistedDetails: VistedDetails = {};
          if (message.type === 'availability' && message?.availability_id) {
            const res = (
              await ctx.db
                .from('candidate_request_availability')
                .select('slots,visited')
                .eq('id', message.availability_id)
                .single()
                .throwOnError()
            ).data;
            vistedDetails = {
              isNew: !res.visited,
              isSubmitted: Boolean(res.slots),
              link: `/scheduling/request-availability/${message.availability_id}`,
            };
          }
          if (message.type === 'selfSchedule' && message?.filter_id) {
            const res = (
              await ctx.db
                .from('interview_filter_json')
                .select('viewed_on,confirmed_on')
                .eq('id', message.filter_id)
                .single()
                .throwOnError()
            ).data;
            vistedDetails = {
              isNew: !res.viewed_on,
              isSubmitted: Boolean(res.confirmed_on),
              link: `/scheduling/invite/${application_id}?filter_id=${message.filter_id}`,
            };
          }

          return {
            ...message,
            ...vistedDetails,
            company_name: company.candidates.recruiter.name,
            company_logo: company.candidates.recruiter.logo,
          };
          //isNew & isSumitted for ava & self
        }),
      );

      return enrichedMessages;
    }),
  // get navbar ----------------------------------------------------------------
  get_navbar: publicProcedure
    .input(candidatePortalSchema)
    .query(async ({ ctx, input }) => {
      const { application_id } = input;
      const company = (
        await ctx.db
          .from('applications')
          .select(
            'candidates(avatar,first_name,last_name,recruiter(name,logo))',
          )
          .eq('id', application_id)
          .single()
          .throwOnError()
      ).data;
      return {
        candidate: {
          first_name: company.candidates.first_name,
          last_name: company.candidates.last_name,
          avatar: company.candidates.avatar,
        },
        company: company.candidates.recruiter,
      };
    }),
  //get profile ------------------------------------------------------------------
  get_profile: publicProcedure
    .input(candidatePortalSchema)
    .query(async ({ ctx, input }) => {
      const { application_id } = input;
      const data = (
        await ctx.db
          .from('applications')
          .select(
            'candidate_files(file_url),candidates(id,first_name,last_name,linkedin,phone,avatar,timezone,email)',
          )
          .eq('id', application_id)
          .single()
          .throwOnError()
      ).data;

      return {
        resume_url: data.candidate_files.file_url,
        ...data.candidates,
      };
    }),
  update_profile: publicProcedure
    .input(updateProfileSchema)
    .mutation(
      async ({ ctx, input: { id, ...payload } }) =>
        await ctx.db
          .from('candidates')
          .update(payload)
          .eq('id', id)
          .throwOnError(),
    ),
});

type VistedDetails =
  | {
      isNew: boolean;
      isSubmitted: boolean;
      link: string;
    }
  | {};
