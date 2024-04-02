import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { EmptyGeneral, MemberListCard } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import {
  useGetMeetingsByModuleId,
  useProgressModuleUsers,
} from '../../../queries/hooks';
import { getHours } from '../../../queries/utils';
import {
  setIsDeleteMemberDialogOpen,
  setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  setIsProgressDialaogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  useModulesStore,
} from '../../../store';
import { ModuleType } from '../../../types';
import MoveToQualifiedDialog from '../../MoveToQualified';
import ProgressDrawer from '../../ProgressDrawer';
import { ProgressUserType } from '../../type';

function SlotTrainingMembers({
  editModule,
  meetingData,
}: {
  editModule: ModuleType;
  meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
}) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { members } = useSchedulingContext();
  const [progressUser, setProgressUser] = useState<ProgressUserType>({
    user: null,
    progress: [],
  });
  const allUsers = editModule.relations;
  const currentDay = dayjs();

  const allTrainees = allUsers
    .filter((user) => user.training_status === 'training')
    .map((user) => {
      const userSettings = user?.recruiter_user?.scheduling_settings;
      let weekly = 0;
      let daily = 0;
      if (userSettings) {
        weekly =
          userSettings.interviewLoad.dailyLimit.type == 'Hours'
            ? getHours({ user, type: 'weekly', meetingData })
            : meetingData.filter(
                (meet) => meet?.interview_module_relation_id === user.id,
              ).length;
        daily =
          userSettings.interviewLoad.dailyLimit.type == 'Hours'
            ? getHours({ user, type: 'daily', meetingData })
            : meetingData.filter(
                (meet) =>
                  meet?.interview_module_relation_id === user.id &&
                  dayjs(meet?.interview_meeting?.end_time).isSame(
                    currentDay,
                    'day',
                  ),
              ).length;
      }
      return { ...user, weekly, daily };
    });

  const trainer_ids = allUsers
    .filter((user) => user.training_status === 'training')
    .map((user) => {
      return user.id;
    });

  const { data: progress } = useProgressModuleUsers({ trainer_ids });
  const selUser = useModulesStore((state) => state.selUser);
  return (
    <>
      {selUser?.user_id && <MoveToQualifiedDialog editModule={editModule} />}
      {editModule.settings && (
        <ProgressDrawer progressUser={progressUser} module={editModule} />
      )}
      {allTrainees.length === 0 && (
        <EmptyGeneral textEmpt={'No Members Added Yet'} />
      )}
      {allTrainees.map((user) => {
        const member = members.find(
          (member) => member.user_id === user.user_id,
        );

        if (!member) return null; //this line added temporarily becasue of data inconsistency

        const progressDataUser = progress.filter(
          (prog) =>
            prog.interview_module_relation_id === user.id &&
            prog.interview_meeting?.status == 'completed',
        );
        const revShadowCount = progressDataUser.filter(
          (prog) => prog.training_type === 'reverse_shadow',
        ).length;

        const shadowCount = progressDataUser.filter(
          (prog) => prog.training_type == 'shadow',
        ).length;

        const isMoveToQualifierVisible =
          recruiterUser.role === 'admin' ||
          (editModule.settings.reqruire_approval &&
            editModule.settings.approve_users.includes(user.user_id));

        const userSettings = user.recruiter_user.scheduling_settings;

        return (
          <MemberListCard
            isInterviewCountVisible={!user.pause_json}
            textInterviewWeek={`${user.weekly} / ${userSettings.interviewLoad.dailyLimit.value} ${userSettings.interviewLoad.dailyLimit.type} per week`}
            textInterviewToday={`${user.daily} / ${userSettings.interviewLoad.dailyLimit.value} ${userSettings.interviewLoad.dailyLimit.type} per day`}
            onClickCard={{
              onClick: () => {
                router.push(
                  `${pageRoutes.SCHEDULINGINTERVIEWER}/${user.user_id}`,
                );
              },
            }}
            onClickViewProgress={{
              onClick: () => {
                setProgressUser({
                  progress: progress.filter(
                    (prog) => prog.interview_module_relation_id === user.id,
                  ),
                  user: members.filter(
                    (member) => member.user_id === user.user_id,
                  )[0],
                });
                setIsProgressDialaogOpen(true);
              },
            }}
            onClickMoveToQualifier={{
              onClick: () => {
                setSelUser(user);
                setIsMovedToQualifiedDialogOpen(true);
              },
            }}
            key={user.user_id}
            isMoveToQualifierVisible={isMoveToQualifierVisible}
            isTrainingProgessVisible={
              editModule.settings.noReverseShadow > revShadowCount ||
              editModule.settings.noShadow > shadowCount
            }
            isPendingApprovalVisible={
              !(
                editModule.settings.noReverseShadow > revShadowCount ||
                editModule.settings.noShadow > shadowCount
              ) && editModule.settings.reqruire_approval
            }
            isTrainingCompletedVisible={
              editModule.settings.noReverseShadow <= revShadowCount &&
              editModule.settings.noShadow <= shadowCount
            }
            textPauseResumeDate={
              !user.pause_json?.isManual
                ? user.pause_json?.end_date
                  ? 'Till ' +
                    dayjs(user.pause_json.end_date).format('DD MMMM YYYY')
                  : '--'
                : 'Till you resume'
            }
            onClickRemoveModule={{
              onClick: () => {
                setSelUser(user);
                setIsDeleteMemberDialogOpen(true);
              },
            }}
            onClickPauseInterview={{
              onClick: () => {
                setSelUser(user);
                setIsPauseDialogOpen(true);
              },
            }}
            onClickResumeInterview={{
              onClick: () => {
                setSelUser(user);
                setIsResumeDialogOpen(true);
              },
            }}
            onHoverDot={false}
            isPauseResumeVisible={Boolean(user.pause_json)}
            isPauseVisible={!user.pause_json}
            isResumeVisible={Boolean(user.pause_json)}
            slotProfileImage={
              <MuiAvatar
                src={member.profile_image}
                level={getFullName(member.first_name, member.last_name) || ''}
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
  );
}

export default SlotTrainingMembers;
