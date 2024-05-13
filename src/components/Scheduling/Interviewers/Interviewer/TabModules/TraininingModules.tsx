import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { MemberListCard, StatusBadge } from '@/devlink2';
import { HistoryPill, HistoryTrainingCard } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';

import IconScheduleType from '../../../AllSchedules/ListCard/Icon';
import { InterviewerDetailsType, PauseDialog } from '../../type';
import { getMeetingsByUserIdModuleId } from '..';

function TraininingModules({
  interviewerDetails,
  setPauseResumeDialog,
  userMeetings,
}: {
  interviewerDetails: InterviewerDetailsType;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
  userMeetings: Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>;
}) {
  const router = useRouter();
  return (
    <>
      {interviewerDetails.modules.filter(
        (item) => item.training_status === 'training',
      ).length ? (
        interviewerDetails.modules
          .filter((item) => item.training_status === 'training')
          .map((module) => {
            const { interview_module, module_id, pause_json } = module;
            const tempMeetingData: {
              [key: string]: (typeof userMeetings)[string];
            } = {};
            // working here
            (userMeetings[module.module_id] || [])
              // .filter((item) => item.status == 'completed')
              .reverse()
              .forEach((item) => {
                tempMeetingData[item.training_type] = [
                  ...(tempMeetingData[item.training_type] || []),
                  item,
                ];
              });
            let trainingStatusArray: {
              text: 'shadow' | 'reverse shadow';
              state: boolean;
              meeting: (typeof userMeetings)[string][number];
            }[] = [
              ...new Array(
                // @ts-ignore
                interview_module.settings?.noShadow || 0,
              ).fill({
                text: 'shadow',
                state: false,
                meeting: null,
              }),
              ...new Array(
                // @ts-ignore
                interview_module.settings?.noReverseShadow || 0,
              ).fill({
                text: 'reverse shadow',
                state: false,
                meeting: null,
              }),
            ];
            trainingStatusArray = trainingStatusArray.map((item) => {
              if (tempMeetingData[item.text]?.length) {
                const temp = tempMeetingData[item.text].pop();
                return {
                  ...item,
                  state: Boolean(temp),
                  meeting: temp,
                };
              }
              return item;
            });

            return (
              <MemberListCard
                textPause={
                  'Paused from assigning to new interviews with this module'
                }
                isDropdownIconVisible={false}
                isMoveToQualifierVisible={false}
                isTrainingProgessVisible={true}
                isRemoveVisible={false}
                isInterviewsVisible={false}
                slotProgressBar={
                  <>
                    {trainingStatusArray.map((item, index) => {
                      return (
                        <HistoryPill
                          key={index}
                          isStart={index === 0}
                          isStartActive={index === 0 && item.state}
                          isEnd={trainingStatusArray.length - 1 === index}
                          isEndActive={
                            trainingStatusArray.length - 1 === index &&
                            item.state
                          }
                          slotHistoryTrainingCard={
                            <HistoryTrainingCard
                              textInterviewType={item.meeting?.name}
                              isNotScheduleVisible={!item.meeting}
                              isReverseShadow={item.text === 'reverse shadow'}
                              isShadow={item.text === 'shadow'}
                              slotStatus={
                                <StatusBadge
                                  isCancelledVisible={
                                    item.meeting?.status === 'cancelled'
                                  }
                                  isConfirmedVisible={
                                    item.meeting?.status === 'confirmed'
                                  }
                                  isWaitingVisible={
                                    item.meeting?.status === 'waiting'
                                  }
                                  isCompletedVisible={
                                    item.meeting?.status === 'completed'
                                  }
                                  isNotScheduledVisible={
                                    item.meeting?.status === 'not_scheduled'
                                  }
                                />
                              }
                              slotMeetingIcon={
                                <IconScheduleType
                                  type={item.meeting?.schedule_type}
                                />
                              }
                              textDate={dayjs(item.meeting?.start_time).format(
                                'ddd DD MMM YYYY',
                              )}
                              textTime={`${dayjs(
                                item.meeting?.start_time,
                              ).format('HH:mm')} to ${dayjs(
                                item.meeting?.end_time,
                              ).format('HH:mm')}`}
                              isSchedule={Boolean(item.meeting?.status)}
                              textDuration={
                                <>
                                  {`${
                                    // @ts-ignore
                                    (new Date(item.meeting?.end_time) -
                                      // @ts-ignore
                                      new Date(item.meeting?.start_time)) /
                                    (1000 * 60)
                                  } Minutes`}
                                </>
                              }
                              textPlatformName={
                                // @ts-ignore
                                item.meeting?.meeting_json?.conferenceData
                                  ?.conferenceSolution?.name
                              }
                            />
                          }
                          isMiddle={
                            index > 0 && index < trainingStatusArray.length
                          }
                          isMiddleActive={
                            index > 0 &&
                            index < trainingStatusArray.length &&
                            item.state
                          }
                          isShadow={item.text === 'shadow'}
                          isReverseShadow={item.text === 'reverse shadow'}
                        />
                      );
                    })}
                  </>
                }
                key={module_id}
                textName={interview_module.name}
                isTextObjectiveVisible={true}
                textObjective={interview_module.description}
                isPauseResumeVisible={Boolean(pause_json)}
                isPauseVisible={!pause_json}
                isResumeVisible={Boolean(pause_json)}
                isScheduleCountVisible={false}
                isProfileVisible={false}
                isRoleVisible={false}
                textPauseResumeDate={
                  pause_json
                    ? pause_json.isManual
                      ? 'Indefinately'
                      : pause_json.end_date
                        ? `${dayjs(pause_json.end_date).format('DD MMMM YYYY')}`
                        : '--'
                    : ''
                }
                onClickPauseInterview={{
                  onClick: () => {
                    setPauseResumeDialog((pre) => ({
                      ...pre,
                      isOpen: true,
                      type: 'pause',
                      panel_id: module_id,
                      isLoading: false,
                    }));
                  },
                }}
                onClickResumeInterview={{
                  onClick: () => {
                    setPauseResumeDialog((pre) => ({
                      ...pre,
                      isOpen: true,
                      type: 'resume',
                      panel_id: module_id,
                      isLoading: false,
                      end_time: module.pause_json.end_date,
                    }));
                  },
                }}
                onClickRemoveModule={{
                  onClick: () => {
                    setPauseResumeDialog((pre) => ({
                      ...pre,
                      isOpen: true,
                      type: 'remove',
                      panel_id: module_id,
                      isLoading: false,
                    }));
                  },
                }}
                // onClickViewProgress={{
                //   onClick: () => {
                //     setMeetingDetails({
                //       meetings: userMeetings[module.module_id] || [],
                //       settings: {
                //         noShadow:
                //           // @ts-ignore
                //           module.interview_module.settings?.noShadow || 0,
                //         noReverseShadow:
                //           // @ts-ignore
                //           module.interview_module.settings
                //             ?.noReverseShadow || 0,
                //       },
                //     });
                //   },
                // }}
                onClickCard={{
                  onClick: () => {
                    router.push(
                      pageRoutes.INTERVIEWMODULE +
                        '/members' +
                        `/${module.module_id}`,
                    );
                  },
                }}
              />
            );
          })
      ) : (
        <Typography variant='body2'>No Interview Types Added Yet</Typography>
      )}
    </>
  );
}

export default TraininingModules;
