import { type SocialsType } from '@aglint/shared-types';
import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { type apiPortalInterviewsResponse } from '../get_interviews/route';

export type apiHomepageResponse = {
  candidate: {
    first_name: string;
    last_name: string;
    email: string;
    linkedin: string;
    phone: string;
    timezone: string;
    avatar: string;
  };
  job: {
    name: string;
    banner: string;
    greetings: string;
    description: string;
    images: string | string[];
  };
  interviewPlan: {
    name: string;
    description: string;
    order: number;
    update_at: string;
    is_completed: boolean;
  }[];
  availability: availability;
  schedule: schedule;
  company: {
    name: string;
    email: string;
    logo: string;
    socials: SocialsType;
    phone: string;
    company_overview: string;
  };
  upcoming: apiPortalInterviewsResponse;
};

export type availability = {
  link: string;
  created_at: string;
  sessions: sessions;
}[];

export type schedule = {
  created_at: string;
  link: string;
  sessions: sessions;
}[];

type sessions = Awaited<ReturnType<typeof getScheudleSessionDetails>>;
export async function POST(req) {
  try {
    const { application_id } = await req.json();

    const { data: application } = await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,phone,email,linkedin,timezone,avatar,recruiter(name,email,logo,phone_number,socials,company_overview)),public_jobs(job_title,description)',
      )
      .eq('id', application_id)
      .single()
      .throwOnError();

    const { data: job } = await supabaseAdmin
      .from('candidate_portal_job')
      .select('banner,images,greetings')
      .eq('application_id', application_id)
      .throwOnError();

    const jobData = {
      name: application.public_jobs.job_title,
      description: application.public_jobs.description,
      banner: job?.length ? job[0]?.banner : '',
      images: job?.length ? job[0]?.images : '',
      greetings: job?.length ? job[0]?.greetings : '',
    };

    const candidateData = {
      first_name: application.candidates.first_name,
      last_name: application.candidates.last_name,
      email: application.candidates.email,
      linkedin: application.candidates.linkedin,
      phone: application.candidates.phone,
      timezone: application.candidates.timezone,
      avatar: application.candidates.avatar,
    };

    const companyData = {
      name: application.candidates.recruiter.name,
      email: application.candidates.recruiter.email,
      logo: application.candidates.recruiter.logo,
      socials: application.candidates.recruiter.socials,
      phone: application.candidates.recruiter.phone_number,
      company_overview: application.candidates.recruiter.company_overview,
    };
    //availability  ----------------------------------------------------------------
    const { data: availability } = await supabaseAdmin
      .from('candidate_request_availability')
      .select('id,slots,created_at')
      .eq('application_id', application_id)
      .throwOnError();
    const avail = availability.filter((ava) => !ava.slots);

    let availabilityData = [] as availability;
    if (avail.length) {
      let availabilityWithSession = await Promise.all(
        avail.map(async (ava) => {
          const sessions = await getAvailabilitySessionDetails(ava.id);
          return {
            link: `/scheduling/request-availability/${ava.id}`,
            created_at: ava.created_at,
            sessions: sessions,
          };
        }),
      );
      availabilityData = availabilityWithSession;
    }
    //self scheudle  ----------------------------------------------------------------

    const { data: filter_json } = await supabaseAdmin
      .from('interview_filter_json')
      .select('id,confirmed_on,session_ids,created_at')
      .eq('application_id', application_id)
      .throwOnError();

    const filteredSchudles = filter_json.filter((fil) => !fil.confirmed_on);

    let scheduleData = [] as schedule;

    if (filteredSchudles.length) {
      scheduleData = await Promise.all(
        filteredSchudles.map(async (filter) => {
          const sessions = await getScheudleSessionDetails(filter.session_ids);
          return {
            created_at: filter.created_at,
            link: `/scheduling/invite/${application_id}?filter_id=${filter.id}`,
            sessions: sessions,
          };
        }),
      );
    }

    //upcoming  -----------------------------------------------------------------------------

    const upcomingData = await getMeetings(application_id);

    // interview plan -----------------------------------------------------------------
    const { data: interviewPlan } = await supabaseAdmin
      .from('interview_progress')
      .select('name,description,order,update_at,is_completed')
      .eq('application_id', application_id)
      .order('order', { ascending: true });

    // .throwOnError();

    //final -----------------------------------------------------------------------------
    const data = {
      candidate: candidateData,
      job: jobData,
      interviewPlan: interviewPlan,
      availability: availabilityData,
      schedule: scheduleData,
      company: companyData,
      upcoming: upcomingData,
    };

    return NextResponse.json(
      {
        ...data,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}

const getScheudleSessionDetails = async (session_ids: string[]) => {
  const { data: scheduleSession } = await supabaseAdmin
    .from('interview_session')
    .select('name,session_duration,interview_meeting(start_time,end_time)')
    .in('id', session_ids)
    .throwOnError();

  const scheduleSessions = scheduleSession.map((scheSess) => ({
    name: scheSess.name,
    duration: scheSess.session_duration,
    start_time: scheSess.interview_meeting.start_time,
    end_time: scheSess.interview_meeting.end_time,
  }));
  return scheduleSessions;
};

const getAvailabilitySessionDetails = async (availability_id: string) => {
  const { data: availabilitySess } = await supabaseAdmin
    .from('request_session_relation')
    .select(
      'interview_session(name,session_duration,interview_meeting(start_time,end_time))',
    )
    .eq('request_availability_id', availability_id)
    .throwOnError();

  return availabilitySess.map((avaSess) => ({
    name: avaSess.interview_session.name,
    duration: avaSess.interview_session.session_duration,
    start_time: avaSess.interview_session.interview_meeting.start_time,
    end_time: avaSess.interview_session.interview_meeting.end_time,
  }));
};

//  ---------------------------------- meeting

const getMeetings = async (application_id) => {
  const interviews = await getInterviews(application_id);

  let interviewWithUsers = [] as apiPortalInterviewsResponse;

  if (interviews.length) {
    interviewWithUsers = await Promise.all(
      interviews.map(async (interview) => {
        const interviewers = await getInterviewers(interview.session_id);
        return {
          ...interview,
          interviewers: interviewers,
        };
      }),
    );
  }
  return interviewWithUsers;
};

const getInterviews = async (application_id) => {
  const { data: interviews } = await supabaseAdmin
    .from('meeting_details')
    .select(
      'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id',
    )
    .eq('application_id', application_id)
    .eq('status', 'confirmed')
    .throwOnError();

  return interviews;
};

const getInterviewers = async (session_id) => {
  const { data: interviewers } = await supabaseAdmin
    .from('meeting_interviewers')
    .select('first_name,last_name,profile_image,position')
    .eq('session_id', session_id)
    .throwOnError();

  return interviewers;
};
