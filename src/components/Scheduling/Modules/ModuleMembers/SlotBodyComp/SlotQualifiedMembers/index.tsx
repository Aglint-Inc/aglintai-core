import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { EmptyGeneral, MemberListCard } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import { useGetMeetingsByModuleId } from '../../../queries/hooks';
import { getHours } from '../../../queries/utils';
import {
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../store';
import { ModuleType } from '../../../types';

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
        <EmptyGeneral textEmpt={'No Members Added Yet'} />
      )}
      {allQualified.map((user) => {
        const member = members.filter(
          (member) => member.user_id === user.user_id,
        )[0];
        if (!member) return null; //this line added temporarily becasue of data inconsistency

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
            textName={getFullName(member.first_name, member.last_name) || ''}
            textRole={member.position || '--'}
          />
        );
      })}
    </>
  );
}

export default SlotQualifiedMembers;
