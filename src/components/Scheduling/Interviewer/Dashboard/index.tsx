import { AvatarGroup } from '@mui/material';
import dayjs from 'dayjs';

import { MyScheduleDash, ScheduleCollapseCard } from '@/devlink';
import { AllInterviewEmpty } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

import { setSelectedSchedule, useInterviewerStore } from '../store';
import IconScheduleType from '../../Interview/ListCard/Icon';
import { getScheduleType } from '../../Interview/utils';

function Dashboard() {
  const schedules = useInterviewerStore((state) => state.schedules);
  const members = useInterviewerStore((state) => state.members);
  const slotCompleted = schedules.filter(
    (sch) => sch.schedule.status === 'completed',
  );

  const slotUpcoming = schedules.filter(
    (sch) => sch.schedule.status === 'confirmed',
  );
  return (
    <>
      <MyScheduleDash
        slotCompleted={
          <>
            {slotCompleted.length > 0 ? (
              slotCompleted.map((sch) => {
                return (
                  <>
                    <ScheduleCollapseCard
                      isCompletedVisible={true}
                      isUpcomingVisible={false}
                      textTitle={sch.schedule.schedule_name}
                      textTime={`${dayjs(
                        sch.schedule.schedule_time?.startTime,
                      ).format('hh:mm A')} - ${dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('hh:mm A')}`.toUpperCase()}
                      textPlatformName={getScheduleType(
                        sch.schedule.schedule_type,
                      )}
                      slotPlatformLogo={
                        <IconScheduleType type={sch.schedule.schedule_type} />
                      }
                      textCandidateName={`${sch.candidate.first_name} ${sch.candidate.last_name}`}
                      textDate={dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('DD')}
                      textDay={dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('dddd')}
                      textMonth={dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('MMM')}
                      key={sch.schedule.id}
                      slotAvatarCandidate={
                        <MuiAvatar
                          key={sch.candidate.id}
                          src={sch.candidate.avatar}
                          level={sch.candidate.first_name}
                          variant='circular'
                          height='24px'
                          width='24px'
                          fontSize='8px'
                        />
                      }
                      slotPannelAvatar={
                        <AvatarGroup
                          sx={{
                            '& .MuiAvatar-root': {
                              width: '24px',
                              height: '24px',
                              fontSize: '12px',
                            },
                          }}
                          total={sch.schedule.panel_users.length}
                        >
                          {sch.schedule.panel_users
                            .slice(0, 3)
                            .map((rel: { user_id: string; must: string }) => {
                              const member = members.filter(
                                (member) => member.user_id === rel.user_id,
                              )[0];

                              return (
                                <MuiAvatar
                                  key={rel.user_id}
                                  src={member?.profile_image}
                                  level={member?.first_name}
                                  variant='circular'
                                  height='24px'
                                  width='24px'
                                  fontSize='8px'
                                />
                              );
                            })}
                        </AvatarGroup>
                      }
                    />
                  </>
                );
              })
            ) : (
              <AllInterviewEmpty />
            )}
          </>
        }
        slotUpcoming={
          <>
            {slotUpcoming.length > 0 ? (
              slotUpcoming.map((sch) => {
                return (
                  <>
                    <ScheduleCollapseCard
                      onClickCard={{
                        onClick: () => {
                          setSelectedSchedule(sch);
                        },
                      }}
                      isCompletedVisible={false}
                      isUpcomingVisible={true}
                      textTitle={sch.schedule.schedule_name}
                      textTime={`${dayjs(
                        sch.schedule.schedule_time?.startTime,
                      ).format('hh:mm A')} - ${dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('hh:mm A')}`.toUpperCase()}
                      textPlatformName={getScheduleType(
                        sch.schedule.schedule_type,
                      )}
                      slotPlatformLogo={
                        <IconScheduleType type={sch.schedule.schedule_type} />
                      }
                      textCandidateName={`${sch.candidate.first_name} ${sch.candidate.last_name}`}
                      textDate={dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('DD')}
                      textDay={dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('dddd')}
                      textMonth={dayjs(
                        sch.schedule.schedule_time?.endTime,
                      ).format('MMM')}
                      key={sch.schedule.id}
                      slotAvatarCandidate={
                        <MuiAvatar
                          key={sch.candidate.id}
                          src={sch.candidate.avatar}
                          level={sch.candidate.first_name}
                          variant='circular'
                          height='24px'
                          width='24px'
                          fontSize='8px'
                        />
                      }
                      slotPannelAvatar={
                        <AvatarGroup
                          sx={{
                            '& .MuiAvatar-root': {
                              width: '24px',
                              height: '24px',
                              fontSize: '12px',
                            },
                          }}
                          total={sch.schedule.panel_users.length}
                        >
                          {sch.schedule.panel_users
                            .slice(0, 3)
                            .map((rel: { user_id: string; must: string }) => {
                              const member = members.filter(
                                (member) => member.user_id === rel.user_id,
                              )[0];

                              return (
                                <MuiAvatar
                                  key={rel.user_id}
                                  src={member?.profile_image}
                                  level={member?.first_name}
                                  variant='circular'
                                  height='24px'
                                  width='24px'
                                  fontSize='8px'
                                />
                              );
                            })}
                        </AvatarGroup>
                      }
                    />
                  </>
                );
              })
            ) : (
              <AllInterviewEmpty />
            )}
          </>
        }
      />
    </>
  );
}

export default Dashboard;
