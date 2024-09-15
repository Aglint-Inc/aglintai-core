import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';

import { useApplication } from '@/context/ApplicationContext';
import { Activity } from '@/job/components/CandidateDrawer/Activity';
import { Details } from '@/job/components/CandidateDrawer/Details';
import { Resume } from '@/job/components/CandidateDrawer/Resume';

import CandidateInfo from '../CandidateInfo';
import Requests from '../Requests';
import Tabs, { type TabsType } from '../Tabs';
import InterviewTabContent from './InterviewTabContent';

function SlotBody() {
  const router = useRouter();
  const tab = router.query.tab as TabsType;

  const {
    meta: { isLoading: isLoadingDetail },
  } = useApplication();

  if (isLoadingDetail) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-500' />
        <span className='sr-only'>Loading...</span>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (tab) {
      case 'interview':
        return <InterviewTabContent />;
      case 'resume':
        return <Resume />;
      case 'scoring':
        return <Details />;
      default:
        return null;
    }
  };

  return (
    <div className='flex'>
      <div className='w-8/12 flex flex-col gap-4 pr-6'>
        <CandidateInfo />
        <Tabs />
        {renderTabContent()}
      </div>
      <div className='w-4/12'>
        <div className='flex flex-col space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Requests />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Activity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SlotBody;
