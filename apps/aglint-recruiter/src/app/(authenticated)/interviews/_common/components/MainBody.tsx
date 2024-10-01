import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';

import { useIntegrations } from '@/authenticated/hooks';
import { useTenant } from '@/company/hooks';

import MyInterviews from './MyInterviews';
import RecentCompletedInterviews from './RecentCompletedInterviews';
import { IntegrationNotFound } from './ui/IntegrationNotFound';
import UpComingInterviews from './UpComingInterviews';

function Interviews() {
  const { data: allIntegrations, isLoading: integrationLoading } =
    useIntegrations();
  const { recruiter_user } = useTenant();

  if (
    (!!allIntegrations?.service_json &&
      allIntegrations?.google_workspace_domain?.split('//')[1] ===
        recruiter_user?.email.split('@')[1]) ||
    !!(recruiter_user?.schedule_auth as any)?.access_token
  ) {
    return (
      <div className=''>
        <div className='flex w-full flex-row'>
          {/* Left Column: All Upcoming Interviews */}
          <div className='w-8/12 space-y-4 pr-6'>
            <h2 className='text-lg font-semibold'>Upcoming Interviews</h2>
            <ScheduleStatesProvider>
              <UpComingInterviews />
            </ScheduleStatesProvider>
          </div>

          {/* Right Column: My Interviews and Recently Completed Interviews */}
          <div className='flex w-4/12 flex-col border-l'>
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
