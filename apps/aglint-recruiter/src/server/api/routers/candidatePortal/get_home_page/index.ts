import { type Database } from '@aglint/shared-types/src/db/schema.types';
import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  application_id: z.string().uuid(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { application_id } = input;

  const db = createPublicClient();

  // utils functions ----------------------------------------------

  const getScheudleSessionDetails = async (session_ids: string[]) => {
    const { data: scheduleSession } = await db
      .from('interview_session')
      .select(
        'name,session_duration,interview_meeting!inner(start_time,end_time)',
      )
      .in('id', session_ids)
      .throwOnError();

    const scheduleSessions = (scheduleSession || [])?.map((scheSess) => ({
      name: scheSess.name,
      duration: scheSess.session_duration,
      start_time: scheSess?.interview_meeting?.start_time,
      end_time: scheSess?.interview_meeting?.end_time,
    }));
    return scheduleSessions;
  };

  const getAvailabilitySessionDetails = async (availability_id: string) => {
    const { data: availabilitySess } = await db
      .from('request_session_relation')
      .select(
        'interview_session(name,session_duration,interview_meeting(start_time,end_time))',
      )
      .eq('request_availability_id', availability_id)
      .throwOnError();

    return availabilitySess?.map((avaSess) => {
      const { interview_session } = avaSess;
      return {
        name: interview_session?.name,
        duration: interview_session?.session_duration,
        start_time: interview_session?.interview_meeting?.start_time,
        end_time: interview_session?.interview_meeting?.end_time,
      };
    });
  };

  //  ---------------------------------- meeting

  const getMeetings = async (application_id: string) => {
    const interviews = await getInterviews(application_id);

    if (interviews?.length) {
      const data = await Promise.all(
        interviews.map(async (interview) => {
          const interviewers = await getInterviewers(
            interview?.session_id || '',
          );
          const meetingLink = await getMeetingLink(
            interview.meeting_flow,
            interview?.schedule_request_id || '',
          );
          return {
            ...interview,
            meeting_detail_link: meetingLink,
            interviewers: interviewers,
          };
        }),
      );
      return data;
    }
  };

  const getMeetingLink = async (
    type: Database['public']['Views']['meeting_details']['Row']['meeting_flow'],
    request_id: string,
  ) => {
    if (type === 'candidate_request') {
      const { data } = await db
        .from('candidate_request_availability')
        .select('id')
        .eq('request_id', request_id)
        .single()
        .throwOnError();

      return data
        ? `${process.env.NEXT_PUBLIC_HOST_NAME}/request-availability/${data.id}`
        : '';
    }

    if (type === 'self_scheduling') {
      const { data } = await db
        .from('interview_filter_json')
        .select('id')
        .eq('request_id', request_id)
        .single()
        .throwOnError();

      return data
        ? `${process.env.NEXT_PUBLIC_HOST_NAME}/self-scheduling/${data.id}`
        : '';
    }
  };
  const getInterviews = async (application_id: string) => {
    const { data: interviews } = await db
      .from('meeting_details')
      .select(
        'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id,meeting_flow,schedule_request_id',
      )
      .eq('application_id', application_id)
      .eq('status', 'confirmed')
      .throwOnError();

    return interviews!;
  };

  const getInterviewers = async (session_id: string) => {
    const { data: interviewers } = await db
      .from('meeting_interviewers')
      .select('first_name,last_name,profile_image,position')
      .eq('session_id', session_id)
      .throwOnError();

    return interviewers!;
  };

  //   -------------------------------

  const applicationPromise = (
    await db
      .from('applications')
      .select(
        'candidates(first_name,last_name,phone,email,linkedin,timezone,avatar,recruiter(id,name,logo,phone_number,socials,company_overview)),public_jobs(job_title,description)',
      )
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;

  const availabilityPromise = (
    await db
      .from('candidate_request_availability')
      .select('id,slots,created_at')
      .eq('application_id', application_id)
      .is('slots', null)
      .throwOnError()
  ).data;
  const filterJsonPromise = (
    await db
      .from('interview_filter_json')
      .select('id,confirmed_on,session_ids,created_at')
      .eq('application_id', application_id)
      .is('confirmed_on', null)
      .throwOnError()
  ).data;

  const interviewPlanPromise = (
    await db
      .from('interview_progress')
      .select('name,description,order,update_at,is_completed')
      .eq('application_id', application_id)
      .order('order', { ascending: true })
  ).data;

  const [application, availability, filter_json, interviewPlan] =
    await Promise.all([
      applicationPromise,
      availabilityPromise,
      filterJsonPromise,
      interviewPlanPromise,
    ]);

  /// promise all

  const { data: recruiter } = await db
    .from('recruiter_preferences')
    .select('banner_image,company_images,greetings,about')
    .eq('recruiter_id', application?.candidates?.recruiter?.id || '')
    .single()
    .throwOnError();

  const jobData = {
    name: application?.public_jobs?.job_title ?? '',
    description: application?.public_jobs?.description ?? '',
  };

  const candidates = application?.candidates;
  const candidatesRecruiter = candidates?.recruiter;

  const candidateData = {
    first_name: candidates?.first_name || '',
    last_name: candidates?.last_name || '',
    email: candidates?.email || '',
    linkedin: candidates?.linkedin || '',
    phone: candidates?.phone || '',
    timezone: candidates?.timezone || '',
    avatar: candidates?.avatar || '',
  };

  const companyData = {
    name: candidatesRecruiter?.name,
    logo: candidatesRecruiter?.logo,
    socials: candidatesRecruiter?.socials,
    phone: candidatesRecruiter?.phone_number,
    about: recruiter?.about || '',
    banner_image: recruiter?.banner_image || '',
    company_images: recruiter?.company_images || [],
    greetings: recruiter?.greetings || '',
  };
  //availability  ----------------------------------------------------------------

  const avail = availability?.filter((ava) => !ava.slots) || [];

  const availabilityWithSession = await Promise.all(
    avail.map(async (ava) => {
      const sessions = await getAvailabilitySessionDetails(ava.id);
      return {
        link: `/request-availability/${ava.id}`,
        created_at: ava.created_at,
        sessions: sessions || [],
      };
    }),
  );
  const availabilityData = availabilityWithSession || [];

  //self scheudle  ----------------------------------------------------------------

  const filteredSchudles = filter_json?.filter((fil) => !fil.confirmed_on);

  let scheduleData = [] as {
    created_at: string;
    link: string;
    sessions: Awaited<ReturnType<typeof getScheudleSessionDetails>>;
  }[];

  if (filteredSchudles?.length) {
    scheduleData = await Promise.all(
      filteredSchudles.map(async (filter) => {
        const sessions = await getScheudleSessionDetails(filter.session_ids);
        return {
          created_at: filter.created_at,
          link: `/self-scheduling/${filter.id}`,
          sessions: sessions,
        };
      }),
    );
  }

  //upcoming  -----------------------------------------------------------------------------

  const upcomingData = await getMeetings(application_id);

  //final -----------------------------------------------------------------------------
  return {
    candidate: candidateData,
    job: jobData,
    interviewPlan: interviewPlan || [],
    availability: availabilityData,
    schedule: scheduleData,
    company: companyData,
    upcoming: upcomingData || [],
  };
};

export const get_home_page = publicProcedure.input(schema).query(query);

export type getHomePage = ProcedureDefinition<typeof get_home_page>;
