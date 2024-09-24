import { getFullName } from '@aglint/shared-utils';
import { useEffect, useRef, useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { capitalizeAll } from '@/utils/text/textUtils';

import { useInterviewer } from '../hooks/useInterviewer';
import { Calendar } from './Calendar';
import { BreadCrumb, SideBar, Top } from './Components';
import { EditUserDialog } from './Dialogs/EditUser';
import { Feedback } from './FeedbackCard';
import { Header } from './Header';
import { HeatmapUser } from './Heatmap';
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

  //-----------------------
  const router = useRouterPro();
  const [isOpen, setIsOpen] = useState(router.queryParams.edit_enable || false);

  const { data: interviewerDetails, isLoading } = useInterviewer();

  //--------------------------------------
  if (isLoading)
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Loader />
      </div>
    );

  const interviewer = null;

  return (
    <div className='container mx-auto py-8'>
      <EditUserDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <Top interviewer={interviewer} isTopBarVisible={isTopBarVisible} />
      <div className=''>
        <div className='sticky top-0 z-10 bg-neutral-50'>
          <BreadCrumb name={interviewerDetails?.first_name} />
          <div className=''>
            <Header
              avatar={interviewerDetails?.avatar}
              setIsOpen={setIsOpen}
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
                  // upcomingCount={interviewerDetails.meeting_count.upcoming}
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
                <HeatmapUser
                  loadSetting={
                    interviewerDetails?.scheduling_settings?.interviewLoad
                  }
                />
              </section>
              <section ref={sectionRefs.scheduleAvailabilityRef}>
                <ScheduleAvailability
                  schedulingSettings={interviewerDetails.scheduling_settings}
                  interviewTodayWeek={interviewerDetails.interview_week_today}
                />
              </section>
              <section ref={sectionRefs.calendar}>
                <Calendar />
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

// const CalendartReminder = ({
//   interviewerDetails,
// }: {
//   interviewerDetails: ReturnType<typeof useInterviewer>['data'];
// }) => {
//   const { recruiterUser } = useAuthDetails();
//   const { data: allIntegrations } = useAllIntegrations();

//   const [dialogOpen, setDialogOpen] = useState<'email' | 'slack' | null>(null);

//   const handleClickOpen = (type: 'email' | 'slack') => {
//     setDialogOpen(type);
//   };

//   const handleClose = () => {
//     setDialogOpen(null);
//   };

//   return (
//     <>
//       {allIntegrations?.service_json !== null &&
//         allIntegrations?.google_workspace_domain?.split('//')[1] ===
//           interviewerDetails.email.split('@')[1] &&
//         interviewerDetails.schedule_auth === null &&
//         (interviewerDetails.user_id === recruiterUser.user_id ||
//           recruiterUser.role === 'admin') && (
//           <>
//             <div className='mb-5'>
//               <Alert variant='error'>
//                 {/* <AlertTitle>Heads up!</AlertTitle> */}
//                 <AlertDescription>
//                   {interviewerDetails.user_id === recruiterUser.user_id ? (
//                     'Your calendar is not connected yet. Please connect it to schedule interviews.'
//                   ) : (
//                     <>
//                       {`
//                       ${getFullName(
//                         interviewerDetails.first_name,
//                         interviewerDetails.last_name,
//                       )} calendar is not connected yet. Click 'Connect Calender' button to send reminder `}
//                     </>
//                   )}
//                   <Popover>
//                     <PopoverTrigger>
//                       <UIButton color={'error'}>Connect Calender</UIButton>
//                     </PopoverTrigger>
//                     <PopoverContent>
//                       <div>
//                         <UIButton
//                           onClick={() => {
//                             handleClickOpen('email');
//                           }}
//                         >
//                           via Email
//                         </UIButton>
//                         <UIButton
//                           onClick={() => {
//                             handleClickOpen('slack');
//                           }}
//                         >
//                           via Slack
//                         </UIButton>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </AlertDescription>
//               </Alert>
//             </div>
//             <UIDialog
//               title={
//                 dialogOpen === 'email'
//                   ? 'Send Email Reminder'
//                   : 'Send Slack Reminder'
//               }
//               slotButtons={
//                 <>
//                   <UIButton color={'neutral'} onClick={handleClose}>
//                     Cancel
//                   </UIButton>
//                   <UIButton>Send</UIButton>
//                 </>
//               }
//               open={!!dialogOpen}
//               onClose={handleClose}
//             >
//               <div>
//                 <UITypography>
//                   Sending calendar connect reminder to{' '}
//                   <span style={{ fontWeight: '500' }}>
//                     {getFullName(
//                       recruiterUser.first_name,
//                       recruiterUser.last_name,
//                     )}
//                   </span>
//                 </UITypography>
//                 <UITypography className='mt-8'>
//                   {dialogOpen === 'email' ? 'Email' : 'Slack'} Body
//                 </UITypography>
//                 <div
//                   style={{
//                     marginTop: '8px',
//                     border: '1px solid',
//                     borderColor: 'var(--neutral-6)',
//                     borderRadius: 'var(--radius-2)',
//                   }}
//                 >
//                   <TipTapAIEditor
//                     enablAI={false}
//                     disabled
//                     toolbar={false}
//                     placeholder={''}
//                     height='360px'
//                     minHeight='360px'
//                     editor_type='email'
//                     // onfocus={onFocus}
//                     // onblur={onBlur}
//                     // template_type={selectedTemplate.type}
//                     // handleChange={emailBodyChange}
//                     // initialValue={selectedTemplate.body}
//                   />
//                 </div>
//               </div>
//             </UIDialog>
//           </>
//         )}
//     </>
//   );
// };
