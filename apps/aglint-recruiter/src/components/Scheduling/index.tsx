import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { ShowCode } from '../Common/ShowCode';
import { UIPageLayout } from '../Common/UIPageLayout';
import SchedulingDashboard from './Dashboard';
import { fetchInterviewModules } from './InterviewTypes/queries/utils';
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

  const { breadcrum, setBreadcrum } = useBreadcrumContext();

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

      <UIPageLayout
        slotTopbarLeft={<>{breadcrum}</>}
        slotTopbarRight={
          <>
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
          </>
        }
        slotBody={<BodyComp />}
      />
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
