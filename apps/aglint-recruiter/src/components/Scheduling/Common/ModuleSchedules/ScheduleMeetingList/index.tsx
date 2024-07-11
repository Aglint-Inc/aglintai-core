import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { NewMyScheduleCard } from '@/devlink3/NewMyScheduleCard';

import { getAllScheduleList } from '../../../Schedules/ScheduleStatesContext';
import {
  SchedulesSupabase,
  transformDataSchedules,
} from '../../../schedules-query';
import { DateIcon } from '../../../Settings/Components/DateSelector';
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
              date != 'undefined' ? dayjs(date).format('MMM') : <DateIcon />
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

function transformData(
  inputData: Awaited<ReturnType<typeof getAllScheduleList>> | null,
) {
  const transformedData = {};

  inputData?.forEach((item) => {
    const date = item.start_time?.split('T')[0]; // Extracting date from start_time
    if (!transformedData[String(date)]) {
      transformedData[String(date)] = [];
    }
    transformedData[String(date)].push(item);
  });

  const result = [];
  for (const date in transformedData) {
    result.push({ [date]: transformedData[String(date)] });
  }

  return result.sort((a, b) => {
    const dateA = Object.keys(a)[0];
    const dateB = Object.keys(b)[0];
    return (new Date(dateA) as any) - (new Date(dateB) as any);
  });
}
