import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Stack, Typography } from '@mui/material';
import { useSchedulingFlowStore } from '../store';
import './customcss.css';
import { dayjsLocal } from '@aglint/shared-utils';
import MuiAvatar, { getStringColor } from '@/src/components/Common/MuiAvatar';
import { useRef, useState } from 'react';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { DatesSetArg } from '@fullcalendar/core';

type Event = {
  start: string;
  end: string;
  title: string;
  resourceId: string;
  id: string;
};

function Calendar() {
  const [currentDate, setCurrentDate] = useState<DatesSetArg>(null);

  const { availabilities } = useSchedulingFlowStore((state) => ({
    availabilities: state.availabilities,
  }));

  const intArray = Object.entries(availabilities).map(([key, value]) => ({
    ...value,
  }));

  const events = intArray.flatMap((cal) =>
    cal.all_events.flatMap((event) => {
      const data = {
        start: event.start.dateTime,
        end: event.end.dateTime,
        title: event.summary,
        resourceId: cal.interviewer_id,
        id: event.id,
      };
      return {
        ...data,
        extendedProps: {
          data: data,
          color: getStringColor(cal.name.charCodeAt(0)),
        },
      };
    }),
  );

  const resources = intArray.map((cal) => ({
    id: cal.interviewer_id,
    title: cal.name,
    extendedProps: {
      data: {
        id: cal.interviewer_id,
        profile_pic: cal.profile_image,
        email: cal.email,
        name: cal.name,
      },
      color: getStringColor(cal.name.charCodeAt(0)),
    },
  }));

  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  return (
    <Stack
      sx={{
        width: 'calc(100vw - 860px)',
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <CalendarHeader calendarApi={calendarApi} currentDate={currentDate} />
      <Stack>
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimeGridPlugin]}
          initialView={'resourceTimeGridDay'}
          nowIndicator={false}
          editable={true}
          allDaySlot={false}
          resources={resources}
          resourceLabelContent={renderResourceContent}
          events={events}
          height='auto'
          datesSet={(arg) => setCurrentDate(arg)}
          eventContent={renderEventContent}
          views={{
            resources: {
              dayMaxEventRows: 2,
            },
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Calendar;

function renderEventContent(eventInfo) {
  const {
    data,
    color,
  }: { data: Event; color: ReturnType<typeof getStringColor> } =
    eventInfo.event.extendedProps;

  return (
    <Stack
      sx={{
        padding: '5px 10px',
        border: `1px solid ${color.bg}`,
        overflow: 'hidden',
        width: '100%',
        height: '30px',
        borderRadius: '4px',
        bgcolor: color.text,
        color: 'white',
      }}
    >
      <Typography fontSize={'10px'} color={'white'}>
        {data.title}
      </Typography>
    </Stack>
  );
}

function renderResourceContent(resourceInfo) {
  const {
    data,
  }: {
    data: {
      id: string;
      profile_pic: string;
      email: string;
      name: string;
    };
  } = resourceInfo.resource.extendedProps;

  return (
    <Stack direction={'row'} gap={1} p={1}>
      <MuiAvatar
        src={data.profile_pic}
        level={data.name}
        variant='circular'
        width='20px'
        height='20px'
        fontSize='10px'
      />
      <Typography>{data.name}</Typography>
    </Stack>
  );
}

const CalendarHeader = ({
  calendarApi,
  currentDate,
}: {
  calendarApi: any;
  currentDate: DatesSetArg;
}) => {
  return (
    <Stack
      direction={'row'}
      spacing={2}
      alignItems={'center'}
      justifyContent={'center'}
      minWidth={'200px'}
      p={1}
      sx={{
        position: 'sticky',
        top: 0,
      }}
    >
      <IconButtonSoft
        size={1}
        iconSize={2}
        color={'neutral'}
        iconName='arrow_back_ios'
        onClickButton={{ onClick: () => calendarApi.prev() }}
      />
      <Typography fontWeight={500}>
        {dayjsLocal(currentDate?.startStr).format('DD MMM YYYY')}
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
  );
};
