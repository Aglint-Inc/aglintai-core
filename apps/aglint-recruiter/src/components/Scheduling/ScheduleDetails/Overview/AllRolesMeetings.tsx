import { AvatarWithName } from '@/devlink3/AvatarWithName';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import { ScheduleMeeting } from '../types';

function AllRolesMeetings({ schedule }: { schedule: ScheduleMeeting }) {
  const allRoles = [
    {
      type: 'interview_coordinator',
      details: schedule.interview_coordinator,
      label: 'Interview Coordinator',
    },
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
    {
      type: 'sourcer',
      details: schedule.sourcer,
      label: 'Sourcer',
    },
  ];

  const filteredRoles = allRoles.filter((item) => Boolean(item.details));

  return (
    <>
      {filteredRoles.map((item) => {
        return (
          <AvatarWithName
            key={item.type}
            textRole={item.label}
            isRoleVisible={true}
            textName={getFullName(
              item.details.first_name,
              item.details.last_name,
            )}
            slotAvatar={
              <MuiAvatar
                level={getFullName(
                  item.details.first_name,
                  item.details.last_name,
                )}
                src={item.details.profile_image}
                variant={'rounded-medium'}
                fontSize='20px'
              />
            }
          />
        );
      })}
    </>
  );
}

export default AllRolesMeetings;
