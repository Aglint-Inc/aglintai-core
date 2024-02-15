import { Drawer, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import {
  GroupedSlots,
  MemberSlotInfo,
  PanelDetailMemberRow,
  PanelDetailTable,
  PanelMember,
  SidebarViewSlots,
  TableBodyCell,
  TimeRangeConfirmed,
  TimeRangeRequested,
} from '@/devlink2';

import AvailabilityCell from './AvailabilityCell';
import CalenderHeaderRow from './CalenderHeaderRow';
import { useAvailableStore } from './store';
import { countSlotStatus, groupSlots } from './utils';
import MuiAvatar from '../../Common/MuiAvatar';

const PanelRow = () => {
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);
  const isCalenderLoading = useAvailableStore(
    (state) => state.isCalenderLoading,
  );
  const [editedIntId, setEditedIntId] = useState('');
  const interviewers = useAvailableStore((state) => state.interviewers);
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const checkedInterlots = useAvailableStore(
    (state) => state.checkedInterSlots,
  );

  return (
    <>
      <PanelDetailTable
        slotPanelMemberRow={
          <>
            <CalenderHeaderRow />

            {interviewers.map((int, interviewIdx) => {
              let timeDurSlots = int.slots.find(
                (t) => t.timeDuration === timeSlot,
              );
              if (!timeDurSlots) return null;
              let timeSlotKeys = Object.keys(timeDurSlots.availability).filter(
                (timeKey) =>
                  dayjs(timeKey).isSame(dateRangeView.startDate, 'date') ||
                  dayjs(timeKey).isSame(dateRangeView.endDate, 'date') ||
                  (dayjs(timeKey).isAfter(dayjs(dateRangeView.startDate)) &&
                    dayjs(timeKey).isBefore(dateRangeView.endDate)),
              );

              const checkedInterviewer = checkedInterlots[Number(interviewIdx)];
              let avail = checkedInterviewer.slots.find(
                (s) => s.timeDuration === timeSlot,
              )?.availability;
              let timeSlotIdx = interviewers[
                String(interviewIdx)
              ].slots.findIndex((s) => s.timeDuration === timeSlot);

              const cntConfirmed = int.slots.find(
                (s) => s.timeDuration === timeSlot,
              )?.cntConfirmed;
              const cntRequested = int.slots.find(
                (s) => s.timeDuration === timeSlot,
              )?.cntRequested;
              return (
                <PanelDetailMemberRow
                  key={int.interviewerId}
                  slotMember={
                    <>
                      <PanelMember
                        slotMemberAvatar={
                          <>
                            <MuiAvatar
                              height='30px'
                              width='30px'
                              src={int.profileImg}
                              variant='circular'
                              level={int.interviewerName}
                              fontSize='12px'
                            />
                          </>
                        }
                        textMemberName={int.interviewerName}
                      />
                      {cntConfirmed + cntRequested > 0 && (
                        <MemberSlotInfo
                          isConfirmedSlots={cntConfirmed > 0}
                          isRequestedSlots={cntRequested > 0}
                          textRequestedSlotNumber={cntRequested}
                          textConfirmedSlotnumber={cntConfirmed}
                          onClickViewSlots={{
                            onClick: () => {
                              setEditedIntId(int.interviewerId);
                            },
                          }}
                        />
                      )}
                    </>
                  }
                  slotBodyCells={
                    <>
                      {isCalenderLoading ? (
                        <>
                          <TableBodyCell isLoading />
                          <TableBodyCell isLoading />
                          <TableBodyCell isLoading />
                          <TableBodyCell isLoading />
                          <TableBodyCell isLoading />
                        </>
                      ) : (
                        timeSlotKeys.slice(0, 5).map((day) => {
                          return (
                            <AvailabilityCell
                              key={day}
                              timeDurSlots={timeDurSlots}
                              day={day}
                              cellPath={`checkedInterSlots[${interviewIdx}].slots[${timeSlotIdx}].availability[${day}]`}
                              checkedTimeDur={avail[String(day)]}
                            />
                          );
                        })
                      )}
                    </>
                  }
                />
              );
            })}
          </>
        }
      />
      <Drawer
        anchor='right'
        open={editedIntId.length !== 0}
        onClose={() => {
          setEditedIntId('');
        }}
      >
        <Stack width={'400px'}>
          {editedIntId && (
            <PanelRowDialog
              onClose={() => {
                setEditedIntId('');
              }}
              intId={editedIntId}
            />
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default PanelRow;

const PanelRowDialog = ({ onClose, intId }) => {
  const interviewers = useAvailableStore((state) => state.interviewers);
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const interviewer = interviewers.find((i) => i.interviewerId === intId);
  const cntReq = countSlotStatus(interviewer.slots, 'requested', timeSlot);
  const cntConf = countSlotStatus(interviewer.slots, 'confirmed', timeSlot);

  let dateKeys = Object.keys(
    interviewer.slots.find((s) => s.timeDuration === timeSlot).availability,
  );

  let reqStatusgroupedSlots = groupSlots(
    interviewer,
    interviewer.slots.find((s) => s.timeDuration === timeSlot).availability,
    'requested',
  );

  let confirmStatusgroupedSlots = groupSlots(
    interviewer,
    interviewer.slots.find((s) => s.timeDuration === timeSlot).availability,
    'confirmed',
  );

  return (
    <>
      <SidebarViewSlots
        isConfirmedSlots={cntConf > 0}
        isRequestedSlots={cntReq > 0}
        onClickClose={{
          onClick: onClose,
        }}
        onClickResendRequest={{
          onClick: () => {
            //
          },
        }}
        textConfirmedSlotsNumber={cntConf}
        textRequestedSlotsNumber={cntReq}
        slotPanelMember={
          <>
            <PanelMember
              slotMemberAvatar={
                <>
                  <MuiAvatar
                    height='30px'
                    width='30px'
                    src={interviewer.profileImg}
                    variant='circular'
                    level={interviewer.interviewerName}
                    fontSize='12px'
                  />
                </>
              }
              textMemberName={interviewer.interviewerName}
            />
          </>
        }
        slotConfirmedSlots={
          <>
            {dateKeys.map((dateKey) => {
              let eventsKey = Object.keys(
                confirmStatusgroupedSlots[String(dateKey)],
              ).filter(
                (timeKey) =>
                  confirmStatusgroupedSlots[String(dateKey)][String(timeKey)]
                    .length > 0,
              );
              if (eventsKey.length === 0) return <></>;

              return (
                <GroupedSlots
                  key={dateKey}
                  textDate={dayjs(dateKey).format('MMMM DD YYYY')}
                  slotTimeRange={eventsKey.map((timeKey) => {
                    let timeRange =
                      confirmStatusgroupedSlots[String(dateKey)][
                        String(timeKey)
                      ][0];
                    let textTime = `${dayjs(timeRange?.startTime).format(
                      'hh:mm A',
                    )} - ${dayjs(timeRange?.endTime).format('hh:mm A')}`;
                    return (
                      <TimeRangeConfirmed
                        key={textTime}
                        textTimeRange={textTime}
                      />
                    );
                  })}
                />
              );
            })}
          </>
        }
        slotRequestedSlots={
          <>
            {dateKeys.map((dateKey) => {
              let eventsKey = Object.keys(
                reqStatusgroupedSlots[String(dateKey)],
              ).filter(
                (timeKey) =>
                  reqStatusgroupedSlots[String(dateKey)][String(timeKey)]
                    .length > 0,
              );
              if (eventsKey.length === 0) return <></>;

              return (
                <GroupedSlots
                  key={dateKey}
                  textDate={dayjs(dateKey).format('MMMM DD YYYY')}
                  slotTimeRange={eventsKey.map((timeKey) => {
                    let timeRange =
                      reqStatusgroupedSlots[String(dateKey)][
                        String(timeKey)
                      ][0];
                    let textTime = `${dayjs(timeRange?.startTime).format(
                      'hh:mm A',
                    )} - ${dayjs(timeRange?.endTime).format('hh:mm A')}`;
                    return (
                      <TimeRangeRequested
                        key={textTime}
                        textTimeRange={textTime}
                      />
                    );
                  })}
                />
              );
            })}
          </>
        }
      />
    </>
  );
};
