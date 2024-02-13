import dayjs from 'dayjs';
import React from 'react';

import {
  PanelDetailMemberRow,
  PanelDetailTable,
  PanelMember,
} from '@/devlink2';

import AvailabilityCell from './AvailabilityCell';
import { useAvailableStore } from './store';
import MuiAvatar from '../../Common/MuiAvatar';

const PanelRow = () => {
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);
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
            {interviewers?.map((int, interviewIdx) => {
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

              // // interviewers;
              let timeSlotIdx = interviewers[
                String(interviewIdx)
              ].slots.findIndex((s) => s.timeDuration === timeSlot);

              return (
                <PanelDetailMemberRow
                  key={int.interviewerId}
                  slotBodyCells={
                    <>
                      {timeSlotKeys.slice(0, 5).map((day) => {
                        return (
                          <AvailabilityCell
                            key={day}
                            timeDurSlots={timeDurSlots}
                            day={day}
                            cellPath={`checkedInterSlots[${interviewIdx}].slots[${timeSlotIdx}].availability[${day}]`}
                            checkedTimeDur={avail[String(day)]}
                          />
                        );
                      })}
                    </>
                  }
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
                      {/* <MemberSlotInfo
                                          isCalenderNotConnected
                                        /> */}
                    </>
                  }
                />
              );
            })}
          </>
        }
      />
    </>
  );
};

export default PanelRow;
