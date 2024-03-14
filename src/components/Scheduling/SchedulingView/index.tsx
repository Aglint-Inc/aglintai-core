import { AvatarGroup, Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import {
  AvailableOptionCardDate,
  Breadcrum,
  OptionAvailable,
  OptionAvailableCard,
  PageLayout,
  ScheduleInfoConfirmed,
  ScheduleInfoUpcoming
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { MemberType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import NotFoundPage from '@/src/pages/404';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import IconScheduleType from '../AllSchedules/ListCard/Icon';
import CandidateDetailsJobDrawer from '../AllSchedules/SchedulingApplication/CandidateDetailsJob';
import { getScheduleType } from '../AllSchedules/utils';
import { TransformSchedule } from '../Modules/ModuleMembers';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';

function SchedulingViewComp() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [schedule, setSchedule] = useState<TransformSchedule>(null);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (router.isReady && router.query.module_id) {
        const { data } = await supabase.rpc(
          'get_interview_schedule_by_module_id',
          { target_module_id: router.query.module_id as string }
        );
        if (data.length > 0) {
          const userIds = [];
          (
            data[0] as unknown as TransformSchedule
          ).schedule.confirmed_option.plans.map((plan) =>
            plan.selectedIntervs.map((interv) => userIds.push(interv.interv_id))
          );
          const resMem = await axios.post('/api/scheduling/fetchdbusers', {
            user_ids: userIds
          });
          setMembers(resMem.data);
          setSchedule({
            ...data[0]
          } as unknown as TransformSchedule);
          setLoading(false);
        }
      }
    })();
  }, [router]);

  const isMeetVisible = useMemo(() => {
    return schedule?.schedule.confirmed_option.plans.some((plan) =>
      plan.selectedIntervs.some(
        (interv) => interv.interv_id === recruiterUser?.user_id
      )
    );
  }, [schedule?.schedule?.confirmed_option?.plans]);

  return (
    <>
      {schedule && (
        <CandidateDetailsJobDrawer
          applications={schedule.applications}
          candidate={schedule.candidates}
          file={schedule.file}
          isViewProfileOpen={isViewProfileOpen}
          setIsViewProfileOpen={setIsViewProfileOpen}
        />
      )}

      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          }
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            {!loading && (
              <Breadcrum textName={schedule.schedule.schedule_name} />
            )}
          </>
        }
        slotBody={
          <>
            {loading && (
              <Stack height={'100%'} width={'100%'}>
                <Loader />
              </Stack>
            )}
            {!loading && schedule?.schedule.status == 'confirmed' ? (
              <ScheduleInfoConfirmed
                onClickViewProfile={{
                  onClick: () => {
                    setIsViewProfileOpen(true);
                  }
                }}
                isInterviewPlanVisible={true}
                isScheduleStatusVisible={false}
                slotInterviewPlan={
                  <OptionAvailableCard
                    isActive={false}
                    slotCardDate={schedule.schedule.confirmed_option?.transformedPlan.map(
                      (plan, ind) => {
                        return Object.entries(plan).map(([date, events]) => {
                          return (
                            <AvailableOptionCardDate
                              textDate={dayjs(date).format('DD')}
                              textDay={dayjs(date).format('dddd')}
                              textMonth={dayjs(date).format('MMM')}
                              key={ind}
                              slotOptionAvailable={events.map((pl, ind) => {
                                return (
                                  <OptionAvailable
                                    textTime={`${dayjs(pl.start_time).format(
                                      'hh:mm A'
                                    )} - ${dayjs(pl.end_time).format(
                                      'hh:mm A'
                                    )}`}
                                    textTitle={pl.module_name}
                                    key={ind}
                                    isTitleVisible={!pl.isBreak}
                                    isBreakVisible={pl.isBreak}
                                    slotMember={
                                      <Stack
                                        direction={'row'}
                                        sx={{
                                          flexWrap: 'wrap',
                                          gap: 2.5
                                        }}
                                      >
                                        {pl?.selectedIntervs?.map((int) => {
                                          const user = members.find(
                                            (member) =>
                                              member.user_id === int.interv_id
                                          );
                                          if (!user) return null;
                                          return (
                                            <Stack
                                              key={int.interv_id}
                                              direction={'row'}
                                              spacing={1}
                                              sx={{
                                                textWrap: 'nowrap'
                                              }}
                                            >
                                              <MuiAvatar
                                                level={user.first_name}
                                                src={user?.profile_image}
                                                variant={'circular'}
                                                width={'24px'}
                                                height={'24px'}
                                                fontSize={'12px'}
                                              />
                                              <Typography
                                                variant={'body2'}
                                                color={'#000'}
                                              >
                                                {user.first_name}
                                              </Typography>
                                            </Stack>
                                          );
                                        })}
                                      </Stack>
                                    }
                                  />
                                );
                              })}
                            />
                          );
                        });
                      }
                    )}
                  />
                }
                slotScheduleInfoCard={
                  <ScheduleInfoUpcoming
                    onClickCopyLink={{
                      onClick: () => {
                        navigator.clipboard.writeText(
                          schedule.interview_meeting.meeting_json.hangoutLink
                        );
                        toast.success('Link copied');
                      }
                    }}
                    slotMemberProfile={
                      <AvatarGroup
                        total={schedule.users?.length || 0}
                        sx={{
                          '& .MuiAvatar-root': {
                            width: '40px',
                            height: '40px',
                            fontSize: '16px'
                          }
                        }}
                      >
                        {schedule.users.slice(0, 5)?.map((user) => {
                          return (
                            <MuiAvatar
                              key={user.interviewer_id}
                              src={user.profile_image}
                              level={getFullName(
                                user.first_name,
                                user.last_name
                              )}
                              variant='circular'
                              height='40px'
                              width='40px'
                              fontSize='16px'
                            />
                          );
                        })}
                      </AvatarGroup>
                    }
                    textLink={
                      schedule.interview_meeting.meeting_json.hangoutLink
                    }
                    isLinkVisible={isMeetVisible}
                    slotButtonPrimary={
                      isMeetVisible && (
                        <ButtonPrimaryRegular
                          textLabel={'Join Meeting'}
                          onClickButton={{
                            onClick: () => {
                              window.open(
                                schedule.interview_meeting.meeting_json
                                  .hangoutLink,
                                '_blank'
                              );
                            }
                          }}
                        />
                      )
                    }
                    textDate={dayjs(schedule.interview_meeting.end_time).format(
                      'DD'
                    )}
                    textDay={dayjs(schedule.interview_meeting.end_time).format(
                      'dddd'
                    )}
                    textMonth={dayjs(
                      schedule.interview_meeting.end_time
                    ).format('MMM')}
                    textStatus={schedule.schedule.status}
                    textPlatformName={getScheduleType(
                      schedule.schedule.schedule_type
                    )}
                    slotMeetingIcon={
                      <IconScheduleType
                        type={schedule.schedule.schedule_type}
                      />
                    }
                    textTitle={schedule.schedule.schedule_name}
                    textTime={`${dayjs(
                      schedule.interview_meeting.start_time
                    ).format('hh:mm A')} - ${dayjs(
                      schedule.interview_meeting.end_time
                    ).format('hh:mm A')} ( ${
                      schedule.interview_meeting.duration
                    } Minutes )`}
                  />
                }
                textName={getFullName(
                  schedule.candidates.first_name,
                  schedule.candidates.last_name
                )}
                textRole={schedule.job.job_title}
                textLocation={schedule.job.location || '--'}
                slotProfileImage={
                  <MuiAvatar
                    level={getFullName(
                      schedule?.candidates.first_name,
                      schedule?.candidates.last_name
                    )}
                    src={schedule?.candidates.avatar}
                    variant={'circular'}
                    width={'100%'}
                    height={'100%'}
                    fontSize={'12px'}
                  />
                }
              />
            ) : (
              <NotFoundPage />
            )}
          </>
        }
        slotTopbarRight={''}
      />
    </>
  );
}

export default SchedulingViewComp;
