import '@styles/fullcalendar-theme.css';

import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRouter } from 'next/navigation';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Loader } from '@/components/Common/Loader';
import { capitalizeAll } from '@/utils/text/textUtils';

import { type SchedulesSupabase } from '../../Scheduling/schedules-query';
// import { UIBadge } from '../UIBadge';
import CalendarHeader from './CalendarHeader';
import {
  type colorType,
  type event,
  type Modes,
  type Types,
} from './calendarTypes';
import CalendarFilter from './Filter';

function CalendarComp({
  allSchedules,
  isLoading,
  filter,
  setFilter,
}: {
  allSchedules: SchedulesSupabase;
  isLoading: boolean;
  filter: DatabaseTable['interview_meeting']['status'][];
  setFilter: Dispatch<
    SetStateAction<DatabaseTable['interview_meeting']['status'][]>
  >;
}) {
  const [currentDate, setCurrentDate] = useState(null);
  const [viewMode, setViewMode] = useState<Modes>('calendar');
  const [viewType, setViewType] = useState<Types>('month');
  const [events, setEvents] = useState<event[]>([]);

  const calendarRef = useRef(null);

  useEffect(() => {
    const event: event[] = allSchedules.map((sch) => ({
      title: sch.session_name,
      start: sch.start_time,
      end: sch.end_time,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      extendedProps: {
        data: sch,
        color: colorPick(sch.status),
      },
    }));
    setEvents(event);
  }, [allSchedules]);

  const calendarApi = calendarRef.current?.getApi();

  const handleDatesSet = (are) => {
    setCurrentDate(are);
  };

  const view = {
    list: {
      day: 'listDay',
      week: 'listWeek',
      month: 'listMonth',
    },
    calendar: {
      day: 'timeGridDay',
      week: 'timeGridWeek',
      month: 'dayGridMonth',
    },
  };
  const handleMode = (value: Modes) => {
    setViewMode(value);
    // eslint-disable-next-line security/detect-object-injection
    const newView = view[value][viewType];
    calendarApi?.changeView(newView);
  };
  const handleType = (value: Types) => {
    setViewType(value);
    // eslint-disable-next-line security/detect-object-injection
    const newView = view[viewMode][value];
    calendarApi?.changeView(newView);
  };

  return (
    <div className='p-2 space-y-2'>
      {isLoading ? (
        <div className='w-[900px] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <CalendarHeader
            calendarApi={calendarApi}
            currentDate={currentDate}
            handleMode={handleMode}
            handleType={handleType}
            mode={viewMode}
            type={viewType}
          />
          <div>
            <FullCalendar
              key={events?.length}
              ref={calendarRef}
              plugins={[
                resourceTimelinePlugin,
                dayGridPlugin,
                listPlugin,
                timeGridPlugin,
              ]}
              // eslint-disable-next-line security/detect-object-injection
              initialView={view[viewMode][viewType]}
              initialEvents={events}
              eventContent={renderEventContent}
              nowIndicator={true}
              editable={true}
              selectable={false}
              selectMirror={true}
              allDaySlot={false}
              resources={events}
              datesSet={handleDatesSet}
              height='auto'
              views={{
                dayGridMonth: {
                  dayMaxEventRows: 2,
                },
              }}
            />
          </div>
          <CalendarFilter filter={filter} setFilter={setFilter} />
        </>
      )}
    </div>
  );
}

export default CalendarComp;

function renderEventContent(eventInfo) {
  const { data, color } = eventInfo.event.extendedProps;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className='w-full rounded-md p-[5px_10px]'
          style={{
            backgroundColor: color?.bg,
            borderLeft: `3px solid ${color.pri}`,
          }}
        >
          <p className='font-medium'>{eventInfo.event.title}</p>
          <p className='text-xs'>
            {dayjsLocal(data.start_time).format('hh:mm A -')}
            {dayjsLocal(data.end_time).format('hh:mm A')}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipComp data={data} />
      </TooltipContent>
    </Tooltip>
  );
}

const colorPick = (status): colorType => {
  return status === 'confirmed'
    ? { bg: 'bg-blue-200', pri: 'text-blue-700' }
    : status === 'completed'
      ? { bg: 'bg-green-200', pri: 'text-green-700' }
      : status === 'canceled'
        ? { bg: 'bg-red-200', pri: 'text-red-700' }
        : { bg: 'bg-neutral-200', pri: 'text-neutral-700' };
};

const TooltipComp = ({ data }) => {
  const router = useRouter();
  return (
    <div className='space-y-4'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{data?.session_name}</CardTitle>
          <CardDescription>
            {`${data?.session_duration} minutes`} •{' '}
            {capitalizeAll(data?.schedule_type)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <p className='text-sm'>
              {dayjsLocal(data.start_time).format('ddd, MMM DD, YYYY hh:mm A')}{' '}
              - {dayjsLocal(data.end_time).format('hh:mm A')}
            </p>
            {/* <UIBadge
              variant={
                data?.status === 'completed'
                  ? 'success'
                  : data?.status === 'canceled'
                    ? 'destructive'
                    : data?.status === 'confirmed'
                      ? 'default'
                      : 'secondary'
              }
            >
              {capitalizeAll(data?.status)}
            </UIBadge> */}
          </div>
        </CardContent>
      </Card>
      <div className='space-y-1 px-4 pb-4'>
        <p>
          Candidate:{' '}
          {getFullName(
            data.applications.candidates.first_name,
            data.applications.candidates.last_name,
          )}
        </p>
        <Button
          color={'neutral'}
          size={'sm'}
          onClick={() =>
            router.push(
              `/scheduling/view?meeting_id=${data.meeting_interviewers[0].meeting_id}&tab=candidate_details`,
            )
          }
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
