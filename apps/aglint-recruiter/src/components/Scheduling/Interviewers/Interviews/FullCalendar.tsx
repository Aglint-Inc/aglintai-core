import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Stack, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';

import { SchedulesSupabase } from '../../schedules-query';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { ProgressHoverCard } from '@/devlink/ProgressHoverCard';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import { getFullName } from '@aglint/shared-utils';
import { useRouter } from 'next/router';
import './customFullCalendar.css';

type Modes = 'list' | 'calendar';
type Types = 'day' | 'week' | 'month';

function FullCalendarComp({
  allSchedules,
  // isLoading,
  // filter,
  // setFilter,
  // changeText,
  // setChangeText,
}: {
  allSchedules: SchedulesSupabase;
  isLoading: boolean;
  filter: DatabaseTable['interview_meeting']['status'];
  setFilter: Dispatch<
    SetStateAction<DatabaseTable['interview_meeting']['status']>
  >;
  changeText: string;
  setChangeText: Dispatch<SetStateAction<string>>;
}) {
  const [currentDate, setCurrentDate] = useState(null);
  const [mode, setMode] = useState<Modes>('list');
  const [type, setType] = useState<Types>('day');

  const calendarRef = useRef(null);

  let events = allSchedules.map((sch) => ({
    title: sch.session_name,
    start: sch.start_time,
    end: sch.end_time,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    // borderColor: colorPick(sch.status).pri,
    extendedProps: {
      data: sch,
      color: colorPick(sch.status),
    },
  }));

  const calendarApi = calendarRef.current?.getApi();
  const currentViewType = calendarApi?.view?.type;

  const handleDatesSet = (are) => {
    setCurrentDate(are);
  };

  const dateFormat = {
    timeGridWeek: 'DD',
    timeGridDay: 'DD MMM YYYY',
    dayGridMonth: 'MMMM YYYY',
    listWeek: 'DD',
    listDay: 'DD MMM YYYY',
    listMonth: 'MMMM YYYY',
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
      // day: 'dayGridDay',
      // week: 'dayGridWeek',
      month: 'dayGridMonth',
    },
  };
  const handleMode = (value: Modes) => {
    setMode(value);
    // eslint-disable-next-line security/detect-object-injection
    const newView = view[value][type];
    calendarApi?.changeView(newView);
  };
  const handleType = (value: Types) => {
    setType(value);
    // eslint-disable-next-line security/detect-object-injection
    const newView = view[mode][value];
    calendarApi?.changeView(newView);
  };

  const checkDate = dayjsLocal(); // Replace with the date you want to check

  const isThisWeekrMonth =
    checkDate.isAfter(currentDate?.startStr) &&
    checkDate.isBefore(currentDate?.endStr);

  return (
    <>
      <Stack p={2} width={'900px'} height={'400px'}>
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack direction={'row'} spacing={1}>
            <ButtonSoft
              textButton='List'
              color={mode === 'list' ? 'accent' : 'neutral'}
              size={1}
              onClickButton={{
                onClick: () => {
                  handleMode('list');
                },
              }}
            />
            <ButtonSoft
              textButton='Calendar'
              color={mode === 'calendar' ? 'accent' : 'neutral'}
              size={1}
              onClickButton={{
                onClick: () => {
                  handleMode('calendar');
                },
              }}
            />
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            spacing={2}
            alignItems={'center'}
            minWidth={'200px'}
          >
            <IconButtonSoft
              size={1}
              iconSize={2}
              color={'neutral'}
              iconName='arrow_back_ios'
              onClickButton={{ onClick: () => calendarApi.prev() }}
            />
            <Typography fontWeight={500}>
              {/* {currentViewType === 'listWeek' ||
              currentViewType === 'dayGridWeek' */}
              {currentViewType === 'listWeek' ||
              currentViewType === 'timeGridWeek'
                ? `${dayjsLocal(currentDate?.startStr).format('MMM DD ')} - ${dayjsLocal(currentDate?.endStr).format('DD YYYY')}`
                : dayjsLocal(currentDate?.startStr).format(
                    // eslint-disable-next-line security/detect-object-injection
                    dateFormat[currentViewType],
                  )}
            </Typography>
            <IconButtonSoft
              size={1}
              iconSize={2}
              color={'neutral'}
              iconName='arrow_forward_ios'
              onClickButton={{
                onClick: () => {
                  calendarApi.next();
                },
              }}
            />
          </Stack>
          <Stack
            minWidth={'250px'}
            direction={'row'}
            justifyContent={'flex-end'}
            spacing={1}
          >
            {!dayjsLocal(currentDate?.startStr).isToday() &&
              !isThisWeekrMonth && (
                <ButtonSoft
                  size={1}
                  color={'neutral'}
                  textButton='Today'
                  onClickButton={{ onClick: () => calendarApi?.today() }}
                />
              )}
            <ButtonSoft
              textButton='Day'
              size={1}
              color={type === 'day' ? 'accent' : 'neutral'}
              onClickButton={{ onClick: () => handleType('day') }}
            />
            <ButtonSoft
              textButton='Week'
              color={type === 'week' ? 'accent' : 'neutral'}
              size={1}
              onClickButton={{ onClick: () => handleType('week') }}
            />
            <ButtonSoft
              textButton='Month'
              color={type === 'month' ? 'accent' : 'neutral'}
              size={1}
              onClickButton={{ onClick: () => handleType('month') }}
            />
          </Stack>
        </Stack>

        <FullCalendar
          ref={calendarRef}
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            listPlugin,
            timeGridPlugin,
          ]}
          headerToolbar={{
            // left: 'prev,next today',
            left: '',
            center: '',
            right: '',
          }}
          initialView='listMonth'
          initialEvents={events}
          eventContent={renderEventContent}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          allDaySlot={false}
          resources={events}
          datesSet={handleDatesSet}
        />
      </Stack>
    </>
  );
}

export default FullCalendarComp;

// "waiting" | "confirmed" | "completed" | "cancelled" | "reschedule" | "not_scheduled"

type colorType = { bg: string; pri: string } | null;

function renderEventContent(eventInfo) {
  const { data, color } = eventInfo.event.extendedProps;

  console.log(data);
  return (
    <CustomTooltip title={<TooltipComp data={data} />}>
      <Stack
        bgcolor={color?.bg}
        borderRadius={'4px'}
        sx={{
          padding: '5px 10px',
          borderLeft: `3px solid ${color.pri}`,
        }}
      >
        <Typography fontWeight={500}>{eventInfo.event.title}</Typography>
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
        textScheduleDate={`${dayjsLocal(data.start_time).format('MMM DD YYYY hh:mm A')} - ${dayjsLocal(data.end_time).format('MMM DD YYYY hh:mm A')}`}
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
