import UITabs from '@/components/Common/UITabs';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

import FeedbackWindow from '../Feedback';
import ScheduleDetailInstructions from '../Instructions';
import JobDetails from '../JobDetails';
import Overview from '../Overview';
function ScheduleDetailsTabs() {
  const tabs = [
    {
      name: 'Overview',
      id: 'details',
      content: <Overview />,
    },
    {
      name: 'Job Description',
      id: 'password',
      content: <JobDetails />,
    },
    {
      name: 'Interview Instructions',
      id: 'instructions',
      content: <ScheduleDetailInstructions />,
    },
    {
      name: 'Interview Feedback',
      id: 'feedback',
      content: <FeedbackWindow />,
    },
  ];

  const router = useRouterPro();
  const tab = router.queryParams.tab as string;
  const meeting_id = router.queryParams.meeting_id as string;

  return (
    <UITabs
      tabs={tabs}
      defaultValue={tabs.find((t) => t.id === tab)?.id || 'details'}
      onClick={(value: string) => {
        router.replace(
          `${ROUTES['/interviews/view']()}?meeting_id=${meeting_id}&tab=${value}`,
        );
      }}
    />
  );
}

export default ScheduleDetailsTabs;
