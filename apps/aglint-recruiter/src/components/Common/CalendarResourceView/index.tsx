import './customcss.css';

import { dayjsLocal } from '@aglint/shared-utils';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

import { UIButton } from '../UIButton';
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
  businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    startTime: '00:00',
    endTime: '24:00',
  },
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
  businessHours?: {
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
  };
}) {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  useEffect(() => {
    calendarApi?.gotoDate(currentDate);
  }, [currentDate]);

  return (
    <div className='h-screen max-w-[calc(100vw-600px)] overflow-y-auto'>
      <CalendarHeader
        currentDate={currentDate}
        dateRange={dateRange}
        setCurrentDate={setCurrentDate}
        isLoading={isLoading}
      />

      <div className={`min-w-[${resources.length * 250}px]`}>
        <FullCalendar
          key={events.length}
          ref={calendarRef}
          plugins={[resourceTimeGridPlugin]}
          initialView={'resourceTimeGridDay'}
          nowIndicator={true}
          editable={true}
          businessHours={businessHours}
          allDaySlot={false}
          resources={resources}
          resourceLabelContent={RenderResourceContent}
          events={
            isLoading
              ? [
                  {
                    daysOfWeek: [1,2,3,4,5,6,7],
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
      </div>
    </div>
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
  if (isLoading) return null;

  return (
    <div className='flex min-h-[47px] w-full flex-row items-center justify-center space-x-2 bg-white p-1'>
      <UIButton
        variant='outline'
        size='sm'
        disabled={dayjsLocal(dateRange.start).isSame(currentDate, 'day')}
        onClick={() => {
          if (dayjsLocal(dateRange.start).isSame(currentDate, 'day')) return;
          setCurrentDate(
            dayjsLocal(currentDate).subtract(1, 'day').toISOString(),
          );
        }}
      >
        <ChevronLeft className='h-4 w-4' />
      </UIButton>
      <p className='font-medium'>
        {dayjsLocal(currentDate).format('DD MMM YYYY ddd')}
      </p>
      <UIButton
        variant='outline'
        size='sm'
        disabled={dayjsLocal(dateRange.end).isSame(currentDate, 'day')}
        onClick={() => {
          if (dayjsLocal(dateRange.end).isSame(currentDate, 'day')) return;
          setCurrentDate(dayjsLocal(currentDate).add(1, 'day').toISOString());
        }}
      >
        <ChevronRight className='h-4 w-4' />
      </UIButton>
    </div>
  );
};
