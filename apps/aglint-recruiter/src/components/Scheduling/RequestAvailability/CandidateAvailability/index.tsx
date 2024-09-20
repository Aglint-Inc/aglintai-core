import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import axios from 'axios';
import dayjs from 'dayjs';
import { AlertCircle, Calendar, CheckCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmedInvitePage } from 'src/app/(public)/scheduling/invite/[id]/_common/components/CandidateConfirm';

import Footer from '@/components/Common/Footer';
import { Loader } from '@/components/Common/Loader';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { useRouterPro } from '@/hooks/useRouterPro';
import timeZones from '@/utils/timeZone';

import MultiDaySessions from './_common/components/MultiDaySessions';
import SingleDaySessions from './_common/components/SingleDaySessions';
import SlotsSubmitted from './_common/components/SlotsSubmitted';
import { useRequestAvailabilityContext } from './_common/contexts/RequestAvailabilityContext';

function CandidateAvailability() {
  const router = useRouterPro();
  const {
    multiDaySessions,
    candidateRequestAvailability,
    loading,
    isSubmitted,
    setIsSubmitted,
    setCandidateRequestAvailability,
    setDateSlots,
    setDaySlots,
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
      '/api/scheduling/request_availability/candidateAvailability/getMeetings',
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

  const checkAndUpdate = async () => {
    if (!candidateRequestAvailability.booking_confirmed) {
      if (candidateRequestAvailability.slots) {
        setIsSubmitted(true);
        setDateSlots(candidateRequestAvailability.slots);
        setDaySlots(candidateRequestAvailability.slots);
      } else {
        if (!candidateRequestAvailability.visited) {
          const { data: requestData } = await axios.post(
            `/api/scheduling/request_availability/updateRequestAvailability`,
            {
              id: String(router.params?.request_id),
              data: { visited: true },
            },
          );
          setCandidateRequestAvailability(requestData);
        }
      }
    } else {
      getMeetings(
        interview_sessions.map((ele) => ele.id),
        candidateRequestAvailability.application_id,
      );
    }
  };
  useEffect(() => {
    if (candidateRequestAvailability?.id) {
      checkAndUpdate();
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
    return <Loader />;
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
      <div className='w-ful h-[calc(100vh-50px)] py-10'>
        <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4'>
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
      <div className='h-[50px]'>
        <Footer brand={true} />
      </div>
    </>
  );
}

export default CandidateAvailability;

function Header({ candidateRequestAvailability, isSubmitted }) {
  return (
    <div className='w-lg flex flex-col items-center'>
      <div className='mb-4 flex items-center justify-center'>
        {candidateRequestAvailability?.recruiter.logo ? (
          <MuiAvatar
            height='100px'
            width='100px'
            level=''
            src={candidateRequestAvailability?.recruiter.logo}
          />
        ) : null}
      </div>
      <div
        className={`mb-2 flex items-center gap-2 ${isSubmitted ? 'text-green-500' : 'text-neutral-500'}'} `}
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
            <Calendar className='h-6 w-6 text-neutral-800' />
            <p className='text-lg font-semibold'>Your Availability Requested</p>
          </>
        )}
      </div>
      <p className='text-center text-neutral-600'>
        {isSubmitted
          ? 'Please wait as we finalize the schedule. One of the selected time slots from each day will be chosen, and you will receive a confirmation email shortly.'
          : 'Please confirm your availability for the upcoming interview by selecting a suitable time slot from the options provided.'}
      </p>
    </div>
  );
}
