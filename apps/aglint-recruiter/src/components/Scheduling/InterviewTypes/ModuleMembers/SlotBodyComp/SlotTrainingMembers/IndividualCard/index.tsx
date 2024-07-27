import { Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { MemberListCard } from '@/devlink2/MemberListCard';
import { MemberListCardOption } from '@/devlink2/MemberListCardOption';
import { HistoryPill } from '@/devlink3/HistoryPill';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';

import { useProgressModuleUsers } from '../../../../queries/hooks';
import {
  setIsDeleteMemberDialogOpen,
  setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../../store';
import { ModuleType } from '../../../../types';
import { getPauseMemberText } from '../../utils';
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

  const pills: PillsTraining[] = [
    ...shadowProgress.map(() => {
      return { sessionType: 'shadow' as 'shadow', completed: true };
    }),
    ...mutatedShadowProgress.map(() => {
      return { sessionType: 'shadow' as 'shadow', completed: false };
    }),
    ...reverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as 'rshadow', completed: true };
    }),
    ...mutatedReverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as 'rshadow', completed: false };
    }),
  ];

  return (
    <>
      <MemberListCard
        textWeekInterview={textWeekInterview}
        textTodayInterview={textTodayInterview}
        isTrainingProgessVisible={true}
        isInterviewsVisible={false}
        slotProgressBar={
          <Stack
            direction={'row'}
            overflow={'hidden'}
            borderRadius={'var(--radius-2)'}
            spacing={'2px'}
          >
            {pills.map((pill, i) => (
              <HistoryPill
                key={i}
                isShadow={pill.sessionType === 'shadow'}
                isReverseShadow={pill.sessionType === 'rshadow'}
                isActive={pill.completed}
              />
            ))}
          </Stack>
        }
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
          <CollapseTrainingProgress
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
