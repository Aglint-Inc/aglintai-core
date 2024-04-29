import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { EmptyState } from '@/devlink2';
import { Activities, ActivitiesCard } from '@/devlink3';
import Icon from '@/src/components/Common/Icons/Icon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { PhoneAgentIcon } from '@/src/components/Tasks/Components/PhoneAgentIcon';
import { EmailAgentId, PhoneAgentId } from '@/src/components/Tasks/utils';
import { getFullName } from '@/src/utils/jsonResume';

import { useAllActivities } from '../hooks';
import { useSchedulingApplicationStore } from '../store';

function RightPanel() {
  // const { recruiterUser } = useAuthDetails();
  const router = useRouter();
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  // const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const { data: activities, isLoading } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  // const onClickUpdateStatus = async ({
  //   status,
  // }: {
  //   status: 'qualified' | 'disqualified';
  // }) => {
  //   try {
  //     const res = await updateApplicationStatus({
  //       application_id: selectedApplication.id,
  //       status: status,
  //     });
  //     if (res) {
  //       await addScheduleActivity({
  //         title: `Moved to ${status}`,
  //         application_id: selectedApplication.id,
  //         logger: recruiterUser.user_id,
  //         type: 'schedule',
  //         supabase,
  //         created_by: recruiterUser.user_id,
  //       });
  //       fetchInterviewDataByApplication();
  //     } else {
  //       throw new Error();
  //     }
  //   } catch {
  //     toast.error('Error updating status');
  //   } finally {
  //     refetch();
  //   }
  // };

  return (
    <>
      <Activities
        slotActivitiesCard={
          <>
            {!isLoading && activities.length === 0 && (
              <EmptyState
                slotIcons={
                  <Icon variant='ActivityTimeline' width='50px' height='50px' />
                }
                textDescription={'Not added yet'}
              />
            )}

            {activities.map((act, ind) => {
              return (
                <ActivitiesCard
                  key={act.id}
                  textTitle={act.title || ''}
                  textTime={dayjs(act.created_at).fromNow()}
                  isLineVisible={!(ind == activities.length - 1)}
                  isViewTaskVisible={Boolean(act.task_id)}
                  textDesc={act.description}
                  onClickViewTask={{
                    onClick: () => {
                      router.push(`/tasks?task_id=${act.task_id}`);
                    },
                  }}
                  slotImage={
                    act.logger === EmailAgentId ? (
                      <EmailAgentIcon />
                    ) : act.logger === PhoneAgentId ? (
                      <PhoneAgentIcon />
                    ) : act.logger == act.application_id ? (
                      <MuiAvatar
                        level={getFullName(
                          act.applications.candidates.first_name,
                          act.applications.candidates.last_name,
                        )}
                        src={act.applications.candidates.avatar}
                        variant={'circular'}
                        height={'24px'}
                        width={'24px'}
                        fontSize={'10px'}
                      />
                    ) : (
                      <MuiAvatar
                        level={getFullName(
                          act.recruiter_user?.first_name,
                          act.recruiter_user?.last_name,
                        )}
                        src={act.recruiter_user.profile_image}
                        variant={'circular'}
                        height={'24px'}
                        width={'24px'}
                        fontSize={'10px'}
                      />
                    )
                  }
                />
              );
            })}
          </>
        }
      />
    </>
  );
}

export default RightPanel;
