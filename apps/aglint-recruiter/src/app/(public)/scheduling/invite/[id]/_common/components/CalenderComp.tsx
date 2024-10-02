import { dayjsLocal } from '@aglint/shared-utils';
import { UITimeRangeCard } from 'src/app/_common/components/UITimeRangeCard';

import { type useInviteSlots } from '../hooks/useInviteSlots';
import { type CandidateInviteType } from '../store';
import { dayJS } from '../utils/utils';
import { CandidateCalender } from './ui/CandidateCalender';

export type CandidateInviteCalendarProps = {
  sessions: {
    date: string;
    slots: NonNullable<
      NonNullable<ReturnType<typeof useInviteSlots>>['data']
    >[number][number];
  }[];
  selections: CandidateInviteType['selectedSlots'];
  handleSelect: (
    // eslint-disable-next-line no-unused-vars
    session: CandidateInviteType['selectedSlots'][number],
  ) => void;
  tz: Parameters<typeof dayJS>[1];
};

const CandidateInviteCalendar = (props: CandidateInviteCalendarProps) => {
  // const s = useMediaQuery('(min-width:768px)');

  const sessions = props.sessions;
  const startMonth = sessions[0]?.date
    ? dayJS(sessions[0].date, props.tz).format('MMMM YYYY')
    : '';
  const endMonth = sessions[sessions.length - 1]?.date
    ? dayJS(sessions[sessions.length - 1].date, props.tz).format('MMMM YYYY')
    : '';
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
    <div className='relative min-w-[237px] max-w-[237px] flex-1 rounded-lg border border-gray-200'>
      <div className='flex h-10 items-center justify-center rounded-t-lg bg-gray-50 px-2.5'>
        <div>{dayjsLocal(date).format('dddd DD, MMMM')}</div>
      </div>

      <div className='flex h-[390px] flex-col gap-2 overflow-auto p-2.5'>
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
