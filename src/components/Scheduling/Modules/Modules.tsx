import { AvatarGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { InterviewModuleCard, InterviewModuleTable } from '@/devlink2';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import CreateModuleDialog from './CreateModuleDialog';
import { useAllInterviewModules } from './queries/hooks';
import { useSchedulingStore } from './store';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';

export function Modules() {
  const router = useRouter();
  const { setFetchingModule } = useSchedulingContext();
  const searchText = useSchedulingStore((state) => state.searchText);

  const { data: allModules, isLoading } = useAllInterviewModules();

  const filterModules = useMemo(() => {
    return allModules.filter((mod) => {
      return mod.interview_modules.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
  }, [allModules, searchText]);

  return (
    <>
      <CreateModuleDialog />
      {!isLoading && (
        <>
          <InterviewModuleTable
            slotInterviewModuleCard={filterModules.map((mod) => {
              return (
                <Stack
                  key={module.id}
                  onClick={() => {
                    setFetchingModule(true);
                    router.push(
                      pageRoutes.INTERVIEWMODULE +
                        '/members' +
                        `/${mod.interview_modules.id}`
                    );
                  }}
                >
                  <InterviewModuleCard
                    textModuleName={mod.interview_modules.name}
                    slotMemberPic={
                      <AvatarGroup
                        total={mod.users.length}
                        sx={{
                          '& .MuiAvatar-root': {
                            width: '26px',
                            height: '26px',
                            fontSize: '12px'
                          }
                        }}
                      >
                        {mod.users.slice(0, 5).map((user) => {
                          return (
                            <MuiAvatar
                              key={user.user_id}
                              src={user.profile_image}
                              level={getFullName(
                                user.first_name,
                                user.last_name
                              )}
                              variant='circular'
                              height='26px'
                              width='26px'
                              fontSize='12px'
                            />
                          );
                        })}
                      </AvatarGroup>
                    }
                    textMembersCount={
                      mod.users.length !== 0
                        ? `${mod.users.length} Members`
                        : ''
                    }
                    textCompletedSchedules={mod.completed_meeting_count}
                    textUpcomingSchedules={mod.upcoming_meeting_count}
                    isCompletedScheduleEmpty={mod.completed_meeting_count === 0}
                    isCompletedScheduleVisible={mod.completed_meeting_count > 0}
                    isUpcomingScheduleEmpty={mod.upcoming_meeting_count === 0}
                    isUpcomingScheduleVisible={mod.upcoming_meeting_count > 0}
                  />
                </Stack>
              );
            })}
          />
        </>
      )}
      {isLoading && (
        <Stack sx={{ height: '100%' }}>
          <Loader />
        </Stack>
      )}
    </>
  );
}
