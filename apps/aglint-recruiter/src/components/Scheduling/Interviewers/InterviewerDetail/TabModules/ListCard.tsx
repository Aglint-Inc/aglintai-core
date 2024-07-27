import { Collapse, Popover, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch, useState } from 'react';

import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { MemberListCard } from '@/devlink2/MemberListCard';
import { MemberListCardOption } from '@/devlink2/MemberListCardOption';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { HistoryPill } from '@/devlink3/HistoryPill';
import { HistoryTrainingCard } from '@/devlink3/HistoryTrainingCard';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import ROUTES from '@/src/utils/routing/routes';

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../../Candidates/utils';
import { ScheduleListType } from '../../../Common/ModuleSchedules/hooks';
import { DetailsWithCount, PauseDialog } from '../type';

function ListCardInterviewerModules({
  module,
  setPauseResumeDialog,
  status,
  user_id,
}: {
  module: DetailsWithCount['modules'][number];
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
  status: 'qualified' | 'training';
  user_id: string;
}) {
  const router = useRouter();
  const {
    interview_module,
    module_id,
    pause_json,
    cancelledCount,
    completedCount,
    confirmedCount,
    moduleMeetings,
  } = module;

  const [collapseOpen, setCollapseOpen] = useState(false);

  if (status === 'qualified')
    return (
      <MemberListCard
        isDropdownIconVisible={true}
        onClickDropdownIcon={{
          onClick: () => {
            setCollapseOpen((pre) => !pre);
          },
        }}
        slotThreeDot={
          <QualifiedThreeDot
            module={module}
            module_id={module_id}
            pause_json={pause_json}
            setPauseResumeDialog={setPauseResumeDialog}
          />
        }
        isTrainingProgessVisible={true}
        isTrainingProgressDetailVisible={true}
        slotTrainingProgressDetail={
          <Collapse in={collapseOpen}>
            <Stack px={'var(--space-5)'} pb={'var(--space-5)'}>
              <Typography variant='body1'>
                {interview_module.description}
              </Typography>
            </Stack>
          </Collapse>
        }
        key={module_id}
        textName={interview_module.name}
        isTextObjectiveVisible={false}
        isPauseResumeVisible={Boolean(pause_json)}
        isScheduleCountVisible={true}
        isProfileVisible={false}
        isInterviewsVisible={false}
        textConfirmed={confirmedCount}
        textCancel={cancelledCount}
        countCompletedSchedule={completedCount}
        textPause={
          'Paused from assigning to new interviews with this interview type'
        }
        textPauseResumeDate={
          pause_json
            ? pause_json.isManual
              ? 'Indefinitely'
              : pause_json.end_date
                ? `Until ${dayjs(pause_json.end_date).format('DD MMMM YYYY')}`
                : '--'
            : ''
        }
        onClickCard={{
          onClick: () => {
            router.push(
              ROUTES['/scheduling/module/members/[module_id]']({
                module_id: module.module_id,
              }),
            );
          },
        }}
      />
    );

  const completedMeetings = moduleMeetings.filter(
    (item) => item.status === 'completed',
  );

  const shadowMeetings = completedMeetings.filter((item) =>
    item.meeting_interviewers.some(
      (user) => user.user_id === user_id && user.training_type === 'shadow',
    ),
  );

  const reverseShadowMeetings = completedMeetings.filter((item) =>
    item.meeting_interviewers.some(
      (user) =>
        user.user_id === user_id && user.training_type === 'reverse_shadow',
    ),
  );

  const shadowArray: {
    text: 'shadow';
    meeting: ScheduleListType[number]['interview_meeting'];
  }[] = [
    ...new Array(interview_module.settings?.noShadow || 0).fill({
      text: 'shadow',
      meeting: null,
    }),
  ].map((item, ind) => {
    return {
      ...item,
      meeting: shadowMeetings[Number(ind)],
    };
  });

  const reverseShadowArray: {
    text: 'reverse shadow';
    meeting: ScheduleListType[number]['interview_meeting'];
  }[] = [
    ...new Array(interview_module.settings?.noReverseShadow || 0).fill({
      text: 'reverse shadow',
      meeting: null,
    }),
  ].map((item, ind) => {
    return {
      ...item,
      meeting: reverseShadowMeetings[Number(ind)],
    };
  });

  const trainingStatusArray = [...shadowArray, ...reverseShadowArray];

  if (status === 'training') {
    return (
      <MemberListCard
        isDropdownIconVisible={true}
        onClickDropdownIcon={{
          onClick: () => {
            setCollapseOpen((pre) => !pre);
          },
        }}
        textPause={
          'Paused from assigning to new interviews with this interview type'
        }
        slotThreeDot={
          <TrainingThreeDot
            module={module}
            module_id={module_id}
            pause_json={pause_json}
            setPauseResumeDialog={setPauseResumeDialog}
          />
        }
        isTrainingProgessVisible={true}
        isInterviewsVisible={false}
        slotProgressBar={
          <>
            {trainingStatusArray.map((item, index) => {
              return (
                <CustomTooltip
                  key={index}
                  title={
                    <Stack>
                      <HistoryTrainingCard
                        textInterviewType={item.meeting?.session_name}
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
                        textTime={`${dayjs(item.meeting?.start_time).format(
                          'HH:mm',
                        )} to ${dayjs(item.meeting?.end_time).format('HH:mm')}`}
                        isSchedule={Boolean(item.meeting?.status)}
                        textDuration={getBreakLabel(
                          item.meeting?.session_duration,
                        )}
                        textPlatformName={getScheduleType(
                          item.meeting?.schedule_type,
                        )}
                      />
                    </Stack>
                  }
                >
                  <HistoryPill
                    key={index}
                    isShadow={item.text === 'shadow'}
                    isReverseShadow={item.text === 'reverse shadow'}
                    slotHistoryTrainingCard={<></>}
                  />
                </CustomTooltip>
              );
            })}
          </>
        }
        isTrainingProgressDetailVisible={true}
        slotTrainingProgressDetail={
          <Collapse in={collapseOpen}>
            <Stack px={'var(--space-5)'} pb={'var(--space-5)'}>
              <Typography variant='body1'>
                {interview_module.description}
              </Typography>
            </Stack>
          </Collapse>
        }
        key={module_id}
        textName={interview_module.name}
        isTextObjectiveVisible={false}
        isPauseResumeVisible={Boolean(pause_json)}
        isScheduleCountVisible={false}
        isProfileVisible={false}
        textPauseResumeDate={
          pause_json
            ? pause_json.isManual
              ? 'Indefinitely'
              : pause_json.end_date
                ? `${dayjs(pause_json.end_date).format('DD MMMM YYYY')}`
                : '--'
            : ''
        }
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
              ROUTES['/scheduling/module/members/[module_id]']({
                module_id: module.module_id,
              }),
            );
          },
        }}
      />
    );
  }
}

export default ListCardInterviewerModules;


