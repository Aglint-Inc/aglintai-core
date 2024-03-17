import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { EmptyGeneral, MemberListCard } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import ProgressDrawer from '../../ProgressDrawer';
import { ProgressUserType } from '../../type';
import { useProgressModuleUsers } from '../../../queries/hooks';
import { QueryKeysInteviewModules } from '../../../queries/type';
import {
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsProgressDialaogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../store';
import { ModuleType } from '../../../types';

function SlotTrainingMembers({ editModule }: { editModule: ModuleType }) {
  const queryClient = useQueryClient();
  const { recruiterUser } = useAuthDetails();
  const { members } = useSchedulingContext();
  const [progressUser, setProgressUser] = useState<ProgressUserType>({
    user: null,
    progress: [],
  });
  const allUsers = editModule.relations;
  const allTrainees = allUsers.filter(
    (user) => user.training_status === 'training',
  );

  const trainer_ids = allUsers
    .filter((user) => user.training_status === 'training')
    .map((user) => {
      return user.user_id;
    });

  const { data: progress } = useProgressModuleUsers({ trainer_ids });

  const moveToQualified = async (user_id: string) => {
    try {
      const { error } = await supabase
        .from('interview_module_relation')
        .update({ training_status: 'qualified' })
        .match({ user_id: user_id, module_id: editModule.id });
      if (error) {
        throw new Error(error.message);
      }
      const updatedEditModule = {
        ...editModule,
        relations: editModule.relations.map((rel) => {
          if (rel.user_id === user_id) {
            return { ...rel, training_status: 'qualified' };
          }
          return rel;
        }),
      } as ModuleType;

      queryClient.setQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({
          moduleId: editModule.id,
        }),
        {
          ...updatedEditModule,
        },
      );
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
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
            prog.interviewer_id === user.user_id &&
            prog.interview_meeting?.status == 'completed',
        );
        const revShadowCount = progressDataUser.filter(
          (prog) => prog.interviewer_type == 'reverse_shadow',
        ).length;

        const shadowCount = progressDataUser.filter(
          (prog) => prog.interviewer_type == 'shadow',
        ).length;

        const isMoveToQualifierVisible =
          recruiterUser.role === 'admin' ||
          (editModule.settings.reqruire_approval &&
            editModule.settings.approve_users.includes(user.user_id));

        return (
          <MemberListCard
            onClickViewProgress={{
              onClick: () => {
                setProgressUser({
                  progress: progress.filter(
                    (prog) => prog.interviewer_id === user.user_id,
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
                moveToQualified(user.user_id);
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
