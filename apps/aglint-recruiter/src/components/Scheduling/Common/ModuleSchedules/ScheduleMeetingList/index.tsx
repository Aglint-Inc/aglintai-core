import { NewMyScheduleCard } from '@devlink3/NewMyScheduleCard';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { CalendarClock } from 'lucide-react';

import {
  type SchedulesSupabase,
  transformDataSchedules,
} from '../../../schedules-query';
import ScheduleMeetingCard from '../ScheduleMeetingCard';

function ScheduleMeetingList({
  filterSchedules,
}: {
  filterSchedules: SchedulesSupabase;
}) {
  return (
    <Stack spacing={'var(--space-4)'}>
      {transformDataSchedules(filterSchedules).map((sch, ind) => {
        const date = Object.keys(sch)[0];
        const schedules = sch[String(date)];
        return (
          <NewMyScheduleCard
            key={ind}
            textDate={date != 'undefined' ? dayjs(date).format('DD') : null}
            textDay={date != 'undefined' ? dayjs(date).format('ddd') : null}
            textMonth={
              date != 'undefined' ? (
                dayjs(date).format('MMM')
              ) : (
                <CalendarClock size={5} />
              )
            }
            slotMyScheduleSubCard={schedules.map((meetingDetails, i) => {
              return (
                <ScheduleMeetingCard key={i} meetingDetails={meetingDetails} />
              );
            })}
          />
        );
      })}
    </Stack>
  );
}

export default ScheduleMeetingList;
