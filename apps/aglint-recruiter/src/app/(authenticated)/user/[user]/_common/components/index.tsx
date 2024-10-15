import {
  type DatabaseTable,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import Typography from '@components/typography';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useInterviewsByUserId } from '@interviews/hooks/useInterviewsByUserId';
import { AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { useTenant } from '@/company/hooks';
import CalendarComp from '@/components/Common/Calendar/Calendar';
import Heatmap from '@/components/Common/Heatmap/HeatmapUser';
import { Loader } from '@/components/Common/Loader';

import {
  type InterviewerDetailType,
  useInterviewer,
} from '../hooks/useInterviewer';
import { BreakTime } from './BreakTime';
import { Feedback } from './FeedbackCard';
import { Header } from './Header';
import { InterviewLoads } from './InterveiwLoad';
import { Keywords } from './Keywords';
import { Qualifications } from './Qualification';
import { RecentInterviews } from './RecentInterviewCard';
import { TimeZoneUser } from './TimeZone';
import { UpcomingInterview } from './UpcomingInterviews';
import { WorkingHours } from './WorkingHour';

type TabType = 'overview' | 'calendar';

export default function InterviewerDetailsPage() {
  const { data: interviewerDetails, isLoading, error } = useInterviewer();
  const {
    recruiter_user: { user_id: logged_user_id },
  } = useTenant();
  //------------------------ calendar data
  const param = useParams() as { user: string };
  const user_id = param.user as string;

  const [tab, setTab] = useState<TabType>('overview');
  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >([]);
  const {
    data,
    isLoading: iscalendarLoading,
    isFetching,
  } = useInterviewsByUserId({
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
      sidebarWidth={'400px'}
      sidebar={
        <div className='col-span-4 flex flex-col gap-4 bg-white'>
          <UpcomingInterview />
          <RecentInterviews />
          <Feedback />
        </div>
      }
      sidebarPosition='right'
    >
      <div className='px-4'>
        <Header />
        <Section className='mt-2'>
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
        {tab === 'overview' ? (
          <div className='space-y-8px-4 flex flex-col'>
            <div className='col-span-8 grid space-y-12'>
              <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-3 flex h-full flex-col gap-4'>
                  <div className='flex-1 rounded-lg bg-gray-50 p-4'>
                    <Heatmap loadSetting={interviewLoad} />
                  </div>
                  <div className='flex flex-1 gap-4'>
                    <div className='flex-1 rounded-lg bg-gray-50 p-4'>
                      <TimeZoneUser />
                    </div>
                    <div className='flex-1 rounded-lg bg-gray-50 p-4'>
                      <InterviewLoads />
                    </div>
                  </div>
                </div>
                <div className='col-span-3 rounded-lg bg-gray-50 p-4'>
                  <Qualifications interview_types={interviewType} />
                </div>

                <div className='col-span-4 rounded-lg bg-gray-50 p-4'>
                  <Keywords />
                </div>
                <div className='col-span-2 flex flex-col gap-4'>
                  <div className='rounded-lg bg-gray-50 p-4'>
                    <BreakTime />
                  </div>
                  <div className='flex-1 rounded-lg bg-gray-50 p-4'>
                    <WorkingHours />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {interviewerDetails.is_calendar_connected ? (
              <CalendarComp
                allSchedules={allSchedules ?? []}
                isLoading={iscalendarLoading || isFetching}
                filter={filter}
                setFilter={setFilter}
              />
            ) : (
              <div className='flex h-[70vh] w-full items-center justify-center'>
                <Alert variant='warning' className='w-fit'>
                  <AlertTriangle className='h-4 w-4 text-yellow-500' />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    <div className='flex flex-row items-center'>
                      <p>
                        {logged_user_id === user_id
                          ? 'Your calendar is not connected. Please connect calendar from your'
                          : 'User calendar is not connected'}
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        )}
      </div>
    </TwoColumnPageLayout>
  );
}
