import { AvatarGroup, Grid, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import {
  AllInterviewEmpty,
  InterviewMemberSide,
  InterviewScreenCard,
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';
import { TransformSchedule } from '../../Modules/types';
import { getColorStatusSchedule } from '../../Modules/utils';

function ModuleSchedules({
  schedules,
  loading = false,
}: {
  schedules: Omit<
    TransformSchedule,
    'applications' | 'job' | 'candidates' | 'file'
  >[];
  loading?: boolean;
}) {
  const [filter, setFilter] = React.useState<
    'all' | 'upcoming' | 'cancelled' | 'completed'
  >('upcoming');
  const router = useRouter();

  const filterSchedules = () => {
    const filSch = schedules.filter(
      (sch) => sch.interview_meeting.status !== 'waiting',
    );
    if (filter === 'all') {
      return filSch;
    } else if (filter === 'upcoming') {
      return filSch.filter(
        (sch) => sch.interview_meeting.status === 'confirmed',
      );
    } else if (filter === 'cancelled') {
      return filSch.filter(
        (sch) => sch.interview_meeting.status === 'cancelled',
      );
    } else if (filter === 'completed') {
      return filSch.filter(
        (sch) => sch.interview_meeting.status === 'completed',
      );
    }
  };

  return (
    <InterviewMemberSide
      isAllActive={filter === 'all'}
      isUpcomingActive={filter === 'upcoming'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
      onClickAll={{
        onClick: () => setFilter('all'),
      }}
      onClickUpcoming={{
        onClick: () => setFilter('upcoming'),
      }}
      onClickCancelled={{
        onClick: () => setFilter('cancelled'),
      }}
      onClickCompleted={{
        onClick: () => setFilter('completed'),
      }}
      slotInterviewCard={
        <ShowCode>
          <ShowCode.When isTrue={!loading && Boolean(filterSchedules().length)}>
            {router.query.member_id || router.query.module_id ? (
              <Grid container spacing={2}>
                {!loading &&
                  filterSchedules().map((sch, ind) => {
                    return (
                      <Grid item sm={12} md={12} lg={12} xl={12} key={ind}>
                        <ScheduleCard sch={sch} />
                      </Grid>
                    );
                  })}
              </Grid>
            ) : (
              <Stack overflow={'auto'} height={'calc(100vh - 145px)'}>
                <Grid container spacing={2}>
                  {!loading &&
                    filterSchedules().map((sch, ind) => {
                      return (
                        <Grid item sm={12} md={12} lg={6} xl={4} key={ind}>
                          <ScheduleCard sch={sch} />
                        </Grid>
                      );
                    })}
                </Grid>
              </Stack>
            )}
          </ShowCode.When>
          <ShowCode.When isTrue={!loading && filterSchedules().length === 0}>
            <AllInterviewEmpty />
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
}

export default ModuleSchedules;

function ScheduleCard({
  sch,
}: {
  sch: Omit<TransformSchedule, 'applications' | 'job' | 'candidates' | 'file'>;
}) {
  const router = useRouter();
  return (
    <InterviewScreenCard
      onClickCard={{
        onClick: () => {
          router.push(
            `/scheduling/view?schedule_id=${sch.schedule.id}&module_id=${sch.interview_session.module_id}&meeting_id=${sch.interview_meeting.id}&tab=overview`,
          );
        },
      }}
      textDate={dayjs(sch.interview_meeting.end_time).format('DD')}
      textDay={dayjs(sch.interview_meeting.end_time).format('dddd')}
      textMonth={dayjs(sch.interview_meeting.end_time).format('MMM')}
      textStatus={sch.interview_meeting.status ?? ''}
      textTime={`${dayjs(sch.interview_meeting.start_time).format('hh:mm A')} - ${dayjs(sch.interview_meeting.end_time).format('hh:mm A')}`}
      textMeetingPlatform={getScheduleType(sch.interview_session.schedule_type)}
      slotMeetingIcon={
        <IconScheduleType type={sch.interview_session.schedule_type} />
      }
      textTitle={sch.schedule.schedule_name}
      colorPropsText={{
        style: {
          color: getColorStatusSchedule(sch.interview_meeting.status),
        },
      }}
      slotMemberImage={
        <AvatarGroup
          total={sch.users?.length || 0}
          sx={{
            '& .MuiAvatar-root': {
              width: '28px',
              height: '28px',
              fontSize: '12px',
            },
          }}
        >
          {sch.users?.map((user) => {
            return (
              <MuiAvatar
                key={user.id}
                src={user.profile_image}
                level={getFullName(user.first_name, user.last_name)}
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
}
