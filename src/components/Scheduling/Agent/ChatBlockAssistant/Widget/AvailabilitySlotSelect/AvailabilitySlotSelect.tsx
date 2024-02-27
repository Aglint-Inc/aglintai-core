import dayjs from 'dayjs';
import { has } from 'lodash';
import React, { useMemo, useState } from 'react';

import { LoadedSlotPill } from '@/devlink';
import { AvailableSlots } from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import { InterviewerGroup } from '@/src/components/Scheduling/Availability/Availability';
import { MergedEvents } from '@/src/components/Scheduling/Availability/availability.types';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { useSchedulingAgentStore } from '../../../store';

const AvailabilitySlotSelect = ({
  slots,
  index,
}: {
  slots: any;
  // eslint-disable-next-line no-unused-vars
  index: number;
}) => {
  const { submitHandler } = useSchedulingAgent();
  const { selectedChat } = useSchedulingAgentStore();
  const [checkedSlots, setCheckedSlots] = useState<string[]>([]);

  const mergedTimeSlots = useMemo(() => {
    const res = convertToMergedData(slots);
    return res;
  }, [slots]);

  return (
    <>
      {Object.keys(mergedTimeSlots || {}).map((dateKey: string) => {
        let timeKeys = Object.keys(mergedTimeSlots[String(dateKey)]);
        return (
          <AvailableSlots
            key={dateKey}
            textDate={dayjs(dateKey).format('DD')}
            textDay={dayjs(dateKey).format('dddd')}
            textMonth={dayjs(dateKey).format('MMM')}
            slotLoadedSlotPill={
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
                              setCheckedSlots((prev) => [...prev, checkedPath]);
                            }
                          },
                        }}
                        isNotSelected={!isChecked}
                        isSelectedActive={isChecked}
                        textTime={`${dayjs(start).format('hh:mm A')} - ${dayjs(
                          end,
                        ).format('hh:mm A')}`}
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
      })}
      {selectedChat.history.length != index + 1 && (
        <div style={{ display: 'none' }}>
          <AUIButton
            onClick={() => {
              let aicmd = `Send an email to confirm the availability of time slots for the given panel`;
              submitHandler({
                input: aicmd,
                payload: checkedSlots,
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
