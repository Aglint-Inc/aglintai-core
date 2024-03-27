import { AvatarGroup, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// Extend Day.js with utc and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

import {
  AllInterviewEmpty,
  InterviewMemberSide,
  InterviewScreenCard,
  ToggleButton,
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
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
  const { recruiterUser } = useAuthDetails();
  const [selectedTimeZone, setsSelectedTimeZone] = useState(null);
  const [toggleEnabled, setToggleEnabled] = useState(true);

  const [filter, setFilter] = React.useState<
    'all' | 'upcoming' | 'cancelled' | 'completed'
  >('upcoming');
  const router = useRouter();

  const filterSchedules = () => {
    const filSch = schedules.filter((sch) => sch.schedule.status !== 'pending');
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

  useEffect(() => {
    if (recruiterUser && !toggleEnabled) {
      setsSelectedTimeZone(recruiterUser.scheduling_settings.timeZone.tzCode);
    }
    if (recruiterUser && toggleEnabled) {
      setsSelectedTimeZone(dayjs.tz.guess());
    }
  }, [recruiterUser, toggleEnabled]);

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
                        {selectedTimeZone && (
                          <ScheduleCard
                            selectedTimeZone={selectedTimeZone}
                            sch={sch}
                          />
                        )}
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
                          {selectedTimeZone && (
                            <ScheduleCard
                              selectedTimeZone={selectedTimeZone}
                              sch={sch}
                            />
                          )}
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
      slotInterview={
        <ShowCode.When
          isTrue={!router.query.member_id && !router.query.module_id}
        >
          <Stack alignItems={'center'} direction={'row'} spacing={'10px'}>
            <ToggleButton
              onclickToggle={{
                onClick: () => {
                  setToggleEnabled((pre: any) => !pre);
                },
              }}
              isActive={toggleEnabled}
              isInactive={!toggleEnabled}
            />
            <Typography>Get timezone automatically</Typography>
          </Stack>
        </ShowCode.When>
      }
    />
  );
}

export default ModuleSchedules;

function ScheduleCard({ sch, selectedTimeZone }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { recruiterUser } = useAuthDetails();
  const router = useRouter();
  // Set the timezone for the original time
  const originalTimezone = recruiterUser.scheduling_settings.timeZone.tzCode;
  const originalStartTime = dayjs(sch.interview_meeting.start_time).format(
    'HH:mm:ss',
  );
  const originalStartDateTime = dayjs.tz(
    `${dayjs(sch.interview_meeting.start_time).format('YYYY-MM-DDT')}${originalStartTime}`,
    originalTimezone,
  );
  const convertedStartDateTime = originalStartDateTime.tz(selectedTimeZone);

  const originalEndTime = dayjs(sch.interview_meeting.end_time).format(
    'HH:mm:ss',
  );
  const originalEndDateTime = dayjs.tz(
    `${dayjs(sch.interview_meeting.end_time).format('YYYY-MM-DDT')}${originalEndTime}`,
    originalTimezone,
  );

  const convertedEndDateTime = originalEndDateTime.tz(selectedTimeZone);

  useEffect(() => {
    setStartDate(convertedStartDateTime);
    setEndDate(convertedEndDateTime);
  }, [selectedTimeZone]);
  return (
    <InterviewScreenCard
      onClickCard={{
        onClick: () => {
          router.push(
            `/scheduling/view?schedule_id=${sch.schedule.id}&module_id=${sch.interview_meeting.module_id}&meeting_id=${sch.interview_meeting.id}&tab=overview`,
          );
        },
      }}
      textDate={dayjs(sch.interview_meeting.end_time).format('DD')}
      textDay={dayjs(sch.interview_meeting.end_time).format('dddd')}
      textMonth={dayjs(sch.interview_meeting.end_time).format('MMM')}
      textStatus={sch.interview_meeting.status ?? ''}
      textTime={`${dayjs(startDate).format('hh:mm A')} - ${dayjs(endDate).format('hh:mm A')} ( ${sch.interview_meeting.duration} Minutes )`}
      textMeetingPlatform={getScheduleType(sch.schedule.schedule_type)}
      slotMeetingIcon={<IconScheduleType type={sch.schedule.schedule_type} />}
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
          {sch.users.slice(0, 5)?.map((user) => {
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
