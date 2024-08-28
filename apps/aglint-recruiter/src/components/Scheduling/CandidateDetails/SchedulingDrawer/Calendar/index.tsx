import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Stack } from '@mui/material';
import { useSchedulingFlowStore } from '../store';
import '@styles/fullcalendar-theme.css';

function Calendar() {
  const { availabilities } = useSchedulingFlowStore((state) => ({
    availabilities: state.availabilities,
  }));

  const intArray = Object.entries(availabilities).map(([key, value]) => ({
    ...value,
  }));

  const events = intArray.flatMap((cal) =>
    cal.all_events.flatMap((event) => {
      return {
        start: event.start.dateTime,
        end: event.end.dateTime,
        title: event.summary,
        resourceId: cal.interviewer_id,
        id: event.id,
      };
    }),
  );

  const resources = intArray.map((cal) => ({
    id: cal.interviewer_id,
    title: cal.name,
  }));

  console.log(resources);

  return (
    <Stack
      sx={{
        width: 'calc(100vw - 860px)',
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <FullCalendar
        plugins={[resourceTimeGridPlugin]}
        initialView={'resourceTimeGridDay'}
        nowIndicator={false}
        editable={true}
        allDaySlot={false}
        resources={resources}
        events={events}
        height='auto'
      />
    </Stack>
  );
}

export default Calendar;
