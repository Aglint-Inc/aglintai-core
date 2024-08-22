import { getFullName } from '@aglint/shared-utils';
import { Avatar, Stack } from '@mui/material';
import { useState } from 'react';

import { InterviewerAvailability } from '@/devlink3/InterviewerAvailability';
import { InterviewerListAvail } from '@/devlink3/InterviewerListAvail';
import { InterviewerNotConnected } from '@/devlink3/InterviewerNotConnected';
import { InterviewerSlot } from '@/devlink3/InterviewerSlot';
import { initUser } from '@/src/pages/api/interviewers';
import dayjs from '@/src/utils/dayjs';

import Loader from '../../Common/Loader';
import { useAvailabilty } from '../Hook';
import { Event, GroupedEvents } from '../types';
import { getColor, getDatesArray, groupByDateAndHour } from '../utils';

function Availability() {
  const [dayCount, setDayCount] = useState<number>(0);

  const startDate = dayjs().startOf('day').add(dayCount, 'day');
  const endDate = dayjs()
    .endOf('day')
    .add(dayCount + 4, 'day');

  const { data, isLoading } = useAvailabilty({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  const dates = getDatesArray(dayCount, 'DD MMMM');

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

  if (!data?.length) return 'no data';

  return (
    <>
      <InterviewerAvailability
        onClickRightIcon={{
          onClick: () => setDayCount((pre) => pre + 4),
        }}
        onClickLeftIcon={{
          onClick: () => setDayCount((pre) => pre - 4),
        }}
        textDateRange={`${startDate.format('DD MMM YYYY')} - ${endDate.format('DD MMM YYYY')}`}
        textDay1={dates[0]}
        textDay2={dates[1]}
        textDay3={dates[2]}
        textDay4={dates[3]}
        textDay5={dates[4]}
        slotInterviewerList={data.map((interviewer) => (
          <InterviewerList
            key={interviewer.user_id}
            interviewer={interviewer}
            dayCount={dayCount}
          />
        ))}
      />
    </>
  );
}

export default Availability;

const InterviewerList = ({
  interviewer,
}: {
  interviewer: initUser;
  dayCount: number;
}) => {
  const events = interviewer.all_events.map((event) => ({
    id: interviewer.user_id,
    start: event.start.dateTime,
    end: event.end.dateTime,
    type: event.type,
  })) as Event[];

  const grouped_events = groupByDateAndHour(events) as GroupedEvents[];

  if (interviewer.isCalenderConnected)
    return (
      <InterviewerNotConnected
        textName={getFullName(interviewer.first_name, interviewer.last_name)}
        textRole={interviewer.position}
        textDescription={`${getFullName(interviewer.first_name, '')} not connected the calender.`}
        slotImage={
          <Avatar
            src={interviewer.profile_image || undefined}
            variant='rounded'
            alt={interviewer.first_name}
            sx={{ height: '24px', width: '24px' }}
          />
        }
      />
    );

  return (
    <InterviewerListAvail
      key={interviewer.user_id}
      textName={getFullName(interviewer.first_name, interviewer.last_name)}
      textRole={interviewer.position}
      slotImage={
        <Avatar
          src={interviewer.profile_image || undefined}
          variant='rounded'
          alt={interviewer.first_name}
          sx={{ height: '24px', width: '24px' }}
        />
      }
      slotDay1={grouped_events[0].events.map((event) => (
        <InterviewerSlot propsColor={getColor(event.type)} key={event.id} />
      ))}
      slotDay2={grouped_events[1].events.map((event) => (
        <InterviewerSlot propsColor={getColor(event.type)} key={event.id} />
      ))}
      slotDay3={grouped_events[2].events.map((event) => (
        <InterviewerSlot propsColor={getColor(event.type)} key={event.id} />
      ))}
      slotDay4={grouped_events[3].events.map((event) => (
        <InterviewerSlot propsColor={getColor(event.type)} key={event.id} />
      ))}
      slotDay5={grouped_events[4].events.map((event) => (
        <InterviewerSlot propsColor={getColor(event.type)} key={event.id} />
      ))}
    />
  );
};
