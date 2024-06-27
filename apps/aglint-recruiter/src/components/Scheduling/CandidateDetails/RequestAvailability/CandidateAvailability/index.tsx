import { DatabaseTableInsert } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Text } from '@/devlink/Text';
import { AvailabilityReq } from '@/devlink2/AvailabilityReq';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { MultiDaySelect } from '@/devlink2/MultiDaySelect';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import Footer from '@/src/components/Common/Footer';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import {
  insertTaskProgress,
  useRequestAvailabilityContext,
} from '../RequestAvailabilityContext';
import AvailableSlots from './AvailableSlots';
import DateSlotsPoPup from './DateSlotsPopUp';
import DaySessionCard from './DaySessionCard';

function CandidateAvailability() {
  const router = useRouter();
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
  } = useRequestAvailabilityContext();
  const [submitLoading, setSubmitLoading] = useState(false);

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
        id: String(router.query?.request_id),
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
          description: `Candidate submitted availability on ${dates} for ${candidateRequestAvailability.session_ids.map((ele) => ele.name).join(',')} Interviews.`,
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

  const checkAndUpdate = async () => {
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
            id: String(router.query?.request_id),
            data: { visited: true },
          },
        );
        setCandidateRequestAvailability(requestData);
        await axios.post(
          `/api/scheduling/request_availability/insertScheduleActivities`,
          {
            data: {
              title: `Candidate opened request availability link for ${candidateRequestAvailability.session_ids.map((ele) => ele.name).join(',')}.`,
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
              title: `Candidate opened request availability link for ${candidateRequestAvailability.session_ids.map((ele) => ele.name).join(',')}.`,
              progress_type: 'request_availability',
            } as DatabaseTableInsert['new_tasks_progress'],
          });
      }
    }
  };
  useEffect(() => {
    if (candidateRequestAvailability?.id) {
      checkAndUpdate();
    }
  }, [candidateRequestAvailability]);
  if (loading) {
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
            candidateRequestAvailability?.applications.public_jobs.logo && (
              <MuiAvatar
                variant='square-large'
                height='100px'
                width='100px'
                level=''
                src={
                  candidateRequestAvailability?.applications.public_jobs.logo
                }
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
                        onClickButton={{ onClick: handleSubmit }}
                        textButton={'Submit Availability'}
                        isLoading={submitLoading}
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
