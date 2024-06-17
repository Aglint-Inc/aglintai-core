import { DatabaseTableInsert } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { SessionInfo } from '@/devlink/SessionInfo';
import { Text } from '@/devlink/Text';
import { AvailabilityReq } from '@/devlink2/AvailabilityReq';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { MultidayCard } from '@/devlink2/MultidayCard';
import { MultiDaySelect } from '@/devlink2/MultiDaySelect';
import { SelectedSlot } from '@/devlink2/SelectedSlot';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import {
  insertTaskProgress,
  useRequestAvailabilityContext,
} from '../RequestAvailabilityContext';
import { convertMinutesToHoursAndMinutes } from '../utils';
import AvailableSlots from './AvailableSlots';
import DateSlotsPoPup from './DateSlotsPopUp';

function CandidateAvailability() {
  const router = useRouter();
  const {
    setOpenDaySlotPopup,
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
  const handleOpen = async (day: number) => {
    setOpenDaySlotPopup(day);
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
        },
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
              progress_type: 'standard',
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
      <AvailabilityReq
        slotTtitle={
          isSubmitted ? (
            <>
              <GlobalIcon size={6} weight={'light'} iconName={'check_circle'} />
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
              src={candidateRequestAvailability?.applications.public_jobs.logo}
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
                      daySlots.find((ele) => ele.round === i + 1)?.dates || [];
                    return (
                      <>
                        <MultidayCard
                          textDayCount={`Day ${i + 1}`}
                          isSelected={
                            daySlots.length &&
                            daySlots.map((ele) => ele.round).includes(i + 1)
                          }
                          textTotalDuration={convertMinutesToHoursAndMinutes(
                            totalSessionMinutes,
                          )}
                          slotSessionInfo={sessions.map((session, i) => {
                            return (
                              <SessionInfo
                                textSessionName={session.name}
                                textSessionDuration={convertMinutesToHoursAndMinutes(
                                  session.session_duration,
                                )}
                                key={i}
                              />
                            );
                          })}
                          slotPickDateButton={
                            <ShowCode>
                              <ShowCode.When
                                isTrue={
                                  (daySlots
                                    .map((ele) => ele.round)
                                    .includes(i) ||
                                    i < 1) &&
                                  !daySlots
                                    .map((ele) => ele.round)
                                    .includes(i + 1)
                                }
                              >
                                <ButtonSoft
                                  size={1}
                                  textButton={'Pick Slots'}
                                  onClickButton={{
                                    onClick: () => handleOpen(i + 1),
                                  }}
                                />
                              </ShowCode.When>
                            </ShowCode>
                          }
                          slotChangeButton={
                            <ShowCode>
                              <ShowCode.When
                                isTrue={
                                  !isSubmitted &&
                                  daySlots.length &&
                                  daySlots
                                    .map((ele) => ele.round)
                                    .includes(i + 1)
                                }
                              >
                                <ButtonGhost
                                  size={1}
                                  onClickButton={{
                                    onClick: () => handleOpen(i + 1),
                                  }}
                                  textButton={'Change'}
                                />
                              </ShowCode.When>
                            </ShowCode>
                          }
                          textSelectedSlots={`Selected ${dates.map((ele) => ele.slots).flat().length} slots across ${dates.length} days `}
                          // date listing slots

                          slotSelected={
                            dates.length &&
                            dates.map((ele, i) => {
                              return (
                                <SelectedSlot
                                  textDate={dayjs(ele.curr_day).format(
                                    'DD MMMM YYYY',
                                  )}
                                  slotBadge={ele.slots.map((slot, i) => {
                                    return (
                                      <GlobalBadge
                                        color={
                                          isSubmitted ? 'success' : 'warning'
                                        }
                                        key={i}
                                        textBadge={`${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                                      />
                                    );
                                  })}
                                  key={i}
                                />
                              );
                            })
                          }
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
                          <MultidayCard
                            textDayCount={``}
                            isSelected={
                              daySlots.length &&
                              daySlots.map((ele) => ele.round).includes(i + 1)
                            }
                            textTotalDuration={convertMinutesToHoursAndMinutes(
                              totalSessionMinutes,
                            )}
                            slotSessionInfo={sessions.map((session, i) => {
                              return (
                                <SessionInfo
                                  textSessionName={session.name}
                                  textSessionDuration={convertMinutesToHoursAndMinutes(
                                    session.session_duration,
                                  )}
                                  key={i}
                                />
                              );
                            })}
                            slotPickDateButton={
                              <ShowCode>
                                <ShowCode.When
                                  isTrue={
                                    !daySlots
                                      .map((ele) => ele.round)
                                      .includes(i + 1)
                                  }
                                >
                                  <ButtonSoft
                                    size={1}
                                    textButton={'Pick Slots'}
                                    onClickButton={{
                                      onClick: () => handleOpen(i + 1),
                                    }}
                                  />
                                </ShowCode.When>
                              </ShowCode>
                            }
                            slotChangeButton={
                              <ShowCode>
                                <ShowCode.When
                                  isTrue={
                                    !isSubmitted &&
                                    daySlots.length &&
                                    daySlots
                                      .map((ele) => ele.round)
                                      .includes(i + 1)
                                  }
                                >
                                  <ButtonGhost
                                    size={1}
                                    onClickButton={{
                                      onClick: () => handleOpen(i + 1),
                                    }}
                                    textButton={'Change'}
                                  />
                                </ShowCode.When>
                              </ShowCode>
                            }
                            textSelectedSlots={`Selected ${dates.map((ele) => ele.slots).flat().length} slots across ${dates.length} days `}
                            // date listing slots

                            slotSelected={
                              dates.length &&
                              dates.map((ele, i) => {
                                return (
                                  <SelectedSlot
                                    textDate={dayjs(ele.curr_day).format(
                                      'DD MMMM YYYY',
                                    )}
                                    slotBadge={ele.slots.map((slot, i) => {
                                      return (
                                        <GlobalBadge
                                          color={
                                            isSubmitted ? 'success' : 'warning'
                                          }
                                          key={i}
                                          textBadge={`${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                                        />
                                      );
                                    })}
                                    key={i}
                                  />
                                );
                              })
                            }
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
    </div>
  );
}

export default CandidateAvailability;
