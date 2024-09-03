import { type DatabaseTableInsert } from '@aglint/shared-types';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { Text } from '@/devlink/Text';
import { AvailabilityReq } from '@/devlink2/AvailabilityReq';
import { MultiDaySelect } from '@/devlink2/MultiDaySelect';
import { GlobalCta } from '@/devlink3/GlobalCta';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import Footer from '@/src/components/Common/Footer';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { ConfirmedInvitePage } from '@/src/components/Scheduling/CandidateInvite/CandidateConfirm';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import timeZones from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

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
      toast.message('Please select slots from each day');
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
      <Stack
        width={'100%'}
        height={'100vh'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={'var(--neutral-2)'}
      >
        <Stack width={'120px'} style={{ transform: 'translateY(-50%)' }}>
          <CandidateSlotLoad />
        </Stack>
      </Stack>
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
      <>
        <GlobalCta
          color={'error'}
          iconName={'error'}
          textTitle={'No Slots Available'}
          textDescription={'Please try to contact our support team'}
          slotButton={
            <ButtonSoft
              size={1}
              color={'neutral'}
              textButton={'Contact Support'}
              onClickButton={{
                onClick: () => {
                  window.open('mailto:support@aglinthq.com');
                },
              }}
            />
          }
        />
      </>
    );
  }
  return (
    <div>
      <DateSlotsPoPup />
      <Stack
        sx={{
          bgcolor: 'var(--sand-3)',
          width: '100%',
          height: '100vh',
          overflow: 'auto',
          paddingTop: '60px',
          paddingBottom: '24px',
        }}
      >
        <AvailabilityReq
          slotTtitle={
            isSubmitted ? (
              <>
                <GlobalIcon
                  size={6}
                  weight={'light'}
                  iconName={'check_circle'}
                />
                <Text
                  size={4}
                  weight={'medium'}
                  content={'Availability Submitted successfully'}
                />
              </>
            ) : (
              <>
                <GlobalIcon size={6} weight={'light'} iconName={'event'} />
                <Text
                  size={4}
                  weight={'medium'}
                  content={'Your Availability Requested'}
                />
              </>
            )
          }
          textDesc={
            isSubmitted
              ? 'Please wait as we finalize the schedule. One of the selected time slots from each day will be chosen, and you will receive a confirmation email shortly.'
              : 'Please confirm your availability for the upcoming interview by selecting a suitable time slot from the options provided.'
          }
          styleTextColor={{
            style: {
              color: isSubmitted ? 'var(--success-11)' : 'var(--neutral-12)',
            },
          }}
          slotCompanyIcon={
            candidateRequestAvailability?.recruiter.logo && (
              <MuiAvatar
                variant='square-large'
                height='100px'
                width='100px'
                level=''
                src={candidateRequestAvailability?.recruiter.logo}
              />
            )
          }
          slotPickSlotDay={
            <ShowCode>
              <ShowCode.When isTrue={multiDaySessions.length > 1}>
                <MultiDaySelect
                  slotPrimaryButton={
                    !isSubmitted && (
                      <ButtonSolid
                        size={2}
                        onClickButton={{ onClick: handleSubmit }}
                        textButton={'Submit Availability'}
                        isLoading={submitLoading}
                        isDisabled={multiDaySessions.length !== daySlots.length}
                      />
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
                        daySlots.find((ele) => ele.round === i + 1)?.dates ||
                        [];
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
                    <AvailableSlots singleDay={true} />
                  </ShowCode.Else>
                </ShowCode>
              </ShowCode.Else>
            </ShowCode>
          }
        />
        <Footer brand={true} />
      </Stack>
    </div>
  );
}

export default CandidateAvailability;
