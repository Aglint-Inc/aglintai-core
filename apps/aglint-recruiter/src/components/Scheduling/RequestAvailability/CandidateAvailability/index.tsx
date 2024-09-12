import { type DatabaseTableInsert } from '@aglint/shared-types';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import CandidateSlotLoad from '@public/lottie/CandidateSlotLoad';
import axios from 'axios';
import dayjs from 'dayjs';
import { AlertCircle, Calendar, CheckCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import Footer from '@/components/Common/Footer';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';
import { ConfirmedInvitePage } from '@/components/Scheduling/CandidateInvite/CandidateConfirm';
import { useRouterPro } from '@/hooks/useRouterPro';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/utils/jsonResume';
import timeZones from '@/utils/timeZone';

import {
  insertTaskProgress,
  useRequestAvailabilityContext,
} from '../RequestAvailabilityContext';
import AvailableSlots from './AvailableSlots';
import DateSlotsPoPup from './DateSlotsPopUp';
import DaySessionCard from './DaySessionCard';

function CandidateAvailability() {
  const router = useRouterPro();
  const {
    multiDaySessions,
    candidateRequestAvailability,
    daySlots,
    loading,
    isSubmitted,
    setIsSubmitted,
    selectedSlots,
    setCandidateRequestAvailability,
    setDateSlots,
    setDaySlots,
    dateSlots,
  } = useRequestAvailabilityContext();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [meetingsAndRounds, setMeetingsAndRound] = useState<{
    rounds: any[];
    meetings: any[];
    schedule: any;
  }>(null);
  const interview_sessions =
    candidateRequestAvailability?.request_session_relation.map(
      (ele) => ele.interview_session,
    );
  const { toast } = useToast();

  const getMeetings = async (session_ids: string[], application_id: string) => {
    setConfirmLoading(true);
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
    setConfirmLoading(false);
  };

  async function handleSubmit() {
    if (multiDaySessions.length !== daySlots.length) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select slots from each day',
      });
      return;
    }
    setSubmitLoading(true);

    const { data: task } = await axios.post(
      `/api/scheduling/request_availability/getTaskIdDetailsByRequestId`,
      {
        request_id: candidateRequestAvailability?.id,
      },
    );
    const { data: requestData } = await axios.post(
      `/api/scheduling/request_availability/updateRequestAvailability`,
      {
        id: String(router.params?.request_id),
        data: { slots: daySlots, user_timezone: userTzDayjs.tz.guess() },
      },
    );

    if (task.id) {
      await insertTaskProgress({
        taskData: {
          task_id: task.id,
          created_by: {
            name: getFullName(
              candidateRequestAvailability.applications.candidates.first_name,
              candidateRequestAvailability.applications.candidates.last_name,
            ),
            id: candidateRequestAvailability.applications.candidates.id,
          },
          jsonb_data: {
            dates: [
              ...new Set(
                daySlots
                  .map((ele) => ele.dates)
                  .flat()
                  .map((ele) => ele.curr_day),
              ),
            ],
          },
          title: 'Candidate submitted the availability',
        } as DatabaseTableInsert['new_tasks_progress'],
      });
    }
    const dates = selectedSlots
      .map((ele) => ele.dates)
      .flat()
      .map((ele) => `${dayjs(ele.curr_day).format('DD MMM')}`);
    await axios.post(
      `/api/scheduling/request_availability/insertScheduleActivities`,
      {
        data: {
          title: `Candidate submitted availability`,
          description: `Candidate submitted availability on ${dates} for ${interview_sessions.map((ele) => ele.name).join(',')} Interviews.`,
          module: 'scheduler',
          task_id: task.id,
          logged_by: 'candidate',
          application_id: candidateRequestAvailability.application_id,
        } as DatabaseTableInsert['application_logs'],
      },
    );
    setCandidateRequestAvailability(requestData);
    setIsSubmitted(true);
    setSubmitLoading(false);
  }

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
          const { data: task } = await axios.post(
            `/api/scheduling/request_availability/getTaskIdDetailsByRequestId`,
            {
              request_id: candidateRequestAvailability?.id,
            },
          );

          const { data: requestData } = await axios.post(
            `/api/scheduling/request_availability/updateRequestAvailability`,
            {
              id: String(router.params?.request_id),
              data: { visited: true },
            },
          );
          setCandidateRequestAvailability(requestData);
          await axios.post(
            `/api/scheduling/request_availability/insertScheduleActivities`,
            {
              data: {
                title: `Candidate opened request availability link for ${interview_sessions.map((ele) => ele.name).join(',')}.`,
                module: 'scheduler',
                logged_by: 'candidate',
                application_id: candidateRequestAvailability.application_id,
                task_id: task.id,
              } as DatabaseTableInsert['application_logs'],
            },
          );
          if (task.id)
            await insertTaskProgress({
              taskData: {
                task_id: task.id,
                created_by: {
                  name: getFullName(
                    candidateRequestAvailability.applications.candidates
                      .first_name,
                    candidateRequestAvailability.applications.candidates
                      .last_name,
                  ),
                  id: candidateRequestAvailability.applications.candidates.id,
                },
                title: `Candidate opened request availability link for ${interview_sessions.map((ele) => ele.name).join(',')}.`,
                progress_type: 'request_availability',
              } as DatabaseTableInsert['new_tasks_progress'],
            });
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
  if (loading || confirmLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-[var(--neutral-2)]'>
        <div className='w-[120px] -translate-y-1/2'>
          <CandidateSlotLoad />
        </div>
      </div>
    );
  }

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
  if (dateSlots.length === 0) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>No Slots Available</AlertTitle>
        <AlertDescription>
          Please try to contact our support team
          <Button
            variant='outline'
            size='sm'
            className='ml-2'
            onClick={() => {
              window.open('mailto:support@aglinthq.com');
            }}
          >
            Contact Support
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div className='h-screen'>
      <DateSlotsPoPup />
      <div className='bg-[var(--sand-3)] w-full h-[calc(100vh-50px)] py-10 '>
        <div className='flex flex-col items-center  max-w-3xl mx-auto p-4 border border-neutral-200 rounded-lg bg-white'>
          <div className='flex flex-col items-center w-lg'>
            <div className='flex justify-center items-center mb-4'>
              {candidateRequestAvailability?.recruiter.logo ? (
                <MuiAvatar
                  variant='square-large'
                  height='100px'
                  width='100px'
                  level=''
                  src={candidateRequestAvailability?.recruiter.logo}
                />
              ) : null}
            </div>
            <div
              className={`flex items-center gap-2 mb-2 ${isSubmitted ? 'text-green-500' : 'text-gray-500'}'} `}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className='w-6 h-6 text-[var(--success-11)]' />
                  <p className='text-lg font-semibold'>
                    Availability Submitted successfully
                  </p>
                </>
              ) : (
                <>
                  <Calendar className='w-6 h-6 text-[var(--neutral-12)]' />
                  <p className='text-lg font-semibold'>
                    Your Availability Requested
                  </p>
                </>
              )}
            </div>
            <p className='text-center text-neutral-600'>
              {isSubmitted
                ? 'Please wait as we finalize the schedule. One of the selected time slots from each day will be chosen, and you will receive a confirmation email shortly.'
                : 'Please confirm your availability for the upcoming interview by selecting a suitable time slot from the options provided.'}
            </p>
          </div>
          <ShowCode>
            <ShowCode.When isTrue={multiDaySessions.length > 1}>
              <MultiDaySelect
                slotPrimaryButton={
                  !isSubmitted && (
                    <UIButton
                      size='md'
                      className='w-full'
                      onClick={handleSubmit}
                      variant='outline'
                      disabled={multiDaySessions.length !== daySlots.length}
                    >
                      {submitLoading ? 'Submitting...' : 'Submit Availability'}
                    </UIButton>
                  )
                }
                slotCandidateScheduleCard={multiDaySessions.map(
                  (sessions, i) => {
                    const totalSessionMinutes = sessions.reduce(
                      (accumulator, session) =>
                        accumulator + session.session_duration,
                      0,
                    );

                    const dates =
                      daySlots.find((ele) => ele.round === i + 1)?.dates || [];
                    return (
                      <>
                        <DaySessionCard
                          cardIndex={i}
                          totalSessionMinutes={totalSessionMinutes}
                          sessions={sessions}
                          dates={dates}
                        />
                      </>
                    );
                  },
                )}
              />
            </ShowCode.When>
            <ShowCode.Else>
              <ShowCode>
                <ShowCode.When isTrue={isSubmitted}>
                  <>
                    {multiDaySessions.map((sessions, i) => {
                      const totalSessionMinutes = sessions.reduce(
                        (accumulator, session) =>
                          accumulator + session.session_duration,
                        0,
                      );

                      const dates =
                        daySlots.find((ele) => ele.round === i + 1)?.dates ||
                        [];
                      return (
                        <>
                          <DaySessionCard
                            showDayCount={false}
                            cardIndex={i}
                            totalSessionMinutes={totalSessionMinutes}
                            sessions={sessions}
                            dates={dates}
                          />
                        </>
                      );
                    })}
                  </>
                </ShowCode.When>
                <ShowCode.Else>
                  {/* // single day */}
                  <div className='max-w-2xl'>
                    <AvailableSlots singleDay={true} />
                  </div>
                </ShowCode.Else>
              </ShowCode>
            </ShowCode.Else>
          </ShowCode>
        </div>
      </div>

      <div className='h-[50px]'>
        <Footer brand={true} />
      </div>
    </div>
  );
}

export default CandidateAvailability;

export function MultiDaySelect({
  slotCandidateScheduleCard,
  slotPrimaryButton,
}: {
  slotCandidateScheduleCard: React.ReactNode;
  slotPrimaryButton?: React.ReactNode;
}) {
  return (
    <div className='flex flex-col items-center space-y-4 w-full'>
      <div className='w-full max-w-3xl mx-auto flex flex-col space-y-4'>
        {slotCandidateScheduleCard}
      </div>
      <div className='w-72'>{slotPrimaryButton}</div>
    </div>
  );
}
