import { Collapse, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch, useState } from 'react';

import { MemberListCard, StatusBadge } from '@/devlink2';
import { HistoryPill, HistoryTrainingCard } from '@/devlink3';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { pages } from '@/src/utils/pageRouting';

import IconScheduleType from '../../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../../AllSchedules/utils';
import { ScheduleListType } from '../../../Common/ModuleSchedules/hooks';
import { DetailsWithCount, PauseDialog } from '../../type';

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
        isMoveToQualifierVisible={false}
        isTrainingProgessVisible={true}
        isTrainingProgressDetailVisible={true}
        slotTrainingProgressDetail={
          <Collapse in={collapseOpen}>
            <Stack px={'20px'} pb={'20px'}>
              <Typography variant='body2'>
                {interview_module.description}
              </Typography>
            </Stack>
          </Collapse>
        }
        key={module_id}
        textName={interview_module.name}
        isTextObjectiveVisible={false}
        isPauseResumeVisible={Boolean(pause_json)}
        isPauseVisible={!pause_json}
        isResumeVisible={Boolean(pause_json)}
        isScheduleCountVisible={true}
        isProfileVisible={false}
        isRoleVisible={false}
        isRemoveVisible={false}
        isInterviewsVisible={false}
        textConfirmed={confirmedCount}
        textCancel={cancelledCount}
        countCompletedSchedule={completedCount}
        textPause={'Paused from assigning to new interviews with this module'}
        textPauseResumeDate={
          pause_json
            ? pause_json.isManual
              ? 'Indefinately'
              : pause_json.end_date
                ? `Until ${dayjs(pause_json.end_date).format('DD MMMM YYYY')}`
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
              pages['/scheduling/module/members/[module_id]']({
                module_id: module.module_id,
              }),
            );
          },
        }}
      />
    );

  const completedMeetings = moduleMeetings.filter(
    (item) => item.interview_meeting.status === 'completed',
  );

  const trainingStatusArray: {
    text: 'shadow' | 'reverse shadow';
    meeting: ScheduleListType[number]['interview_meeting'];
  }[] = [
    ...new Array(interview_module.settings?.noShadow || 0).fill({
      text: 'shadow',
      meeting: null,
    }),
    ...new Array(interview_module.settings?.noReverseShadow || 0).fill({
      text: 'reverse shadow',
      meeting: null,
    }),
  ].map((item, ind) => {
    const shadowMeetings = completedMeetings.filter((item) =>
      item.users.some(
        (user) => user.id === user_id && user.training_type === 'shadow',
      ),
    );

    const reverseShadowMeetings = completedMeetings.filter((item) =>
      item.users.some(
        (user) =>
          user.id === user_id && user.training_type === 'reverse_shadow',
      ),
    );
    return {
      ...item,
      meeting:
        item.text === 'shadow'
          ? shadowMeetings[Number(ind)]?.interview_meeting
          : reverseShadowMeetings[Number(ind)]?.interview_meeting,
    };
  });

  if (status === 'training') {
    return (
      <MemberListCard
        isDropdownIconVisible={true}
        onClickDropdownIcon={{
          onClick: () => {
            setCollapseOpen((pre) => !pre);
          },
        }}
        textPause={'Paused from assigning to new interviews with this module'}
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
                  isStartActive={!!item.meeting}
                  isEnd={trainingStatusArray.length - 1 === index}
                  isEndActive={
                    trainingStatusArray.length - 1 === index && !!item.meeting
                  }
                  slotHistoryTrainingCard={
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
                          isWaitingVisible={item.meeting?.status === 'waiting'}
                          isCompletedVisible={
                            item.meeting?.status === 'completed'
                          }
                          isNotScheduledVisible={
                            item.meeting?.status === 'not_scheduled'
                          }
                        />
                      }
                      slotMeetingIcon={
                        <IconScheduleType type={item.meeting?.schedule_type} />
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
                  }
                  isMiddle={index > 0 && index < trainingStatusArray.length}
                  isMiddleActive={
                    index > 0 &&
                    index < trainingStatusArray.length &&
                    !!item.meeting
                  }
                  isShadow={item.text === 'shadow'}
                  isReverseShadow={item.text === 'reverse shadow'}
                />
              );
            })}
          </>
        }
        isTrainingProgressDetailVisible={true}
        slotTrainingProgressDetail={
          <Collapse in={collapseOpen}>
            <Stack px={'20px'} pb={'20px'}>
              <Typography variant='body2'>
                {interview_module.description}
              </Typography>
            </Stack>
          </Collapse>
        }
        key={module_id}
        textName={interview_module.name}
        isTextObjectiveVisible={false}
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
              pages['/scheduling/module/members/[module_id]']({
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
