import dayjs from 'dayjs';

import {
  GroupedSlots,
  PanelMember,
  SidebarViewSlots,
  TimeRangeConfirmed,
  TimeRangeRequested,
} from '@/devlink2';

import { useAvailableStore } from './store';
import { countSlotStatus, groupSlots } from './utils';
import MuiAvatar from '../../Common/MuiAvatar';

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

export default PanelRowDialog;
