import { IconButtonGhost } from '@devlink/IconButtonGhost';
import { EmptyGeneral } from '@devlink2/EmptyGeneral';
import { MemberListCard } from '@devlink2/MemberListCard';
import { MemberListCardOption } from '@devlink2/MemberListCardOption';
import { Popover, Stack } from '@mui/material';
import { PersonStanding } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { UIButton } from '@/components/Common/UIButton';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';

import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
} from '../../../store';
import { type ModuleType } from '../../../types';
import { getPauseMemberText } from '../utils';

function SlotQualifiedMembers({ editModule }: { editModule: ModuleType }) {
  const allUsers = editModule.relations;

  const filtererdUsers = allUsers.filter(
    (rel) => rel.training_status === 'qualified' && !rel.is_archived,
  );
  const router = useRouter();

  return (
    <>
      {filtererdUsers.length === 0 && (
        <EmptyGeneral
          textEmpt={'No interviewers added yet.'}
          slotButton={
            <UIButton
              variant='outline'
              leftIcon={<PersonStanding />}
              onClick={() => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('qualified');
              }}
            >
              Add Interviewer
            </UIButton>
          }
        />
      )}
      {filtererdUsers.map((user) => {
        const member = user.recruiter_user;
        const userSettings = user.recruiter_user.scheduling_settings;
        const textWeekInterview =
          userSettings.interviewLoad.dailyLimit.type === 'Hours'
            ? `${user.recruiter_user.total_hours_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
            : `${user.recruiter_user.total_interviews_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;

        const textTodayInterview =
          userSettings.interviewLoad.dailyLimit.type === 'Hours'
            ? `${user.recruiter_user.total_hours_today} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
            : `${user.recruiter_user.total_interviews_today} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;
        return (
          <MemberListCard
            textWeekInterview={textWeekInterview}
            textTodayInterview={textTodayInterview}
            onClickCard={{
              onClick: () => {
                router.push(
                  ROUTES['/user/profile/[user_id]']({
                    user_id: user.recruiter_user.user_id,
                  }),
                );
              },
            }}
            isDropdownIconVisible={false}
            key={user.user_id}
            slotThreeDot={<ThreeDot user={user} />}
            isTrainingProgessVisible={true}
            isTrainingCompletedVisible={false}
            textPauseResumeDate={getPauseMemberText(user.pause_json)}
            isPauseResumeVisible={Boolean(user.pause_json)}
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
        );
      })}
      {filtererdUsers.length !== 0 && (
        <div className='pt-2'>
          <UIButton
            variant='outline'
            leftIcon={<PersonStanding />}
            onClick={() => {
              setIsAddMemberDialogOpen(true);
              setTrainingStatus('qualified');
            }}
          >
            Add Interviewer
          </UIButton>
        </div>
      )}
    </>
  );
}

export default SlotQualifiedMembers;

const ThreeDot = ({ user }: { user: ModuleType['relations'][0] }) => {
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
      >
        <MemberListCardOption
          isMoveToQualifierVisible={false}
          isPauseVisible={!user.pause_json}
          isResumeVisible={Boolean(user.pause_json)}
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
