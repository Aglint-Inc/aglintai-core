import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

import { Activities, ActivitiesCard, CurrentStage, JobCards } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import {
  EmailAgentIcon,
  PhoneAgentIcon,
} from '@/src/components/Tasks/TaskBody/ViewTask/Progress';
import { EmailAgentId, PhoneAgentId } from '@/src/components/Tasks/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../queries/utils';
import { useAllActivities, useGetScheduleApplication } from '../hooks';
import { useSchedulingApplicationStore } from '../store';
import { updateApplicationStatus } from '../utils';

function RightPanel() {
  const { recruiterUser } = useAuthDetails();
  const router = useRouter();
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const { data: activities, refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  const onClickUpdateStatus = async ({
    status,
  }: {
    status: 'qualified' | 'disqualified';
  }) => {
    try {
      const res = await updateApplicationStatus({
        application_id: selectedApplication.id,
        status: status,
      });
      if (res) {
        await addScheduleActivity({
          title: `Moved to ${status}`,
          application_id: selectedApplication.id,
          logger: recruiterUser.user_id,
          type: 'schedule',
          supabase,
          created_by: recruiterUser.user_id,
        });
        fetchInterviewDataByApplication();
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error updating status');
    } finally {
      refetch();
    }
  };

  return (
    <>
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          router.push(`${pageRoutes.JOBS}/${selectedApplication.job_id}`);
        }}
      >
        <JobCards
          textLocation={selectedApplication.public_jobs.location}
          textRole={selectedApplication.public_jobs.job_title}
        />
      </Stack>
      <CurrentStage
        textStage={capitalize(selectedApplication.status)}
        isQualifiedVisible={selectedApplication.status === 'interview'}
        isDisqualifiedVisible={selectedApplication.status !== 'disqualified'}
        onClickMoveToQualified={{
          onClick: () => onClickUpdateStatus({ status: 'qualified' }),
        }}
        onClickMoveToDisqualified={{
          onClick: () => onClickUpdateStatus({ status: 'disqualified' }),
        }}
      />
      {activities?.length > 0 && (
        <Activities
          slotActivitiesCard={
            <>
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
                            act.recruiter_user.first_name,
                            act.recruiter_user.last_name,
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
      )}
    </>
  );
}

export default RightPanel;
