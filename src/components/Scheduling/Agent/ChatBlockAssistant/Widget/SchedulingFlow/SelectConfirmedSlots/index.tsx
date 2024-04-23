import { AvatarGroup, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  ButtonPrimaryRegular,
  LoadedSlotPill,
  LoadedSlots,
  ScheduleInterviewLoadedSlots,
} from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { useSchedulingAgentStore } from '../../../../store';

function SelectConfirmedSlots({ slots, index }: { slots: any; index: number }) {
  const { members } = useAuthDetails();
  const [filteredSlots, setFilteredSlots] = useState([]);
  const { selectedChat } = useSchedulingAgentStore();
  const { submitHandler } = useSchedulingAgent();

  useEffect(() => {
    setFilteredSlots(slots);
  }, [slots]);

  const sendInvite = async () => {
    const input = `Here are selected slots ${JSON.stringify(
      filteredSlots
        .filter((f) => f.slots.filter((s) => s.isSelected).length > 0)
        .map((sch) => {
          return sch.slots
            .filter((slot) => slot.isSelected)
            .map((slot) => {
              return {
                date: sch.date,
                startTime: slot.startTime,
                endTime: slot.endTime,
                user_ids: slot.user_ids,
              };
            });
        }),
    )}. Send an Invite for candidate to select one of this selected slots`;

    const UiMessage = `${filteredSlots
      .filter((schedule) => schedule.slots.some((slot) => slot.isSelected))
      .map((schedule) => {
        const formattedDate = dayjs(schedule.date).format('D MMM');
        const formattedSlots = schedule.slots
          .filter((slot) => slot.isSelected)
          .map((slot) => {
            const formattedStartTime = dayjs(slot.startTime).format('h:mm A');
            const formattedEndTime = dayjs(slot.endTime).format('h:mm A');
            return `${formattedStartTime} to ${formattedEndTime}`;
          })
          .join(' and ');
        return `${formattedDate} ${formattedSlots}`;
      })
      .join(', ')} are the selected slots.`;

    submitHandler({
      input: input,
      selectedItem: { selectedSlots: { ...filteredSlots }, message: UiMessage },
      activity: [
        {
          title: 'Mail sent to candidate',
          type: 'aglint',
          agent_chat_id: selectedChat.id,
          icon_status: 'success',
        },
        {
          title: 'Waiting for confirmation',
          type: 'aglint',
          icon_status: 'waiting',
          agent_chat_id: selectedChat.id,
        },
      ],
      payload: {
        filteredSlots,
      },
    });
  };

  return (
    <>
      <ScheduleInterviewLoadedSlots
        slotLoadedSlots={
          filteredSlots.length > 0
            ? filteredSlots.map((f, ind) => {
                return (
                  <LoadedSlots
                    key={f.date}
                    slotLoadedSlotPill={f.slots.map((slot) => {
                      return (
                        <LoadedSlotPill
                          isNotSelected={!slot.isSelected}
                          isSelectedActive={slot.isSelected}
                          onClickPill={{
                            onClick: () => {
                              filteredSlots[Number(ind)].slots.filter(
                                (s) => s === slot,
                              )[0].isSelected = !slot.isSelected;
                              setFilteredSlots([...filteredSlots]);
                            },
                          }}
                          key={slot.startTime}
                          textTime={`${dayjs(slot.startTime).format('hh:mm')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                          slotImage={
                            <AvatarGroup
                              sx={{
                                '& .MuiAvatar-root': {
                                  width: '24px',
                                  height: '24px',
                                  fontSize: '8px',
                                },
                              }}
                              total={slot.user_ids.length}
                            >
                              {slot.user_ids.slice(0, 5).map((user_id) => {
                                const member = members.filter(
                                  (member) => member.user_id === user_id,
                                )[0];
                                return (
                                  <MuiAvatar
                                    key={user_id}
                                    src={member?.profile_image}
                                    level={member?.first_name}
                                    variant='circular'
                                    height='24px'
                                    width='24px'
                                    fontSize='8px'
                                  />
                                );
                              })}
                            </AvatarGroup>
                          }
                        />
                      );
                    })}
                    textDay={dayjs(f.date).format('MMM D dddd YY')}
                  />
                );
              })
            : 'No Slots Available'
        }
      />
      {selectedChat.history.length == index + 1 && (
        <Stack direction={'row'} pt={2}>
          <ButtonPrimaryRegular
            isDisabled={
              filteredSlots.filter(
                (f) => f.slots.filter((s) => s.isSelected).length > 0,
              ).length === 0
            }
            textLabel={'Send Invite'}
            onClickButton={{
              onClick: () => {
                sendInvite();
              },
            }}
          />
        </Stack>
      )}
    </>
  );
}

export default SelectConfirmedSlots;
