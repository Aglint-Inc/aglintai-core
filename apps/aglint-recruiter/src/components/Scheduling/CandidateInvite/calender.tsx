import { Calendar } from 'lucide-react';

import { UITimeRangeCard } from '@/components/Common/UITimeRangeCard';
import { type useCandidateInvite } from '@/context/CandidateInviteContext';
import { type useInviteSlots } from '@/queries/candidate-invite';
import dayjs from '@/utils/dayjs';

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
  // const s = useMediaQuery('(min-width:768px)');

  const sessions = props.sessions;
  const startMonth = sessions[0]?.date
    ? dayJS(sessions[0].date, props.tz).format('MMMM YYYY')
    : null;
  const endMonth = sessions[sessions.length - 1]?.date
    ? dayJS(sessions[sessions.length - 1].date, props.tz).format('MMMM YYYY')
    : null;
  const displayMonth =
    startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;

  return (
    <>
      <CandidateCalender
        slotDayColumn={<Columns {...props} sessions={sessions} />}
        textMonth={displayMonth}
      />
    </>
  );
};

export default CandidateInviteCalendar;

function CandidateCalender({
  slotDayColumn,

  textMonth,
}: {
  slotDayColumn: React.ReactNode;

  textMonth: string;
}) {
  return (
    <div className='flex flex-col h-[500px]  border border-neutral-200 rounded-md bg-white overflow-hidden'>
      <div className='flex justify-between items-center h-10 px-4 border-b border-neutral-200 bg-neutral-100'>
        <div className='flex items-center space-x-1'>
          <Calendar className='w-5 h-5 text-neutral-700' />
          <span className='font-medium'>{textMonth}</span>
        </div>
      </div>
      <div className='flex gap-2 p-2 items-center justify-center overflow-auto'>
        {slotDayColumn}
      </div>
    </div>
  );
}

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
  return columns;
};

type ColumnType = {
  session: CandidateInviteCalendarProps['sessions'][number];
  selections: CandidateInviteCalendarProps['selections'];
  handleSelect: CandidateInviteCalendarProps['handleSelect'];
  tz: CandidateInviteCalendarProps['tz'];
};

const Column = (props: ColumnType) => {
  const date = dayJS(props.session.date, props.tz);
  return (
    <div className='relative min-w-[237px] max-w-[237px]  flex-1 border border-gray-200 rounded-lg'>
      <div className='flex h-10 justify-center items-center bg-gray-50 rounded-t-lg px-2.5'>
        <div>{dayjs(date).format('dddd DD, MMMM')}</div>
      </div>

      <div className='h-[390px] overflow-auto p-2.5 gap-2 flex flex-col'>
        <Slots
          slots={props.session.slots}
          selections={props.selections}
          handleSelect={props.handleSelect}
          tz={props.tz}
        />
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
  const slots = props.slots.map((slot, i) => {
    const count = slot.sessions.length;
    const timing = `${dayJS(slot.sessions[0].start_time, props.tz).format(
      'hh:mm A',
    )} - ${dayJS(slot.sessions[count - 1].end_time, props.tz).format(
      'hh:mm A',
    )}`;
    const isActive = props.selections.includes(slot);
    return (
      <UITimeRangeCard
        ShowCloseIcon={false}
        key={i}
        textTime={timing}
        isActive={isActive}
        onClickTime={() => props.handleSelect(slot)}
      />
    );
  });
  return <>{slots}</>;
};
