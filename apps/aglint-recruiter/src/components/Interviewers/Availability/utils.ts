import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const MINUTE_TO_PIXEL = 0.133; // 8px / 60 minutes

const calculatePixels = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours * 60 + minutes) * MINUTE_TO_PIXEL;
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

export const addPixelPropertiesAndEmptyEvents = (events) => {
  return Object.keys(events).reduce((result, date) => {
    const dayEvents = events[date];
    const newEvents = [];

    if (dayEvents.length === 0) {
      // If no events on the day, create full day events
      newEvents.push({
        start: {
          dateTime: `${date}T00:00:00+05:30`,
          timeZone: 'Asia/Kolkata',
          startingPx: '0px',
        },
        end: {
          dateTime: `${date}T24:00:00+05:30`,
          timeZone: 'Asia/Kolkata',
          endingPx: '192px',
        },
        type: 'full_day_no_event',
      });
    } else {
      let lastEnd = '00:00';

      dayEvents.forEach((event) => {
        const startTime = dayjs(event.start.dateTime).format('HH:mm');
        const endTime = dayjs(event.end.dateTime).format('HH:mm');

        if (lastEnd !== startTime) {
          // Create gap event before the current event
          const startingPx = calculatePixels(lastEnd);
          const endingPx = calculatePixels(startTime);
          newEvents.push({
            start: {
              dateTime: `${date}T${lastEnd}:00+05:30`,
              timeZone: 'Asia/Kolkata',
              startingPx: `${startingPx.toFixed(1)}px`,
            },
            end: {
              dateTime: `${date}T${startTime}:00+05:30`,
              timeZone: 'Asia/Kolkata',
              endingPx: `${endingPx.toFixed(1)}px`,
            },
            type: 'gap_event',
          });
        }

        newEvents.push({
          ...event,
          start: {
            ...event.start,
            startingPx: `${calculatePixels(startTime).toFixed(1)}px`,
          },
          end: {
            ...event.end,
            endingPx: `${calculatePixels(endTime).toFixed(1)}px`,
          },
        });

        lastEnd = endTime;
      });

      // Add a full-day event if the last event doesn't end at 24:00
      if (lastEnd !== '24:00') {
        const startingPx = calculatePixels(lastEnd);
        const endingPx = calculatePixels('24:00');
        newEvents.push({
          start: {
            dateTime: `${date}T${lastEnd}:00+05:30`,
            timeZone: 'Asia/Kolkata',
            startingPx: `${startingPx.toFixed(1)}px`,
          },
          end: {
            dateTime: `${date}T24:00:00+05:30`,
            timeZone: 'Asia/Kolkata',
            endingPx: `${endingPx.toFixed(1)}px`,
          },
          type: 'gap_event',
        });
      }
    }

    result[date] = newEvents;
    return result;
  }, {});
};

export const getEventColor = (value: Event['type']) => {
  const color =
    value === 'empty_event'
      ? 'var(--success-8)'
      : value === 'soft'
        ? 'var(--warning-8)'
        : value === 'ooo'
          ? 'var(--info-8)'
          : value === 'free_time'
            ? 'var(--success-8)'
            : value === 'recruiting_blocks'
              ? 'var(--error-8)'
              : value === 'cal_event'
                ? 'var(--error-9)'
                : '';
  return {
    style: {
      background: color,
    },
  };
};
