import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

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

function InterviewDetailsTabs() {
  const router = useRouterPro();

  const type_id = router.params.pool;
  const tabs = [
    {
      name: 'Interviewers',
      value: 'interviewers',
      tabComp: <Interviewers />,
    },
    {
      name: 'Candidates',
      value: 'candidates',
      tabComp: <Candidates />,
    },
    {
      name: 'Schedules',
      value: 'schedules',
      tabComp: <Schedules />,
    },
    {
      name: 'Feedback',
      value: 'feedback',
      tabComp: <Feedback />,
    },
    {
      name: 'Training',
      value: 'training',
      tabComp: <Training />,
    },
    {
      name: 'Instructions',
      value: 'instructions',
      tabComp: <InstructionsComp />,
    },
  ];

  usePoolSchedules({
    filters: ['confirmed', 'completed', 'cancelled'],
  });
  usePoolCandidates();
  usePoolFeedbacks();

  return (
    <Tabs
      defaultValue='interviewers'
      className='space-y-4'
      value={router.queryParams.tab as string}
    >
      <TabsList>
        {tabs.map((tab) => (
          <>
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => {
                router.replace(
                  ROUTES['/interview-pool/[pool]']({
                    type_id,
                  }) +
                    '?tab=' +
                    tab.value,
                );
              }}
            >
              {tab.name}
            </TabsTrigger>
          </>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='space-y-4'>
          <>{tab.tabComp}</>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default InterviewDetailsTabs;
