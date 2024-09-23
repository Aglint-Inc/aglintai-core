import { type schedulingSettingType } from '@aglint/shared-types';
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

import { useInterviewer } from '../hooks/useInterviewer';
import { BreadCrumb, SideBar, Top } from './Components';
import { Feedback } from './FeedbackCard';
import { Header } from './Header';
import { KeyMatrics } from './KeyMatrix';
import { Qualifications } from './Qualification';
import { RecentInterviews } from './RecentInterviewCard';
import ScheduleAvailability from './ScheduleAvailability';
import { UpcomingInterview } from './UpcomingInterviews';

export default function InterviewerDetailsPage() {
  //scrolling-------------------
  const [activeSection, setActiveSection] = useState('overview');
  const [isTopBarVisible, setIsTopBarVisible] = useState(false);
  const { isShowFeature } = useAuthDetails();
  const sectionRefs = {
    overview: useRef(null),
    qualifications: useRef(null),
    performance: useRef(null),
    availability: useRef(null),
    pendingActions: useRef(null),
    recentActivity: useRef(null),
    upcomingInterviews: useRef(null),
    recentInterviews: useRef(null),
    interviewFeedback: useRef(null),
    scheduleAvailabilityRef: useRef(null),
    meetingOverview: useRef(null),
    calendar: useRef(null),
  };
  const userCardRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const userCardBottom = userCardRef.current?.getBoundingClientRect().bottom;
    +setIsTopBarVisible(userCardBottom && scrollPosition > userCardBottom);

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

  const scrollToSection = (sectionKey) => {
    sectionRefs[sectionKey].current?.scrollIntoView({ behavior: 'smooth' });
  };

  //----------------------- page data

  const { data: interviewerDetails, isLoading } = useInterviewer();

  //------------------------ calendar data
  const user_id = useParams().user as string;

  const [filter, setFilter] = useState([]);
  const {
    data: { schedules: allSchedules },
    isLoading: iscalendarLoading,
  } = useInterviewsByUserId({
    filter: filter.length === 0 ? null : filter,
    member_id: user_id,
  });

  // ---------------- data

  const interviewer = null;
  const interviewLoad = interviewerDetails?.scheduling_settings
    ?.interviewLoad as schedulingSettingType['interviewLoad'];

  //--------------------------------------
  if (isLoading)
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Loader />
      </div>
    );
  return (
    <div className='container mx-auto py-8'>
      <Top interviewer={interviewer} isTopBarVisible={isTopBarVisible} />
      <div className=''>
        <div className='sticky top-0 z-10 bg-neutral-50'>
          <BreadCrumb name={interviewerDetails?.first_name} />
          <div>
            <Header
              avatar={interviewerDetails?.avatar}
              name={getFullName(
                interviewerDetails.first_name,
                interviewerDetails.last_name,
              )}
              role={capitalizeAll(interviewerDetails?.role || ' - ')}
              department={interviewerDetails?.department || ' - '}
              location={interviewerDetails?.location || ' - '}
              timeZone={interviewerDetails?.timeZone || ' - '}
              email={interviewerDetails?.email || ' - '}
              phone={interviewerDetails?.phone || ' - '}
              userCardRef={userCardRef}
            />
          </div>
        </div>
        {isShowFeature('SCHEDULING') && (
          <div className='flex gap-8'>
            <aside className='sticky top-[255px] w-64 flex-shrink-0 self-start'>
              <SideBar
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            </aside>
            <main className='relative z-0 flex-1 space-y-6'>
              <section ref={sectionRefs.overview}>
                <KeyMatrics
                  declineCount={interviewerDetails.meeting_count.cancelled}
                  completedCount={interviewerDetails.meeting_count.completed}
                  totalHour={interviewerDetails.meeting_count.completed_hour}
                />
              </section>

              <section ref={sectionRefs.qualifications}>
                <Qualifications
                  interview_types={interviewerDetails.interview_type}
                />
              </section>

              <section ref={sectionRefs.upcomingInterviews}>
                <UpcomingInterview
                  interviews={interviewerDetails.all_meetings.filter(
                    (meeting) => meeting.status === 'confirmed',
                  )}
                />
              </section>

              <section ref={sectionRefs.recentInterviews}>
                <RecentInterviews
                  interviews={interviewerDetails.all_meetings.filter(
                    (meeting) => meeting.status === 'completed',
                  )}
                />
              </section>
              <section ref={sectionRefs.interviewFeedback}>
                <Feedback feedbacks={interviewerDetails.feedbacks} />
              </section>

              <section ref={sectionRefs.meetingOverview}>
                <SectionCard title='Meetings overview'>
                  <Heatmap loadSetting={interviewLoad} />
                </SectionCard>
              </section>
              <section ref={sectionRefs.scheduleAvailabilityRef}>
                <ScheduleAvailability
                  schedulingSettings={interviewerDetails.scheduling_settings}
                  interviewTodayWeek={interviewerDetails.interview_week_today}
                />
              </section>
              <section ref={sectionRefs.calendar}>
                <SectionCard title='Schedule Calendar'>
                  <CalendarComp
                    allSchedules={allSchedules}
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
