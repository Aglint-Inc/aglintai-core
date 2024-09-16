import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
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
      <Card className='container mx-auto'>
        <CardContent className='p-6'>
          <div className='flex space-x-6'>
            <div className='w-8/12 space-y-4'>
              <Skeleton className='h-24 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-64 w-full' />
            </div>
            <div className='w-4/12 space-y-4'>
              <Card>
                <CardHeader>
                  <Skeleton className='h-6 w-24' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-32 w-full' />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className='h-6 w-24' />
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className='flex items-center space-x-2'>
                        <Skeleton className='h-8 w-8 rounded-full' />
                        <div className='space-y-1 flex-1'>
                          <Skeleton className='h-4 w-full' />
                          <Skeleton className='h-3 w-3/4' />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
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
          {/* <InsightCard /> */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Requests />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Activity</CardTitle>
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
