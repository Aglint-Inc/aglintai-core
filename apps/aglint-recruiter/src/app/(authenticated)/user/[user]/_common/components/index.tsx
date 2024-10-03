import {
  type DatabaseTable,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { Page, PageHeader } from '@components/layouts/page-header';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useInterviewsByUserId } from '@interviews/hooks/useInterviewsByUserId';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
import Heatmap from '@/components/Common/Heatmap/HeatmapUser';
import { Loader } from '@/components/Common/Loader';
import UITypography from '@/components/Common/UITypography';

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
      <OneColumnPageLayout>
        <Page>
          <PageHeader className='-mt-4 border-b border-gray-200 bg-gray-50 p-4'>
            <Header />
          </PageHeader>
          <Section className='px-4'>
            <SectionHeader>
              <SectionHeaderText>
                <SectionTitle>Interviewer Overview</SectionTitle>
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

          {tab === 'overview' ? (
            <div className='flex flex-col space-y-8 px-4'>
              <div className='grid grid-cols-12 gap-[1px] bg-muted'>
                <div className='col-span-8 grid space-y-12 bg-white pr-8'>
                  <KeyMatrics />
                  <Heatmap loadSetting={interviewLoad} />
                  <Qualifications interview_types={interviewType} />
                  <ScheduleAvailability />
                </div>
                <div className='col-span-4 space-y-12 bg-white pl-8'>
                  <UpcomingInterview />
                  <RecentInterviews />
                  <Feedback />
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
      </OneColumnPageLayout>
    </div>
  );
}
