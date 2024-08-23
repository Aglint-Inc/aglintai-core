import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import { initUser } from '@/src/pages/api/interviewers';

import { useAvailabilty } from '../Hook';
import { getColor } from './components';
import { addPixelPropertiesAndEmptyEvents, getEventColor } from './utils';

const TimeLineCalendar = () => {
  const [dayCount, setDayCount] = useState<number>(3);

  const startDate = dayjsLocal().startOf('day').add(0, 'day');
  const endDate = dayjsLocal().endOf('day').add(dayCount, 'day');
  const { data: allInterviewers, isLoading } = useAvailabilty({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  if (isLoading) return <>Loading</>;

  return (
    <AvailabilityView allInterviewers={allInterviewers} dayCount={dayCount} />
  );
};

export default TimeLineCalendar;

const AvailabilityView = ({
  allInterviewers,
  dayCount,
}: {
  allInterviewers: initUser[];
  dayCount: number;
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {/* Left Column for Interviewer Names and Timezones */}
      <Box
        sx={{
          minWidth: 120,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {allInterviewers.map((interviewer) => (
          <Box
            key={getFullName(interviewer.first_name, interviewer.last_name)}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 1,
            }}
          >
            <Typography variant='body1'>
              {getFullName(interviewer.first_name, interviewer.last_name)}
            </Typography>
            <Typography variant='caption'>
              (
              {dayjsLocal()
                .tz(interviewer.scheduling_settings.timeZone.tzCode)
                .format('z')}
              )
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Scrollable View for Time Blocks */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'auto',
          gap: 2,
        }}
      >
        {allInterviewers.map((interviewer, index) => {
          const timeZoneOffset = dayjsLocal()
            .tz(interviewer.scheduling_settings.timeZone.tzCode)
            .utcOffset(); // Time zone offset in minutes
          const referenceOffset = dayjsLocal.utc().utcOffset(); // UTC offset in minutes (0 for UTC)
          const totalOffset = timeZoneOffset - referenceOffset; // Difference in minutes

          const timeZoneLeftOffset = (totalOffset / 60) * 8; // Convert offset from minutes to pixels (1 hour = 8px)

          const days = Array.from({ length: dayCount }, (_, i) =>
            dayjsLocal().add(i, 'day'),
          );

          const intervi = {
            name: getFullName(interviewer.first_name, interviewer.last_name),
            timezone: interviewer.scheduling_settings.timeZone.tzCode,
            availability: [5, 6, 7, 10, 11, 12],
            softConflicts: [8, 14],
          };

          const intervierEvents = interviewer.all_events
            .filter((event) => event.start.dateTime)
            .map((event) => ({
              start: event.start,
              end: event.end,
              type: event.type,
            }));

          const dateGrouped = groupByDate(intervierEvents, dayCount);

          const pixelPropertiesAndEmptyEventsAdded =
            addPixelPropertiesAndEmptyEvents(dateGrouped);

          const interviewerEvent = Object.values(
            pixelPropertiesAndEmptyEventsAdded,
          );

          // const pixelAddedData = addPixelProperties(dateGrouped);

          return (
            <TimeLineList
              key={index}
              days={days}
              timeZoneLeftOffset={timeZoneLeftOffset}
              interviewerEvent={interviewerEvent}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const TimeLineList = ({ days, timeZoneLeftOffset, interviewerEvent }) => {
  return (
    // whole box
    <Box
      sx={{
        display: 'flex',
        padding: 1,
        position: 'relative',
        left: `-${timeZoneLeftOffset}px`,
      }}
    >
      {/* each day */}
      {interviewerEvent.map((events, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography
            variant='body2'
            sx={{
              position: 'absolute',
              top: '-20px',
              fontWeight: 'bold',
            }}
          >
            {dayjsLocal(events[0].start.dateTime).format('DD MMMM')}
          </Typography>
          <Box
            sx={{
              width: 192,
              height: 20,
              borderRadius: 5,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {events.map((event, hour) => {
              console.log(event);
              return (
                <>
                  <Box
                    key={hour}
                    sx={{
                      width: `calc( ${event.end.endingPx} - ${event.start.startingPx} )`,
                      height: '100%',
                      backgroundColor:
                        event.type === 'cal_event'
                          ? 'orange'
                          : event.type === 'full_day_no_event'
                            ? 'var(--success-9)'
                            : event.type === 'gap_event'
                              ? 'yellow'
                              : '',
                    }}
                  />
                </>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const groupByDate = (events, dayCount) => {
  // Step 1: Create a range of dates from today to three days in the future
  const today = dayjsLocal().startOf('day');
  const dateRange = Array.from({ length: dayCount }, (_, i) =>
    today.add(i, 'day').format('YYYY-MM-DD'),
  );

  // Step 2: Group the events by date
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = dayjsLocal(event.start.dateTime).format('YYYY-MM-DD');

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }

    acc[eventDate].push(event);

    return acc;
  }, {});

  // Step 3: Ensure all dates in the range are present, even if they have no events
  return dateRange.reduce((acc, date) => {
    acc[date] = groupedEvents[date] || [];
    return acc;
  }, {});
};

const MINUTE_TO_PIXEL = 0.133; // 8px / 60 minutes

const calculatePixels = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours * 60 + minutes) * MINUTE_TO_PIXEL;
};

const addPixelProperties = (events) => {
  return Object.keys(events).reduce((result, date) => {
    result[date] = events[date].map((event) => {
      const startTime = dayjsLocal(event.start.dateTime).format('HH:mm');
      const endTime = dayjsLocal(event.end.dateTime).format('HH:mm');

      const startingPx = calculatePixels(startTime);
      const endingPx = calculatePixels(endTime);

      return {
        ...event,
        start: {
          ...event.start,
          startingPx: `${startingPx.toFixed(1)}px`, // rounding to 1 decimal place
        },
        end: {
          ...event.end,
          endingPx: `${endingPx.toFixed(1)}px`, // rounding to 1 decimal place
        },
      };
    });
    return result;
  }, {});
};

const interviewers = [
  {
    name: 'Peter Thiel',
    timezone: 'America/Los_Angeles',
    availability: [9, 10, 11, 14, 15, 16],
    softConflicts: [12, 18],
  },
  {
    name: 'Elon Musk',
    timezone: 'America/New_York',
    availability: [8, 9, 10, 13, 14, 17],
    softConflicts: [11, 18],
  },
  {
    name: 'Sundar Pichai',
    timezone: 'Asia/Kolkata',
    availability: [5, 6, 7, 10, 11, 12],
    softConflicts: [8, 14],
  },
  {
    name: 'Tim Cook',
    timezone: 'Australia/Sydney',
    availability: [3, 4, 5, 8, 9, 10],
    softConflicts: [6, 12],
  },
  {
    name: 'Satya Nadella',
    timezone: 'America/Chicago',
    availability: [10, 11, 12, 14, 15, 16],
    softConflicts: [13, 17],
  },
  {
    name: 'Jeff Bezos',
    timezone: 'America/Denver',
    availability: [9, 10, 11, 13, 14, 15],
    softConflicts: [12, 16],
  },
  {
    name: 'Sheryl Sandberg',
    timezone: 'America/Los_Angeles',
    availability: [10, 11, 12, 15, 16, 17],
    softConflicts: [14, 18],
  },
  {
    name: 'Jack Dorsey',
    timezone: 'America/New_York',
    availability: [8, 9, 10, 13, 14, 15],
    softConflicts: [12, 16],
  },
  {
    name: 'Larry Page',
    timezone: 'Europe/London',
    availability: [8, 9, 10, 12, 13, 14],
    softConflicts: [11, 15],
  },
  {
    name: 'Sergey Brin',
    timezone: 'Europe/Moscow',
    availability: [9, 10, 11, 13, 14, 15],
    softConflicts: [12, 16],
  },
  {
    name: 'Mark Zuckerberg',
    timezone: 'Asia/Singapore',
    availability: [4, 5, 6, 9, 10, 11],
    softConflicts: [7, 12],
  },
  {
    name: 'Reed Hastings',
    timezone: 'Europe/Paris',
    availability: [8, 9, 10, 12, 13, 14],
    softConflicts: [11, 15],
  },
  {
    name: 'Elon Musk',
    timezone: 'America/New_York',
    availability: [8, 9, 10, 13, 14, 17],
    softConflicts: [11, 18],
  },
  {
    name: 'Sundar Pichai',
    timezone: 'Asia/Kolkata',
    availability: [5, 6, 7, 10, 11, 12],
    softConflicts: [8, 14],
  },
  {
    name: 'Tim Cook',
    timezone: 'Australia/Sydney',
    availability: [3, 4, 5, 8, 9, 10],
    softConflicts: [6, 12],
  },
  {
    name: 'Satya Nadella',
    timezone: 'America/Chicago',
    availability: [10, 11, 12, 14, 15, 16],
    softConflicts: [13, 17],
  },
  {
    name: 'Jeff Bezos',
    timezone: 'America/Denver',
    availability: [9, 10, 11, 13, 14, 15],
    softConflicts: [12, 16],
  },
  {
    name: 'Sheryl Sandberg',
    timezone: 'America/Los_Angeles',
    availability: [10, 11, 12, 15, 16, 17],
    softConflicts: [14, 18],
  },
  {
    name: 'Jack Dorsey',
    timezone: 'America/New_York',
    availability: [8, 9, 10, 13, 14, 15],
    softConflicts: [12, 16],
  },
  {
    name: 'Larry Page',
    timezone: 'Europe/London',
    availability: [8, 9, 10, 12, 13, 14],
    softConflicts: [11, 15],
  },
];
