import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { EmptyGeneral } from '@/devlink2/EmptyGeneral';
import IconPlusFilter from '@/src/components/Scheduling/Schedules/Filters/FilterChip/IconPlusFilter';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import {
  useGetMeetingsByModuleId,
  useProgressModuleUsers,
} from '../../../queries/hooks';
import { getHours } from '../../../queries/utils';
import {
  setIsAddMemberDialogOpen,
  setTrainingStatus,
  useModulesStore,
} from '../../../store';
import { MemberType, ModuleType } from '../../../types';
import MoveToQualifiedDialog from '../../MoveToQualified';
import IndividualCard from '../IndividualCard';

export type ProgressUser = {
  user: MemberType;
  progress: ReturnType<typeof useProgressModuleUsers>['data'];
};

function SlotTrainingMembers({
  editModule,
  meetingData,
}: {
  editModule: ModuleType;
  meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
}) {
  const { members } = useSchedulingContext();

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

      {allTrainees.length === 0 && (
        <EmptyGeneral
          textEmpt={'No members yet'}
          slotButton={
            <ButtonSurface
              size={1}
              isRightIcon={false}
              slotIcon={<IconPlusFilter />}
              textButton={'Add'}
              onClickButton={{
                onClick: () => {
                  setIsAddMemberDialogOpen(true);
                  setTrainingStatus('training');
                },
              }}
            />
          }
        />
      )}
      {allTrainees.map((user) => {
        const member = members.find(
          (member) => member.user_id === user.user_id,
        );

        if (!member) return null; //this line added temporarily becasue of data inconsistency

        const progressDataUser = Array.isArray(progress)
          ? progress.filter(
              (prog) =>
                prog.interview_module_relation_id === user.id &&
                prog.interview_meeting.status === 'completed',
            )
          : [];

        return (
          <IndividualCard
            key={user.id}
            editModule={editModule}
            member={member}
            progressDataUser={progressDataUser}
            user={user}
          />
        );
      })}

      {allTrainees.length !== 0 && (
        <Stack direction={'row'} pt={'var(--space-2)'}>
          <ButtonSoft
            size={2}
            isRightIcon={false}
            isLeftIcon={true}
            slotIcon={<GlobalIcon iconName='person_add' size={5} />}
            textButton={'Add Training Member'}
            onClickButton={{
              onClick: () => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('training');
              },
            }}
          />
        </Stack>
      )}
    </>
  );
}

export default SlotTrainingMembers;
