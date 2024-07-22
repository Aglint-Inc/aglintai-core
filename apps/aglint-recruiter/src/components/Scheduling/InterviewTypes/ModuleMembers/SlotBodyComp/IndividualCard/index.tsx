import { DatabaseTable } from '@aglint/shared-types';
import { Collapse, Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { MemberListCard } from '@/devlink2/MemberListCard';
import { MemberListCardOption } from '@/devlink2/MemberListCardOption';
import { PanelBlock } from '@/devlink2/PanelBlock';
import { TrainingDetailList } from '@/devlink2/TrainingDetailList';
import { TrainingProgressDetail } from '@/devlink2/TrainingProgressDetail';
import { TrainingStatus } from '@/devlink2/TrainingStatus';
import InterviewerTrainingTypeIcon from '@/src/components/Common/Icons/InterviewerTrainingTypeIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { SessionIcon } from '@/src/components/Scheduling/Common/ScheduleProgress/scheduleProgressPill';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/number/numberToOrdinalText';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

import { useProgressModuleUsers } from '../../../queries/hooks';
import {
  setIsDeleteMemberDialogOpen,
  setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../store';
import { ModuleType } from '../../../types';
import { getPauseMemberText } from '../utils';

function IndividualCard({
  editModule,
  user,
  progressDataUser,
  refetch,
}: {
  editModule: ModuleType;
  user: ModuleType['relations'][0];
  progressDataUser: ReturnType<typeof useProgressModuleUsers>['data'];
  refetch: () => void;
}) {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const shadowProgress = progressDataUser.filter(
    (prog) => prog.interview_session_relation.training_type == 'shadow',
  );

  const mutatedShadowProgress = Array.from({
    length: user.number_of_shadow - shadowProgress.length,
  });

  const reverseShadowProgress = progressDataUser.filter(
    (prog) => prog.interview_session_relation.training_type == 'reverse_shadow',
  );

  const mutatedReverseShadowProgress = Array.from({
    length: user.number_of_reverse_shadow - reverseShadowProgress.length,
  });

  const isMoveToQualifierVisible =
    (checkPermissions(['update_interview_types']) ||
      (editModule.settings.reqruire_approval &&
        editModule.settings.approve_users.includes(user.user_id))) &&
    mutatedShadowProgress.length === 0 &&
    reverseShadowProgress.length === 0;

  const userSettings = user.recruiter_user.scheduling_settings;

  const member = user.recruiter_user;

  const textWeekInterview =
    userSettings.interviewLoad.dailyLimit.type === 'Hours'
      ? `${user.recruiter_user.total_hours_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
      : `${user.recruiter_user.total_interviews_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;

  const textTodayInterview =
    userSettings.interviewLoad.dailyLimit.type === 'Hours'
      ? `${user.recruiter_user.total_hours_today} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
      : `${user.recruiter_user.total_interviews_today} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;

  const approveTrainingProgress = async (id: string) => {
    await supabase
      .from('interview_training_progress')
      .update({
        is_approved: true,
      })
      .eq('id', id);

    refetch();
  };

  const alterCount = async ({
    type,
    count,
    module_relation_id,
  }: {
    type: DatabaseTable['interview_session_relation']['training_type'];
    count: number;
    module_relation_id: string;
  }) => {
    try {
      setIsSaving(true);
      if (type === 'shadow') {
        await supabase
          .from('interview_module_relation')
          .update({
            number_of_shadow: count,
          })
          .eq('id', module_relation_id);
      } else {
        await supabase
          .from('interview_module_relation')
          .update({
            number_of_reverse_shadow: count,
          })
          .eq('id', module_relation_id);
      }
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 1000); // added for refetching react query
    }
  };

  return (
    <>
      <MemberListCard
        textWeekInterview={textWeekInterview}
        textTodayInterview={textTodayInterview}
        isPauseResumeVisible={Boolean(user.pause_json)}
        onClickCard={{
          onClick: () => {
            router.push(
              ROUTES['/scheduling/interviewer/[member_id]']({
                member_id: user.user_id,
              }),
            );
          },
        }}
        slotTrainingProgressDetail={
          <Collapse
            in={isCollapseOpen}
            sx={{
              opacity: !isSaving ? 1 : 0.5,
            }}
          >
            <Stack spacing={'var(--space-2)'}>
              <TrainingProgressDetail
                slotTrainingDetailList={
                  <>
                    {shadowProgress.map((prog, ind) => {
                      return (
                        <TrainingDetailList
                          key={ind}
                          isReverse={false}
                          isShadow={true}
                          textTraining={`${numberToOrdinalText(ind + 1)} Shadow`}
                          slotTrainingStatus={
                            <TrainingStatus
                              isNotCompletedVisible={false}
                              isCompletedVisible={true}
                              isReverseShadow={false}
                              isShadow={true}
                            />
                          }
                          slotPanelBlock={
                            <>
                              <PanelBlock
                                slotPanelIcon={
                                  <SessionIcon
                                    session_type={
                                      prog.interview_session.session_type
                                    }
                                  />
                                }
                                textPanelName={prog.interview_session.name}
                              />
                              {!prog.is_approved && (
                                <ButtonGhost
                                  textButton={'Approve'}
                                  size={1}
                                  onClickButton={{
                                    onClick: async () => {
                                      await approveTrainingProgress(prog.id);
                                    },
                                  }}
                                />
                              )}
                            </>
                          }
                        />
                      );
                    })}
                    {mutatedShadowProgress.map((_, index) => {
                      return (
                        <TrainingDetailList
                          key={index}
                          isReverse={false}
                          isShadow={true}
                          textTraining={`${numberToOrdinalText(index + 1 + shadowProgress.length)} Shadow Session`}
                          slotTrainingStatus={
                            <TrainingStatus
                              isNotCompletedVisible={true}
                              isCompletedVisible={false}
                              isReverseShadow={false}
                              isShadow={true}
                            />
                          }
                          slotPanelBlock={
                            <>
                              <IconButtonSoft
                                size={1}
                                iconName={'delete'}
                                color={'neutral'}
                                onClickButton={{
                                  onClick: async () => {
                                    await alterCount({
                                      type: 'shadow',
                                      count: user.number_of_shadow - 1,
                                      module_relation_id: user.id,
                                    });
                                  },
                                }}
                              />
                            </>
                          }
                        />
                      );
                    })}
                    {reverseShadowProgress.map((prog, ind) => {
                      return (
                        <TrainingDetailList
                          key={ind}
                          isReverse={true}
                          isShadow={false}
                          textTraining={`${numberToOrdinalText(ind + 1)} Reverse Shadow`}
                          slotTrainingStatus={
                            <TrainingStatus
                              isNotCompletedVisible={false}
                              isCompletedVisible={true}
                              isReverseShadow={true}
                              isShadow={false}
                              isPendingApprovalVisible={false}
                            />
                          }
                          slotPanelBlock={
                            <>
                              <PanelBlock
                                slotPanelIcon={
                                  <SessionIcon
                                    session_type={
                                      prog.interview_session.session_type
                                    }
                                  />
                                }
                                textPanelName={prog.interview_session.name}
                              />
                              {!prog.is_approved && (
                                <ButtonGhost
                                  textButton={'Approve'}
                                  size={1}
                                  onClickButton={{
                                    onClick: async () => {
                                      await approveTrainingProgress(prog.id);
                                    },
                                  }}
                                />
                              )}
                            </>
                          }
                        />
                      );
                    })}
                    {mutatedReverseShadowProgress.map((_, index) => {
                      return (
                        <TrainingDetailList
                          key={index}
                          isReverse={true}
                          isShadow={false}
                          textTraining={`${numberToOrdinalText(index + 1 + reverseShadowProgress.length)} Reverse Shadow Session`}
                          slotTrainingStatus={
                            <TrainingStatus
                              isNotCompletedVisible={true}
                              isCompletedVisible={false}
                              isReverseShadow={true}
                              isShadow={false}
                              isPendingApprovalVisible={false}
                            />
                          }
                          slotPanelBlock={
                            <>
                              <IconButtonSoft
                                size={1}
                                iconName={'delete'}
                                color={'neutral'}
                                onClickButton={{
                                  onClick: async () => {
                                    await alterCount({
                                      type: 'reverse_shadow',
                                      count: user.number_of_shadow - 1,
                                      module_relation_id: user.id,
                                    });
                                  },
                                }}
                              />
                            </>
                          }
                        />
                      );
                    })}
                  </>
                }
              />
            </Stack>
            <Stack
              direction={'row'}
              spacing={'var(--space-2)'}
              px={'var(--space-4)'}
              pb={'var(--space-4)'}
            >
              <ButtonGhost
                textButton={'Add Shadow'}
                isLeftIcon={true}
                color={'neutral'}
                slotIcon={<InterviewerTrainingTypeIcon type='shadow' />}
                size={1}
                onClickButton={{
                  onClick: () => {
                    if (isSaving) return;
                    alterCount({
                      type: 'shadow',
                      count: user.number_of_shadow + 1,
                      module_relation_id: user.id,
                    });
                  },
                }}
              />
              <ButtonGhost
                textButton={'Add Reverse Shadow'}
                color={'neutral'}
                isLeftIcon={true}
                slotIcon={<InterviewerTrainingTypeIcon type='reverse_shadow' />}
                size={1}
                onClickButton={{
                  onClick: () => {
                    if (isSaving) return;
                    alterCount({
                      type: 'reverse_shadow',
                      count: user.number_of_reverse_shadow + 1,
                      module_relation_id: user.id,
                    });
                  },
                }}
              />
            </Stack>
          </Collapse>
        }
        slotThreeDot={
          <ThreeDot
            isMoveToQualifierVisible={isMoveToQualifierVisible}
            user={user}
          />
        }
        isDropdownIconVisible={true}
        onClickDropdownIcon={{
          onClick: () => {
            setIsCollapseOpen((pre) => !pre);
          },
        }}
        isTrainingProgressDetailVisible={true}
        key={user.user_id}
        textPauseResumeDate={getPauseMemberText(user.pause_json)}
        slotProfileImage={
          <MuiAvatar
            src={member.profile_image}
            level={getFullName(member.first_name, member.last_name) || ''}
            variant='rounded-medium'
          />
        }
        textName={getFullName(member.first_name, member.last_name) || ''}
        textRole={member.position || '--'}
      />
    </>
  );
}

export default IndividualCard;

const ThreeDot = ({ isMoveToQualifierVisible, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Stack onClick={handleClick}>
        <IconButtonGhost
          iconName='more_vert'
          size={2}
          iconSize={6}
          color={'neutral'}
        />
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            borderRadius: 0,
            backgroundColor: 'transparent',
          },
        }}
      >
        <MemberListCardOption
          isMoveToQualifierVisible={isMoveToQualifierVisible}
          isRemoveVisible={true}
          isPauseVisible={!user.pause_json}
          isResumeVisible={Boolean(user.pause_json)}
          onClickMoveToQualifier={{
            onClick: () => {
              setSelUser(user);
              setIsMovedToQualifiedDialogOpen(true);
              handleClose();
            },
          }}
          onClickRemoveModule={{
            onClick: () => {
              setSelUser(user);
              setIsDeleteMemberDialogOpen(true);
              handleClose();
            },
          }}
          onClickResumeInterview={{
            onClick: () => {
              setSelUser(user);
              setIsResumeDialogOpen(true);
              handleClose();
            },
          }}
          onClickPauseInterview={{
            onClick: () => {
              setSelUser(user);
              setIsPauseDialogOpen(true);
              handleClose();
            },
          }}
        />
      </Popover>
    </>
  );
};
