import dayjs from 'dayjs';

import { EmptyGeneral, MemberListCard } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';

import {
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../store';
import { ModuleType } from '../../../types';

function SlotQualifiedMembers({ editModule }: { editModule: ModuleType }) {
  const { members } = useSchedulingContext();

  const allUsers = editModule.relations;

  const allQualified = allUsers.filter(
    (user) => user.training_status === 'qualified',
  );

  return (
    <>
      {allQualified.length === 0 && (
        <EmptyGeneral textEmpt={'No Members Added Yet'} />
      )}
      {allQualified.map((user) => {
        const member = members.filter(
          (member) => member.user_id === user.user_id,
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

export default SlotQualifiedMembers;
