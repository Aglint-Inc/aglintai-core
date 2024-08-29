import './customcss.css';

import { dayjsLocal } from '@aglint/shared-utils';
import { DatesSetArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';

import RenderEventContent from './RenderEventContent';
import RenderResourceContent from './RenderResource';
import { Event, Resource } from './types';

function CalendarResourceView({
  events,
  resources,
  dateRange,
}: {
  events: Event[];
  resources: Resource[];
  dateRange: {
    start: string;
    end: string;
  };
}) {
  const [currentDate, setCurrentDate] = useState<DatesSetArg>(null);

  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  return (
    <Stack
      sx={{
        width: 'calc(100vw - 800px)',
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <CalendarHeader
        calendarApi={calendarApi}
        currentDate={currentDate}
        dateRange={dateRange}
      />

      <Stack minWidth={`${resources.length * 250}px`}>
        <FullCalendar
          key={events.length}
          ref={calendarRef}
          plugins={[resourceTimeGridPlugin]}
          initialView={'resourceTimeGridDay'}
          nowIndicator={true}
          editable={true}
          allDaySlot={false}
          resources={resources}
          resourceLabelContent={RenderResourceContent}
          events={events}
          height='auto'
          datesSet={(arg) => setCurrentDate(arg)}
          eventContent={RenderEventContent}
          slotLabelInterval={'01:00:00'}
          slotDuration={'01:00:00'}
        />
      </Stack>
    </Stack>
  );
}

export default CalendarResourceView;

const CalendarHeader = ({
  calendarApi,
  currentDate,
  dateRange,
}: {
  calendarApi: any;
  currentDate: DatesSetArg;
  dateRange: {
    start: string;
    end: string;
  };
}) => {
  return (
    <Stack
      direction={'row'}
      spacing={2}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      p={1}
    >
      <IconButtonSoft
        size={1}
        iconSize={2}
        color={'neutral'}
        iconName='arrow_back_ios'
        isDisabled={dayjsLocal(dateRange.start).isSame(
          currentDate?.startStr,
          'day',
        )}
        onClickButton={{
          onClick: () => {
            if (
              dayjsLocal(dateRange.start).isSame(currentDate?.startStr, 'day')
            )
              return;
            calendarApi.prev();
          },
        }}
      />
      <Typography fontWeight={500}>
        {dayjsLocal(currentDate?.startStr).format('DD MMM YYYY')}
      </Typography>
      <IconButtonSoft
        size={1}
        iconSize={2}
        color={'neutral'}
        iconName='arrow_forward_ios'
        isDisabled={dayjsLocal(dateRange.end).isSame(
          currentDate?.startStr,
          'day',
        )}
        onClickButton={{
          onClick: () => {
            if (dayjsLocal(dateRange.end).isSame(currentDate?.startStr, 'day'))
              return;
            calendarApi.next();
          },
        }}
      />
    </Stack>
  );
};
