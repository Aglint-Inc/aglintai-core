import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { fetchInterviewModules } from '../../app/(authenticated)/_interview-pool/[pool]/_common/utils/utils';
import { ShowCode } from '../Common/ShowCode';
import SchedulingDashboard from './Dashboard';
import MySchedule from './MySchedules';
import Schedules from './Schedules';
import SeoSettings from './SEO/SeoSettings';
import { type SchedulingTab } from './types';

function SchedulingMainComp() {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();

  useEffect(() => {
    if (router.isReady && !router.query.tab) {
      router.push(
        `${ROUTES['/scheduling']()}?tab=${'metrics' as SchedulingTab}`,
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [router]);

  const tab = router.query.tab as SchedulingTab;

  const { setBreadcrum } = useBreadcrumContext();

  useEffect(() => {
    setBreadcrum([
      {
        name: capitalizeAll(tab),
        route: ROUTES['/scheduling']() + `?tab=interviews`,
      },
    ]);
  }, [tab]);

  return (
    <>
      <SeoSettings tab={tab} />
      <div className='container-lg mx-auto w-full px-12'>
        <header>
          <div className='mb-8 flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-semibold'>All Interviews</h1>
              <p className='mb-4 text-gray-600'>
                Connect your favorite tools to streamline your recruitment
                process.
              </p>
            </div>
            {checkPermissions(['scheduling_actions']) && (
              <Tabs
                value={tab}
                onValueChange={(value) =>
                  router.push(`${ROUTES['/scheduling']()}?tab=${value}`)
                }
              >
                <TabsList>
                  <TabsTrigger value='interviews'>Interviews</TabsTrigger>
                  <TabsTrigger value='my_interviews'>My Interviews</TabsTrigger>
                  <TabsTrigger value='metrics'>Metrics</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
        </header>
        <div className='flex w-full flex-row'>
          {/* Left Column: All Upcoming Interviews */}
          <div className='w-7/12 space-y-4 pr-6'>
            <h2 className='text-lg font-semibold'>Upcoming Interviews</h2>
            {/* <UpcomingInterviews /> */}
            <BodyComp />
          </div>

          {/* Right Column: My Interviews and Recently Completed Interviews */}
          <div className='flex w-5/12 flex-col'>
            <Card className='mb-6'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  My Interviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MySchedule />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  Recently Completed
                </CardTitle>
              </CardHeader>
              <CardContent>{/* <RecentlyCompletedInterviews /> */}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulingMainComp;

const BodyComp = () => {
  const router = useRouter();
  const tab = router.query.tab as SchedulingTab;
  const { checkPermissions } = useRolesAndPermissions();

  return (
    <>
      <ShowCode>
        <ShowCode.When isTrue={tab === 'interviews'}>
          {checkPermissions(['scheduling_actions']) && <Schedules />}
        </ShowCode.When>
        <ShowCode.When isTrue={tab === 'my_interviews'}>
          <MySchedule />
        </ShowCode.When>
        <ShowCode.Else>
          {checkPermissions(['scheduling_settings_and_reports']) && (
            <SchedulingDashboard />
          )}
        </ShowCode.Else>
      </ShowCode>
    </>
  );
};

export const useInterviewModules = ({
  recruiter_id,
  user_id,
}: {
  recruiter_id: string;
  user_id: string;
}) => {
  const { recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: ['my_interview_module'],
    queryFn: () =>
      fetchInterviewModules(recruiter_id).then((data) =>
        data.filter((item) =>
          Boolean(item.users.find((user) => user.user_id === user_id)),
        ),
      ),
    enabled: !!recruiter.id,
    refetchOnWindowFocus: false,
  });
  return query;
};
