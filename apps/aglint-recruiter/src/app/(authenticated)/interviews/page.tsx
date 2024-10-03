'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import UpComingInterviewFilters from '@interviews/components/Filters/upComingFilter';
import MyInterviews from '@interviews/components/MyInterviews';
import RecentCompletedInterviews from '@interviews/components/RecentCompletedInterviews';
import { IntegrationNotFound } from '@interviews/components/ui/IntegrationNotFound';
import UpComingInterviews from '@interviews/components/UpComingInterviews';
import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';
import React from 'react';

import { useIntegrations } from '@/authenticated/hooks';
import { useTenant } from '@/company/hooks';

function InterviewsPage() {
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
      <TwoColumnPageLayout
        sidebarPosition='right'
        sidebarWidth={460}
        sidebar={
          <>
            <MyInterviews />
            <RecentCompletedInterviews />
          </>
        }
        filter={<UpComingInterviewFilters />}
        header={<h1 className='text-2xl font-bold'>Upcoming Interviews</h1>}
      >
        <ScheduleStatesProvider>
          <UpComingInterviews />
        </ScheduleStatesProvider>
      </TwoColumnPageLayout>
    );
  } else {
    return (
      <OneColumnPageLayout>
        <IntegrationNotFound
          recruiter_id={recruiter_user?.user_id}
          loading={integrationLoading}
        />
      </OneColumnPageLayout>
    );
  }
}
export default InterviewsPage;
