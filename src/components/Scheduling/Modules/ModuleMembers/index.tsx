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
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
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
  setIsModuleSettingsDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
  useSchedulingStore
} from '../store';
import { ScheduleType } from '../types';

export type TransformSchedule = ScheduleType & {
  module_time: {
    module_id: string;
    module_name: string;
    start_time: string;
    end_time: string;
    duration: number;
    attended_inters: {
      id: string;
      name: string;
      email: string;
      profile_img: string;
    }[];
  };
};

function ModuleMembersComp() {
  const router = useRouter();
  const editModule = useSchedulingStore((state) => state.editModule);
  const [schedules, setSchedules] = useState<TransformSchedule[]>([]);
  const allUsers = useSchedulingStore(
    useShallow((state) => state.editModule.relations)
  );
  const { loading, members } = useSchedulingContext();
  const allTrainees = allUsers.filter(
    (user) => user.training_status === 'training'
  );
  const allQualified = allUsers.filter(
    (user) => user.training_status === 'qualified'
  );

  useEffect(() => {
    (async () => {
      if (editModule?.id) {
        const { data } = await supabase.rpc(
          'get_interview_schedule_by_module_id',
          { target_module_id: editModule.id }
        );

        const allSchedules = data as unknown as ScheduleType[];

        const schArray = [];
        allSchedules.map((sch) =>
          sch.schedule.confirmed_option.plan.map((plan) => {
            if (plan.module_id === editModule.id) {
              schArray.push({ ...sch, module_time: plan });
            }
          })
        );
        setSchedules(schArray);
      }
    })();
  }, [editModule?.id]);

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
          <ButtonSetting
            onClickButton={{
              onClick: () => {
                setIsModuleSettingsDialogOpen(true);
              }
            }}
          />
        }
        slotBody={
          <>
            {!loading ? (
              <InterviewMemberList
                slotInterviewCard={<ModuleSchedules schedules={schedules} />}
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
