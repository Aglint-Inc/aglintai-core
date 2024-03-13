import { AvatarGroup } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import {
  AllInterviewEmpty,
  InterviewMemberSide,
  InterviewScreenCard
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

import { TransformSchedule } from '..';
import { getColorStatusSchedule } from '../../utils';
import IconScheduleType from '../../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../../AllSchedules/utils';

function ModuleSchedules({
  schedules,
  loading = false
}: {
  schedules: TransformSchedule[];
  loading?: boolean;
}) {
  const router = useRouter();
  const [filter, setFilter] = React.useState<
    'all' | 'upcoming' | 'cancelled' | 'completed'
  >('all');

  const filterSchedules = () => {
    if (filter === 'all') {
      return schedules;
    } else if (filter === 'upcoming') {
      return schedules.filter(
        (sch) => sch.interview_meeting.start_time > new Date().toISOString()
      );
    } else if (filter === 'cancelled') {
      return schedules.filter((sch) => sch.schedule.status === 'cancelled');
    } else if (filter === 'completed') {
      return schedules.filter((sch) => sch.schedule.status === 'completed');
    }
  };

  return (
    <InterviewMemberSide
      isAllActive={filter === 'all'}
      isUpcomingActive={filter === 'upcoming'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
      onClickAll={{
        onClick: () => setFilter('all')
      }}
      onClickUpcoming={{
        onClick: () => setFilter('upcoming')
      }}
      onClickCancelled={{
        onClick: () => setFilter('cancelled')
      }}
      onClickCompleted={{
        onClick: () => setFilter('completed')
      }}
      slotInterviewCard={
        <>
          {!loading &&
            filterSchedules().map((sch, ind) => {
              return (
                <InterviewScreenCard
                  onClickCard={{
                    onClick: () => {
                      router.push(
                        `/scheduling/view?schedule_id=${sch.schedule.id}&module_id=${sch.interview_meeting.module_id}`
                      );
                    }
                  }}
                  key={ind}
                  textDate={dayjs(sch.interview_meeting.end_time).format('DD')}
                  textDay={dayjs(sch.interview_meeting.end_time).format('dddd')}
                  textMonth={dayjs(sch.interview_meeting.end_time).format(
                    'MMM'
                  )}
                  textStatus={sch.schedule.status}
                  textTime={`${dayjs(sch.interview_meeting.start_time).format('hh:mm A')} - ${dayjs(sch.interview_meeting.end_time).format('hh:mm A')} ( ${sch.interview_meeting.duration} Minutes )`}
                  textMeetingPlatform={getScheduleType(
                    sch.schedule.schedule_type
                  )}
                  slotMeetingIcon={
                    <IconScheduleType type={sch.schedule.schedule_type} />
                  }
                  textTitle={sch.schedule.schedule_name}
                  colorPropsText={{
                    style: {
                      color: getColorStatusSchedule(sch.schedule.status)
                    }
                  }}
                  slotMemberImage={
                    <AvatarGroup
                      total={sch.users?.length || 0}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: '28px',
                          height: '28px',
                          fontSize: '12px'
                        }
                      }}
                    >
                      {sch.users.slice(0, 5)?.map((user) => {
                        return (
                          <MuiAvatar
                            key={user.id}
                            src={user.profile_image}
                            level={user.first_name}
                            variant='circular'
                            height='28px'
                            width='28px'
                            fontSize='12px'
                          />
                        );
                      })}
                    </AvatarGroup>
                  }
                />
              );
            })}
          {!loading && filterSchedules().length === 0 && <AllInterviewEmpty />}
        </>
      }
    />
  );
}

export default ModuleSchedules;
