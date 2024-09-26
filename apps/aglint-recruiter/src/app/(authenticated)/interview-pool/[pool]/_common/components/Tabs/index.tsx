import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

import { usePoolCandidates } from '../../hooks/useCandidateModule';
import { usePoolFeedbacks } from '../../hooks/usePoolFeedback';
import { usePoolSchedules } from '../../hooks/useSchedulesPool';
import Candidates from './Candidates';
import Feedback from './Feedback';
import InstructionsComp from './Instructions';
import Interviewers from './Interviewers';
import Schedules from './Schedules';
import Training from './Training';
import UITabs from '@/components/Common/UITabs';

function InterviewDetailsTabs() {
  const router = useRouterPro();
  const tabs = [
    {
      name: 'Interviewers',
      id: 'interviewers',
      tabComp: <Interviewers />,
    },
    {
      name: 'Training',
      id: 'training',
      tabComp: <Training />,
    },
    {
      name: 'Schedules',
      id: 'schedules',
      tabComp: <Schedules />,
    },
    {
      name: 'Instructions',
      id: 'instructions',
      tabComp: <InstructionsComp />,
    },
    {
      name: 'Candidates',
      id: 'candidates',
      tabComp: <Candidates />,
    },

    {
      name: 'Feedback',
      id: 'feedback',
      tabComp: <Feedback />,
    },
  ];

  usePoolSchedules({
    filters: ['confirmed', 'completed', 'cancelled'],
  });
  usePoolCandidates();
  usePoolFeedbacks();

  const type_id = router.params.pool;
  return (
    <>
      <UITabs
        tabs={tabs}
        defaultValue={(router.queryParams.tab as string) || 'interviewers'}
        onClick={(value) => {
          router.replace(
            ROUTES['/interview-pool/[pool]']({
              type_id,
            }) +
              '?tab=' +
              value,
          );
        }}
      />
    </>
  );
}

export default InterviewDetailsTabs;
