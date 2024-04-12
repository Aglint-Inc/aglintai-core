import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { Checkbox } from '@/devlink';
import { StatusBadge } from '@/devlink2';
import {
  EditOptionModule,
  InterviewBreakCard,
  NewInterviewPlan,
  NewInterviewPlanCard,
} from '@/devlink3';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';

import IconScheduleType from '../../ListCard/Icon';
import { setIsCancelOpen, setIsRescheduleOpen } from '../../store';
import { getScheduleType } from '../../utils';
import CancelScheduleDialog from '../Common/CancelScheduleDialog';
import RescheduleDialog from '../Common/RescheduleDialog';
import GetScheduleOptionsDialog from '../GetScheduleOptions';
import {
  setEditSession,
  setIsEditBreakOpen,
  setIsEditOpen,
  setSelectedMeeting,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import BreakDrawerEdit from './BreakDrawer';
import SideDrawerEdit from './EditDrawer';

function FullSchedule() {
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const selectedSessionIds = useSchedulingApplicationStore(
    (state) => state.selectedSessionIds,
  );

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const isNormalSession = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type !== 'debrief');

  return (
    <>
      <SideDrawerEdit />
      <BreakDrawerEdit />
      <CancelScheduleDialog />
      <RescheduleDialog />
      <GetScheduleOptionsDialog />
      <NewInterviewPlan
        slotNewInterviewPlanCard={initialSessions?.map((session, ind) => {
          return (
            <Stack
              key={ind}
              style={{
                opacity:
                  isNormalSession && session.session_type === 'debrief'
                    ? 0.5
                    : isDebrief &&
                        (session.session_type !== 'debrief' ||
                          !selectedSessionIds.includes(session.id))
                      ? 0.5
                      : 1,
                pointerEvents:
                  isNormalSession && session.session_type === 'debrief'
                    ? 'none'
                    : isDebrief &&
                        (session.session_type !== 'debrief' ||
                          !selectedSessionIds.includes(session.id))
                      ? 'none'
                      : 'auto',
              }}
            >
              <NewInterviewPlanCard
                slotStatus={
                  session.interview_meeting?.status ? (
                    <StatusBadge
                      isCancelledVisible={
                        session.interview_meeting.status === 'cancelled'
                      }
                      isConfirmedVisible={
                        session.interview_meeting.status === 'confirmed'
                      }
                      isWaitingVisible={
                        session.interview_meeting.status === 'waiting'
                      }
                      isCompletedVisible={
                        session.interview_meeting.status === 'completed'
                      }
                      isNotScheduledVisible={
                        session.interview_meeting.status === 'not_scheduled'
                      }
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
                isDebriefIconVisible={session.session_type === 'debrief'}
                isPanelIconVisible={session.session_type === 'panel'}
                isOnetoOneIconVisible={session.session_type === 'individual'}
                isDurationVisible={true}
                isLocationVisible={Boolean(session.location)}
                isNotScheduledIconVisible={
                  !session.interview_meeting?.start_time
                }
                slotCheckbox={
                  !session.interview_meeting ||
                  session.interview_meeting.status === 'not_scheduled' ||
                  session.interview_meeting.status === 'cancelled' ||
                  session.interview_meeting.status === 'reschedule' ? (
                    <Checkbox
                      isChecked={selectedSessionIds.includes(session.id)}
                      onClickCheck={{
                        onClick: () => {
                          if (selectedSessionIds.includes(session.id)) {
                            setSelectedSessionIds(
                              selectedSessionIds.filter(
                                (id) => id !== session.id,
                              ),
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
                  ) : (
                    <Stack width={'18px'}></Stack>
                  )
                }
                isSelected={selectedSessionIds.includes(session.id)}
                isTimeVisible={Boolean(session.interview_meeting?.start_time)}
                slotPlatformIcon={
                  <IconScheduleType type={session.schedule_type} />
                }
                textDuration={`${session.session_duration} Minutes`}
                textLocation={session.location || '--'}
                textMeetingPlatform={getScheduleType(session.schedule_type)}
                textMeetingTitle={session.name || '--'}
                textDate={dayjs(session.interview_meeting?.start_time).format(
                  'DD',
                )}
                textDay={dayjs(session.interview_meeting?.start_time).format(
                  'dddd',
                )}
                textMonth={dayjs(session.interview_meeting?.start_time).format(
                  'MMM',
                )}
                textTime={
                  session.interview_meeting?.start_time
                    ? `${dayjs(session.interview_meeting?.start_time).format(
                        'hh:mm A',
                      )} - ${dayjs(session.interview_meeting?.end_time).format(
                        'hh:mm A',
                      )}`
                    : '--'
                }
                slotEditOptionModule={
                  <EditOptionModule
                    isEditVisible={
                      !session.interview_meeting ||
                      session.interview_meeting?.status === 'not_scheduled'
                    }
                    isViewScheduleVisible={false}
                    isCancelScheduleVisible={
                      session.interview_meeting?.status === 'confirmed' ||
                      session.interview_meeting?.status === 'waiting'
                    }
                    isRescheduleVisible={
                      session.interview_meeting?.status === 'confirmed' ||
                      session.interview_meeting?.status === 'waiting' ||
                      session.interview_meeting?.status === 'cancelled'
                    }
                    onClickCancelSchedule={{
                      onClick: () => {
                        setSelectedMeeting(session.interview_meeting);
                        setIsCancelOpen(true);
                      },
                    }}
                    onClickReschedule={{
                      onClick: () => {
                        setSelectedMeeting(session.interview_meeting);
                        setIsRescheduleOpen(true);
                      },
                    }}
                    onClickEdit={{
                      onClick: () => {
                        setEditSession(session);
                        setIsEditOpen(true);
                      },
                    }}
                  />
                }
              />
              {session.break_duration > 0 && (
                <Stack pl={'34px'} pt={'10px'}>
                  <InterviewBreakCard
                    textDuration={getBreakLabel(session.break_duration)}
                    isThreeDotVisible={true}
                    isEditDeleteVisible={false}
                    slotEditOptionModule={
                      <EditOptionModule
                        isEditVisible={true}
                        isViewScheduleVisible={false}
                        isCancelScheduleVisible={false}
                        isRescheduleVisible={false}
                        onClickEdit={{
                          onClick: () => {
                            setEditSession(session);
                            setIsEditBreakOpen(true);
                          },
                        }}
                      />
                    }
                  />
                </Stack>
              )}
            </Stack>

            // <FullScheduleCard
            //   isNotScheduledVisible={!session.interview_meeting?.start_time}
            //   textStatus={capitalize(
            //     session.interview_meeting?.status === 'not_scheduled' ||
            //       !session.interview_meeting
            //       ? 'not scheduled'
            //       : session.interview_meeting?.status,
            //   )}
            //   isNotScheduleActive={selectedSessionIds.includes(session.id)}
            //   slotCheckbox={
            //     !session.interview_meeting ||
            //     session.interview_meeting.status === 'not_scheduled' ||
            //     session.interview_meeting.status === 'cancelled' ||
            //     session.interview_meeting.status === 'reschedule' ? (
            //       <Checkbox
            //         isChecked={selectedSessionIds.includes(session.id)}
            //         onClickCheck={{
            //           onClick: () => {
            //             if (selectedSessionIds.includes(session.id)) {
            //               setSelectedSessionIds(
            //                 selectedSessionIds.filter(
            //                   (id) => id !== session.id,
            //                 ),
            //               );
            //             } else {
            //               if (session.session_type == 'debrief') {
            //                 const isOtherThanDebrief = initialSessions
            //                   .filter((ses) =>
            //                     selectedSessionIds.includes(ses.id),
            //                   )
            //                   .some((ses) => ses.session_type !== 'debrief');
            //                 if (isOtherThanDebrief) {
            //                   toast.warning(
            //                     'Schedule defbrief sesssion separately',
            //                   );
            //                 } else {
            //                   setSelectedSessionIds([
            //                     ...selectedSessionIds,
            //                     session.id,
            //                   ]);
            //                 }
            //               } else {
            //                 setSelectedSessionIds([
            //                   ...selectedSessionIds,
            //                   session.id,
            //                 ]);
            //               }
            //             }
            //           },
            //         }}
            //       />
            //     ) : (
            //       <Stack width={'18px'}></Stack>
            //     )
            //   }
            //   isLineVisible={ind !== initialSessions.length - 1}
            //   isCardSelected={selectedSessionIds.includes(session.id)}
            //   key={session.id}
            //   textDate={dayjs(session.interview_meeting?.start_time).format(
            //     'DD',
            //   )}
            //   textDay={dayjs(session.interview_meeting?.start_time).format(
            //     'dddd',
            //   )}
            //   textMonth={dayjs(session.interview_meeting?.start_time).format(
            //     'MMM',
            //   )}
            //   slotGeneralScheduleCard={
            //     <GeneralScheduleCard
            //       slotEditOptions={
            //         <EditOptionModule
            //           isEditVisible={
            //             !session.interview_meeting ||
            //             session.interview_meeting?.status === 'not_scheduled'
            //           }
            //           isViewScheduleVisible={false}
            //           isCancelScheduleVisible={
            //             session.interview_meeting?.status === 'confirmed' ||
            //             session.interview_meeting?.status === 'waiting'
            //           }
            //           isRescheduleVisible={
            //             session.interview_meeting?.status === 'confirmed' ||
            //             session.interview_meeting?.status === 'waiting' ||
            //             session.interview_meeting?.status === 'cancelled'
            //           }
            //           onClickCancelSchedule={{
            //             onClick: () => {
            //               setSelectedMeeting(session.interview_meeting);
            //               setIsCancelOpen(true);
            //             },
            //           }}
            //           onClickReschedule={{
            //             onClick: () => {
            //               setSelectedMeeting(session.interview_meeting);
            //               setIsRescheduleOpen(true);
            //             },
            //           }}
            //           onClickEdit={{
            //             onClick: () => {
            //               setEditSession(session);
            //               setIsEditOpen(true);
            //             },
            //           }}
            //         />
            //       }
            //       onClickScheduleNow={{
            //         onClick: () => {
            //           setSelectedSessionIds([session.id]);
            //           setIsScheduleNowOpen(true);
            //           setStep(1);
            //         },
            //       }}
            //       textTiming={`${dayjs(session.interview_meeting?.start_time).format('hh:mm A')} - ${dayjs(session.interview_meeting?.end_time).format('hh:mm A')}`}
            //       isScheduleNowVisible={false}
            //       isCardSelected={selectedSessionIds.includes(session.id)}
            //       slotStatusPill={
            //         session.interview_meeting?.status ? (
            //           <StatusBadge
            //             isCancelledVisible={
            //               session.interview_meeting.status === 'cancelled'
            //             }
            //             isConfirmedVisible={
            //               session.interview_meeting.status === 'confirmed'
            //             }
            //             isWaitingVisible={
            //               session.interview_meeting.status === 'waiting'
            //             }
            //             isCompletedVisible={
            //               session.interview_meeting.status === 'completed'
            //             }
            //             isNotScheduledVisible={
            //               session.interview_meeting.status === 'not_scheduled'
            //             }
            //           />
            //         ) : (
            //           <StatusBadge
            //             isNotScheduledVisible={true}
            //             isCancelledVisible={false}
            //             isConfirmedVisible={false}
            //             isWaitingVisible={false}
            //             isCompletedVisible={false}
            //           />
            //         )
            //       }
            //       isInterviewersVisible={
            //         session.session_type == 'individual' ||
            //         session.session_type == 'panel'
            //       }
            //       slotInterviewers={
            //         (session.session_type == 'individual' ||
            //           session.session_type == 'panel') &&
            //         (qualifiedInterviewers.length > 0
            //           ? qualifiedInterviewers?.map((rel) => {
            //               const user =
            //                 rel.interview_module_relation.recruiter_user;
            //               if (user)
            //                 return (
            //                   <AvatarWithName
            //                     textName={user.first_name}
            //                     isRoleVisible={true}
            //                     textRole={user.position || '--'}
            //                     slotAvatar={
            //                       <MuiAvatar
            //                         level={getFullName(
            //                           user.first_name,
            //                           user.last_name,
            //                         )}
            //                         src={user?.profile_image}
            //                         variant={'circular'}
            //                         width={'24px'}
            //                         height={'24px'}
            //                         fontSize={'12px'}
            //                       />
            //                     }
            //                   />
            //                 );
            //             })
            //           : '--')
            //       }
            //       isLinkVisilble={session.session_type !== 'debrief'}
            //       isDebriefIconVisible={session.session_type === 'debrief'}
            //       isPanelIconVisible={session.session_type === 'panel'}
            //       isOnetoOneIconVisible={session.session_type === 'individual'}
            //       isTimingVisible={Boolean(
            //         session.interview_meeting?.start_time,
            //       )}
            //       textLink={session.interview_module?.name || '--'}
            //       textModuleName={session.name || '--'}
            //       slotTrainees={
            //         (session.session_type == 'individual' ||
            //           session.session_type == 'panel') &&
            //         (trainingInterviewers.length > 0
            //           ? trainingInterviewers.map((rel) => {
            //               const user =
            //                 rel.interview_module_relation.recruiter_user;
            //               if (user)
            //                 return (
            //                   <AvatarWithName
            //                     isRoleVisible={false}
            //                     isShadowVisible={false}
            //                     textName={getFullName(
            //                       user.first_name,
            //                       user.last_name,
            //                     )}
            //                     textRole={user.position || '--'}
            //                     slotAvatar={
            //                       <MuiAvatar
            //                         level={getFullName(
            //                           user.first_name,
            //                           user.last_name,
            //                         )}
            //                         src={user?.profile_image}
            //                         variant={'circular'}
            //                         width={'24px'}
            //                         height={'24px'}
            //                         fontSize={'12px'}
            //                       />
            //                     }
            //                   />
            //                 );
            //             })
            //           : '--')
            //       }
            //       slotMembers={
            //         qualifiedInterviewers.length > 0
            //           ? qualifiedInterviewers?.map((rel) => {
            //               const user = rel?.recruiter_user;
            //               if (user)
            //                 return (
            //                   <AvatarWithName
            //                     textName={getFullName(
            //                       user.first_name,
            //                       user.last_name,
            //                     )}
            //                     isRoleVisible={true}
            //                     textRole={user.position || '--'}
            //                     slotAvatar={
            //                       <MuiAvatar
            //                         level={getFullName(
            //                           user.first_name,
            //                           user.last_name,
            //                         )}
            //                         src={user?.profile_image}
            //                         variant={'circular'}
            //                         width={'24px'}
            //                         height={'24px'}
            //                         fontSize={'12px'}
            //                       />
            //                     }
            //                   />
            //                 );
            //             })
            //           : '--'
            //       }
            //       isTraineesVisible={
            //         (session.session_type == 'individual' ||
            //           session.session_type == 'panel') &&
            //         trainingInterviewers.length > 0
            //       }
            //       onClickLink={{
            //         onClick: () => {
            //           router.push(
            //             `${pageRoutes.INTERVIEWMODULE}/members/${session.interview_module.id}`,
            //           );
            //         },
            //       }}
            //       isMembersVisible={session.session_type === 'debrief'}
            //       textPlatformName={getScheduleType(session.schedule_type)}
            //       slotPlatformIcon={
            //         <IconScheduleType type={session.schedule_type} />
            //       }
            //       textDuration={`${session.session_duration} Minutes`}
            //       textSelected={`(${session.interviewer_cnt} out of the members will be selected)`}
            //     />
            //   }
            // />
          );
        })}
      />
    </>
  );
}

export default FullSchedule;
