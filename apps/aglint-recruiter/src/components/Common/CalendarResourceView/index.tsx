import './customcss.css';

import { dayjsLocal } from '@aglint/shared-utils';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';

import RenderEventContent from './RenderEventContent';
import RenderResourceContent from './RenderResource';
import { type Event, type Resource } from './types';

function CalendarResourceView({
  events,
  resources,
  dateRange,
  currentDate,
  setCurrentDate,
  isLoading = false,
}: {
  events: Event[];
  resources: Resource[];
  dateRange: {
    start: string;
    end: string;
  };
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}) {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  useEffect(() => {
    calendarApi?.gotoDate(currentDate);
  }, [currentDate]);

  return (
    <Stack
      sx={{
        maxWidth: 'calc(100vw - 700px)',
        overflowY: 'auto',
        height: '100vh',
        width: '100%',
      }}
    >
      <CalendarHeader
        currentDate={currentDate}
        dateRange={dateRange}
        setCurrentDate={setCurrentDate}
        isLoading={isLoading}
      />

      <Stack minWidth={`${resources.length * 250}px`}>
        <FullCalendar
          key={events.length}
          ref={calendarRef}
          plugins={[resourceTimeGridPlugin]}
          initialView={'resourceTimeGridDay'}
          nowIndicator={true}
          editable={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '09:00',
            endTime: '17:00',
          }}
          allDaySlot={false}
          resources={resources}
          resourceLabelContent={RenderResourceContent}
          events={
            isLoading
              ? [
                  {
                    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
                    startTime: '00:00',
                    endTime: '24:00',
                    display: 'background',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    extendedProps: {
                      isLoading: true,
                    },
                  },
                ]
              : [...events]
          }
          height='auto'
          eventContent={RenderEventContent}
          slotLabelInterval={'01:00:00'}
          slotDuration={'01:00:00'}
          initialDate={currentDate}
        />
      </Stack>
    </Stack>
  );
}

export default CalendarResourceView;

const CalendarHeader = ({
  currentDate,
  dateRange,
  setCurrentDate,
  isLoading,
}: {
  currentDate: string;
  dateRange: {
    start: string;
    end: string;
  };
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          p={1}
          bgcolor={'#fff'}
          minHeight={'47px'}
        >
          <IconButtonSoft
            size={1}
            iconSize={1}
            color={'neutral'}
            iconName='arrow_back_ios'
            isDisabled={dayjsLocal(dateRange.start).isSame(currentDate, 'day')}
            onClickButton={{
              onClick: () => {
                if (dayjsLocal(dateRange.start).isSame(currentDate, 'day'))
                  return;
                setCurrentDate(
                  dayjsLocal(currentDate).subtract(1, 'day').toISOString(),
                );
              },
            }}
          />
          <Typography fontWeight={500}>
            {dayjsLocal(currentDate).format('DD MMM YYYY')}
          </Typography>
          <IconButtonSoft
            size={1}
            iconSize={1}
            color={'neutral'}
            iconName='arrow_forward_ios'
            isDisabled={dayjsLocal(dateRange.end).isSame(currentDate, 'day')}
            onClickButton={{
              onClick: () => {
                if (dayjsLocal(dateRange.end).isSame(currentDate, 'day'))
                  return;
                setCurrentDate(
                  dayjsLocal(currentDate).add(1, 'day').toISOString(),
                );
              },
            }}
          />
        </Stack>
      )}
    </>
  );
};
