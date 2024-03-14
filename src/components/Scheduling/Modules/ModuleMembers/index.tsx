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
import { InterviewMeetingTypeDb } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';

import AddMemberDialog from './AddMemberDialog';
import DeleteMemberDialog from './DeleteMemberDialog';
import DeleteModuleDialog from './DeleteModuleDialog';
import ModuleSchedules from './ModuleSchedules';
import ModuleSettingDrawer from './ModuleSettingDrawer';
import PauseDialog from './PauseDialog';
import ResumeMemberDialog from './ResumeMemberDialog';
import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsModuleSettingsDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
  useSchedulingStore
} from '../store';
import { ScheduleType } from '../types';

export type TransformSchedule = ScheduleType & {
  interview_meeting: InterviewMeetingTypeDb & {
    meeting_json: {
      hangoutLink: string;
    };
  };
  users: {
    id: string;
    created_at: string;
    interviewer_id: string;
    interviewer_type: Database['public']['Enums']['interviewer_type'];
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
  }[];
};

function ModuleMembersComp() {
  const router = useRouter();
  const editModule = useSchedulingStore((state) => state.editModule);
  const [schedules, setSchedules] = useState<TransformSchedule[]>([]);
  const [fetchingModules, setFetchingModules] = useState(true);
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

  useEffect(() => {
    if (editModule?.id) {
      fetchModules();
    }
  }, [editModule?.id]);

  const fetchModules = async () => {
    const { data } = await supabase.rpc('get_interview_schedule_by_module_id', {
      target_module_id: editModule.id
    });
    setSchedules(data as unknown as TransformSchedule[]);
    setFetchingModules(false);
  };

  return (
    <>
      <ModuleSettingDrawer />
      <AddMemberDialog />
      <DeleteMemberDialog />
      <PauseDialog />
      <DeleteModuleDialog />
      <ResumeMemberDialog />
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
                slotInterviewCard={
                  <ModuleSchedules
                    schedules={schedules}
                    loading={fetchingModules}
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
                              level={member.first_name}
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
                      if (!member) return null;
                      return (
                        <MemberListCard
                          key={user.user_id}
                          isMoveToQualifierVisible={false}
                          isTrainingProgessVisible={true}
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
                              level={member.first_name}
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
