import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

import FeedbackWindow from '../Feedback';
import ScheduleDetailInstructions from '../Instructions';
import JobDetails from '../JobDetails';
import Overview from '../Overview';

function ScheduleDetailsTabs() {
  const tabs = [
    {
      name: 'Details',
      value: 'details',
      comp: <Overview />,
    },
    {
      name: 'Job Description',
      value: 'password',
      comp: <JobDetails />,
    },
    {
      name: 'Instructions',
      value: 'instructions',
      comp: <ScheduleDetailInstructions />,
    },
    {
      name: 'Feedback',
      value: 'feedback',
      comp: <FeedbackWindow />,
    },
  ];

  return (
    <Tabs defaultValue='details'>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.comp}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default ScheduleDetailsTabs;
