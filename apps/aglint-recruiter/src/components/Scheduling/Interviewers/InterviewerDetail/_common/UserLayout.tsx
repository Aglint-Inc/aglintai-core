'use client';
import {
  Building,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Smartphone,
  User,
} from 'lucide-react';

export function UserLayout({
  textInterviewerName = '',
  textDepartment = '',
  textTimeZone = '',
  slotInterviewerAvatar,
  slotTabContent,
  slotNewTabPill,
  textMail = '',
  textLocation = '',
  textRole = '',
  slotEditButton,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickLinkedIn = () => {},
  isLinkedInVisible = true,
  textPhone = '',
  textInterviewer = '',
  slotUpcomingList,
  isUpcomingInterviewVisible = false,
}) {
  return (
    <div className='flex w-full justify-between'>
      <div className='flex h-[calc(100vh-48px)] w-full flex-col overflow-auto'>
        {/* header  */}
        <div className='mx-4 my-4 flex max-w-[870px] gap-3 rounded-lg bg-neutral-100 p-4'>
          {/* logo part  */}
          <div className='flex items-start justify-between'>
            <div className='h-[50px] w-[50px] overflow-hidden rounded-lg'>
              {slotInterviewerAvatar ?? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className='h-full w-full object-cover'
                  alt='Interviewer Avatar'
                  src='https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg'
                />
              )}
            </div>
          </div>
          {/* part - 1 */}
          <div>
            <div className='flex flex-col'>
              <div className='flex items-center space-x-2'>
                <h3 className='text-base font-medium'>{textInterviewerName}</h3>
                {isLinkedInVisible && (
                  <div className='cursor-pointer' onClick={onClickLinkedIn}>
                    <Linkedin className='h-4 w-4 text-gray-600' />
                  </div>
                )}
              </div>
              <p className='text-neutral-500'>{textDepartment}</p>
            </div>

            <div className='mt-4 flex gap-3'>
              <div className='flex items-center space-x-2'>
                <Building className='h-4 w-4 text-gray-600' />
                <span>{textRole}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4 text-gray-600' />
                <span>{textLocation}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Globe className='h-4 w-4 text-gray-600' />
                <span>{textTimeZone}</span>
              </div>
            </div>
            {/* part - 2 */}
            <div className='mt-2 flex gap-3'>
              <div className='flex items-center space-x-2'>
                <User className='h-4 w-4 text-gray-600' />
                <span>{textInterviewer}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Mail className='h-4 w-4 text-gray-600' />
                <span>{textMail}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Smartphone className='h-4 w-4 text-gray-600' />
                <span>{textPhone}</span>
              </div>
            </div>
          </div>
          {/* Edit Button */}
          <div className='flex grow justify-end'>
            {slotEditButton && slotEditButton}
          </div>
        </div>
        <div className='z-3 sticky top-0 flex items-center bg-white'>
          {slotNewTabPill ?? <></>}
        </div>
        <div className='flex flex-col bg-white p-4'>
          {slotTabContent ?? <></>}
        </div>
      </div>
      {isUpcomingInterviewVisible && (
        <div className='flex w-[400px] flex-col space-y-2 border-l border-neutral-400 p-4'>
          <div className='flex items-center space-x-2'>
            <Building className='h-4 w-4 text-gray-600' />
            <span>Upcoming Interview</span>
          </div>
          <div className='flex flex-col'>{slotUpcomingList}</div>
        </div>
      )}
    </div>
  );
}
