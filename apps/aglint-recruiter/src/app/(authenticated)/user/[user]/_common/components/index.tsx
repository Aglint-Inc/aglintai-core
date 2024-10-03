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

export default function InterviewerDetailsPage() {
  const { isShowFeature } = useFlags();
  const { activeSection, scrollToSection, sectionRefs } = useScrollNavigation();
  const userCardRef = useRef<HTMLDivElement>(null);

  const { data: interviewerDetails, isLoading, error } = useInterviewer();

  //------------------------ calendar data
  const param = useParams() as { user: string };
  const user_id = param.user as string;

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
                Overview
              </PageTitle>
              <PageDescription>
                {interviewerDetails.first_name} {interviewerDetails.last_name}{' '}
                Overview of Interviewer with all the details.
              </PageDescription>
            </PageHeaderText>
            <PageActions>
              <Tabs defaultValue='overview' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='calendar'>Calendar</TabsTrigger>
                </TabsList>
              </Tabs>
            </PageActions>
          </PageHeader>
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
            <section ref={sectionRefs.calendar}>
              <CalendarComp
                allSchedules={allSchedules ?? []}
                isLoading={iscalendarLoading}
                filter={filter}
                setFilter={setFilter}
              />
            </section>
          </div>
        </Page>
      </TwoColumnPageLayout>

      {/* <div className=''>
        {isShowFeature('SCHEDULING') && (
          <div className='relative flex gap-5'>
            <div className='ml-4 flex w-3/12 flex-col'>
              <BreadCrumb name={interviewerDetails?.first_name || ''} />
              <div className='mb-4'>
                <Header userCardRef={userCardRef} />
              </div>
              <div>
                <aside>
                  <SideBar
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                  />
                </aside>
              </div>
            </div>
            <ScrollArea
              className='w-9/12 overflow-auto'
              style={{ height: 'calc(100vh - 66px)' }}
            >
              <main className='relative z-0 flex flex-col gap-10'>
                <section ref={sectionRefs.overview}>
                  <KeyMatrics />
                </section>

                <section ref={sectionRefs.qualifications}>
                  <Qualifications interview_types={interviewType} />
                </section>

                <section ref={sectionRefs.upcomingInterviews}>
                  <UpcomingInterview />
                </section>

                <section ref={sectionRefs.recentInterviews}>
                  <RecentInterviews />
                </section>
                <section ref={sectionRefs.interviewFeedback}>
                  <Feedback />
                </section>

                <section ref={sectionRefs.meetingOverview}>
                  <Heatmap loadSetting={interviewLoad} />
                </section>
                <section ref={sectionRefs.scheduleAvailabilityRef}>
                  <ScheduleAvailability />
                </section>
                <section ref={sectionRefs.calendar}>
                  <CalendarComp
                    allSchedules={allSchedules ?? []}
                    isLoading={iscalendarLoading}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </section>
              </main>
            </ScrollArea>
          </div>
        )}
      </div> */}
    </div>
  );
}
