import axios from 'axios';

import {
  MemberSlotInfo,
  PanelDetailMemberRow,
  PanelMember,
  TableBodyCell,
  UserTimezone,
} from '@/devlink2';
import toast from '@/src/utils/toast';

import { InterviewerType } from './availability.types';
import AvailabilityCell from './AvailabilityCell';
import { getDateRangeKeys } from './CalenderHeaderRow';
import { useAvailableStore } from './store';
import MuiAvatar from '../../Common/MuiAvatar';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

const InterviewerRow = ({
  interviewer,
  interviewIdx,
  setEditedIntId,
}: {
  interviewer: InterviewerType;
  interviewIdx: number;
  setEditedIntId;
}) => {
  const dateRangeTableView = useAvailableStore(
    (state) => state.dateRangeTableView,
  );

  const interviewers = useAvailableStore((state) => state.interviewers);
  const isCalenderLoading = useAvailableStore(
    (state) => state.isCalenderLoading,
  );
  const timeSlot = useAvailableStore((state) => state.timeSlot);

  if (!interviewer.isMailConnected)
    return <MaiLConnectInterviewer interviewer={interviewer} />;

  let timeDurSlots = interviewer.slots.find((t) => t.timeDuration === timeSlot);
  let timeSlotKeys = getDateRangeKeys(dateRangeTableView);

  let timeSlotIdx = interviewers[String(interviewIdx)].slots.findIndex(
    (s) => s.timeDuration === timeSlot,
  );

  const cntConfirmed = interviewer.slots.find(
    (s) => s.timeDuration === timeSlot,
  ).cntConfirmed;
  const cntRequested = interviewer.slots.find(
    (s) => s.timeDuration === timeSlot,
  ).cntRequested;

  return (
    <>
      <PanelDetailMemberRow
        slotMember={
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
            <UserTimezone textTimeZone={interviewer.timeZone} />
            {cntConfirmed + cntRequested > 0 && (
              <MemberSlotInfo
                onClickViewSlots={{
                  onClick: () => {
                    setEditedIntId(interviewer.interviewerId);
                  },
                }}
                isCalenderNotConnected={!interviewer.isMailConnected}
                isConfirmedSlots={cntConfirmed > 0}
                isRequestedSlots={cntRequested > 0}
                textRequestedSlotNumber={cntRequested}
                textConfirmedSlotnumber={cntConfirmed}
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
              timeSlotKeys.map((day) => {
                return (
                  <AvailabilityCell
                    key={day}
                    timeDurSlots={timeDurSlots}
                    day={day}
                    cellPath={`checkedInterSlots[${interviewIdx}].slots[${timeSlotIdx}].availability[${day}]`}
                    timeZone={interviewer.timeZone}
                  />
                );
              })
            )}
          </>
        }
      />
    </>
  );
};

export default InterviewerRow;

const MaiLConnectInterviewer = ({
  interviewer,
}: {
  interviewer: InterviewerType;
}) => {
  const handleReqConnect = async () => {
    try {
      const { data } = await axios.get('/api/scheduling/google-consent');
      await axios.post('/api/sendgrid', {
        email: interviewer.email,
        subject: 'Connect Calender',
        text: data,
      });
      toast.success('Calender connect invite sent');
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  return (
    <PanelDetailMemberRow
      slotMember={
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
          <MemberSlotInfo
            onClickAskToConnectCalender={{
              onClick: handleReqConnect,
            }}
            isCalenderNotConnected={!interviewer.isMailConnected}
          />
        </>
      }
      slotBodyCells={
        <>
          <TableBodyCell />
          <TableBodyCell />
          <TableBodyCell />
          <TableBodyCell />
          <TableBodyCell />
        </>
      }
    />
  );
};
