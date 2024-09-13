import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import Link from 'next/link';

import { getFullName } from '@/utils/jsonResume';

import { useScheduleDetails } from '../hooks';

function AllRolesMeetings() {
  const { data } = useScheduleDetails();
  const schedule = data?.schedule_data;

  const allRoles = [
    {
      type: 'recruiter',
      details: schedule.recruiter,
      label: 'Recruiter',
    },
    {
      type: 'recruiting_coordinator',
      details: schedule.recruiting_coordinator,
      label: 'Recruiting Coordinator',
    },
    {
      type: 'hiring_manager',
      details: schedule.hiring_manager,
      label: 'Hiring Manager',
    },
  ];

  const filteredRoles = allRoles.filter((item) => Boolean(item.details));

  return (
    <div className='flex flex-col space-y-4'>
      {filteredRoles.map((item) => {
        return (
          <div key={item.type}>
            <div className='flex items-center space-x-4 bg-white'>
              <Avatar className='h-10 w-10'>
                <AvatarImage
                  src={item.details.profile_image}
                  alt={getFullName(
                    item.details.first_name,
                    item.details.last_name,
                  )}
                />
                <AvatarFallback>
                  {getFullName(
                    item.details.first_name,
                    item.details.last_name,
                  ).charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/user/profile/${item.details.user_id}`}
                  className='text-sm font-medium hover:underline'
                >
                  {getFullName(item.details.first_name, item.details.last_name)}
                </Link>
                <p className='text-sm text-gray-500'>{item.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllRolesMeetings;
