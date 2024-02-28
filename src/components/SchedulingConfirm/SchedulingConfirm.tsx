import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { cloneDeep, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { LoadedSlotPill, LoadedSlots, LoaderSvg } from '@/devlink';
import { ConfirmSlots } from '@/devlink2/ConfirmSlots';
import toast from '@/src/utils/toast';

import { API_FAIL_MSG } from '../JobsDashboard/JobPostCreateUpdate/utils';
import { InterviewerGroup } from '../Scheduling/Availability/Availability';
import {
  InterviewerType,
  MergedEvents,
} from '../Scheduling/Availability/availability.types';
import { mergeInterviewerEventsWithTimeSlot } from '../Scheduling/Availability/utils';

const SchedulingConfirm = () => {
  const [groupedSlots, setgroupedSlots] = useState<MergedEvents | null>();
  const [reqUserName, setReqUserName] = useState('');
  const [interviewerAvail, setInterviewerAvail] =
    useState<InterviewerType | null>(null);
  const [formStatus, setFormStatus] = useState<
    'submitting' | 'submitted' | '' | 'error'
  >('');
  const [intrReqSlots, setIntrReqSlots] = useState(-1);
  const [uncheckedSlots, setUncheckedSlots] = useState<string[]>([]);
  const router = useRouter();

  const panelId = router.query.panel_id as string;
  const userId = router.query.user_id as string;
  const req_user_id = router.query.req_user_id as string;
  const chat_id = router.query.chat_id as string;
  const time_duration = Number(router.query.time_duration);
  useEffect(() => {
    if (!panelId || !time_duration || !userId) {
      return;
    }
    if (router.isReady) {
      (async () => {
        try {
          const { interviewers_availabilities, requested_user_name } =
            await fetchAvailability(panelId, req_user_id);
          setReqUserName(requested_user_name);
          const interv: InterviewerType = interviewers_availabilities.find(
            (i) => i.interviewerId === userId,
          );
          let reqSlot = 0;
          for (const slotAvail of interv.slots) {
            if (slotAvail.timeDuration !== time_duration) continue;
            for (const dateKey in slotAvail.availability) {
              slotAvail.availability[String(dateKey)].forEach((timeSlot) => {
                if (timeSlot.status === 'requested') {
                  reqSlot++;
                }
              });
            }
          }
          setIntrReqSlots(reqSlot);
          setInterviewerAvail(interv);
          const merged = mergeInterviewerEventsWithTimeSlot(
            interviewers_availabilities,
            time_duration,
          );
          setgroupedSlots(merged);
        } catch (error) {
          toast.error(API_FAIL_MSG);
        }
      })();
    }
    return () => {
      //
    };
  }, [router.isReady, router.query]);

  const totalCnt = useMemo(() => {
    if (!groupedSlots) return 0;
    let cnt = 0;
    for (let dateKey in groupedSlots) {
      cnt += Object.keys(groupedSlots[String(dateKey)]).length;
    }
    return cnt;
  }, [groupedSlots]);

  const filteredDateSlotKeys = Object.keys(groupedSlots || {}).filter(
    (key) => !isEmpty(groupedSlots[String(key)]),
  );

  //
  const handleSubmit = async () => {
    try {
      setFormStatus('submitting');
      let newInterviewerSlot = cloneDeep(interviewerAvail);
      let timeAvailabilitySlot = newInterviewerSlot.slots.find(
        (slotAv) => slotAv.timeDuration === Number(router.query.time_duration),
      ).availability;

      for (let dateKey in groupedSlots) {
        for (let timeKey in groupedSlots[String(dateKey)]) {
          let interviewIdx = groupedSlots[String(dateKey)][
            String(timeKey)
          ].findIndex((s) => s.interviewerId === userId);
          let slotPath = `${dateKey}_${timeKey}_[${interviewIdx}]`;
          if (uncheckedSlots.find((s) => s === slotPath)) continue;
          const [startTime] = timeKey.split('_');

          if (!timeAvailabilitySlot[String(dateKey)]) {
            // console.log(dateKey, timeAvailabilitySlot[dateKey]);
          } else {
            timeAvailabilitySlot[String(dateKey)] = timeAvailabilitySlot[
              String(dateKey)
            ].map((timeRange) => {
              if (dayjs(timeRange.startTime).toISOString() === startTime) {
                timeRange.status = 'confirmed';
              }
              return timeRange;
            });
          }
        }
      }
      newInterviewerSlot.slots = newInterviewerSlot.slots.map((slotAvail) => {
        if (slotAvail.timeDuration === time_duration) {
          slotAvail.availability = timeAvailabilitySlot;
        }
        return slotAvail;
      });
      await axios.post('/api/scheduling/interviewer-confirm-slots', {
        interviewer_availability: newInterviewerSlot.slots,
        interviewer_id: userId,
      });
      await push_activity(chat_id, userId, newInterviewerSlot.interviewerName);
      setFormStatus('submitted');
    } catch (error) {
      toast.error(API_FAIL_MSG);
      setFormStatus('error');
    }
  };

  let slotBody = <></>;

  if (groupedSlots && intrReqSlots === 0 && <>No Slots Requested</>) {
    slotBody = (
      <>{groupedSlots && intrReqSlots === 0 && <>No Slots Requested</>}</>
    );
  } else if (!groupedSlots) {
    slotBody = (
      <Stack
        width={'400px'}
        height={'400px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <LoaderSvg />
      </Stack>
    );
  } else if (groupedSlots) {
    slotBody = (
      <>
        {filteredDateSlotKeys.map((dateKey) => {
          let eventsKey = Object.keys(groupedSlots[String(dateKey)]).filter(
            (timeKey) =>
              groupedSlots[String(dateKey)][String(timeKey)].length > 0,
          );
          return (
            <LoadedSlots
              key={dateKey}
              textDay={dayjs(dateKey).format('MMMM DD YYYY')}
              slotLoadedSlotPill={eventsKey.map((timeKey, idx) => {
                let inters = groupedSlots[String(dateKey)][String(timeKey)].map(
                  (i) => ({
                    name: i.interviewerName,
                    url: i.profileImg,
                    status: i.status,
                    isChecked: true,
                  }),
                );
                let timeRange =
                  groupedSlots[String(dateKey)][String(timeKey)][0];
                let textTime = `${dayjs(timeRange?.startTime).format(
                  'hh:mm A',
                )} - ${dayjs(timeRange?.endTime).format('hh:mm A')}`;

                let slotPath = `${dateKey}_${timeKey}_[${idx}]`;
                const isUncheckedChecked = Boolean(
                  uncheckedSlots.find((s) => s === slotPath),
                );

                return (
                  <LoadedSlotPill
                    key={timeKey}
                    textTime={textTime}
                    isLineBorderActive={false}
                    slotImage={<InterviewerGroup profileUrls={inters} />}
                    isSelectedActive={!isUncheckedChecked}
                    isNotSelected={isUncheckedChecked}
                    onClickPill={{
                      onClick: () => {
                        if (!isUncheckedChecked) {
                          setUncheckedSlots((prev) => [...prev, slotPath]);
                        } else {
                          setUncheckedSlots((prev) =>
                            prev.filter((s) => s !== slotPath),
                          );
                        }
                      },
                    }}
                  />
                );
              })}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      <ConfirmSlots
        textDesc={headingCopy.replace('{user_name}', reqUserName)}
        textButtonLabel={submitBtnCopy
          .replace('{cnt}', (totalCnt - uncheckedSlots.length).toString())
          .replace('{total_cnt}', String(totalCnt))}
        isAvailabilityConfirmedVisible={
          formStatus === 'submitted' || (groupedSlots && intrReqSlots === 0)
        }
        isConfirmAvailibiltyVisible={
          formStatus !== 'submitted' && groupedSlots && intrReqSlots !== 0
        }
        onClickConfirm={{
          onClick: handleSubmit,
        }}
        slotLoadedSlots={<>{slotBody}</>}
      />
    </>
  );
};

export default SchedulingConfirm;

const fetchAvailability = async (panelId: string, reqUserId: string) => {
  const {
    data: { requested_user_name, interviewers_availabilities },
  } = await axios.post('/api/scheduling/fetch-panel-user-availability', {
    panel_id: panelId,
    req_user_id: reqUserId,
  });
  return { requested_user_name, interviewers_availabilities };
};

const headingCopy = `{user_name} is verifying your availability within the provided time slots. Kindly review the time slots and unselect any that you might not be available for.`;

const submitBtnCopy = `Confirm Availability ({cnt} / {total_cnt} slots selected)`;

const push_activity = async (chat_id, user_id, user_name) => {
  await axios.post('/api/scheduling/ai/update-activity-confirmed-slot', {
    chat_id,
    user_id,
    user_name,
  });
};
