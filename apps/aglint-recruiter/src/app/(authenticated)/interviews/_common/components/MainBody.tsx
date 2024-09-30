import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';

import { useAllIntegrations } from '@/authenticated/hooks';
import { useTenant } from '@/company/hooks';

import MyInterviews from './MyInterviews';
import RecentCompletedInterviews from './RecentCompletedInterviews';
import { IntegrationNotFound } from './ui/IntegrationNotFound';
import UpComingInterviews from './UpComingInterviews';

function Interviews() {
  const { data: allIntegrations, isLoading: integrationLoading } =
    useAllIntegrations();
  const { recruiter_user } = useTenant();

  if (
    (!!allIntegrations?.service_json &&
      allIntegrations?.google_workspace_domain?.split('//')[1] ===
        recruiter_user?.email.split('@')[1]) ||
    !!(recruiter_user?.schedule_auth as any)?.access_token
  ) {
    return (
      <div className='container-lg mx-auto w-full px-4'>
        <header></header>
        <div className='flex w-full flex-row'>
          {/* Left Column: All Upcoming Interviews */}
          <div className='w-7/12 space-y-4 pr-6'>
            <h2 className='text-lg font-semibold'>Upcoming Interviews</h2>
            <ScheduleStatesProvider>
              <UpComingInterviews />
            </ScheduleStatesProvider>
          </div>

          {/* Right Column: My Interviews and Recently Completed Interviews */}
          <div className='flex w-5/12 flex-col'>
            <div className='p-12'></div>
            <MyInterviews />
            <RecentCompletedInterviews />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <IntegrationNotFound
        recruiter_id={recruiter_user?.user_id}
        loading={integrationLoading}
      />
    );
  }
}

export default Interviews;
