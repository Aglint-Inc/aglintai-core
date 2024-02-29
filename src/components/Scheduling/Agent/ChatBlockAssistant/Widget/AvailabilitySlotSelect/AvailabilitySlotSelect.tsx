import dayjs from 'dayjs';
import { cloneDeep, get, set } from 'lodash';
import React, { useState } from 'react';

import { LoadedSlotPill } from '@/devlink';
import { WidgetFlexRow, WidgetTimeGroup } from '@/devlink3';
import AUIButton from '@/src/components/Common/AUIButton';
import { InterviewerGroup } from '@/src/components/Scheduling/Availability/Availability';
import { MergedEvents } from '@/src/components/Scheduling/Availability/availability.types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { setSelectedChat, useSchedulingAgentStore } from '../../../store';

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
  const path = `history[${index}].funcRes[0].response.slots`;
  const mergedTimeSlots: MergedEvents = get(selectedChat, path);

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

                      const isChecked =
                        mergedTimeSlots[String(dateKey)][String(timeKey)]
                          .isChecked;
                      return (
                        <>
                          <LoadedSlotPill
                            key={checkedPath}
                            onClickPill={{
                              onClick: () => {
                                if (isChecked) {
                                  setSelectedChat(
                                    updateMergedAvail(
                                      selectedChat,
                                      `${path}[${dateKey}][${timeKey}]`,
                                      false,
                                    ),
                                  );
                                  setCheckedSlots((prev) =>
                                    prev.filter((str) => str !== checkedPath),
                                  );
                                } else {
                                  setSelectedChat(
                                    updateMergedAvail(
                                      selectedChat,
                                      `${path}[${dateKey}][${timeKey}]`,
                                      true,
                                    ),
                                  );
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
                                  ].slots.map((int) => ({
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
              let aicmd = `Send an email to confirm the availability of time slots for this panel`;
              const names = findNames(mergedTimeSlots);
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
                    title: `Email sent to  ${names.join(
                      ', ',
                    )} for confirming availability`,
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

const updateMergedAvail = (selectedChat, path, isChecked) => {
  const newSelectedChat = cloneDeep(selectedChat);
  set(newSelectedChat, `${path}.isChecked`, isChecked);
  set(newSelectedChat, `${path}.isChecked`, isChecked);
  return newSelectedChat;
};

const findNames = (mergedSlots: MergedEvents) => {
  let mp = new Set();
  for (let dateKey in mergedSlots) {
    for (let timeKey in mergedSlots[String(dateKey)]) {
      if (mergedSlots[String(dateKey)][String(timeKey)].isChecked) {
        for (let int of mergedSlots[String(dateKey)][String(timeKey)].slots) {
          mp.add(int.interviewerName);
        }
      }
    }
  }
  return Array.from(mp);
};
