import { Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import {GlobalIcon} from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { EmptyGeneral } from '@/devlink2/EmptyGeneral';
import { MemberListCard } from '@/devlink2/MemberListCard';
import { MemberListCardOption } from '@/devlink2/MemberListCardOption';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';

import { useGetMeetingsByModuleId } from '../../../queries/hooks';
import { getHours } from '../../../queries/utils';
import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
} from '../../../store';
import { ModuleType } from '../../../types';
import { getPauseMemberText } from '../utils';

function SlotQualifiedMembers({
  editModule,
  meetingData,
}: {
  editModule: ModuleType;
  meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
}) {
  const { members } = useSchedulingContext();

  const allUsers = editModule.relations;
  const router = useRouter();
  const currentDay = dayjs();

  const allQualified = allUsers
    .filter((user) => user.training_status === 'qualified')
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
    }); // need to write rpc which calc everything in db and return

  return (
    <>
      {allQualified.length === 0 && (
        <EmptyGeneral
          textEmpt={'No members yet'}
          slotButton={
            <ButtonSoft
              size={2}
              isRightIcon={false}
              isLeftIcon={true}
              slotIcon={<GlobalIcon iconName='person_add' size={5}/>}
              textButton={'Add Qaulified Member'}
              onClickButton={{
                onClick: () => {
                  setIsAddMemberDialogOpen(true);
                  setTrainingStatus('qualified');
                },
              }}
            />
          }
        />
      )}
      {allQualified.map((user) => {
        const member = members.filter(
          (member) => member.user_id === user.user_id,
        )[0];
        if (!member) return null;

        const userSettings = user.recruiter_user.scheduling_settings;
        return (
          <MemberListCard
            textWeekInterview={`${user.weekly}  ${userSettings.interviewLoad.dailyLimit.type}`}
            textTodayInterview={`${user.daily}  ${userSettings.interviewLoad.dailyLimit.type}`}
            onClickCard={{
              onClick: () => {
                router.push(
                  ROUTES['/scheduling/interviewer/[member_id]']({
                    member_id: user.user_id,
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
      {allQualified.length !== 0 && (
        <Stack direction={'row'} pt={'var(--space-2)'}>
          <ButtonSoft
            size={2}
            isRightIcon={false}
            isLeftIcon={true}
            slotIcon={<GlobalIcon iconName='person_add' size={5}/>}
            textButton={'Add Qualified Member'}
            onClickButton={{
              onClick: () => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('qualified');
              },
            }}
          />
        </Stack>
      )}
    </>
  );
}

export default SlotQualifiedMembers;

const ThreeDot = ({ user }) => {
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
