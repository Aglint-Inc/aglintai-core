/* eslint-disable no-unused-vars */
import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { MemberListCard } from '@/devlink2';
import { HistoryPill, InterviewerDetail, ModulesMoreMenu } from '@/devlink3';
import PauseIcon from '@/src/components/Common/Icons/PauseIcon';
import PlayIcon from '@/src/components/Common/Icons/PlayIcon';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';
import {
  interviewerDetailsType,
  useImrQuery,
  useInterviewerSchedulesQuery,
} from '@/src/pages/scheduling/interviewer/[member_id]';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Interviews from '../Interviews';
import PauseResumeDialog from '../PauseResumeDialog';
import InterviewerLevelSettings from './InterviewerLevelSettings';
import MeetingProgressDrawer from './meetingProgressDrawer';

function Interviewer({
  openDrawer,
  setOpenDrawer,
  interviewerDetails,
}: {
  openDrawer: boolean;
  setOpenDrawer: (x: boolean) => void;
  interviewerDetails: interviewerDetailsType;
}) {
  const { handelUpdateSchedule, handelRemoveMemberFormPanel } =
    useInterviewerContext();
  const { handelMemberUpdate } = useAuthDetails();

  const [pauseResumeDialog, setPauseResumeDialog] = useState<{
    isOpen: boolean;
    isAll: boolean;
    training_status?: 'qualified' | 'training';
    panel_id?: string | null;
    type:
      | 'pause'
      | 'resume'
      | 'remove'
      | 'addQualifiedModule'
      | 'addTrainingModule';
    isLoading?: boolean;
    end_time?: string;
  }>({
    isOpen: false,
    isAll: false,
    type: 'pause',
    panel_id: null,
    isLoading: false,
    end_time: '',
  });
  const { refetch } = useImrQuery();
  const today = dayjs().startOf('day');
  const thisWeekStart = dayjs().endOf('week');
  let totalInterviewsThisWeek: ReturnType<
    typeof useInterviewerSchedulesQuery
  >['data'] = [];
  let totalInterviewsToday: ReturnType<
    typeof useInterviewerSchedulesQuery
  >['data'] = [];
  let totalHoursThisWeek = 0;
  let totalHoursToday = 0;

  const interviewerSchedules = useInterviewerSchedulesQuery();
  if (interviewerSchedules.isFetched) {
    const completedInterviews = interviewerSchedules.data.filter(
      (item) => item.interview_meeting.status == 'completed',
    );
    totalInterviewsToday = completedInterviews.filter((interview) =>
      dayjs(interview.interview_meeting.end_time).isSame(today, 'day'),
    );
    totalInterviewsThisWeek = completedInterviews.filter((interview) =>
      dayjs(interview.interview_meeting.end_time).isBefore(thisWeekStart),
    );

    totalHoursToday =
      Number(
        totalInterviewsToday.reduce(
          (a, b) => a + b.interview_session.session_duration,
          0,
        ),
      ) / 60;
    totalHoursThisWeek =
      Number(
        totalInterviewsThisWeek.reduce(
          (a, b) => a + b.interview_session.session_duration,
          0,
        ),
      ) / 60;
  }
  // const [selectedModule, setSelectedModule] = useState<{module:string}>({
  //   user: null,
  //   progress: [],
  // });
  const [meetingsDetails, setMeetingDetails] = useState<{
    meetings: Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>[string];
    settings: { noShadow: number; noReverseShadow: number };
  }>({
    meetings: [],
    settings: null,
  });
  const [userMeetings, setUserMeetings] = useState<
    Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>
  >({});
  useEffect(() => {
    if (interviewerDetails.interviewer.user_id) {
      getMeetingsByUserIdModuleId({
        user_id: interviewerDetails.interviewer.user_id,
        module_ids: interviewerDetails.modules.map((item) => item.module_id),
      }).then((data) => {
        setUserMeetings(data);
      });
    }
  }, [interviewerDetails]);

  return (
    <>
      <Drawer
        anchor='right'
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <InterviewerLevelSettings
          setOpenDrawer={setOpenDrawer}
          initialData={
            interviewerDetails.interviewer?.scheduling_settings as any
          }
          updateSettings={(x) => {
            return handelMemberUpdate({
              user_id: interviewerDetails.interviewer.user_id,
              data: { scheduling_settings: x },
            });
          }}
          isOverflow={true}
        />
      </Drawer>
      <InterviewerDetail
        onClickInterviewSchedule={{
          onClick: () => {
            setOpenDrawer(true);
          },
        }}
        textEmail={interviewerDetails.interviewer?.email}
        textDepartment={interviewerDetails.interviewer.position}
        textInterviewerName={
          interviewerDetails.interviewer.first_name +
          ' ' +
          (interviewerDetails.interviewer.last_name
            ? interviewerDetails.interviewer.last_name
            : '')
        }
        slotInterviewerAvatar={
          <MuiAvatar
            key={interviewerDetails.interviewer.user_id}
            src={interviewerDetails.interviewer.profile_image}
            level={getFullName(
              interviewerDetails.interviewer.first_name,
              interviewerDetails.interviewer.last_name,
            )}
            variant='circular'
            height='80px'
            width='80px'
            fontSize='20px'
          />
        }
        textTimeZone={
          interviewerDetails.interviewer.scheduling_settings?.timeZone.label
        }
        textInterviewPerDay={
          <ShowCode>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.dailyLimit.type === 'Interviews'
              }
            >
              {totalInterviewsToday.length +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.dailyLimit.value || 0}
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.dailyLimit.type === 'Hours'
              }
            >
              {totalHoursToday +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.dailyLimit.value || 0}
            </ShowCode.When>
          </ShowCode>
        }
        textInterviewPerWeek={
          <ShowCode>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.type === 'Interviews'
              }
            >
              {totalInterviewsThisWeek.length +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.value || 0}
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.type === 'Hours'
              }
            >
              {totalHoursThisWeek +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.value || 0}
            </ShowCode.When>
          </ShowCode>
        }
        textInterviewToday={
          interviewerDetails.interviewer?.scheduling_settings?.interviewLoad
            ?.dailyLimit.type + ' today'
        }
        textInterviewWeek={
          interviewerDetails.interviewer?.scheduling_settings?.interviewLoad
            ?.weeklyLimit.type + ' this week'
        }
        slotQualifiedModules={
          interviewerDetails.modules.filter(
            (item) => item.training_status === 'qualified',
          ).length
            ? interviewerDetails.modules
                .filter((item) => item.training_status === 'qualified')
                .map((module) => {
                  const { interview_module, module_id, pause_json } = module;
                  return (
                    <MemberListCard
                      isMoveToQualifierVisible={false}
                      isTrainingProgessVisible={false}
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
                            ? 'Paused indefinably'
                            : pause_json.end_date
                              ? `Till ${dayjs(pause_json.end_date).format(
                                  'DD MMMM YYYY',
                                )}`
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
                    />
                  );
                })
            : null
        }
        slotTrainingModules={
          interviewerDetails.modules.filter(
            (item) => item.training_status === 'training',
          ).length
            ? interviewerDetails.modules
                .filter((item) => item.training_status === 'training')
                .map((module, i) => {
                  const { interview_module, module_id, pause_json } = module;
                  const tempMeetingData: { [key: string]: number } = {};
                  // working here
                  (userMeetings[module.module_id] || [])
                    .filter((item) => item.status == 'completed')
                    .forEach((item) => {
                      tempMeetingData[item.training_type] =
                        (tempMeetingData[item.training_type] || 0) + 1;
                    });
                  let trainingStatusArray: {
                    text: 'shadow' | 'reverse shadow';
                    state: boolean;
                  }[] = [
                    ...new Array(
                      // @ts-ignore
                      interview_module.settings?.noShadow || 0,
                    ).fill({
                      text: 'shadow',
                      state: false,
                    }),
                    ...new Array(
                      // @ts-ignore
                      interview_module.settings?.noReverseShadow || 0,
                    ).fill({
                      text: 'reverse shadow',
                      state: false,
                    }),
                  ];
                  trainingStatusArray = trainingStatusArray.map((item) => {
                    if ((tempMeetingData[item.text] || 0) > 0) {
                      tempMeetingData[item.text] -= 1;
                      return { ...item, state: true };
                    }
                    return item;
                  });

                  return (
                    <MemberListCard
                      isMoveToQualifierVisible={false}
                      isTrainingProgessVisible={true}
                      // isViewProgressVisible={false}
                      slotProgressBar={
                        <>
                          {trainingStatusArray.map((item, index) => (
                            <HistoryPill
                              key={index}
                              isActive={item.state}
                              isShadow={item.text === 'shadow'}
                              isReverseShadow={item.text === 'reverse shadow'}
                            />
                          ))}
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
                            ? 'Paused indefinably'
                            : pause_json.end_date
                              ? `Till ${dayjs(pause_json.end_date).format(
                                  'DD MMMM YYYY',
                                )}`
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
                      onClickViewProgress={{
                        onClick: () => {
                          setMeetingDetails({
                            meetings: userMeetings[module.module_id] || [],
                            settings: {
                              noShadow:
                                // @ts-ignore
                                module.interview_module.settings?.noShadow || 0,
                              noReverseShadow:
                              module.interview_module.settings
                              // @ts-ignore
                                  ?.noReverseShadow || 0,
                            },
                          });
                        },
                      }}
                    />
                  );
                })
            : null
        }
        slotQualifiedModulesMoreMenu={
          <ShowCode>
            <ShowCode.When
              isTrue={Boolean(
                interviewerDetails.modules.filter(
                  (item) => item.training_status === 'qualified',
                ).length,
              )}
            >
              <ModulesMoreMenu
                slotResumeIcon={
                  interviewerDetails.modules
                    .filter((ele) => ele.training_status === 'qualified')
                    .every((item) => item.pause_json) ? (
                    <PlayIcon />
                  ) : (
                    <PauseIcon />
                  )
                }
                textAllmodules={
                  interviewerDetails.modules
                    .filter((ele) => ele.training_status === 'qualified')
                    .every((item) => item.pause_json)
                    ? 'Resume all'
                    : 'Pause all'
                }
                isQualifiedModules={true}
                onClickRemove={{
                  onClick: () => {
                    setPauseResumeDialog({
                      isOpen: true,
                      isAll: true,
                      type: 'remove',
                      training_status: 'qualified',
                      isLoading: false,
                    });
                  },
                }}
                onClickPause={{
                  onClick: () => {
                    if (
                      interviewerDetails.modules
                        .filter((ele) => ele.training_status === 'qualified')
                        .every((item) => item.pause_json)
                    ) {
                      setPauseResumeDialog((pre) => ({
                        ...pre,
                        isOpen: true,
                        isAll: true,
                        type: 'resume',
                        training_status: 'qualified',
                        isLoading: false,
                      }));
                    } else {
                      setPauseResumeDialog({
                        isOpen: true,
                        isAll: true,
                        type: 'pause',
                        training_status: 'qualified',
                        isLoading: false,
                      });
                    }
                  },
                }}
              />
            </ShowCode.When>
          </ShowCode>
        }
        slotTrainingModulesMoreMenu={
          <ShowCode>
            <ShowCode.When
              isTrue={Boolean(
                interviewerDetails.modules.filter(
                  (item) => item.training_status === 'training',
                ).length,
              )}
            >
              <ModulesMoreMenu
                isQualifiedModules={true}
                slotResumeIcon={
                  interviewerDetails.modules
                    .filter((ele) => ele.training_status === 'training')
                    .every((item) => item.pause_json) ? (
                    <PlayIcon />
                  ) : (
                    <PauseIcon />
                  )
                }
                textAllmodules={
                  interviewerDetails.modules
                    .filter((ele) => ele.training_status === 'training')
                    .every((item) => item.pause_json)
                    ? 'Resume all'
                    : 'Pause all'
                }
                onClickRemove={{
                  onClick: () => {
                    setPauseResumeDialog({
                      isOpen: true,
                      isAll: true,
                      type: 'remove',
                      training_status: 'training',
                      isLoading: false,
                    });
                  },
                }}
                onClickPause={{
                  onClick: () => {
                    if (
                      interviewerDetails.modules
                        .filter((ele) => ele.training_status === 'training')
                        .every((item) => item.pause_json)
                    ) {
                      setPauseResumeDialog((pre) => ({
                        ...pre,
                        isOpen: true,
                        isAll: true,
                        type: 'resume',
                        training_status: 'training',
                        isLoading: false,
                      }));
                    } else {
                      setPauseResumeDialog({
                        isOpen: true,
                        isAll: true,
                        type: 'pause',
                        training_status: 'training',
                        isLoading: false,
                      });
                    }
                  },
                }}
              />
            </ShowCode.When>
          </ShowCode>
        }
        slotScheduleTabs={
          <ShowCode>
            <ShowCode.When isTrue={interviewerSchedules.isLoading!}>
              <Loader />
            </ShowCode.When>
            <ShowCode.When isTrue={interviewerSchedules.isFetched}>
              <Interviews interviewsData={interviewerSchedules.data} />
            </ShowCode.When>
          </ShowCode>
        }
        onClickAddInterviewModules={{
          onClick: () => {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isOpen: true,
              type: 'addQualifiedModule',
              isLoading: false,
            }));
          },
        }}
        onClickAddModulesTraining={{
          onClick: () => {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isOpen: true,
              type: 'addTrainingModule',
              isLoading: false,
            }));
          },
        }}
      />
      {/* hi */}
      {meetingsDetails.settings && (
        <MeetingProgressDrawer
          moduleSettings={meetingsDetails.settings}
          open={Boolean(meetingsDetails.settings)}
          meetings={meetingsDetails.meetings}
          user={interviewerDetails.interviewer}
          onClose={() => {
            setMeetingDetails({ meetings: [], settings: null });
          }}
        />
      )}
      {/* <ProgressDrawer progressUser={progressUser} module={editModule} /> */}
      <PauseResumeDialog
        pauseResumeDialog={pauseResumeDialog}
        close={() => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
            isLoading: false,
          }));
        }}
        pause={async (pause_json) => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isLoading: true,
          }));
          await handelUpdateSchedule({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            pause_json,
            training_status: pauseResumeDialog.training_status,
          });
          refetch();
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
          }));
        }}
        resume={async () => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isLoading: true,
          }));
          await handelUpdateSchedule({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            pause_json: null,
            training_status: pauseResumeDialog.training_status,
          });

          refetch();
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
          }));
        }}
        remove={async () => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isLoading: true,
          }));
          await handelRemoveMemberFormPanel({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            training_status: pauseResumeDialog.training_status,
          }).catch((e) => {
            toast.error(e.message);
          });
          refetch();
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
          }));
        }}
      />
    </>
  );
}

