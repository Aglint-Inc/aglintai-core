import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CalendarIcon,
  CheckCircle,
  CheckCircle2,
  Home,
  MessageSquare,
  UserCircle,
} from 'lucide-react';

export const Top = ({ interviewer, isTopBarVisible }) => {
  return (
    <>
      {interviewer ? (
        <div
          className={`sticky top-0 z-10 bg-white shadow transition-all duration-300 ${isTopBarVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={interviewer?.avatar}
                    alt={interviewer?.name}
                  />
                  <AvatarFallback>
                    {interviewer?.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className='text-xl font-bold text-gray-900'>
                    {interviewer?.name}
                  </h1>
                  <p className='text-sm text-gray-600'>
                    {interviewer?.role} {interviewer?.department}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <Badge
                  //   variant={
                  //     interviewer.calendarConnected ? 'success' : 'secondary'
                  //   }
                  >
                    {interviewer.calendarConnected ? (
                      <CheckCircle className='mr-1 h-4 w-4' />
                    ) : (
                      <AlertCircle className='mr-1 h-4 w-4' />
                    )}
                    Calendar
                  </Badge>
                  <Badge
                  //   variant={interviewer.gmailConnected ? 'success' : 'secondary'}
                  >
                    {interviewer.gmailConnected ? (
                      <CheckCircle className='mr-1 h-4 w-4' />
                    ) : (
                      <AlertCircle className='mr-1 h-4 w-4' />
                    )}
                    Gmail
                  </Badge>
                </div>
                <Button variant='outline'>Edit Profile</Button>
                <Button>Schedule Interview</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const BreadCrumb = ({ name }) => {
  return (
    <div className='mb-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>
              <Home className='h-4 w-4' />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/interviewers'>Interviewers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export const SideBar = ({
  scrollToSection,
  activeSection,
}: {
  // eslint-disable-next-line no-unused-vars
  scrollToSection: (sectionKey: any) => void;
  activeSection: string;
}) => {
  const SideNavItem = ({ icon: Icon, label, active = false, onClick }) => (
    <Button
      variant={active ? 'secondary' : 'ghost'}
      className='w-full justify-start'
      onClick={onClick}
    >
      <Icon className='mr-2 h-5 w-5' />
      {label}
    </Button>
  );

  return (
    <aside className='sticky top-[275px] w-64 flex-shrink-0 self-start'>
      <nav className='space-y-1'>
        <SideNavItem
          icon={UserCircle}
          label='Overview'
          active={activeSection === 'overview'}
          onClick={() => scrollToSection('overview')}
        />
        <SideNavItem
          icon={CheckCircle2}
          label='Qualifications'
          active={activeSection === 'qualifications'}
          onClick={() => scrollToSection('qualifications')}
        />

        <SideNavItem
          icon={CalendarIcon}
          label='Upcoming Interviews'
          active={activeSection === 'upcomingInterviews'}
          onClick={() => scrollToSection('upcomingInterviews')}
        />
        <SideNavItem
          icon={Briefcase}
          label='Recent Interviews'
          active={activeSection === 'recentInterviews'}
          onClick={() => scrollToSection('recentInterviews')}
        />
        <SideNavItem
          icon={MessageSquare}
          label='Interview Feedback'
          active={activeSection === 'interviewFeedback'}
          onClick={() => scrollToSection('interviewFeedback')}
        />
        <SideNavItem
          icon={Calendar}
          label='Schedule Availability'
          active={activeSection === 'scheduleAvailability'}
          onClick={() => scrollToSection('scheduleAvailability')}
        />
        {/*<SideNavItem
      icon={BarChart}
      label='Performance'
      active={activeSection === 'performance'}
      onClick={() => scrollToSection('performance')}
    /> 
    <SideNavItem
      icon={Clock}
      label='Availability'
      active={activeSection === 'availability'}
      onClick={() => scrollToSection('availability')}
    />
    <SideNavItem
      icon={AlertTriangle}
      label='Pending Actions'
      active={activeSection === 'pendingActions'}
      onClick={() => scrollToSection('pendingActions')}
    />
    <SideNavItem
      icon={FileText}
      label='Recent Activity'
      active={activeSection === 'recentActivity'}
      onClick={() => scrollToSection('recentActivity')}
    />*/}
      </nav>
    </aside>
  );
};
