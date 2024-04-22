import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

import { CurrentStage, JobCards } from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../hooks';
import { useSchedulingApplicationStore } from '../store';
import { updateApplicationStatus } from '../utils';

function RightPanel() {
  const router = useRouter();
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  // const { data: activities } = useAllActivities({
  //   application_id: selectedApplication.id,
  // });

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
          onClick: async () => {
            const res = await updateApplicationStatus({
              application_id: selectedApplication.id,
              status: 'qualified',
            });
            if (res) {
              fetchInterviewDataByApplication();
            } else {
              toast.error('Error updating status');
            }
          },
        }}
        onClickMoveToDisqualified={{
          onClick: async () => {
            const res = await updateApplicationStatus({
              application_id: selectedApplication.id,
              status: 'disqualified',
            });
            if (res) {
              fetchInterviewDataByApplication();
            } else {
              toast.error('Error updating status');
            }
          },
        }}
      />
      {/* <Activities
        slotActivitiesCard={
          <>
            {activities?.map((act) => {
              return (
                <ActivitiesCard
                  key={act.id}
                  slotImage={
                    act.logger === EmailAgentId ? (
                      <EmailAgentIcon />
                    ) : act.logger === PhoneAgentId ? (
                      <PhoneAgentIcon />
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
      /> */}
    </>
  );
}

export default RightPanel;
