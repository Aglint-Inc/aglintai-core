import dayjs from 'dayjs';
import { has } from 'lodash';
import React, { useMemo, useState } from 'react';

import { LoadedSlotPill } from '@/devlink';
import { WidgetFlexRow, WidgetTimeGroup } from '@/devlink3';
import AUIButton from '@/src/components/Common/AUIButton';
import { InterviewerGroup } from '@/src/components/Scheduling/Availability/Availability';
import { MergedEvents } from '@/src/components/Scheduling/Availability/availability.types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { useSchedulingAgentStore } from '../../../store';

const AvailabilitySlotSelect = ({
  response,
  index,
  time_duration,
}: {
  response: any;
  // eslint-disable-next-line no-unused-vars
  index: number;
  time_duration: number;
}) => {
  const { submitHandler } = useSchedulingAgent();
  const { selectedChat } = useSchedulingAgentStore();
  const [checkedSlots, setCheckedSlots] = useState<string[]>([]);
  const { recruiterUser, recruiter } = useAuthDetails();
  const mergedTimeSlots = useMemo(() => {
    const res = convertToMergedData(response.slots);
    return res;
  }, [response]);
  return (
    <>
      <WidgetFlexRow
        slorWidgetIndividual={Object.keys(mergedTimeSlots || {}).map(
          (dateKey: string) => {
            let timeKeys = Object.keys(mergedTimeSlots[String(dateKey)]);
            return (
              <WidgetTimeGroup
                key={dateKey}
                textTime={dayjs(dateKey).format('DD MMM YYYY')}
                slotTimeRange={
                  <>
                    {timeKeys.map((timeKey: string) => {
                      const [start, end] = timeKey.split('_');
                      let checkedPath = `${dateKey}_${timeKey}`;

                      const isChecked = Boolean(
                        checkedSlots.find((s) => s === checkedPath),
                      );
                      return (
                        <>
                          <LoadedSlotPill
                            key={checkedPath}
                            onClickPill={{
                              onClick: () => {
                                if (isChecked) {
                                  setCheckedSlots((prev) =>
                                    prev.filter((str) => str !== checkedPath),
                                  );
                                } else {
                                  setCheckedSlots((prev) => [
                                    ...prev,
                                    checkedPath,
                                  ]);
                                }
                              },
                            }}
                            isNotSelected={!isChecked}
                            isSelectedActive={isChecked}
                            textTime={`${dayjs(start).format(
                              'hh:mm A',
                            )} - ${dayjs(end).format('hh:mm A')}`}
                            slotImage={
                              <>
                                <InterviewerGroup
                                  profileUrls={mergedTimeSlots[String(dateKey)][
                                    String(timeKey)
                                  ].map((int) => ({
                                    name: int.interviewerName,
                                    url: int.profileImg,
                                  }))}
                                />
                              </>
                            }
                          />
                        </>
                      );
                    })}
                  </>
                }
              />
            );
          },
        )}
      />

      {selectedChat.history.length === index + 1 && (
        <div>
          <AUIButton
            disabled={checkedSlots.length === 0}
            onClick={() => {
              if (checkedSlots.length === 0) return;
              let aicmd = `Send an email to confirm the availability of time slots for the given panel`;
              submitHandler({
                input: aicmd,
                payload: {
                  checkedSlots: checkedSlots.map((str) => {
                    let time = str.split('_');
                    return time[1] + '_' + time[2];
                  }),
                  req_user_id: recruiterUser.user_id,
                  time_duration,
                  logo_url: recruiter.logo,
                  date_range: response.date_range,
                  recruiter_name: [
                    recruiterUser.first_name,
                    recruiterUser.last_name,
                  ]
                    .filter(Boolean)
                    .join(' '),
                },
                activity: [
                  {
                    agent_chat_id: selectedChat.id,
                    icon_status: 'success',
                    title: `Email send for `,
                    type: 'aglint',
                  },
                  {
                    agent_chat_id: selectedChat.id,
                    icon_status: 'waiting',
                    title: `Waiting for confirmation`,
                    type: 'aglint',
                  },
                ],
              });
            }}
          >
            Request availability
          </AUIButton>
        </div>
      )}
    </>
  );
};

export default AvailabilitySlotSelect;

const convertToMergedData = (data: InterviewSchedule) => {
  let result = {};
  for (let date in data) {
    for (let time in data[String(date)]) {
      for (let inter of data[String(date)][String(time)]) {
        if (inter.status !== 'available' && inter.status !== 'requested')
          continue;
        if (data[String(date)][String(time)])
          if (!has(result, date)) {
            result[String(date)] = {};
          }
        if (!has(result[String(date)], time)) {
          result[String(date)][String(time)] = [];
        }
        if (
          !result[String(date)][String(time)].find(
            (int) => int.interviewerId === inter.interviewerId,
          )
        ) {
          result[String(date)][String(time)].push({
            ...inter,
            startTime: dayjs(inter.startTime).toDate(),
            endTime: dayjs(inter.endTime).toDate(),
          });
        }
      }
    }
  }
  return result as MergedEvents;
};

type InterviewSlot = {
  startTime: string;
  endTime: string;
  interviewerId: string;
  interviewerName: string;
  profileImg: string;
  status: string;
  email: string;
};

type InterviewSchedule = {
  [date: string]: {
    [timeRange: string]: InterviewSlot[];
  };
};
