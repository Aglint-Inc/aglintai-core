import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

import Candidates from './Candidates';
import Feedback from './Feedback';
import Instructions from './Instructions';
import Interviewers from './Interviewers';
import Schedules from './Schedules';
import Training from './Training';

function InterviewDetailsTabs() {
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
      tabComp: <Instructions />,
    },
  ];

  return (
    <Tabs defaultValue='interviewers' className='space-y-4'>
      <TabsList>
        {tabs.map((tab) => (
          <>
            <TabsTrigger key={tab.value} value={tab.value}>
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
