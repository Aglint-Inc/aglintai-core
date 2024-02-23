import { useRouter } from 'next/router';

import { PageLayout, SchedulerDashboard } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function SchedulingMainComp() {
  const router = useRouter();

  return (
    <>
      <PageLayout
        slotBody={
          <SchedulerDashboard
            onClickAllInterviews={{
              onClick: () => {
                router.push(pageRoutes.SCHEDULINGINTERVIEW);
              },
            }}
            onClickInterviewPanel={{
              onClick: () => {
                router.push(pageRoutes.SCHEDULINGPANEL);
              },
            }}
            onClickMySchedule={{
              onClick: () => {
                router.push(pageRoutes.INTERVIEWER);
              },
            }}
          />
        }
      />
    </>
  );
}

export default SchedulingMainComp;
