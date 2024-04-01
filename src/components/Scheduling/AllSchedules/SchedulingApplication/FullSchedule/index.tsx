import { useRouter } from 'next/router';
import React from 'react';

import { Checkbox } from '@/devlink';
import { StatusBadge } from '@/devlink2';
import {
  AvatarWithName,
  FullScheduleCard,
  GeneralScheduleCard,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import IconScheduleType from '../../ListCard/Icon';
import { getScheduleType } from '../../utils';
import GetScheduleOptionsDialog from '../GetScheduleOptions';
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';

function FullSchedule() {
  const router = useRouter();
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const selectedSessionIds = useSchedulingApplicationStore(
    (state) => state.selectedSessionIds,
  );

  return (
    <>
      <GetScheduleOptionsDialog />
      {initialSessions?.map((session) => {
        const qualifiedInterviewers = session.users?.filter(
          (rel) => rel.interviewer_type === 'qualified',
        );
        const trainingInterviewers = session.users?.filter(
          (rel) => rel.interviewer_type === 'training',
        );
        return (
          <FullScheduleCard
            isNotScheduledActive={!session.interview_meeting}
            slotCheckbox={
              <Checkbox
                isChecked={selectedSessionIds.includes(session.id)}
                onClickCheck={{
                  onClick: () => {
                    if (selectedSessionIds.includes(session.id)) {
                      setSelectedSessionIds(
                        selectedSessionIds.filter((id) => id !== session.id),
                      );
                    } else {
                      setSelectedSessionIds([
                        ...selectedSessionIds,
                        session.id,
                      ]);
                    }
                  },
                }}
              />
            }
            isCardSelected={selectedSessionIds.includes(session.id)}
            key={session.id}
            textDate={'--'}
            textDay={'--'}
            textMonth={'--'}
            slotGeneralScheduleCard={
              <GeneralScheduleCard
                isScheduleNowVisible={!session.interview_meeting}
                isCardSelected={selectedSessionIds.includes(session.id)}
                slotStatusPill={
                  session.interview_meeting ? (
                    <StatusBadge
                      isCancelledVisible={
                        session.interview_meeting.status === 'cancelled'
                      }
                      isConfirmedVisible={
                        session.interview_meeting.status === 'confirmed'
                      }
                      isWaitingVisible={
                        session.interview_meeting.status === 'pending'
                      }
                      isCompletedVisible={
                        session.interview_meeting.status === 'completed'
                      }
                      isNotScheduledVisible={false}
                    />
                  ) : (
                    <StatusBadge
                      isNotScheduledVisible={true}
                      isCancelledVisible={false}
                      isConfirmedVisible={false}
                      isWaitingVisible={false}
                      isCompletedVisible={false}
                    />
                  )
                }
                slotInterviewers={
                  qualifiedInterviewers.length > 0
                    ? qualifiedInterviewers?.map((rel) => {
                        const user =
                          rel.interview_module_relation.recruiter_user;
                        if (user)
                          return (
                            <AvatarWithName
                              textName={user.first_name}
                              isRoleVisible={true}
                              textRole={user.position || '--'}
                              slotAvatar={
                                <MuiAvatar
                                  level={getFullName(
                                    user.first_name,
                                    user.last_name,
                                  )}
                                  src={user?.profile_image}
                                  variant={'circular'}
                                  width={'24px'}
                                  height={'24px'}
                                  fontSize={'12px'}
                                />
                              }
                            />
                          );
                      })
                    : '--'
                }
                isTimingVisible={Boolean(session.interview_meeting)}
                textLink={session.interview_module.name || '--'}
                textModuleName={session.name || '--'}
                slotTrainees={
                  trainingInterviewers.length > 0
                    ? trainingInterviewers.map((rel) => {
                        const user =
                          rel.interview_module_relation.recruiter_user;
                        if (user)
                          return (
                            <AvatarWithName
                              isRoleVisible={true}
                              isShadowVisible={true}
                              textName={user.first_name}
                              textRole={user.position || '--'}
                              slotAvatar={
                                <MuiAvatar
                                  level={getFullName(
                                    user.first_name,
                                    user.last_name,
                                  )}
                                  src={user?.profile_image}
                                  variant={'circular'}
                                  width={'24px'}
                                  height={'24px'}
                                  fontSize={'12px'}
                                />
                              }
                            />
                          );
                      })
                    : '--'
                }
                onClickLink={{
                  onClick: () => {
                    router.push(
                      `${pageRoutes.INTERVIEWMODULE}/members/${session.interview_module.id}`,
                    );
                  },
                }}
                isMembersVisible={false}
                textPlatformName={getScheduleType(session.schedule_type)}
                slotPlatformIcon={
                  <IconScheduleType type={session.schedule_type} />
                }
                textDuration={`${session.session_duration} Minutes`}
                textSelected={`(${session.interviewer_cnt} out of the members will be selected)`}
              />
            }
          />
        );
      })}
    </>
  );
}

export default FullSchedule;
