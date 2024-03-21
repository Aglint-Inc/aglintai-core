/* eslint-disable no-unused-vars */
import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { MemberListCard } from '@/devlink2';
import { InterviewerDetail, ModulesMoreMenu } from '@/devlink3';
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
import { InterviewMeetingTypeDb } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import InterviewerLevelSettings from './InterviewerLevelSettings';
import Interviews from '../Interviews';
import PauseResumeDialog from '../PauseResumeDialog';

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
  let interviewsThisWeek = 0;
  let interviewsToday = 0;
  const interviewerSchedules = useInterviewerSchedulesQuery();
  if (interviewerSchedules.isFetched) {
    const interviews = interviewerSchedules.data.map(
      (item) => item.interview_meeting,
    ) as InterviewMeetingTypeDb[];

    const today = dayjs().startOf('day');
    const thisWeekStart = dayjs().startOf('week');

    interviewsToday = interviews.filter((interview) =>
      dayjs(interview.end_time).isSame(today, 'day'),
    ).length;
    interviewsThisWeek = interviews.filter(
      (interview) =>
        dayjs(interview.end_time).isAfter(thisWeekStart) ||
        dayjs(interview.end_time).isSame(thisWeekStart, 'day'),
    ).length;
  }
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
            interviewerDetails.interviewer.scheduling_settings as any
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
        textEmail={interviewerDetails.interviewer.email}
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
          interviewsToday +
            '/' +
            interviewerDetails.interviewer.scheduling_settings?.interviewLoad
              ?.dailyLimit.value || 0
        }
        textInterviewPerWeek={
          interviewsThisWeek +
            '/' +
            interviewerDetails.interviewer.scheduling_settings?.interviewLoad
              ?.weeklyLimit.value || 0
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
                    ? 'Resume from all modules'
                    : 'Pause from all modules'
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
                    ? 'Resume from all modules'
                    : 'Pause from all modules'
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
