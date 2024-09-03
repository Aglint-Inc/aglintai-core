import { Stack, useMediaQuery } from '@mui/material';
import { useState } from 'react';

import { AvailableTimeRange } from '@/devlink/AvailableTimeRange';
import { CandidateCalender } from '@/devlink/CandidateCalender';
import { DayColumn } from '@/devlink/DayColumn';
import { type useCandidateInvite } from '@/src/context/CandidateInviteContext';
import { type useInviteSlots } from '@/src/queries/candidate-invite';

import { dayJS } from './utils';

export type CandidateInviteCalendarProps = {
  sessions: {
    date: string;
    slots: ReturnType<typeof useInviteSlots>['data'][number][number];
  }[];
  selections: ReturnType<typeof useCandidateInvite>['selectedSlots'];
  handleSelect: (
    // eslint-disable-next-line no-unused-vars
    session: ReturnType<typeof useCandidateInvite>['selectedSlots'][number],
  ) => void;
  tz: Parameters<typeof dayJS>[1];
};
const CandidateInviteCalendar = (props: CandidateInviteCalendarProps) => {
  const xl = useMediaQuery('(min-width:1920px)');
  const l = useMediaQuery('(min-width:1440px)');
  const m = useMediaQuery('(min-width:768px)');
  // const s = useMediaQuery('(min-width:768px)');
  const columns = xl ? 4 : l ? 3 : m ? 2 : 1;
  const [offset, setOffest] = useState(0);
  const sessions = props.sessions.slice(offset, offset + columns);
  const startMonth = sessions[0]?.date
    ? dayJS(sessions[0].date, props.tz).format('MMMM YYYY')
    : null;
  const endMonth = sessions[sessions.length - 1]?.date
    ? dayJS(sessions[sessions.length - 1].date, props.tz).format('MMMM YYYY')
    : null;
  const displayMonth =
    startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
  return (
    <CandidateCalender
      slotDayColumn={<Columns {...props} sessions={sessions} />}
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
      tz={props.tz}
    />
  ));
  return (
    <Stack direction={'row'} gap={1}>
      {columns}
    </Stack>
  );
};

type ColumnType = {
  session: CandidateInviteCalendarProps['sessions'][number];
  selections: CandidateInviteCalendarProps['selections'];
  handleSelect: CandidateInviteCalendarProps['handleSelect'];
  tz: CandidateInviteCalendarProps['tz'];
};
const Column = (props: ColumnType) => {
  const [date, day] = dayJS(props.session.date, props.tz)
    .format('DD ddd')
    .split(' ');
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
            tz={props.tz}
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
  tz: ColumnType['tz'];
};
const Slots = (props: SlotsType) => {
  const slots = props.slots.map((slot, i) => {
    return (
      <Stack key={i} onClick={() => props.handleSelect(slot)}>
        <Slot
          slot={slot}
          isActive={props.selections.includes(slot)}
          tz={props.tz}
        />
      </Stack>
    );
  });
  return <>{slots}</>;
};

type SlotType = {
  slot: SlotsType['slots'][number];
  tz: SlotsType['tz'];
  isActive: boolean;
};
const Slot = (props: SlotType) => {
  const count = props.slot.sessions.length;
  const timing = `${dayJS(props.slot.sessions[0].start_time, props.tz).format(
    'hh:mm A',
  )} - ${dayJS(props.slot.sessions[count - 1].end_time, props.tz).format(
    'hh:mm A',
  )}`;
  return <AvailableTimeRange textTime={timing} isActive={props.isActive} />;
};
