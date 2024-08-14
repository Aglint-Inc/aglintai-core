import '@styles/fullcalendar-theme.css';

import { DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { ProgressHoverCard } from '@/devlink/ProgressHoverCard';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import Loading from '@/src/pages/loading';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { SchedulesSupabase } from '../../Scheduling/schedules-query';
import CalendarHeader from './CalendarHeader';
import { colorType, event, Modes, Types } from './calendarTypes';

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
  const [viewMode, setViewMode] = useState<Modes>('list');
  const [viewType, setViewType] = useState<Types>('day');
  const [events, setEvents] = useState<event[]>([]);

  const calendarRef = useRef(null);

  useEffect(() => {
    let event: event[] = allSchedules.map((sch) => ({
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
      <Stack p={2} width={'1200px'} height={'624px'} spacing={2}>
        {isLoading ? (
          <Stack
            width={'900px'}
            height={'400px'}
            display={'flex'}
            alignItems={'center'}
          >
            <Loading />
          </Stack>
        ) : (
          <>
            <CalendarHeader
              calendarApi={calendarApi}
              currentDate={currentDate}
              filter={filter}
              setFilter={setFilter}
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
    <CustomTooltip title={<TooltipComp data={data} />}>
      <Stack
        bgcolor={color?.bg}
        borderRadius={'4px'}
        sx={{
          padding: '5px 10px',
          borderLeft: `3px solid ${color.pri}`,
          width: '100%',
        }}
      >
        <Typography fontWeight={500}>{eventInfo.event.title}</Typography>
        <Typography fontSize={'10px'}>
          {dayjsLocal(data.start_time).format('hh:mm A -')}
          {dayjsLocal(data.end_time).format('hh:mm A')}
        </Typography>
      </Stack>
    </CustomTooltip>
  );
}

const colorPick = (status): colorType => {
  return status === 'confirmed'
    ? { bg: 'var(--info-3)', pri: 'var(--info-11)' }
    : status === 'completed'
      ? { bg: 'var(--success-3)', pri: 'var(--success-11)' }
      : status === 'cancelled'
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
                : data?.status === 'cancelled'
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
        <ButtonSoft
          color={'neutral'}
          size={1}
          textButton='View Details'
          iconName='north_east'
          iconSize={2}
          isRightIcon
          onClickButton={{
            onClick: () =>
              router.push(
                `/scheduling/view?meeting_id=${
                  data.meeting_interviewers[0].meeting_id
                }&tab=candidate_details`,
              ),
          }}
        />
      </Stack>
    </Stack>
  );
};
