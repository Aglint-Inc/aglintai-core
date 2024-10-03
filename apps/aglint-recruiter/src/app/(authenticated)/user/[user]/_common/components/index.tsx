import {
  type DatabaseTable,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import {
  Page,
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useInterviewsByUserId } from '@interviews/hooks/useInterviewsByUserId';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { useFlags } from '@/company/hooks/useFlags';
import CalendarComp from '@/components/Common/Calendar/Calendar';
import Heatmap from '@/components/Common/Heatmap/HeatmapUser';
import { Loader } from '@/components/Common/Loader';
import UITypography from '@/components/Common/UITypography';

import {
  type InterviewerDetailType,
  useInterviewer,
} from '../hooks/useInterviewer';
import { useScrollNavigation } from '../hooks/useScrollnavigation';
import { BreadCrumb } from './BreadCrumb';
import { Feedback } from './FeedbackCard';
import { Header } from './Header';
import { KeyMatrics } from './KeyMatrix';
import { Qualifications } from './Qualification';
import { RecentInterviews } from './RecentInterviewCard';
import ScheduleAvailability from './ScheduleAvailability';
import { SideBar } from './SideBar';
import { UpcomingInterview } from './UpcomingInterviews';

type TabType = 'overview' | 'calendar';
export default function InterviewerDetailsPage() {
  const { isShowFeature } = useFlags();
  const { activeSection, scrollToSection, sectionRefs } = useScrollNavigation();
  const userCardRef = useRef<HTMLDivElement>(null);

  const { data: interviewerDetails, isLoading, error } = useInterviewer();

  //------------------------ calendar data
  const param = useParams() as { user: string };
  const user_id = param.user as string;

  const [tab, setTab] = useState<TabType>('overview');
  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >([]);
  const { data, isLoading: iscalendarLoading } = useInterviewsByUserId({
    filter: filter.length === 0 ? null : filter,
    member_id: user_id,
  });

  //--------------------------------------
  if (isLoading)
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Loader />
      </div>
    );

  if (!interviewerDetails || error)
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <UITypography>Fetching Error</UITypography>
      </div>
    );

  const allSchedules = data?.schedules;
  // ---------------- data

  const interviewLoad = interviewerDetails.scheduling_settings
    .interviewLoad as SchedulingSettingType['interviewLoad'];

  const interviewType =
    interviewerDetails?.interview_type as InterviewerDetailType['interview_type'];

  return (
    <div>
      <TwoColumnPageLayout
        sidebar={
          <div className='flex flex-col gap-4'>
            <BreadCrumb name={interviewerDetails?.first_name || ''} />
            <Header userCardRef={userCardRef} />
            {isShowFeature('SCHEDULING') && (
              <SideBar
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            )}
          </div>
        }
        sidebarPosition='left'
        sidebarWidth='480'
      >
        <Page>
          <PageHeader className='px-4'>
            <PageHeaderText>
              <PageTitle>
                {interviewerDetails.first_name} {interviewerDetails.last_name}{' '}
                {tab === 'overview' ? 'Overview' : 'Calendar'}
              </PageTitle>
              <PageDescription>
                {interviewerDetails.first_name} {interviewerDetails.last_name}{' '}
                {tab === 'overview' ? 'Overview' : 'Calendar'} of Interviewer
                with all the details.
              </PageDescription>
            </PageHeaderText>
            <PageActions>
              <Tabs
                defaultValue='overview'
                className='w-full'
                onValueChange={(value) => setTab(value as TabType)}
              >
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='calendar'>Calendar</TabsTrigger>
                </TabsList>
              </Tabs>
            </PageActions>
          </PageHeader>
          {tab === 'overview' ? (
            <div className='flex flex-col space-y-8 px-4'>
              <div className='grid grid-cols-2 gap-[1px] bg-muted'>
                <div className='grid grid-cols-[1fr] bg-white pr-8'>
                  <section ref={sectionRefs.scheduleAvailabilityRef}>
                    <ScheduleAvailability />
                  </section>
                </div>
                <div className='grid grid-cols-[1fr] bg-white pl-8'>
                  <section ref={sectionRefs.meetingOverview}>
                    <Heatmap loadSetting={interviewLoad} />
                  </section>
                  <section ref={sectionRefs.overview}>
                    <KeyMatrics />
                  </section>
                  <section ref={sectionRefs.upcomingInterviews}>
                    <UpcomingInterview />
                  </section>
                  <section ref={sectionRefs.recentInterviews}>
                    <RecentInterviews />
                  </section>
                  <section ref={sectionRefs.qualifications}>
                    <Qualifications interview_types={interviewType} />
                  </section>
                  <section ref={sectionRefs.interviewFeedback}>
                    <Feedback />
                  </section>
                </div>
              </div>
            </div>
          ) : (
            <div className='p-4'>
              <CalendarComp
                allSchedules={allSchedules ?? []}
                isLoading={iscalendarLoading}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
          )}
        </Page>
      </TwoColumnPageLayout>
    </div>
  );
}
