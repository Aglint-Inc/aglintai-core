import ReorderableInterviewPlan from '@components/reorderable-interview-plan';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { ExternalLink } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import { useApplication } from '@/context/ApplicationContext';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Activity } from '@/job/components/CandidateDrawer/Activity';
import { Details } from '@/job/components/CandidateDrawer/Details';
import { Resume } from '@/job/components/CandidateDrawer/Resume';

import CandidateInfo from '../CandidateInfo';
import InterviewTabContent from '../InterviewTab';
import Requests from '../Requests';
import TabsComp, { type TabsType } from './TabPills';

function SlotBody() {
  const router = useRouterPro();
  const tab = router.queryParams.tab as TabsType;
  const { isShowFeature } = useAuthDetails();
  const {
    meta: { isLoading: isLoadingDetail },
    application_id,
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
                        <div className='flex-1 space-y-1'>
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
      case 'candidate_stages':
        return (
          <>
            <div>
              <UIButton
                variant='secondary'
                onClick={() => {
                  window.open(`/candidate/${application_id}/home`, '_blank');
                }}
                size='sm'
                rightIcon={<ExternalLink />}
              >
                Portal
              </UIButton>
            </div>
            <ReorderableInterviewPlan
              applicationId={application_id}
              jobId={null}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex'>
      <div className='flex w-8/12 flex-col gap-4 pr-6'>
        <CandidateInfo />
        <TabsComp />
        {renderTabContent()}
      </div>
      <div className='w-4/12'>
        <div className='flex flex-col space-y-4'>
          {isShowFeature('SCHEDULING') ? (
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Requests />
              </CardContent>
            </Card>
          ) : null}
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
