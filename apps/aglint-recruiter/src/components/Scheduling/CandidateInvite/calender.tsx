import { Button } from '@components/ui/button';
import { CandidateCalender } from '@devlink/CandidateCalender';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

import { type useCandidateInvite } from '@/context/CandidateInviteContext';
import { type useInviteSlots } from '@/queries/candidate-invite';

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
  const [columns, setColumns] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1920) setColumns(4);
      else if (window.innerWidth >= 1440) setColumns(3);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      onClickLeft={{ onClick: () => setOffset((prev) => prev - 1) }}
      onClickRight={{ onClick: () => setOffset((prev) => prev + 1) }}
    />
  );
};

export default CandidateInviteCalendar;

const Columns = (props: CandidateInviteCalendarProps) => {
  return (
    <div className='flex flex-row gap-4'>
      {props.sessions.map((session) => (
        <Column
          key={session.date}
          session={session}
          selections={props.selections}
          handleSelect={props.handleSelect}
          tz={props.tz}
        />
      ))}
    </div>
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
    <div className='flex-grow'>
      <div className='flex flex-col items-center'>
        <div className='text-2xl font-bold'>{date}</div>
        <div className='text-lg text-gray-600'>{day}</div>
        <div className='mt-4 w-full'>
          <Slots
            slots={props.session.slots}
            selections={props.selections}
            handleSelect={props.handleSelect}
            tz={props.tz}
          />
        </div>
      </div>
    </div>
  );
};

type SlotsType = {
  slots: ColumnType['session']['slots'];
  selections: ColumnType['selections'];
  handleSelect: ColumnType['handleSelect'];
  tz: ColumnType['tz'];
};

const Slots = (props: SlotsType) => {
  return (
    <div className='space-y-2'>
      {props.slots.map((slot, i) => (
        <div key={i} onClick={() => props.handleSelect(slot)}>
          <Slot
            slot={slot}
            isActive={props.selections.includes(slot)}
            tz={props.tz}
          />
        </div>
      ))}
    </div>
  );
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

  return (
    <Button
      variant={props.isActive ? 'default' : 'outline'}
      className='w-full justify-start text-left font-normal'
    >
      <Clock className='mr-2 h-4 w-4' />
      {timing}
    </Button>
  );
};
