import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { initUser } from '@/src/pages/api/interviewers';
import dayjs from '@/src/utils/dayjs';

import Loader from '../../Common/Loader';
import { useAvailabilty } from '../Hook';
import { Event, EventFilling, groupByDate } from './utils';

const timeToPx = (hours, minutes) => {
  return hours * 60 * 0.133 + minutes * 0.133;
};

const TimeLineCalendar = () => {
  const dayCount = 10;

  const startDate = dayjsLocal().startOf('day').add(0, 'day');
  const endDate = dayjsLocal().endOf('day').add(dayCount, 'day');
  const { data: allInterviewers, isLoading } = useAvailabilty({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  if (isLoading)
    return (
      <Stack
        height={'100%'}
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );

  return (
    <Stack mt={2}>
      <AvailabilityView allInterviewers={allInterviewers} dayCount={dayCount} />
    </Stack>
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
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 1,
              gap: 1,
            }}
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
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
            </Stack>
            <StatusGlyph isConnected={interviewer.isCalenderConnected} />
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
          if (!interviewer.isCalenderConnected)
            return <Box key={index} minHeight={'36px'}></Box>;
          const timeZoneOffset = dayjsLocal()
            .tz(interviewer.scheduling_settings.timeZone.tzCode)
            .utcOffset(); // Time zone offset in minutes
          const referenceOffset = dayjsLocal.utc().utcOffset(); // UTC offset in minutes (0 for UTC)
          const totalOffset = timeZoneOffset - referenceOffset; // Difference in minutes

          const timeZoneLeftOffset = (totalOffset / 60) * 8; // Convert offset from minutes to pixels (1 hour = 8px)

          const intervierEvents = interviewer.all_events
            .filter((event) => event.start.dateTime)
            .map((event) => ({
              start: {
                ...event.start,
                startPx: timeToPx(
                  dayjs(event.start.dateTime).format('H'),
                  dayjs(event.start.dateTime).format('m'),
                ),
              },
              end: {
                ...event.end,
                endPx: timeToPx(
                  dayjs(event.end.dateTime).format('H'),
                  dayjs(event.end.dateTime).format('m'),
                ),
              },
              type: event.type,
            }));

          const dateGrouped = groupByDate(
            intervierEvents,
            dayCount,
          ) as Event[][];

          const interviewerEvent = dateGrouped.map((dg, index) =>
            EventFilling(
              dg,
              interviewer.scheduling_settings.timeZone.tzCode,
              index,
            ),
          );

          return (
            <TimeLineList
              key={index}
              timeZoneLeftOffset={timeZoneLeftOffset}
              interviewerEvent={interviewerEvent}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const StatusGlyph = ({ isConnected }) => (
  <Tooltip
    title={isConnected ? 'Calendar Connected' : 'Calendar Not Connected'}
  >
    <Stack>
      <GlobalIcon
        size={4}
        color={isConnected ? 'success' : 'error'}
        iconName={isConnected ? 'check_circle' : 'cancel'}
      />
    </Stack>
  </Tooltip>
);

const TimeLineList = ({ timeZoneLeftOffset, interviewerEvent }) => {
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
              top: '-10px',
              fontWeight: 'bold',
            }}
          >
            {dayjsLocal().add(i, 'day').format('DD MMMM')}
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
              return (
                <>
                  <Box
                    key={hour}
                    sx={{
                      width:
                        event.type === 'morning_sleep'
                          ? `${event.end.endPx}px`
                          : event.type === 'night_sleep'
                            ? `${192 - event.start.startPx}px`
                            : `${event.end.endPx - event.start.startPx}px`,
                      height: '100%',
                      backgroundColor: eventColor(event.type),
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

const eventColor = (type) => {
  const calendarEvent = 'var(--neutral-4)';
  const Available = 'var(--success-a6)';
  const morningSleep = 'var(--neutral-4)';
  const nightSleep = 'var(--neutral-4)';

  const soft = 'var(--warning-a6)';
  const freeTime = 'var(--success-a6)';
  const outStand = 'var(--error-a6)';
  const recruitingBlocks = 'var(--success-a6)';

  return type === 'cal_event'
    ? calendarEvent
    : type === 'soft'
      ? soft
      : type === 'free_time'
        ? freeTime
        : type === 'ooo'
          ? outStand
          : type === 'recruiting_blocks'
            ? recruitingBlocks
            : type === 'empty_event'
              ? Available
              : type === 'morning_sleep'
                ? morningSleep
                : type === 'night_sleep'
                  ? nightSleep
                  : 'var(--neutral-11)';
};
