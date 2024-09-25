import {
  type DatabaseTable,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { useInterviewsByUserId } from '@interviews/hooks/useInterviewsByUserId';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import CalendarComp from '@/components/Common/Calendar/Calendar';
import Heatmap from '@/components/Common/Heatmap/HeatmapUser';
import { Loader } from '@/components/Common/Loader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { capitalizeAll } from '@/utils/text/textUtils';

import {
  type InterviewerDetailType,
  useInterviewer,
} from '../hooks/useInterviewer';
import { BreadCrumb } from './BreadCrumb';
import { Feedback } from './FeedbackCard';
import { Header } from './Header';
import { KeyMatrics } from './KeyMatrix';
import { Qualifications } from './Qualification';
import { RecentInterviews } from './RecentInterviewCard';
import ScheduleAvailability from './ScheduleAvailability';
import { SideBar } from './SideBar';
import { UpcomingInterview } from './UpcomingInterviews';

export type sectionKeys =
  | 'overview'
  | 'qualifications'
  | 'performance'
  | 'availability'
  | 'pendingActions'
  | 'recentActivity'
  | 'upcomingInterviews'
  | 'recentInterviews'
  | 'interviewFeedback'
  | 'scheduleAvailabilityRef'
  | 'meetingOverview'
  | 'calendar';

export default function InterviewerDetailsPage() {
  //scrolling-------------------
  const [activeSection, setActiveSection] = useState('overview');
  // const [isTopBarVisible, setIsTopBarVisible] = useState<boolean>(false);
  const { isShowFeature } = useAuthDetails();
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    qualifications: useRef<HTMLDivElement>(null),
    performance: useRef<HTMLDivElement>(null),
    availability: useRef<HTMLDivElement>(null),
    pendingActions: useRef<HTMLDivElement>(null),
    recentActivity: useRef<HTMLDivElement>(null),
    upcomingInterviews: useRef<HTMLDivElement>(null),
    recentInterviews: useRef<HTMLDivElement>(null),
    interviewFeedback: useRef<HTMLDivElement>(null),
    scheduleAvailabilityRef: useRef<HTMLDivElement>(null),
    meetingOverview: useRef<HTMLDivElement>(null),
    calendar: useRef<HTMLDivElement>(null),
  };

  const userCardRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    // const scrollPosition = window.scrollY;
    // const userCardBottom = userCardRef.current?.getBoundingClientRect().bottom;
    // setIsTopBarVisible(!!userCardBottom && scrollPosition > userCardBottom);

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current && ref.current.getBoundingClientRect().top < 100) {
        setActiveSection(key);
      }
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionKey: sectionKeys) => {
    sectionRefs[sectionKey].current?.scrollIntoView({ behavior: 'smooth' });
  };

  //----------------------- page data

  const { data: interviewerDetails, isLoading } = useInterviewer();

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

  const allSchedules = data?.schedules;
  // ---------------- data

  const interviewLoad = interviewerDetails?.scheduling_settings
    ?.interviewLoad as schedulingSettingType['interviewLoad'];

  const interviewType =
    interviewerDetails?.interview_type as InterviewerDetailType['interview_type'];

  const feedbacks =
    interviewerDetails?.feedbacks as InterviewerDetailType['feedbacks'];

  const schedulingSettings =
    interviewerDetails?.scheduling_settings as NonNullable<
      InterviewerDetailType['scheduling_settings']
    >;
  const interviewTodayWeek =
    interviewerDetails?.interview_week_today as NonNullable<
      InterviewerDetailType['interview_week_today']
    >;

  const interviewerName = getFullName(
    interviewerDetails?.first_name || '',
    interviewerDetails?.last_name || '',
  );
  //--------------------------------------
  if (isLoading)
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Loader />
      </div>
    );
  return (
    <div className='container mx-auto'>
      {/* <Top
        interviewer={{
          avatar: interviewerDetails?.avatar || '',
          department: interviewerDetails?.department || '-',
          name: interviewerName,
          role: interviewerDetails?.role || '',
          //need to change dynamic values
          calendarConnected: false,
          gmailConnected: false,
        }}
        isTopBarVisible={isTopBarVisible}
      /> */}
      <div className='relative'>
        <div className='sticky top-0 z-10 bg-gray-50'>
          <BreadCrumb name={interviewerDetails?.first_name || ''} />
        </div>
        <div>
          <Header
            avatar={interviewerDetails?.avatar || ''}
            name={interviewerName}
            role={capitalizeAll(interviewerDetails?.role || ' - ')}
            department={interviewerDetails?.department || ' - '}
            location={interviewerDetails?.location || ' - '}
            timeZone={interviewerDetails?.timeZone || ' - '}
            email={interviewerDetails?.email || ' - '}
            phone={interviewerDetails?.phone || ' - '}
            userCardRef={userCardRef}
          />
        </div>
        {isShowFeature('SCHEDULING') && (
          <div className='relative flex gap-8'>
            <div className='sticky top-20 self-start' style={{ top: '90px' }}>
              <aside>
                <SideBar
                  activeSection={activeSection}
                  scrollToSection={scrollToSection}
                />
              </aside>
            </div>
            <main className='relative z-0 space-y-6'>
              <section ref={sectionRefs.overview}>
                <KeyMatrics
                  declineCount={
                    interviewerDetails?.meeting_count.cancelled || 0
                  }
                  completedCount={
                    interviewerDetails?.meeting_count.completed || 0
                  }
                  totalHour={
                    interviewerDetails?.meeting_count.completed_hour || 0
                  }
                />
              </section>

              <section ref={sectionRefs.qualifications}>
                <Qualifications interview_types={interviewType} />
              </section>

              <section ref={sectionRefs.upcomingInterviews}>
                <UpcomingInterview
                  interviews={
                    interviewerDetails?.all_meetings?.length
                      ? interviewerDetails?.all_meetings.filter(
                          (meeting) => meeting.status === 'confirmed',
                        )
                      : []
                  }
                />
              </section>

              <section ref={sectionRefs.recentInterviews}>
                <RecentInterviews
                  interviews={
                    interviewerDetails?.all_meetings?.length
                      ? interviewerDetails?.all_meetings.filter(
                          (meeting) => meeting.status === 'completed',
                        )
                      : []
                  }
                />
              </section>
              <section ref={sectionRefs.interviewFeedback}>
                <Feedback feedbacks={feedbacks} />
              </section>

              <section ref={sectionRefs.meetingOverview}>
                <SectionCard title='Meetings overview'>
                  <Heatmap loadSetting={interviewLoad} />
                </SectionCard>
              </section>
              <section ref={sectionRefs.scheduleAvailabilityRef}>
                <ScheduleAvailability
                  schedulingSettings={schedulingSettings}
                  interviewTodayWeek={interviewTodayWeek}
                />
              </section>
              <section ref={sectionRefs.calendar}>
                <SectionCard title='Schedule Calendar'>
                  <CalendarComp
                    allSchedules={allSchedules ?? []}
                    isLoading={iscalendarLoading}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </SectionCard>
              </section>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

//for feature use
{
  /* 
          <section ref={sectionRefs.performance}>
            <Performance interviewer={interviewer} />
          </section> */
}

{
  /* <section ref={sectionRefs.availability}>
            <Availability interviewer={interviewer} />
          </section> */
}

{
  /* <section ref={sectionRefs.pendingActions}>
            <PendingActions interviewer={interviewer} />
          </section> */
}

{
  /* <section ref={sectionRefs.recentActivity}>
            <RecentActivity interviewer={interviewer} />
          </section> */
}
