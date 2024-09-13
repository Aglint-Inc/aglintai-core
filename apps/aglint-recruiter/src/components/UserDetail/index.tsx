import { getFullName } from '@aglint/shared-utils';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { capitalizeAll } from '@/utils/text/textUtils';

import Loader from '../Common/Loader';
import {
  BreadCrumb,
  Feedback,
  Header,
  KeyMatrics,
  Qualifications,
  RecentInterviews,
  SideBar,
  Top,
  UpcomingInterview,
} from './Components';
import { EditUserDialog } from './Dialogs/EditUser';
import { useInterviewer } from './hook';

const interviewer = {
  id: 1,
  name: 'Sara Connor',
  role: 'Senior Interviewer',
  department: 'Engineering',
  location: 'New York',
  timeZone: 'EST (GMT-5)',
  avatar: '/placeholder.svg?height=128&width=128',
  email: 'sara.connor@example.com',
  phone: '+1 (555) 123-4567',
  calendarConnected: true,
  gmailConnected: false,
  interviewHours: 84,
  interviewsCompleted: 168,
  declines: 0,
  averageRating: 4.9,
  qualifications: [
    {
      name: 'System Design',
      monthlyScheduled: 10,
      monthlyCompleted: 8,
      monthlyDeclined: 2,
      avgDuration: 60,
      candidatesPerWeek: 5,
      upcomingSlots: 10,
      passRate: 75,
    },
    {
      name: 'Frontend Technical',
      monthlyScheduled: 15,
      monthlyCompleted: 12,
      monthlyDeclined: 3,
      avgDuration: 45,
      candidatesPerWeek: 7,
      upcomingSlots: 8,
      passRate: 80,
    },
    {
      name: 'Backend Technical',
      monthlyScheduled: 12,
      monthlyCompleted: 10,
      monthlyDeclined: 2,
      avgDuration: 50,
      candidatesPerWeek: 6,
      upcomingSlots: 9,
      passRate: 70,
    },
  ],
  recentInterviews: [
    {
      candidate: 'John Doe',
      position: 'Senior Frontend Developer',
      date: '2024-09-10',
      status: 'Completed',
      rating: 4.8,
    },
    {
      candidate: 'Jane Smith',
      position: 'Backend Engineer',
      date: '2024-09-08',
      status: 'Completed',
      rating: 4.5,
    },
    {
      candidate: 'Alice Johnson',
      position: 'DevOps Specialist',
      date: '2024-09-07',
      status: 'Completed',
      rating: 4.9,
    },
  ],
  upcomingInterviews: [
    {
      candidate: 'Bob Wilson',
      position: 'Full Stack Developer',
      date: '2024-09-15',
      time: '10:00 AM',
    },
    {
      candidate: 'Carol Brown',
      position: 'UX Designer',
      date: '2024-09-16',
      time: '2:00 PM',
    },
  ],
  availability: {
    weeklyHours: 40,
    preferredTimes: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'],
    unavailableDates: ['2024-09-20', '2024-09-21', '2024-09-22'],
  },
  performanceMetrics: {
    candidateSatisfaction: 95,
    hiringManagerSatisfaction: 92,
    averageInterviewDuration: 55,
    decisionAccuracy: 88,
  },
  recentActivity: [
    {
      action: 'Completed interview',
      details: 'John Doe for Senior Frontend Developer',
      timestamp: '2 hours ago',
    },
    {
      action: 'Updated availability',
      details: 'Added new time slots for next week',
      timestamp: '1 day ago',
    },
    {
      action: 'Completed training',
      details: 'Advanced System Design Interview Techniques',
      timestamp: '3 days ago',
    },
  ],
  interviewFeedback: [
    {
      from: 'Candidate',
      content:
        'Sara was very knowledgeable and made me feel comfortable during the interview.',
      date: '2024-09-10',
    },
    {
      from: 'Hiring Manager',
      content:
        "Excellent assessment of the candidate's skills. Very thorough report.",
      date: '2024-09-08',
    },
    {
      from: 'Peer Reviewer',
      content:
        "Great job on asking follow-up questions to dig deeper into the candidate's experience.",
      date: '2024-09-07',
    },
  ],
  pendingActions: [
    {
      type: 'RSVP',
      details:
        'Confirm availability for interview with Emily Davis on 2024-09-18',
      deadline: '2024-09-14',
    },
    {
      type: 'Feedback',
      details:
        'Provide feedback for interview with Michael Brown on 2024-09-11',
      deadline: '2024-09-13',
    },
    {
      type: 'Training',
      details: "Complete mandatory 'Unconscious Bias in Interviewing' course",
      deadline: '2024-09-20',
    },
  ],
};

export default function InterviewerDetailsPage() {
  //scrolling-------------------
  const [activeSection, setActiveSection] = useState('overview');
  const [isTopBarVisible, setIsTopBarVisible] = useState(false);
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
  };
  const userCardRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const userCardBottom = userCardRef.current?.getBoundingClientRect().bottom;

    setIsTopBarVisible(userCardBottom && scrollPosition > userCardBottom);

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

  //-----------------------
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(router.query.edit_enable || false);

  const user_id = router.query.user_id as string;
  const { data: interviewerDetails, isLoading } = useInterviewer({ user_id });

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Loader />
      </div>
    );

  return (
    <div className='min-h-screen bg-gray-50'>
      <EditUserDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <Top interviewer={interviewer} isTopBarVisible={isTopBarVisible} />

      <div className='max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
        <div className='sticky top-8'>
          <BreadCrumb name={interviewerDetails?.first_name} />
          <Header
            avatar={interviewerDetails.avatar}
            setIsOpen={setIsOpen}
            name={getFullName(
              interviewerDetails.first_name,
              interviewerDetails.last_name,
            )}
            role={capitalizeAll(interviewerDetails.role)}
            department={interviewerDetails.department}
            location={interviewerDetails.location}
            timeZone={interviewerDetails.timeZone}
            email={interviewerDetails.email}
            phone={interviewerDetails.phone}
            userCardRef={userCardRef}
          />
        </div>

        <div className='flex gap-8'>
          <SideBar
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />
          <main className='flex-1 space-y-6'>
            <section ref={sectionRefs.overview}>
              <KeyMatrics
                declineCount={interviewerDetails.meeting_count.cancelled}
                completedCount={interviewerDetails.meeting_count.completed}
                upcomingCount={interviewerDetails.meeting_count.upcoming}
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

            {/* 
            <section ref={sectionRefs.performance}>
              <Performance interviewer={interviewer} />
            </section> */}

            {/* <section ref={sectionRefs.availability}>
              <Availability interviewer={interviewer} />
            </section> */}

            {/* <section ref={sectionRefs.pendingActions}>
              <PendingActions interviewer={interviewer} />
            </section> */}

            {/* <section ref={sectionRefs.recentActivity}>
              <RecentActivity interviewer={interviewer} />
            </section> */}
          </main>
        </div>
      </div>
    </div>
  );
}
