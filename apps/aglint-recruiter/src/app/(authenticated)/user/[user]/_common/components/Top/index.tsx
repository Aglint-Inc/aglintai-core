import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const Top = ({
  interviewer,
  isTopBarVisible,
}: {
  interviewer: {
    avatar: string;
    name: string;
    role: string;
    calendarConnected: boolean;
    gmailConnected: boolean;
    department: string;
  };
  isTopBarVisible: boolean;
}) => {
  return (
    <>
      {interviewer ? (
        <div
          className={`sticky top-0 z-10 bg-red-200 shadow transition-all duration-300 ${isTopBarVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
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
                  <Badge>
                    {interviewer.calendarConnected ? (
                      <CheckCircle className='mr-1 h-4 w-4' />
                    ) : (
                      <AlertCircle className='mr-1 h-4 w-4' />
                    )}
                    Calendar
                  </Badge>
                  <Badge>
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

{
  /* future use */
}
{
  /*<SideNavItem
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
    />*/
}
