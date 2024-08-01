import { Stack } from '@mui/material';
import Link from 'next/link';

import { UserNameCard } from '@/devlink3/UserNameCard';
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
    <Stack spacing={'var(--space-2)'}>
      {filteredRoles.map((item) => {
        return (
          <>
            <UserNameCard
              slotAvatar={
                <MuiAvatar
                  level={getFullName(
                    item.details.first_name,
                    item.details.last_name,
                  )}
                  src={item.details.profile_image}
                  variant={'rounded'}
                  width='100%'
                  height='100%'
                  fontSize='20px'
                />
              }
              textName={
                <Link href={`/user/profile/${item.details.id}`}>
                  {getFullName(item.details.first_name, item.details.last_name)}
                </Link>
              }
              textRole={item.label}
            />
          </>
        );
      })}
    </Stack>
  );
}

export default AllRolesMeetings;
