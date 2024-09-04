import { UserNameCard } from '@devlink3/UserNameCard';
import { Stack } from '@mui/material';
import Link from 'next/link';

import MuiAvatar from '@/components/Common/MuiAvatar';
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
                <Link href={`/user/profile/${item.details.user_id}`}>
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
