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
    <div className='flex justify-between w-full'>
      <div className='flex flex-col h-[calc(100vh-48px)] overflow-auto w-full'>
        {/* header  */}
        <div className='flex gap-3 max-w-[870px] mx-4 my-4 p-4 bg-neutral-100 rounded-lg'>
          {/* logo part  */}
          <div className='flex justify-between items-start'>
            <div className='w-[50px] h-[50px] overflow-hidden rounded-lg'>
              {slotInterviewerAvatar ?? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className='w-full h-full object-cover'
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
                <h3 className='font-medium text-base	'>{textInterviewerName}</h3>
                {isLinkedInVisible && (
                  <div className='cursor-pointer' onClick={onClickLinkedIn}>
                    <Linkedin className='h-4 w-4 text-gray-600' />
                  </div>
                )}
              </div>
              <p className='text-neutral-500'>{textDepartment}</p>
            </div>

            <div className='flex gap-3 mt-4 '>
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
            <div className='flex  gap-3 mt-2 '>
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
          <div className='grow flex justify-end'>
            {slotEditButton && slotEditButton}
          </div>
        </div>
        <div className='sticky top-0 z-3 flex items-center bg-white'>
          {slotNewTabPill ?? <></>}
        </div>
        <div className='flex flex-col bg-white p-4'>
          {slotTabContent ?? <></>}
        </div>
      </div>
      {isUpcomingInterviewVisible && (
        <div className='w-[400px] p-4 border-l border-neutral-400 flex flex-col space-y-2'>
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
