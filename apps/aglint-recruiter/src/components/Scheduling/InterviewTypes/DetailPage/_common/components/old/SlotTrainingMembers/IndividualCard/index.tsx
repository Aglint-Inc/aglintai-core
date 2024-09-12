import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { MemberListCardOption } from '@devlink2/MemberListCardOption';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import { MemberListCardShadcn } from '@/components/Common/Member/MemberListCard';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';

import { type useProgressModuleUsers } from '../../../../../../queries/hooks';
import {
  setIsDeleteMemberDialogOpen,
  setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../../../../store';
import { type ModuleType } from '../../../../../../types';
import { getPauseMemberText } from '../../SlotBodyComp/utils';
import CollapseTrainingProgress from './Collapse';

export interface PillsTraining {
  sessionType: 'shadow' | 'rshadow';
  completed: boolean;
}

function IndividualCard({
  editModule,
  user,
  progressDataUser,
  refetch,
  refetchTrainingProgress,
}: {
  editModule: ModuleType;
  user: ModuleType['relations'][0];
  progressDataUser: ReturnType<typeof useProgressModuleUsers>['data'];
  refetch: () => void;
  refetchTrainingProgress: () => void;
}) {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

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
    mutatedReverseShadowProgress.length === 0 &&
    shadowProgress.length > 0 &&
    reverseShadowProgress.length > 0;

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

  const pills: PillsTraining[] = [
    ...shadowProgress.map(() => {
      return { sessionType: 'shadow' as const, completed: true };
    }),
    ...mutatedShadowProgress.map(() => {
      return { sessionType: 'shadow' as const, completed: false };
    }),
    ...reverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as const, completed: true };
    }),
    ...mutatedReverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as const, completed: false };
    }),
  ];

  return (
    <>
      <MemberListCardShadcn
        isThreeDotVisible={true}
        textWeekInterview={textWeekInterview}
        textTodayInterview={textTodayInterview}
        isTrainingProgessVisible={true}
        isInterviewsVisible={false}
        slotProgressBar={
          <div className='flex flex-row overflow-hidden rounded-[var(--radius-2)] space-x-0.5'>
            {pills.map((pill, i) => (
              <HistoryPillShadcn
                key={i}
                isShadow={pill.sessionType === 'shadow'}
                isReverseShadow={pill.sessionType === 'rshadow'}
                isActive={pill.completed}
              />
            ))}
          </div>
        }
        isPauseResumeVisible={Boolean(user.pause_json)}
        onClickCard={{
          onClick: () => {
            router.push(
              ROUTES['/user/profile/[user_id]']({
                user_id: user.user_id,
              }),
            );
          },
        }}
        slotTrainingProgressDetail={
          <CollapseTrainingProgress
            relationRefetch={refetch}
            refetch={refetch}
            refetchTrainingProgress={refetchTrainingProgress}
            reverse_shadow_to_complete={user.number_of_reverse_shadow}
            shadow_to_complete={user.number_of_shadow}
            module_realtion_id={user.id}
            isCollapseOpen={isCollapseOpen}
            setIsCollapseOpen={setIsCollapseOpen}
            mutatedReverseShadowProgress={mutatedReverseShadowProgress}
            mutatedShadowProgress={mutatedShadowProgress}
            reverseShadowProgress={reverseShadowProgress}
            shadowProgress={shadowProgress}
          />
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm' className='h-8 w-8'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <MemberListCardOption
          isMoveToQualifierVisible={isMoveToQualifierVisible}
          isRemoveVisible={true}
          isPauseVisible={!user.pause_json}
          isResumeVisible={Boolean(user.pause_json)}
          onClickMoveToQualifier={{
            onClick: () => {
              setSelUser(user);
              setIsMovedToQualifiedDialogOpen(true);
            },
          }}
          onClickRemoveModule={{
            onClick: () => {
              setSelUser(user);
              setIsDeleteMemberDialogOpen(true);
            },
          }}
          onClickResumeInterview={{
            onClick: () => {
              setSelUser(user);
              setIsResumeDialogOpen(true);
            },
          }}
          onClickPauseInterview={{
            onClick: () => {
              setSelUser(user);
              setIsPauseDialogOpen(true);
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
