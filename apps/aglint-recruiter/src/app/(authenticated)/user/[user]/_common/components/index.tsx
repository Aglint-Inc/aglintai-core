import {
  type DatabaseTable,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import { Page, PageHeader } from '@components/layouts/page-header';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import Typography from '@components/typography';
import { ScrollArea } from '@components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useInterviewsByUserId } from '@interviews/hooks/useInterviewsByUserId';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
import Heatmap from '@/components/Common/Heatmap/HeatmapUser';
import { Loader } from '@/components/Common/Loader';

import {
  type InterviewerDetailType,
  useInterviewer,
} from '../hooks/useInterviewer';
import { Feedback } from './FeedbackCard';
import { Header } from './Header';
import { KeyMatrics } from './KeyMatrix';
import { Qualifications } from './Qualification';
import { RecentInterviews } from './RecentInterviewCard';
import ScheduleAvailability from './ScheduleAvailability';
import { UpcomingInterview } from './UpcomingInterviews';

type TabType = 'overview' | 'calendar';
export default function InterviewerDetailsPage() {
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
        <Typography>Fetching Error</Typography>
      </div>
    );

  const allSchedules = data?.schedules;
  // ---------------- data

  const interviewLoad = interviewerDetails.scheduling_settings
    .interviewLoad as SchedulingSettingType['interviewLoad'];

  const interviewType =
    interviewerDetails?.interview_type as InterviewerDetailType['interview_type'];

  return (
    <TwoColumnPageLayout
      sidebar={
        <div className='col-span-4 bg-white'>
          <UpcomingInterview />
          <RecentInterviews />
          <Feedback />
        </div>
      }
      sidebarPosition='right'
      sidebarWidth='420'
    >
      <Page>
        <PageHeader className='-mt-4 border-b border-gray-200 bg-gray-50 p-4'>
          <Header />
        </PageHeader>
        <Section className='px-4'>
          <SectionHeader>
            <SectionHeaderText>
              <SectionTitle>
                Interviewer {tab === 'overview' ? 'Overview' : 'Calendar'}
              </SectionTitle>
            </SectionHeaderText>
            <SectionActions>
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
            </SectionActions>
          </SectionHeader>
        </Section>
        <ScrollArea className='h-[calc(100vh-246px)]'>
          {tab === 'overview' ? (
            <div className='flex flex-col space-y-8 px-4'>
              <div className='col-span-8 grid space-y-12'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <KeyMatrics />
                  </div>
                  <div>
                    <Heatmap loadSetting={interviewLoad} />
                  </div>
                </div>
                <Qualifications interview_types={interviewType} />
                <ScheduleAvailability />
              </div>
            </div>
          ) : (
            <div className='px-4'>
              <CalendarComp
                allSchedules={allSchedules ?? []}
                isLoading={iscalendarLoading}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
          )}
        </ScrollArea>
      </Page>
    </TwoColumnPageLayout>
  );
}
