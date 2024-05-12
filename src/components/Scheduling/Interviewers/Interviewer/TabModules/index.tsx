import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { MemberListCard } from '@/devlink2';
import { InterviewerDetailOverview } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';

import { InterviewerDetailsType, PauseDialog } from '../../type';
import { getMeetingsByUserIdModuleId } from '..';
import TraininingModules from './TraininingModules';

function TabInterviewModules({
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
      <InterviewerDetailOverview
        textButton1={'Add'}
        textButton2={'Add'}
        textHeader1={'Qualified Interview Types'}
        textHeader2={'Training Interview Types'}
        slotUpcomingSchedule={
          interviewerDetails.modules.filter(
            (item) => item.training_status === 'qualified',
          ).length ? (
            interviewerDetails.modules
              .filter((item) => item.training_status === 'qualified')
              .map((module) => {
                const { interview_module, module_id, pause_json } = module;
                return (
                  <MemberListCard
                    isDropdownIconVisible={false}
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
                    isRemoveVisible={false}
                    isInterviewsVisible={false}
                    textPause={
                      'Paused from assigning to new interviews with this module'
                    }
                    textPauseResumeDate={
                      pause_json
                        ? pause_json.isManual
                          ? 'Indefinately'
                          : pause_json.end_date
                            ? `Until ${dayjs(pause_json.end_date).format(
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
            <Typography variant='body2'>
              No Interview Types Added Yet
            </Typography>
          )
        }
        onClickViewAllModule={{
          onClick: () => {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isOpen: true,
              type: 'addTrainingModule',
              isLoading: false,
            }));
          },
        }}
        onClickViewAllSchedule={{
          onClick: () => {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isOpen: true,
              type: 'addQualifiedModule',
              isLoading: false,
            }));
          },
        }}
        slotTrainingModules={
          <TraininingModules
            interviewerDetails={interviewerDetails}
            setPauseResumeDialog={setPauseResumeDialog}
            userMeetings={userMeetings}
          />
        }
      />
    </>
  );
}

export default TabInterviewModules;
