import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import {
  Breadcrum,
  ButtonSetting,
  EmptyGeneral,
  InterviewMemberList,
  MemberListCard,
  PageLayout
} from '@/devlink2';
import { MoreButton } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import {
  InterviewMeetingTypeDb,
  InterviewMeetingUserTypeDb,
  InterviewScheduleTypeDB
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import AddMemberDialog from './AddMemberDialog';
import DeleteMemberDialog from './DeleteMemberDialog';
import DeleteModuleDialog from './DeleteModuleDialog';
import ModuleSchedules from './ModuleSchedules';
import ModuleSettingDrawer from './ModuleSettingDrawer';
import PauseDialog from './PauseDialog';
import ProgressDrawer from './ProgressDrawer';
import ResumeMemberDialog from './ResumeMemberDialog';
import { useAllSchedulesByModuleId } from '../queries/hooks';
import {
  setEditModule,
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsModuleSettingsDialogOpen,
  setIsPauseDialogOpen,
  setIsProgressDialaogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
  useSchedulingStore
} from '../store';
import { MemberType } from '../types';

export type ProgressType = InterviewMeetingUserTypeDb & {
  interview_meeting: InterviewMeetingTypeDb & {
    interview_schedule: InterviewScheduleTypeDB;
  };
};

function ModuleMembersComp() {
  const router = useRouter();
  const editModule = useSchedulingStore((state) => state.editModule);
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const [progressUser, setProgressUser] = useState<{
    user: MemberType;
    progress: ProgressType[];
  } | null>({
    user: null,
    progress: []
  });
  const allUsers = useSchedulingStore(
    useShallow((state) => state.editModule.relations)
  );
  const { fetchingModule, members } = useSchedulingContext();
  const allTrainees = allUsers.filter(
    (user) => user.training_status === 'training'
  );
  const allQualified = allUsers.filter(
    (user) => user.training_status === 'qualified'
  );

  const { data: schedules, isLoading: schedulesLoading } =
    useAllSchedulesByModuleId();

  useEffect(() => {
    if (editModule.id) {
      fetchProgress();
    }
  }, [editModule.id]);

  const fetchProgress = async () => {
    const trainer_ids = allUsers
      .filter((user) => user.training_status === 'training')
      .map((user) => {
        return user.user_id;
      });

    const { data, error } = await supabase
      .from('interview_meeting_user')
      .select('*,interview_meeting(*,interview_schedule(*))')
      .eq('interview_meeting.module_id', editModule.id)
      .in('interviewer_id', trainer_ids);

    if (error) {
      throw new Error(error.message);
    }
    setProgress(data);
  };

  const moveToQualified = async (user_id: string) => {
    try {
      const { error } = await supabase
        .from('interview_module_relation')
        .update({ training_status: 'qualified' })
        .match({ user_id: user_id, module_id: editModule.id });
      if (error) {
        throw new Error();
      }
      editModule.relations.find(
        (user) => user.user_id === user_id
      ).training_status = 'qualified';
      setEditModule({ ...editModule });
    } catch {
      toast.error('Failed to move to qualified');
    }
  };

  return (
    <>
      <ModuleSettingDrawer />
      <AddMemberDialog />
      <DeleteMemberDialog />
      <PauseDialog />
      <DeleteModuleDialog />
      <ResumeMemberDialog />
      <ProgressDrawer progressUser={progressUser} module={editModule} />
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
          }
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={editModule.name} />
          </>
        }
        slotTopbarRight={
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <ButtonSetting
              onClickButton={{
                onClick: () => {
                  setIsModuleSettingsDialogOpen(true);
                }
              }}
            />

            <MoreButton
              onClickDelete={{
                onClick: () => {
                  setIsDeleteModuleDialogOpen(true);
                }
              }}
            />
          </Stack>
        }
        slotBody={
          <>
            {!fetchingModule ? (
              <InterviewMemberList
                isMembersTrainingVisible={editModule.settings?.require_training}
                slotInterviewCard={
                  <ModuleSchedules
                    schedules={schedules}
                    loading={schedulesLoading}
                  />
                }
                onClickAddTrainee={{
                  onClick: () => {
                    setIsAddMemberDialogOpen(true);
                    setTrainingStatus('training');
                  }
                }}
                slotQualifiedMemberList={
                  <>
                    {allQualified.length === 0 && (
                      <EmptyGeneral textEmpt={'No Members Added Yet'} />
                    )}
                    {allQualified.map((user) => {
                      const member = members.filter(
                        (member) => member.user_id === user.user_id
                      )[0];
                      if (!member) return null;
                      return (
                        <MemberListCard
                          key={user.user_id}
                          isMoveToQualifierVisible={false}
                          isTrainingProgessVisible={false}
                          isTrainingCompletedVisible={false}
                          textPauseResumeDate={
                            !user.pause_json?.isManual
                              ? user.pause_json?.end_date
                                ? 'Till ' +
                                  dayjs(user.pause_json.end_date).format(
                                    'DD MMMM YYYY'
                                  )
                                : '--'
                              : 'Till you resume'
                          }
                          onClickRemoveModule={{
                            onClick: () => {
                              setSelUser(user);
                              setIsDeleteMemberDialogOpen(true);
                            }
                          }}
                          onClickPauseInterview={{
                            onClick: () => {
                              setSelUser(user);
                              setIsPauseDialogOpen(true);
                            }
                          }}
                          onClickResumeInterview={{
                            onClick: () => {
                              setSelUser(user);
                              setIsResumeDialogOpen(true);
                            }
                          }}
                          onHoverDot={false}
                          isPauseResumeVisible={Boolean(user.pause_json)}
                          isPauseVisible={!user.pause_json}
                          isResumeVisible={Boolean(user.pause_json)}
                          slotProfileImage={
                            <MuiAvatar
                              src={member.profile_image}
                              level={
                                getFullName(
                                  member.first_name,
                                  member.last_name
                                ) || ''
                              }
                              variant='circular'
                              height='60px'
                              width='60px'
                              fontSize='24px'
                            />
                          }
                          textName={member.first_name}
                          textRole={member.position || '--'}
                        />
                      );
                    })}
                  </>
                }
                onClickAddMember={{
                  onClick: () => {
                    setIsAddMemberDialogOpen(true);
                    setTrainingStatus('qualified');
                  }
                }}
                slotMembersInTraining={
                  <>
                    {allTrainees.length === 0 && (
                      <EmptyGeneral textEmpt={'No Members Added Yet'} />
                    )}
                    {allTrainees.map((user) => {
                      const member = members.filter(
                        (member) => member.user_id === user.user_id
                      )[0];
                      const progressDataUser = progress.filter(
                        (prog) =>
                          prog.interviewer_id === user.user_id &&
                          prog.interview_meeting?.status == 'completed'
                      );
                      const revShadowCount = progressDataUser.filter(
                        (prog) => prog.interviewer_type == 'reverse_shadow'
                      ).length;
                      const shadowCount = progressDataUser.filter(
                        (prog) => prog.interviewer_type == 'shadow'
                      ).length;

                      if (!member) return null;
                      return (
                        <MemberListCard
                          onClickViewProgress={{
                            onClick: () => {
                              setProgressUser({
                                progress: progress.filter(
                                  (prog) => prog.interviewer_id === user.user_id
                                ),
                                user: members.filter(
                                  (member) => member.user_id === user.user_id
                                )[0]
                              });
                              setIsProgressDialaogOpen(true);
                            }
                          }}
                          onClickMoveToQualifier={{
                            onClick: () => {
                              moveToQualified(user.user_id);
                            }
                          }}
                          key={user.user_id}
                          isMoveToQualifierVisible={true}
                          isTrainingProgessVisible={
                            editModule.settings.noReverseShadow >
                              revShadowCount ||
                            editModule.settings.noShadow > shadowCount
                          }
                          isPendingApprovalVisible={
                            !(
                              editModule.settings.noReverseShadow >
                                revShadowCount ||
                              editModule.settings.noShadow > shadowCount
                            ) && editModule.settings.reqruire_approval
                          }
                          isTrainingCompletedVisible={
                            editModule.settings.noReverseShadow <=
                              revShadowCount &&
                            editModule.settings.noShadow <= shadowCount
                          }
                          textPauseResumeDate={
                            !user.pause_json?.isManual
                              ? user.pause_json?.end_date
                                ? 'Till ' +
                                  dayjs(user.pause_json.end_date).format(
                                    'DD MMMM YYYY'
                                  )
                                : '--'
                              : 'Till you resume'
                          }
                          onClickRemoveModule={{
                            onClick: () => {
                              setSelUser(user);
                              setIsDeleteMemberDialogOpen(true);
                            }
                          }}
                          onClickPauseInterview={{
                            onClick: () => {
                              setSelUser(user);
                              setIsPauseDialogOpen(true);
                            }
                          }}
                          onClickResumeInterview={{
                            onClick: () => {
                              setSelUser(user);
                              setIsResumeDialogOpen(true);
                            }
                          }}
                          onHoverDot={false}
                          isPauseResumeVisible={Boolean(user.pause_json)}
                          isPauseVisible={!user.pause_json}
                          isResumeVisible={Boolean(user.pause_json)}
                          slotProfileImage={
                            <MuiAvatar
                              src={member.profile_image}
                              level={
                                getFullName(
                                  member.first_name,
                                  member.last_name
                                ) || ''
                              }
                              variant='circular'
                              height='60px'
                              width='60px'
                              fontSize='24px'
                            />
                          }
                          textName={member.first_name}
                          textRole={member.position || '--'}
                        />
                      );
                    })}
                  </>
                }
              />
            ) : (
              <Stack height={'100%'} width={'100%'}>
                <Loader />
              </Stack>
            )}
          </>
        }
      />
    </>
  );
}

export default ModuleMembersComp;
