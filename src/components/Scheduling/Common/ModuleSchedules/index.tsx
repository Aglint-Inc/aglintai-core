import { AvatarGroup, Grid, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import {
  AllInterviewEmpty,
  InterviewMemberSide,
  InterviewScreenCard,
  StatusBadge,
} from '@/devlink2';
import { MyScheduleSubCard, NewMyScheduleCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
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
    const filSch = schedules;
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
              <Stack height={'calc(100vh - 154px)'}>
                {!loading &&
                  transformData(filterSchedules()).map((sch, ind) => {
                    const date = Object.keys(sch)[0];
                    const schedules = sch[String(date)] as Omit<
                      TransformSchedule,
                      'applications' | 'job' | 'candidates' | 'file'
                    >[];
                    return (
                      <Grid item sm={12} md={12} lg={6} xl={4} key={ind}>
                        <NewMyScheduleCard
                          textDate={dayjs(date).format('DD')}
                          textDay={dayjs(date).format('dddd')}
                          textMonth={dayjs(date).format('MMM')}
                          slotMyScheduleSubCard={schedules.map((sch) => {
                            return (
                              <Stack
                                sx={{
                                  cursor: 'pointer',
                                }}
                                key={sch.interview_session.id}
                                onClick={() => {
                                  router.push(
                                    `/scheduling/view?schedule_id=${sch.schedule.id}&module_id=${sch.interview_session.module_id}&meeting_id=${sch.interview_meeting.id}&tab=overview`,
                                  );
                                }}
                              >
                                <MyScheduleSubCard
                                  textLocation={sch.interview_session.location}
                                  textTime={`${dayjs(sch.interview_meeting.start_time).format('hh:mm A')} - ${dayjs(sch.interview_meeting.end_time).format('hh:mm A')}`}
                                  textMeetingPlatform={getScheduleType(
                                    sch.interview_session.schedule_type,
                                  )}
                                  textMeetingTitle={sch.interview_session.name}
                                  slotMeetingIcon={
                                    <IconScheduleType
                                      type={sch.interview_session.schedule_type}
                                    />
                                  }
                                  slotCandidateImage={
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
                                            level={getFullName(
                                              user.first_name,
                                              user.last_name,
                                            )}
                                            variant='circular'
                                            height='28px'
                                            width='28px'
                                            fontSize='12px'
                                          />
                                        );
                                      })}
                                    </AvatarGroup>
                                  }
                                  isDebriefIconVisible={
                                    sch.interview_session.session_type ===
                                    'debrief'
                                  }
                                  isOnetoOneVisible={
                                    sch.interview_session.session_type ===
                                    'individual'
                                  }
                                  isPanelIconVisible={
                                    sch.interview_session.session_type ===
                                    'panel'
                                  }
                                  isMeetingPlatformVisible={
                                    sch.interview_session.schedule_type ===
                                      'google_meet' ||
                                    sch.interview_session.schedule_type ===
                                      'zoom'
                                  }
                                  isDurationVisible={true}
                                  isPhoneCallVisible={false}
                                  isTimeVisible={Boolean(
                                    sch.interview_meeting.start_time,
                                  )}
                                  slotStatus={
                                    <StatusBadge
                                      isCancelledVisible={
                                        sch.interview_meeting.status ===
                                        'cancelled'
                                      }
                                      isConfirmedVisible={
                                        sch.interview_meeting.status ===
                                        'confirmed'
                                      }
                                      isWaitingVisible={
                                        sch.interview_meeting.status ===
                                        'waiting'
                                      }
                                      isCompletedVisible={
                                        sch.interview_meeting.status ===
                                        'completed'
                                      }
                                      isNotScheduledVisible={
                                        sch.interview_meeting.status ===
                                        'not_scheduled'
                                      }
                                    />
                                  }
                                  isCandidateNameVisible={false}
                                  isLocationVisible={Boolean(
                                    sch.interview_session.location,
                                  )}
                                  textDuration={getBreakLabel(
                                    sch.interview_session.session_duration,
                                  )}
                                />
                              </Stack>
                            );
                          })}
                        />
                      </Grid>
                    );
                  })}
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

function transformData(
  inputData: Omit<
    TransformSchedule,
    'applications' | 'job' | 'candidates' | 'file'
  >[],
) {
  const transformedData = {};

  inputData?.forEach((item) => {
    const date = item.interview_meeting.start_time.split('T')[0]; // Extracting date from start_time
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
