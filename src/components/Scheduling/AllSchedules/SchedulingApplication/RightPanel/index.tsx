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
  const router = useRouter();
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  const { data: activities, isLoading } = useAllActivities({
    application_id: selectedApplication?.id,
  });

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
                textDescription={'No activity found.'}
              />
            )}
            {activities?.map((act, ind) => {
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
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          x='0.25'
                          y='0.25'
                          width='23.5'
                          height='23.5'
                          rx='11.75'
                          fill='#F8F9F9'
                        />
                        <rect
                          x='0.25'
                          y='0.25'
                          width='23.5'
                          height='23.5'
                          rx='11.75'
                          stroke='#D8DCDE'
                          stroke-width='0.5'
                        />
                        <path
                          d='M12 12C11.4531 12 10.9531 11.8672 10.5 11.6016C10.0469 11.3359 9.67969 10.9688 9.39844 10.5C9.13281 10.0312 9 9.53125 9 9C9 8.46875 9.13281 7.96875 9.39844 7.5C9.67969 7.03125 10.0469 6.66406 10.5 6.39844C10.9531 6.13281 11.4531 6 12 6C12.5469 6 13.0469 6.13281 13.5 6.39844C13.9531 6.66406 14.3203 7.03125 14.6016 7.5C14.8672 7.96875 15 8.46875 15 9C15 9.53125 14.8672 10.0312 14.6016 10.5C14.3203 10.9688 13.9531 11.3359 13.5 11.6016C13.0469 11.8672 12.5469 12 12 12ZM10.9219 13.125H13.0781C14.25 13.1562 15.2344 13.5625 16.0312 14.3438C16.8125 15.1406 17.2188 16.125 17.25 17.2969C17.25 17.5 17.1797 17.6641 17.0391 17.7891C16.9141 17.9297 16.75 18 16.5469 18H7.45312C7.25 18 7.08594 17.9297 6.96094 17.7891C6.82031 17.6641 6.75 17.5 6.75 17.2969C6.78125 16.125 7.1875 15.1406 7.96875 14.3438C8.76562 13.5625 9.75 13.1562 10.9219 13.125Z'
                          fill='#68737D'
                        />
                      </svg>
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
