import '@styles/fullcalendar-theme.css';

import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { GlobalBadge } from '@devlink/GlobalBadge';
import { ProgressHoverCard } from '@devlink/ProgressHoverCard';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { capitalizeAll } from '@/utils/text/textUtils';

import { type SchedulesSupabase } from '../../Scheduling/schedules-query';
import Loader from '../Loader';
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
    <>
      <Stack p={2} width={'900px'} height={'624px'} spacing={2}>
        {isLoading ? (
          <Stack
            width={'900px'}
            height={'400px'}
            display={'flex'}
            alignItems={'center'}
          >
            <Loader />
          </Stack>
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
            <Stack>
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
            </Stack>
            <CalendarFilter filter={filter} setFilter={setFilter} />
          </>
        )}
      </Stack>
    </>
  );
}

export default CalendarComp;

function renderEventContent(eventInfo) {
  const { data, color } = eventInfo.event.extendedProps;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={{
            backgroundColor: color?.bg,
            borderRadius: '4px',
            padding: '5px 10px',
            borderLeft: `3px solid ${color.pri}`,
            width: '100%',
          }}
        >
          <p style={{ fontWeight: 500 }}>{eventInfo.event.title}</p>
          <p style={{ fontSize: '10px' }}>
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
    ? { bg: 'var(--info-3)', pri: 'var(--info-11)' }
    : status === 'completed'
      ? { bg: 'var(--success-3)', pri: 'var(--success-11)' }
      : status === 'canceled'
        ? { bg: 'var(--error-3)', pri: 'var(--error-11)' }
        : null;
};

const TooltipComp = ({ data }) => {
  const router = useRouter();
  return (
    <Stack>
      <ProgressHoverCard
        textScheduleName={data?.session_name}
        textDuration={`${data?.session_duration} minutes`}
        textMeetingType={capitalizeAll(data?.schedule_type)}
        isScheduleDate={true}
        textScheduleDate={`${dayjsLocal(data.start_time).format('ddd, MMM DD, YYYY hh:mm A')} - ${dayjsLocal(data.end_time).format(' hh:mm A')}`}
        slotScheduleStatus={
          <GlobalBadge
            textBadge={capitalizeAll(data?.status)}
            color={
              data?.status === 'completed'
                ? 'success'
                : data?.status === 'canceled'
                  ? 'error'
                  : data?.status === 'confirmed'
                    ? 'info'
                    : null
            }
          />
        }
      />
      <Stack sx={{ padding: '0 16px 16px 16px' }} spacing={1}>
        <Typography>
          Candidate :{' '}
          {getFullName(
            data.applications.candidates.first_name,
            data.applications.candidates.last_name,
          )}
        </Typography>
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
      </Stack>
    </Stack>
  );
};
