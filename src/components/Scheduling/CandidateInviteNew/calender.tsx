import { Stack, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { AvailableTimeRange, CandidateCalender, DayColumn } from '@/devlink';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';

export type CandidateInviteCalendarProps = {
  sessions: {
    date: string;
    slots: ReturnType<
      typeof useCandidateInvite
    >['invites']['data']['allSlots'][number][number];
  }[];
  selections: ReturnType<typeof useCandidateInvite>['selectedSlots'];
  handleSelect: (
    // eslint-disable-next-line no-unused-vars
    session: ReturnType<typeof useCandidateInvite>['selectedSlots'][number],
  ) => void;
};
const CandidateInviteCalendar = (props: CandidateInviteCalendarProps) => {
  const xl = useMediaQuery('(min-width:1920px)');
  const l = useMediaQuery('(min-width:1440px)');
  const m = useMediaQuery('(min-width:1024px)');
  const s = useMediaQuery('(min-width:768px)');
  const columns = xl ? 5 : l ? 4 : m ? 3 : s ? 2 : 1;
  const [offset, setOffest] = useState(0);
  const sessions = props.sessions.slice(offset, offset + columns);
  const startMonth = dayjs(sessions[0].date).format('MMMM YYYY');
  const endMonth = dayjs(sessions[sessions.length - 1].date).format(
    'MMMM YYYY',
  );
  const displayMonth =
    startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
  return (
    <CandidateCalender
      slotDayColumn={
        <Columns
          sessions={sessions}
          handleSelect={props.handleSelect}
          selections={props.selections}
        />
      }
      isLeftArrow={offset !== 0}
      isRightArrow={props.sessions.length - columns > offset}
      textMonth={displayMonth}
      slotTimeZone={<></>}
      onClickLeft={{ onClick: () => setOffest((prev) => prev - 1) }}
      onClickRight={{ onClick: () => setOffest((prev) => prev + 1) }}
    />
  );
};

export default CandidateInviteCalendar;

const Columns = (props: CandidateInviteCalendarProps) => {
  const columns = props.sessions.map((session) => (
    <Column
      key={session.date}
      session={session}
      selections={props.selections}
      handleSelect={props.handleSelect}
    />
  ));
  return (
    <Stack direction={'row'} gap={2}>
      {columns}
    </Stack>
  );
};

type ColumnType = {
  session: CandidateInviteCalendarProps['sessions'][number];
  selections: CandidateInviteCalendarProps['selections'];
  handleSelect: CandidateInviteCalendarProps['handleSelect'];
};
const Column = (props: ColumnType) => {
  const [date, day] = dayjs(props.session.date).format('DD ddd').split(' ');
  return (
    <Stack flexGrow={1}>
      <DayColumn
        textDate={date}
        textDay={day}
        slotAvailableTimeRange={
          <Slots
            slots={props.session.slots}
            selections={props.selections}
            handleSelect={props.handleSelect}
          />
        }
      />
    </Stack>
  );
};

type SlotsType = {
  slots: ColumnType['session']['slots'];
  selections: ColumnType['selections'];
  handleSelect: ColumnType['handleSelect'];
};
const Slots = (props: SlotsType) => {
  const slots = props.slots.map((slot, i) => {
    return (
      <Stack key={i} onClick={() => props.handleSelect(slot)}>
        <Slot slot={slot} isActive={props.selections.includes(slot)} />
      </Stack>
    );
  });
  return <>{slots}</>;
};

type SlotType = {
  slot: SlotsType['slots'][number];
  isActive: boolean;
};
const Slot = (props: SlotType) => {
  const count = props.slot.sessions.length;
  const timing = `${dayjs(props.slot.sessions[0].start_time).format(
    'hh:mm A',
  )} - ${dayjs(props.slot.sessions[count - 1].end_time).format('hh:mm A')}`;
  return <AvailableTimeRange textTime={timing} isActive={props.isActive} />;
};
