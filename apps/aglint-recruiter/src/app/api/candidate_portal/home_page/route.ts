import { type SocialsType } from '@aglint/shared-types';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type meetings = {
  start_time: string | null;
  end_time: string | null;
  session_name: string;
  session_duration: number;
  schedule_type: 'in_person_meeting' | 'google_meet' | 'phone_call' | 'zoom';
  meeting_link: string | null;
  status:
    | 'completed'
    | 'cancelled'
    | 'waiting'
    | 'reschedule'
    | 'confirmed'
    | 'not_scheduled';
  session_id: string;
  interviewers: {
    first_name: string;
    last_name: string;
    profile_image: string;
    position: string;
  }[];
}[];
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
    description: string;
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
    about: string;
    banner_image: string;
    company_images: string[];
    greetings: string;
  };
  upcoming: meetings;
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

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseServer();

    const { application_id } = await req.json();

    const applicationPromise = (
      await supabaseAdmin
        .from('applications')
        .select(
          'candidates(first_name,last_name,phone,email,linkedin,timezone,avatar,recruiter(id,name,logo,phone_number,socials,company_overview)),public_jobs(job_title,description)',
        )
        .eq('id', application_id)
        .single()
        .throwOnError()
    ).data;

    const availabilityPromise = (
      await supabaseAdmin
        .from('candidate_request_availability')
        .select('id,slots,created_at')
        .eq('application_id', application_id)
        .is('slots', null)
        .throwOnError()
    ).data;

    const filterJsonPromise = (
      await supabaseAdmin
        .from('interview_filter_json')
        .select('id,confirmed_on,session_ids,created_at')
        .eq('application_id', application_id)
        .is('confirmed_on', null)
        .throwOnError()
    ).data;

    const interviewPlanPromise = (
      await supabaseAdmin
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

    const { data: recruiter } = await supabaseAdmin
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

    const avail = availability?.filter((ava) => !ava.slots);

    let availabilityData = [] as unknown;
    if (avail?.length) {
      const availabilityWithSession = await Promise.all(
        avail.map(async (ava) => {
          const sessions = await getAvailabilitySessionDetails(ava.id);
          return {
            link: `/scheduling/request-availability/${ava.id}`,
            created_at: ava.created_at,
            sessions: sessions,
          };
        }),
      );
      availabilityData = (
        availabilityWithSession ? availabilityWithSession : []
      ) as availability;
    }
    //self scheudle  ----------------------------------------------------------------

    const filteredSchudles = filter_json?.filter((fil) => !fil.confirmed_on);

    let scheduleData = [] as schedule;

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
    if (e instanceof Error) {
      return NextResponse.json(
        { message: 'error ' + e.message },
        { status: 400 },
      );
    } else return NextResponse.json({ message: 'error ' }, { status: 400 });
  }
}

const getScheudleSessionDetails = async (session_ids: string[]) => {
  const supabaseAdmin = getSupabaseServer();

  const { data: scheduleSession } = await supabaseAdmin
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
  const supabaseAdmin = getSupabaseServer();

  const { data: availabilitySess } = await supabaseAdmin
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
        const interviewers = await getInterviewers(interview?.session_id || '');
        return {
          ...interview,
          interviewers: interviewers,
        };
      }),
    );
    return data as meetings;
  }
};

const getInterviews = async (application_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const { data: interviews } = await supabaseAdmin
    .from('meeting_details')
    .select(
      'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id',
    )
    .eq('application_id', application_id)
    .eq('status', 'confirmed')
    .throwOnError();

  return interviews!;
};

const getInterviewers = async (session_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const { data: interviewers } = await supabaseAdmin
    .from('meeting_interviewers')
    .select('first_name,last_name,profile_image,position')
    .eq('session_id', session_id)
    .throwOnError();

  return interviewers!;
};
