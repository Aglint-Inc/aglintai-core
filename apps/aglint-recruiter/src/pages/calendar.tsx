import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { dayjsLocal } from '@aglint/shared-utils';
import { Stack, Typography } from '@mui/material';

const events = [{ title: 'Meeting', start: dayjsLocal().toISOString() }];

function calendar() {
  return (
    <div>
      <FullCalendar
        eventContent={renderEventContent}
        plugins={[resourceTimelinePlugin]}
        initialView='resourceTimeline'
        resources={[
          {
            id: 'a',
            title: 'Room A',
          },
          {
            id: 'b',
            title: 'Room B',
          },
        ]}
        events={[
          {
            id: '1',
            resourceId: 'a',
            title: 'Meeting',
            start: dayjsLocal().toISOString(),
            end: dayjsLocal().add(1, 'hour').toISOString(),
          },
        ]}
      />
    </div>
  );
}

export default calendar;

function renderEventContent(eventInfo) {
  const { data, color } = eventInfo.event.extendedProps;
  return (
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
  );
}
