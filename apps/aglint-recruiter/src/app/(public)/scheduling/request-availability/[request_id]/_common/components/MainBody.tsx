import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import axios from 'axios';
import dayjs from 'dayjs';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmedInvitePage } from 'src/app/(public)/scheduling/invite/[id]/_common/components/CandidateConfirm';

import Footer from '@/components/Common/Footer';
import { Loader } from '@/components/Common/Loader';
import timeZones from '@/utils/timeZone';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import MultiDaySessions from './MultiDaySessions';
import SingleDaySessions from './SingleDaySessions';
import SlotsSubmitted from './SlotsSubmitted';

function CandidateAvailability() {
  const {
    multiDaySessions,
    candidateRequestAvailability,
    loading,
    isSubmitted,
  } = useRequestAvailabilityContext();
  const [meetingsAndRounds, setMeetingsAndRound] = useState<{
    rounds: any[];
    meetings: any[];
    schedule: any;
  }>(null);
  const interview_sessions =
    candidateRequestAvailability?.request_session_relation &&
    candidateRequestAvailability?.request_session_relation.map(
      (ele) => ele.interview_session,
    );

  const getMeetings = async (session_ids: string[], application_id: string) => {
    const {
      data: { meetings },
    } = await axios.post(
      '/api/scheduling/request_avai lability/candidateAvailability/getMeetings',
      {
        session_ids,
      },
    );
    const { rounds } = meetings.reduce(
      (acc, curr) => {
        const count = acc.rounds.length;
        if (
          count === 0 ||
          acc.rounds[count - 1].sessions[
            acc.rounds[count - 1].sessions.length - 1
          ].interview_session.break_duration >= SINGLE_DAY_TIME
        )
          acc.rounds.push({
            title: `Day ${acc.rounds.length + 1}`,
            sessions: [curr],
          });
        else acc.rounds[count - 1].sessions.push(curr);
        return acc;
      },
      { rounds: [] as any },
    );
    const { data: sch } = await axios.post(
      `/api/scheduling/request_availability/candidateAvailability/getScheduleMeetings`,
      {
        application_id,
      },
    );
    setMeetingsAndRound({ rounds: rounds, meetings: meetings, schedule: sch });
  };

  const initialTimezone = useMemo(() => {
    const tz = dayjs.tz.guess();
    return timeZones.find(({ tzCode }) => tzCode === tz);
  }, []);

  useEffect(() => {
    if (
      candidateRequestAvailability &&
      candidateRequestAvailability.booking_confirmed
    ) {
      getMeetings(
        interview_sessions.map((ele) => ele.id),
        candidateRequestAvailability.application_id,
      );
    }
  }, [candidateRequestAvailability]);
  if (
    candidateRequestAvailability?.booking_confirmed === true &&
    meetingsAndRounds?.meetings
  ) {
    return (
      <ConfirmedInvitePage
        avail_request_id={candidateRequestAvailability.id}
        candidate={candidateRequestAvailability.applications.candidates}
        filter_json={null}
        meetings={meetingsAndRounds.meetings}
        rounds={meetingsAndRounds.rounds}
        recruiter={{
          id: candidateRequestAvailability.recruiter_id,
          name: candidateRequestAvailability.applications.candidates.recruiter
            .name,
          logo: candidateRequestAvailability.applications.candidates.recruiter
            .logo,
        }}
        timezone={initialTimezone}
        application_id={candidateRequestAvailability.application_id}
      />
    );
  }
  if (loading) {
    return(
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    ) ;
  }

  if (!candidateRequestAvailability) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <h1 className='mb-4 text-6xl font-bold text-gray-800'>404</h1>
          <p className='mb-8 text-xl text-gray-600'>Page not found</p>
          <div className='flex justify-center'>
            <AlertCircle className='h-16 w-16 text-red-500' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full  py-10 px-10 bg-gray-50' style={{ minHeight: 'calc(100vh - 50px)' }}>
        <div className='mx-auto flex max-w-4xl w-full flex-col items-center gap-4 rounded-lg border border-neutral-200 bg-white p-6'>
          <Header
            candidateRequestAvailability={candidateRequestAvailability}
            isSubmitted={isSubmitted}
          />
          {isSubmitted && <SlotsSubmitted />}
          {!isSubmitted && multiDaySessions.length === 1 && (
            <SingleDaySessions />
          )}
          {!isSubmitted && multiDaySessions.length > 1 && <MultiDaySessions />}
        </div>
      </div>
      <div className='h-[50px] bg-gray-50'>
        <Footer brand={true} />
      </div>
    </>
  );
}

export default CandidateAvailability;

function Header({ candidateRequestAvailability, isSubmitted }) {
  return (
    <div className='w-lg flex flex-col items-center w-full'>
      <div className='mb-4 flex items-center justify-center'>
        {candidateRequestAvailability?.recruiter.logo ? (
          <Avatar className='h-[100px] w-[100px]'>
            <AvatarImage
              src={candidateRequestAvailability?.recruiter.logo}
              alt='Recruiter logo'
            />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
      <div
        className={`mb-8 flex items-center gap-2 ${isSubmitted ? 'text-green-500' : 'text-neutral-500'}'} `}
      >
        {isSubmitted ? (
          <>
            <CheckCircle className='h-6 w-6 text-green-600' />
            <p className='text-lg font-semibold'>
              Availability Submitted successfully
            </p>
          </>
        ) : (
          <>
            
            <p className='text-2xl font-semibold'>Your Availability Requested</p>
          </>
        )}
      </div>
      {isSubmitted && (
    <div className='w-full'>
      Please wait as we finalize the schedule.<br />
      One of the selected time slots from each day will be chosen, and you will receive a confirmation email shortly.
    </div>
  )}
    </div>
  );
}