export default Interviewer;

export const getMeetingsByUserIdModuleId = ({
  user_id,
  module_ids,
}: {
  user_id: string;
  module_ids: string[];
}) => {
  return supabase
    .from('interview_module_relation')
    .select(
      'module_id,interview_session_relation(training_type,interview_session(interview_meeting(*), name, schedule_type) )',
    )
    .match({ user_id, training_status: 'training' })
    .eq('interview_session_relation.is_confirmed', true)
    .in('module_id', module_ids)
    .then(({ data, error }) => {
      if (error) new Error(error.message);
      const tempData: {
        [
          key: string
        ]: ((typeof data)[number]['interview_session_relation'][number]['interview_session']['interview_meeting'] & {
          training_type: (typeof data)[number]['interview_session_relation'][number]['training_type'];
          module_id: string;
          name: string;
          schedule_type: (typeof data)[number]['interview_session_relation'][number]['interview_session']['schedule_type'];
        })[];
      } = {};
      data
        .filter((item) => Boolean(item.interview_session_relation.length))
        .map(
          (item) =>
            item.interview_session_relation.map((itemX) => ({
              ...itemX,
              module_id: item.module_id,
            })) || [],
        )
        .flat()
        .forEach((item) => {
          const temp = tempData[item.module_id] || [];
          tempData[item.module_id] = [
            ...temp,
            {
              ...item.interview_session.interview_meeting,
              training_type: item.training_type,
              module_id: item.module_id,
              name: item.interview_session.name,
              schedule_type: item.interview_session.schedule_type,
            },
          ];
        });
      return tempData;
    });
};
