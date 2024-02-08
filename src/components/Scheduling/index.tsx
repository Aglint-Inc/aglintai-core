import { useRouter } from 'next/router';

import { SchedulerDashboard, SchedulerLayout } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function ShecdulingMainComp() {
  const router = useRouter();

  return (
    <>
      <SchedulerLayout
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
          />
        }
      />
    </>
  );
}

export default ShecdulingMainComp;
